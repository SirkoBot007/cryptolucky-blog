import { NextRequest, NextResponse } from 'next/server';

const LEADS_DATABASE_ID = process.env.NOTION_LEADS_DATABASE_ID ?? '';
const NOTION_API_KEY = process.env.NOTION_API_KEY ?? '';

export async function POST(req: NextRequest) {
  try {
    const { email, country, source, locale } = await req.json();
    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'invalid_email' }, { status: 400 });
    }
    if (!NOTION_API_KEY || !LEADS_DATABASE_ID) {
      console.error('Notion credentials missing');
      return NextResponse.json({ error: 'config_error' }, { status: 500 });
    }
    const searchRes = await fetch(
      `https://api.notion.com/v1/databases/${LEADS_DATABASE_ID}/query`,
      {
        method: 'POST',
        headers: { Authorization: `Bearer ${NOTION_API_KEY}`, 'Notion-Version': '2022-06-28', 'Content-Type': 'application/json' },
        body: JSON.stringify({ filter: { property: 'Email', email: { equals: email } } }),
      }
    );
    if (searchRes.ok) {
      const searchData = await searchRes.json();
      if (searchData.results?.length > 0) {
        return NextResponse.json({ error: 'already_subscribed' }, { status: 409 });
      }
    }
    const createRes = await fetch('https://api.notion.com/v1/pages', {
      method: 'POST',
      headers: { Authorization: `Bearer ${NOTION_API_KEY}`, 'Notion-Version': '2022-06-28', 'Content-Type': 'application/json' },
      body: JSON.stringify({
        parent: { database_id: LEADS_DATABASE_ID },
        properties: {
          Email: { email: email },
          País: { select: country ? { name: country } : undefined },
          Fuente: { select: { name: source || 'inline' } },
          Idioma: { select: { name: locale || 'es' } },
          Estado: { select: { name: 'Nuevo' } },
          Fecha: { date: { start: new Date().toISOString() } },
        },
      }),
    });
    if (!createRes.ok) {
      const errData = await createRes.json();
      console.error('Notion create error:', errData);
      return NextResponse.json({ error: 'notion_error' }, { status: 500 });
    }
    const n8nWebhookUrl = process.env.N8N_LEADS_WEBHOOK_URL;
    if (n8nWebhookUrl) {
      fetch(n8nWebhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, country, source, locale, timestamp: new Date().toISOString() }),
      }).catch((err) => console.warn('n8n webhook failed:', err));
    }
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('subscribe error:', err);
    return NextResponse.json({ error: 'server_error' }, { status: 500 });
  }
}

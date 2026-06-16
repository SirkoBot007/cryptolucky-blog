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
      console.error('[subscribe] Notion credentials missing');
      return NextResponse.json({ error: 'config_error' }, { status: 500 });
    }

    const emailLower = email.toLowerCase();
    const searchRes = await fetch(
      `https://api.notion.com/v1/databases/${LEADS_DATABASE_ID}/query`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${NOTION_API_KEY}`,
          'Notion-Version': '2022-06-28',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          filter: {
            property: 'Email',
            email: { equals: emailLower },
          },
        }),
      }
    );

    if (searchRes.ok) {
      const searchData = await searchRes.json();
      if (searchData.results?.length > 0) {
        return NextResponse.json({ error: 'already_subscribed' }, { status: 409 });
      }
    }

    const notionProperties: Record<string, unknown> = {
      Email: { email: emailLower },
      Fuente: { select: { name: source || 'inline' } },
      Idioma: { select: { name: locale || 'es' } },
      Estado: { select: { name: 'Nuevo' } },
      Fecha: { date: { start: new Date().toISOString() } },
    };

    if (country) {
      notionProperties['País'] = { select: { name: country } };
    }

    const createRes = await fetch('https://api.notion.com/v1/pages', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${NOTION_API_KEY}`,
        'Notion-Version': '2022-06-28',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        parent: { database_id: LEADS_DATABASE_ID },
        properties: notionProperties,
      }),
    });

    if (!createRes.ok) {
      const errData = await createRes.json();
      console.error('[subscribe] Notion create error:', errData);
      return NextResponse.json({ error: 'notion_error' }, { status: 500 });
    }

    const resendApiKey = process.env.RESEND_API_KEY;
    if (resendApiKey) {
      const isEs = (locale || 'es') === 'es';

      const welcomeHtml = '<!DOCTYPE html><html><head><meta charset="utf-8"></head>' +
        '<body style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#0f172a;color:#f1f5f9;padding:24px">' +
        '<h1 style="color:#f59e0b">CryptoLucky</h1>' +
        '<h2>Bienvenido' + (isEs ? '/a' : '') + ' a CryptoLucky!</h2>' +
        '<p>Ya estas suscrito a las alertas de bonos exclusivos de BetFury.</p>' +
        '<p style="font-size:28px;font-weight:900;color:#f59e0b">LUCKYSIRKO007</p>' +
        '<p>Bono de bienvenida hasta 590% + Free Spins</p>' +
        '<a href="https://betfury.io/?r=LUCKYSIRKO007" style="display:block;background:#f59e0b;color:white;text-decoration:none;text-align:center;padding:16px;border-radius:10px;font-weight:900">Reclamar mi bono en BetFury</a>' +
        '</body></html>';

      fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${resendApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'CryptoLucky <noreply@cryptoluckyguia.com>',
          to: [emailLower],
          subject: 'Tu codigo de bienvenida BetFury esta aqui',
          html: welcomeHtml,
          tags: [{ name: 'source', value: source || 'inline' }],
        }),
      }).catch((err) => console.warn('[subscribe] Resend welcome email error:', err));

      fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${resendApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'CryptoLucky <noreply@cryptoluckyguia.com>',
          to: ['albertolm822@gmail.com'],
          subject: `Nuevo lead: ${emailLower}`,
          html: `<p>Nuevo suscriptor: ${emailLower}</p><p>Pais: ${country || 'No especificado'}</p>`,
        }),
      }).catch((err) => console.warn('[subscribe] Resend admin notification error:', err));
    } else {
      console.warn('[subscribe] RESEND_API_KEY not set -- email not sent for:', emailLower);
    }

    const n8nWebhookUrl = process.env.N8N_LEADS_WEBHOOK_URL;
    if (n8nWebhookUrl) {
      fetch(n8nWebhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: emailLower, country, source, locale, timestamp: new Date().toISOString() }),
      }).catch((err) => console.warn('[subscribe] n8n webhook error:', err));
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[subscribe] Unexpected error:', err);
    return NextResponse.json({ error: 'server_error' }, { status: 500 });
  }
}

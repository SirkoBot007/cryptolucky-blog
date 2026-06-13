import { NextRequest, NextResponse } from 'next/server';

/**
 * ONE-TIME BOOTSTRAP ENDPOINT
 * Creates the "CryptoLucky Leads" database in Notion.
 * Call once to get the DB ID, then add NOTION_LEADS_DATABASE_ID to Vercel env vars.
 * Protected by a simple secret to prevent accidental calls.
 *
 * Usage: GET /api/create-notion-db?secret=cryptolucky2026
 */

const NOTION_KEY = process.env.NOTION_API_KEY ?? '';
const BOOTSTRAP_SECRET = 'cryptolucky2026';

export async function GET(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get('secret');

  if (secret !== BOOTSTRAP_SECRET) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }

  if (!NOTION_KEY) {
    return NextResponse.json({ error: 'NOTION_API_KEY not set in env' }, { status: 500 });
  }

  try {
    // Create the CryptoLucky Leads database directly in the workspace
    const newDbBody = {
      parent: { type: 'workspace', workspace: true },
      icon: { type: 'emoji', emoji: '\u{1F4CB}' },
      title: [{ type: 'text', text: { content: 'CryptoLucky Leads' } }],
      properties: {
        Nombre: { title: {} },
        Email: { email: {} },
        'Pa\u00EDs': {
          select: {
            options: [
              { name: 'MX', color: 'green' },
              { name: 'CO', color: 'yellow' },
              { name: 'AR', color: 'blue' },
              { name: 'PE', color: 'red' },
              { name: 'CL', color: 'pink' },
              { name: 'VE', color: 'orange' },
              { name: 'OTHER', color: 'gray' },
            ],
          },
        },
        Fuente: {
          select: {
            options: [
              { name: 'homepage', color: 'blue' },
              { name: 'exit-intent', color: 'orange' },
              { name: 'inline', color: 'green' },
              { name: 'sticky', color: 'yellow' },
              { name: 'article', color: 'purple' },
            ],
          },
        },
        Idioma: {
          select: {
            options: [
              { name: 'es', color: 'blue' },
              { name: 'en', color: 'green' },
            ],
          },
        },
        Estado: {
          select: {
            options: [
              { name: 'Nuevo', color: 'yellow' },
              { name: 'Email enviado', color: 'green' },
              { name: 'Baja', color: 'red' },
            ],
          },
        },
        Fecha: { date: {} },
      },
    };

    const createRes = await fetch('https://api.notion.com/v1/databases', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${NOTION_KEY}`,
        'Notion-Version': '2022-06-28',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newDbBody),
    });

    if (!createRes.ok) {
      const err = await createRes.json();
      return NextResponse.json({ error: 'Failed to create database', details: err }, { status: 500 });
    }

    const newDb = await createRes.json();

    return NextResponse.json({
      success: true,
      message: '\u2705 Database created! Copy the database_id and add it to Vercel env vars as NOTION_LEADS_DATABASE_ID',
      database_id: newDb.id,
      database_url: newDb.url,
      next_step: `Go to Vercel \u2192 Settings \u2192 Environment Variables \u2192 Add: NOTION_LEADS_DATABASE_ID = ${newDb.id}`,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: 'Server error', details: message }, { status: 500 });
  }
}

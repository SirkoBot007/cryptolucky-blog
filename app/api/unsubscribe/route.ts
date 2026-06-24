import { NextRequest, NextResponse } from 'next/server';
import { verifyUnsub } from '@/lib/unsubscribe';

const NOTION_API_KEY = process.env.NOTION_API_KEY ?? '';
const LEADS_DATABASE_ID = process.env.NOTION_LEADS_DATABASE_ID ?? '';

// Marca el lead como "Baja" en Notion (best-effort, no rompe la confirmación).
async function markUnsubscribed(email: string): Promise<void> {
  if (!NOTION_API_KEY || !LEADS_DATABASE_ID) return;
  try {
    const q = await fetch(
      `https://api.notion.com/v1/databases/${LEADS_DATABASE_ID}/query`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${NOTION_API_KEY}`,
          'Notion-Version': '2022-06-28',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ filter: { property: 'Email', email: { equals: email } } }),
      }
    );
    if (!q.ok) return;
    const data = await q.json();
    const page = data.results?.[0];
    if (!page?.id) return;
    await fetch(`https://api.notion.com/v1/pages/${page.id}`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${NOTION_API_KEY}`,
        'Notion-Version': '2022-06-28',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ properties: { Estado: { select: { name: 'Baja' } } } }),
    });
  } catch (err) {
    console.warn('[unsubscribe] notion update failed:', err);
  }
}

function confirmationPage(email: string): string {
  return `<!DOCTYPE html><html lang="es"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1"><title>Baja confirmada · CryptoLucky</title>
<meta name="robots" content="noindex"></head>
<body style="margin:0;font-family:-apple-system,Segoe UI,Roboto,Arial,sans-serif;background:#f4f5f7;color:#0f172a;">
<div style="max-width:480px;margin:64px auto;background:#fff;border:1px solid #e6e8ec;border-radius:14px;padding:32px;text-align:center;">
<div style="font-size:22px;font-weight:800;">🍀 CryptoLucky</div>
<h1 style="font-size:20px;margin:18px 0 8px;">Te has dado de baja</h1>
<p style="color:#475569;font-size:15px;line-height:1.6;">Hemos eliminado <strong>${email}</strong> de la lista. No recibirás más correos.</p>
<p style="color:#94a3b8;font-size:13px;line-height:1.6;">¿Fue un error? Puedes volver a suscribirte cuando quieras en
<a href="https://cryptoluckyguia.com" style="color:#ea580c;text-decoration:none;">cryptoluckyguia.com</a>.</p>
</div></body></html>`;
}

async function handle(req: NextRequest): Promise<NextResponse> {
  const { searchParams } = new URL(req.url);
  const email = (searchParams.get('e') || '').toLowerCase().trim();
  const token = searchParams.get('t') || '';

  if (!verifyUnsub(email, token)) {
    return new NextResponse('Enlace de baja inválido o caducado.', {
      status: 400,
      headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    });
  }
  await markUnsubscribed(email);
  return new NextResponse(confirmationPage(email), {
    status: 200,
    headers: { 'Content-Type': 'text/html; charset=utf-8' },
  });
}

// Enlace en el pie (clic del usuario)
export async function GET(req: NextRequest) {
  return handle(req);
}

// One-Click de Gmail/Yahoo (List-Unsubscribe-Post): responde 200 simple
export async function POST(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const email = (searchParams.get('e') || '').toLowerCase().trim();
  const token = searchParams.get('t') || '';
  if (!verifyUnsub(email, token)) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
  await markUnsubscribed(email);
  return NextResponse.json({ ok: true });
}

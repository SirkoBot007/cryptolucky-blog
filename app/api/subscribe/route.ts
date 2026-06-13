import { NextRequest, NextResponse } from 'next/server';

// ID de la base de datos de leads en Notion
// Crear en Notion: "CryptoLucky Leads" con campos: Email, Nombre, PaÃ­s, Fuente, Idioma, Estado, Fecha
// Luego aÃ±adir el ID aquÃ­ o en Vercel env vars
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

    // Verificar si ya existe este email en Notion
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
            email: { equals: email },
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

    // Crear nuevo lead en Notion
    const createRes = await fetch('https://api.notion.com/v1/pages', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${NOTION_API_KEY}`,
        'Notion-Version': '2022-06-28',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        parent: { database_id: LEADS_DATABASE_ID },
        properties: {
          Email: {
            email: email,
          },
          'PaÃ­s': {
            select: country ? { name: country } : undefined,
          },
          Fuente: {
            select: { name: source || 'inline' },
          },
          Idioma: {
            select: { name: locale || 'es' },
          },
          Estado: {
            select: { name: 'Nuevo' },
          },
          Fecha: {
            date: { start: new Date().toISOString() },
          },
        },
      }),
    });

    if (!createRes.ok) {
      const errData = await createRes.json();
      console.error('Notion create error:', errData);
      return NextResponse.json({ error: 'notion_error' }, { status: 500 });
    }

    // âââ Enviar email de bienvenida con Resend ââââââââââââââââââââââââââââââââââââââââââ
    // Para activar: aÃ±ade RESEND_API_KEY en Vercel â Settings â Environment Variables
    // ObtÃ©n tu API key gratis en resend.com (3.000 emails/mes gratis)
    const resendApiKey = process.env.RESEND_API_KEY;
    if (resendApiKey) {
      const welcomeHtml = `<!DOCTYPE html>
<html><head><meta charset="utf-8"></head>
<body style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#0f172a;color:#f1f5f9;padding:24px">
  <div style="text-align:center;margin-bottom:24px">
    <h1 style="color:#f59e0b;font-size:32px;margin:0">\U0001f340 CryptoLucky</h1>
    <p style="color:#94a3b8;margin-top:4px;font-size:14px">Tu guÃ­a de casino cripto</p>
  </div>
  <div style="background:#1e293b;border-radius:12px;padding:28px;margin-bottom:20px">
    <h2 style="color:#f1f5f9;margin-top:0">\U0001f381 Â¡Bienvenido${locale === 'en' ? '' : '/a'} a CryptoLucky!</h2>
    <p style="color:#94a3b8;line-height:1.6">Ya estÃ¡s suscrito${locale === 'en' ? '' : '/a'} a las alertas de bonos exclusivos de BetFury. AquÃ­ tienes tu primer regalo:</p>
    <div style="background:#0f172a;border-radius:8px;padding:20px;text-align:center;margin:20px 0;border:1px solid rgba(245,158,11,0.3)">
      <p style="color:#94a3b8;margin:0 0 8px 0;font-size:13px">\U0001f3b0 Tu cÃ³digo de bienvenida exclusivo</p>
      <p style="color:#f59e0b;font-size:28px;font-weight:900;letter-spacing:0.12em;margin:0">LUCKYSIRKO007</p>
      <p style="color:#64748b;margin:8px 0 0 0;font-size:12px">Bono de bienvenida hasta 590% + Free Spins</p>
    </div>
    <a href="https://betfury.io/?r=LUCKYSIRKO007"
       style="display:block;background:#f59e0b;color:white;text-decoration:none;text-align:center;padding:16px;border-radius:10px;font-weight:900;font-size:17px;margin-top:20px">
      \U0001f3b0 Reclamar mi bono en BetFury â
    </a>
  </div>
  <div style="background:#1e293b;border-radius:12px;padding:20px;margin-bottom:20px">
    <h3 style="color:#f1f5f9;margin-top:0;font-size:16px">\U0001f4ec QuÃ© recibirÃ¡s en tu email:</h3>
    <ul style="color:#94a3b8;padding-left:20px;line-height:1.8;margin:0">
      <li>Alertas de bonos sin depÃ³sito de BetFury</li>
      <li>GuÃ­as de estrategia y trucos exclusivos</li>
      <li>Novedades sobre free spins y promociones VIP</li>
    </ul>
  </div>
  <p style="color:#475569;font-size:11px;text-align:center;line-height:1.6">
    Puedes darte de baja en cualquier momento respondiendo BAJA a este email.<br>
    CryptoLucky Â· <a href="https://cryptoluckyguia.com" style="color:#f59e0b">cryptoluckyguia.com</a>
  </p>
</body></html>`;

      fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${resendApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'CryptoLucky <onboarding@resend.dev>',
          to: [email],
          subject: '\U0001f381 Tu cÃ³digo de bienvenida BetFury estÃ¡ aquÃ­',
          html: welcomeHtml,
          tags: [{ name: 'source', value: source || 'inline' }],
        }),
      }).catch((err) => console.warn('Resend welcome email failed (non-critical):', err));

      // NotificaciÃ³n al admin
      fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${resendApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'CryptoLucky <onboarding@resend.dev>',
          to: ['albertolm822@gmail.com'],
          subject: `\U0001f195 Nuevo lead: ${email}`,
          html: `<p>Nuevo suscriptor en CryptoLucky:</p>
<ul>
  <li><b>Email:</b> ${email}</li>
  <li><b>PaÃ­s:</b> ${country || 'No especificado'}</li>
  <li><b>Fuente:</b> ${source || 'inline'}</li>
  <li><b>Idioma:</b> ${locale || 'es'}</li>
  <li><b>Fecha:</b> ${new Date().toLocaleString('es-ES')}</li>
</ul>
<p><a href="https://www.notion.so">Ver en Notion â</a></p>`,
        }),
      }).catch((err) => console.warn('Resend admin notification failed (non-critical):', err));
    }

    // Trigger n8n webhook (si estÃ¡ configurado)
    const n8nWebhookUrl = process.env.N8N_LEADS_WEBHOOK_URL;
    if (n8nWebhookUrl) {
      fetch(n8nWebhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, country, source, locale, timestamp: new Date().toISOString() }),
      }).catch((err) => console.warn('n8n webhook failed (non-critical):', err));
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('subscribe error:', err);
    return NextResponse.json({ error: 'server_error' }, { status: 500 });
  }
}

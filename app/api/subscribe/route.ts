import { NextRequest, NextResponse } from 'next/server';

const LEADS_DATABASE_ID = process.env.NOTION_LEADS_DATABASE_ID ?? '';
const NOTION_API_KEY = process.env.NOTION_API_KEY ?? '';
const ADMIN_EMAIL = process.env.ADMIN_NOTIFICATION_EMAIL ?? 'sirkokoloko007@gmail.com';

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

    // Verificar si ya existe este email en Notion (case-insensitive via lowercase)
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

    // Construir propiedades para Notion
    const notionProperties: Record<string, unknown> = {
      Email: { email: emailLower },
      Fuente: { select: { name: source || 'inline' } },
      Idioma: { select: { name: locale || 'es' } },
      Estado: { select: { name: 'Nuevo' } },
      Fecha: { date: { start: new Date().toISOString() } },
    };

    // Solo añadir País si hay valor
    if (country) {
      notionProperties['País'] = { select: { name: country } };
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
        properties: notionProperties,
      }),
    });

    if (!createRes.ok) {
      const errData = await createRes.json();
      console.error('[subscribe] Notion create error:', errData);
      return NextResponse.json({ error: 'notion_error' }, { status: 500 });
    }

    // -- Enviar emails con Resend (await + logging para detectar errores) ----------
    const resendApiKey = process.env.RESEND_API_KEY;
    if (resendApiKey) {
      const isEs = (locale || 'es') === 'es';

      const welcomeHtml = `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width"></head>
<body style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#0f172a;color:#f1f5f9;padding:24px">
  <div style="text-align:center;margin-bottom:24px">
    <h1 style="color:#f59e0b;font-size:32px;margin:0">🍀 CryptoLucky</h1>
    <p style="color:#94a3b8;margin-top:4px;font-size:14px">Tu guía de casino cripto</p>
  </div>
  <div style="background:#1e293b;border-radius:12px;padding:28px;margin-bottom:20px">
    <h2 style="color:#f1f5f9;margin-top:0">🎁 ¡Bienvenido${isEs ? '/a' : ''} a CryptoLucky!</h2>
    <p style="color:#94a3b8;line-height:1.6">
      Ya estás suscrito${isEs ? '/a' : ''} a las alertas de bonos exclusivos de BetFury.
      Aquí tienes tu primer regalo:
    </p>
    <div style="background:#0f172a;border-radius:8px;padding:20px;text-align:center;margin:20px 0;border:1px solid rgba(245,158,11,0.3)">
      <p style="color:#94a3b8;margin:0 0 8px 0;font-size:13px">🎰 Tu código de bienvenida exclusivo</p>
      <p style="color:#f59e0b;font-size:28px;font-weight:900;letter-spacing:0.12em;margin:0">LUCKYSIRKO007</p>
      <p style="color:#64748b;margin:8px 0 0 0;font-size:12px">Bono de bienvenida hasta 590% + Free Spins</p>
    </div>
    <a href="https://betfury.io/?r=LUCKYSIRKO007"
       style="display:block;background:#f59e0b;color:white;text-decoration:none;text-align:center;padding:16px;border-radius:10px;font-weight:900;font-size:17px;margin-top:20px">
      🎰 Reclamar mi bono en BetFury →
    </a>
  </div>
  <div style="background:#1e293b;border-radius:12px;padding:20px;margin-bottom:20px">
    <h3 style="color:#f1f5f9;margin-top:0;font-size:16px">📬 Qué recibirás en tu email:</h3>
    <ul style="color:#94a3b8;padding-left:20px;line-height:1.8;margin:0">
      <li>Alertas de bonos sin depósito de BetFury</li>
      <li>Guías de estrategia y trucos exclusivos</li>
      <li>Novedades sobre free spins y promociones VIP</li>
    </ul>
  </div>
  <p style="color:#475569;font-size:11px;text-align:center;line-height:1.6">
    Puedes darte de baja en cualquier momento respondiendo BAJA a este email.<br>
    CryptoLucky · <a href="https://cryptoluckyguia.com" style="color:#f59e0b">cryptoluckyguia.com</a>
  </p>
</body>
</html>`;

      // Email de bienvenida al suscriptor (await + logging)
      try {
        const welcomeRes = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${resendApiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: 'CryptoLucky <noreply@cryptoluckyguia.com>',
            to: [emailLower],
            subject: '🎁 Tu código de bienvenida BetFury está aquí',
            html: welcomeHtml,
            tags: [{ name: 'source', value: source || 'inline' }],
          }),
        });
        if (!welcomeRes.ok) {
          const errBody = await welcomeRes.text();
          console.error('[subscribe] Resend welcome email failed:', welcomeRes.status, errBody);
        } else {
          console.log('[subscribe] Welcome email sent to:', emailLower);
        }
      } catch (err) {
        console.error('[subscribe] Resend welcome email exception:', err);
      }

      // Notificación al admin — ADMIN_EMAIL (sirkokoloko007@gmail.com por defecto)
      try {
        const adminRes = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${resendApiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: 'CryptoLucky <noreply@cryptoluckyguia.com>',
            to: [ADMIN_EMAIL],
            subject: `🆕 Nuevo lead: ${emailLower}`,
            html: `<p>Nuevo suscriptor en CryptoLucky:</p>
<ul>
  <li><b>Email:</b> ${emailLower}</li>
  <li><b>País:</b> ${country || 'No especificado'}</li>
  <li><b>Fuente:</b> ${source || 'inline'}</li>
  <li><b>Idioma:</b> ${locale || 'es'}</li>
  <li><b>Fecha:</b> ${new Date().toLocaleString('es-ES')}</li>
</ul>
<p><a href="https://www.notion.so">Ver en Notion →</a></p>`,
          }),
        });
        if (!adminRes.ok) {
          const errBody = await adminRes.text();
          console.error('[subscribe] Resend admin notification failed:', adminRes.status, errBody);
        } else {
          console.log('[subscribe] Admin notification sent to:', ADMIN_EMAIL);
        }
      } catch (err) {
        console.error('[subscribe] Resend admin notification exception:', err);
      }
    } else {
      console.warn('[subscribe] RESEND_API_KEY not set — email not sent for:', emailLower);
    }

    // Trigger n8n webhook (si está configurado)
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

import { NextRequest, NextResponse } from 'next/server';
import { EMAIL_SEQUENCE } from '@/lib/email-sequences';

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

      const BASE = 'https://cryptoluckyguia.com';
      // Email de bienvenida PROFESIONAL: valor primero (guías útiles), diseño claro
      // y sin disparadores de spam (sin "590%/free spins/reclamar bono" destacados).
      const welcomeHtml = `<!DOCTYPE html>
<html lang="${isEs ? 'es' : 'en'}">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f4f5f7;font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;">
  <div style="display:none;max-height:0;overflow:hidden;color:#f4f5f7;">${isEs ? 'Bienvenido a CryptoLucky. Por dónde empezar con BetFury de forma segura.' : 'Welcome to CryptoLucky. How to get started with BetFury safely.'}</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f4f5f7;padding:24px 0;">
    <tr><td align="center">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border-radius:14px;overflow:hidden;border:1px solid #e6e8ec;">
        <tr><td style="padding:28px 32px 8px;">
          <span style="font-size:20px;font-weight:800;color:#0f172a;">🍀 CryptoLucky</span>
          <span style="font-size:13px;color:#64748b;"> · ${isEs ? 'Guía de casinos cripto' : 'Crypto casino guide'}</span>
        </td></tr>
        <tr><td style="padding:8px 32px 0;">
          <h1 style="font-size:22px;color:#0f172a;margin:16px 0 8px;">${isEs ? '¡Bienvenido a CryptoLucky! 👋' : 'Welcome to CryptoLucky! 👋'}</h1>
          <p style="font-size:15px;line-height:1.6;color:#334155;margin:0 0 16px;">
            ${isEs
              ? 'Gracias por unirte. Somos la guía en español de referencia sobre BetFury y casinos cripto en Latinoamérica: analizamos las plataformas de verdad, probando depósitos, retiros y bonos para que tú no te lleves sorpresas.'
              : 'Thanks for joining. We are the leading Spanish-language guide on BetFury and crypto casinos in Latin America: we review platforms hands-on so you do not get surprises.'}
          </p>
          <p style="font-size:13px;font-weight:700;color:#0f172a;text-transform:uppercase;letter-spacing:.04em;margin:24px 0 10px;">${isEs ? 'Por dónde empezar' : 'Where to start'}</p>
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
            <tr><td style="padding:8px 0;border-bottom:1px solid #eef0f3;">
              <a href="${BASE}/es/blog/betfury-seguro-es-legitimo-licencia" style="color:#0f172a;text-decoration:none;font-weight:600;font-size:15px;">${isEs ? '¿Es BetFury seguro y legítimo?' : 'Is BetFury safe and legit?'}</a>
              <div style="color:#64748b;font-size:13px;">${isEs ? 'Licencia, garantías y qué mirar antes de registrarte.' : 'License, guarantees and what to check first.'}</div>
            </td></tr>
            <tr><td style="padding:8px 0;border-bottom:1px solid #eef0f3;">
              <a href="${BASE}/es/blog/betfury-bono-bienvenida-590" style="color:#0f172a;text-decoration:none;font-weight:600;font-size:15px;">${isEs ? 'Cómo aprovechar el bono de bienvenida' : 'How to use the welcome bonus'}</a>
              <div style="color:#64748b;font-size:13px;">${isEs ? 'Paso a paso, sin letra pequeña.' : 'Step by step, no fine print.'}</div>
            </td></tr>
            <tr><td style="padding:8px 0;">
              <a href="${BASE}/es/blog/betfury-staking-bfg-dividendos" style="color:#0f172a;text-decoration:none;font-weight:600;font-size:15px;">${isEs ? 'Staking de BFG: dividendos diarios' : 'BFG staking: daily dividends'}</a>
              <div style="color:#64748b;font-size:13px;">${isEs ? 'Cómo generar ingresos pasivos en cripto.' : 'How to earn passive crypto income.'}</div>
            </td></tr>
          </table>
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:24px 0 8px;">
            <tr><td style="background:#fff7ed;border:1px solid #fed7aa;border-radius:10px;padding:16px 18px;">
              <p style="margin:0 0 4px;font-size:14px;color:#9a3412;font-weight:700;">${isEs ? '¿Vas a probar BetFury?' : 'Trying BetFury?'}</p>
              <p style="margin:0 0 12px;font-size:13px;color:#7c2d12;line-height:1.5;">${isEs ? 'Si te registras con nuestro código tu bono de bienvenida es mayor. Es totalmente opcional y sin coste para ti.' : 'Sign up with our code for a bigger welcome bonus. Fully optional and free for you.'}</p>
              <p style="margin:0 0 12px;font-size:13px;color:#7c2d12;">${isEs ? 'Código:' : 'Code:'} <strong style="letter-spacing:.08em;">LUCKYSIRKO007</strong></p>
              <a href="https://betfury.io/?r=LUCKYSIRKO007" style="display:inline-block;background:#ea580c;color:#ffffff;text-decoration:none;font-weight:700;font-size:14px;padding:10px 18px;border-radius:8px;">${isEs ? 'Ir a BetFury →' : 'Go to BetFury →'}</a>
            </td></tr>
          </table>
        </td></tr>
        <tr><td style="padding:20px 32px 28px;border-top:1px solid #eef0f3;">
          <p style="margin:0 0 6px;font-size:12px;color:#94a3b8;line-height:1.6;">
            ${isEs ? 'Recibes este email porque te suscribiste en' : 'You receive this because you subscribed at'} <a href="${BASE}" style="color:#ea580c;text-decoration:none;">cryptoluckyguia.com</a>.
          </p>
          <p style="margin:0;font-size:11px;color:#b0b7c3;line-height:1.6;">
            ${isEs ? 'Para dejar de recibir, responde con BAJA. Contenido informativo. Juega con responsabilidad. +18.' : 'To unsubscribe, reply UNSUBSCRIBE. Informational content. Gamble responsibly. 18+.'}
          </p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;

      const welcomeText = (isEs
        ? `Bienvenido a CryptoLucky\n\nGracias por unirte. Somos la guía en español de referencia sobre BetFury y casinos cripto en Latinoamérica.\n\nPor dónde empezar:\n- ¿Es BetFury seguro y legítimo? ${BASE}/es/blog/betfury-seguro-es-legitimo-licencia\n- Cómo aprovechar el bono de bienvenida: ${BASE}/es/blog/betfury-bono-bienvenida-590\n- Staking de BFG (dividendos diarios): ${BASE}/es/blog/betfury-staking-bfg-dividendos\n\n¿Vas a probar BetFury? Con el código LUCKYSIRKO007 tu bono es mayor (opcional, sin coste): https://betfury.io/?r=LUCKYSIRKO007\n\nRecibes este email porque te suscribiste en cryptoluckyguia.com. Para dejar de recibir, responde con BAJA. Juega con responsabilidad. +18.`
        : `Welcome to CryptoLucky\n\nThanks for joining. We are the leading Spanish-language guide on BetFury and crypto casinos in Latin America.\n\nWhere to start:\n- Is BetFury safe and legit? ${BASE}/es/blog/betfury-seguro-es-legitimo-licencia\n- How to use the welcome bonus: ${BASE}/es/blog/betfury-bono-bienvenida-590\n- BFG staking (daily dividends): ${BASE}/es/blog/betfury-staking-bfg-dividendos\n\nTrying BetFury? With code LUCKYSIRKO007 your bonus is bigger (optional, free): https://betfury.io/?r=LUCKYSIRKO007\n\nYou receive this because you subscribed at cryptoluckyguia.com. To unsubscribe, reply UNSUBSCRIBE. Gamble responsibly. 18+.`);

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
            subject: isEs ? 'Bienvenido a CryptoLucky 🍀 — por dónde empezar' : 'Welcome to CryptoLucky 🍀 — getting started',
            html: welcomeHtml,
            text: welcomeText,
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

    // -- Programar secuencia drip (emails #2-5 via Resend scheduledAt) --------
    if (resendApiKey) {
      const FROM = 'CryptoLucky <noreply@cryptoluckyguia.com>';
      for (const step of EMAIL_SEQUENCE) {
        const scheduledAt = new Date(
          Date.now() + step.delayDays * 24 * 60 * 60 * 1000
        ).toISOString();
        fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${resendApiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: FROM,
            to: [emailLower],
            subject: step.subject,
            html: step.getHtml(),
            scheduledAt,
            tags: [
              { name: 'sequence', value: 'drip' },
              { name: 'source', value: source || 'inline' },
            ],
          }),
        }).catch((err) => console.warn('[subscribe] drip schedule error:', err));
      }
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

import { NextRequest, NextResponse } from 'next/server';
import { EMAIL_SEQUENCE, PDF_URL } from '@/lib/email-sequences';
import { unsubUrl, unsubHeaders } from '@/lib/unsubscribe';

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
      const unsub = unsubUrl(emailLower);

      // EMAIL 1 (día 0) — Bienvenida + entrega del PDF (lead magnet). Valor primero,
      // CTA = descarga del PDF (NO el enlace de afiliado), disclosure + baja en 1 clic.
      const welcomeHtml = `<!DOCTYPE html>
<html lang="${isEs ? 'es' : 'en'}">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f4f5f7;font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;">
  <div style="display:none;max-height:0;overflow:hidden;color:#f4f5f7;">${isEs ? 'Tu PDF de bienvenida + por dónde empezar. Sin humo, lo prometido.' : 'Your welcome PDF + where to start.'}</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f4f5f7;padding:24px 0;">
    <tr><td align="center">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border-radius:14px;overflow:hidden;border:1px solid #e6e8ec;">
        <tr><td style="padding:28px 32px 4px;">
          <span style="font-size:20px;font-weight:800;color:#0f172a;">🍀 CryptoLucky</span>
        </td></tr>
        <tr><td style="padding:8px 32px 0;">
          <h1 style="font-size:22px;color:#0f172a;margin:14px 0 10px;">${isEs ? 'Tu guía gratis está aquí 🍀' : 'Your free guide is here 🍀'}</h1>
          <p style="font-size:15px;line-height:1.6;color:#334155;margin:0 0 14px;">
            ${isEs
              ? 'Hola: soy Sirko007, el que está detrás de CryptoLucky. Gracias por apuntarte. Lo primero, lo prometido: aquí tienes tu <strong>Guía de bienvenida — “Cómo entender los bonos de BetFury sin perder dinero”</strong>. Es corta, directa y pensada para que decidas mejor, no para venderte nada.'
              : 'Hi, I am Sirko007, the person behind CryptoLucky. Thanks for joining. First, as promised, here is your <strong>welcome guide — “How to understand BetFury bonuses without losing money”</strong>. Short, direct and made to help you decide, not to sell you anything.'}
          </p>
          <p style="margin:2px 0 18px;">
            <a href="${PDF_URL}" style="display:inline-block;background:#ea580c;color:#ffffff;text-decoration:none;font-weight:700;font-size:15px;padding:12px 22px;border-radius:8px;">${isEs ? 'Descargar la guía (PDF) →' : 'Download the guide (PDF) →'}</a>
          </p>
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f8fafc;border:1px solid #eef0f3;border-radius:10px;margin:0 0 16px;">
            <tr><td style="padding:14px 16px;">
              <p style="margin:0 0 8px;font-size:13px;font-weight:700;color:#0f172a;">${isEs ? 'Dentro encontrarás' : 'Inside you will find'}</p>
              <p style="margin:0;font-size:14px;color:#334155;line-height:1.7;">${isEs
                ? '• Qué es un bono de verdad (y por qué no es dinero “gratis”).<br>• El <em>rollover</em> / <em>wagering</em> explicado fácil, con un ejemplo en números.<br>• Los 5 errores que más caro se pagan.<br>• Un checklist de juego responsable para antes de cada sesión.'
                : '• What a bonus really is (and why it is not “free” money).<br>• Rollover / wagering explained simply, with a numeric example.<br>• The 5 costliest mistakes.<br>• A responsible-gambling checklist.'}</p>
            </td></tr>
          </table>
          <p style="font-size:14px;line-height:1.6;color:#334155;margin:0 0 14px;">
            ${isEs
              ? 'Algo que valoro mucho: <strong>honestidad</strong>. No te voy a prometer ganancias —nadie serio puede—; lo que sí hago es probar plataformas y contarte lo bueno y lo mejorable. Algunos enlaces son de afiliado: si te registras a través de ellos puedo llevarme una comisión sin coste extra para ti. Eso no cambia lo que te cuento.'
              : 'Something I value: <strong>honesty</strong>. I will not promise winnings — nobody serious can. Some links are affiliate links: if you sign up through them I may earn a commission at no extra cost to you. That does not change what I tell you.'}
          </p>
          <p style="font-size:14px;line-height:1.6;color:#334155;margin:0 0 14px;">
            ${isEs
              ? 'En los próximos días te mandaré un par de correos cortos y útiles. El siguiente va de lo más importante: <strong>cómo proteger tu dinero antes de jugar</strong>.'
              : 'Over the next days I will send a couple of short, useful emails. The next one is the most important: how to protect your money before playing.'}
          </p>
          <p style="font-size:14px;line-height:1.6;color:#334155;margin:0 0 6px;">${isEs ? 'Un abrazo,' : 'Cheers,'}<br>Sirko007 — CryptoLucky</p>
        </td></tr>
        <tr><td style="padding:18px 32px 26px;border-top:1px solid #eef0f3;">
          <p style="margin:0 0 6px;font-size:12px;color:#94a3b8;line-height:1.6;">${isEs ? 'Recibes este email porque te suscribiste en' : 'You receive this because you subscribed at'} <a href="${BASE}" style="color:#ea580c;text-decoration:none;">cryptoluckyguia.com</a>.</p>
          <p style="margin:0 0 8px;font-size:12px;color:#94a3b8;line-height:1.6;"><a href="${unsub}" style="color:#94a3b8;text-decoration:underline;">${isEs ? 'Darte de baja en 1 clic' : 'Unsubscribe in 1 click'}</a></p>
          <p style="margin:0;font-size:11px;color:#b0b7c3;line-height:1.6;">${isEs ? 'Solo +18. Juega con responsabilidad. Si el juego deja de ser diversión, busca ayuda (Coljuegos · MINCETUR).' : 'Only 18+. Gamble responsibly.'}</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;

      const welcomeText = (isEs
        ? `Tu guía gratis está aquí\n\nSoy Sirko007, detrás de CryptoLucky. Gracias por apuntarte. Lo prometido: tu Guía de bienvenida "Cómo entender los bonos de BetFury sin perder dinero".\n\nDescargar la guía (PDF): ${PDF_URL}\n\nDentro: qué es un bono de verdad, el rollover/wagering con ejemplo, los 5 errores más caros y un checklist de juego responsable.\n\nValoro la honestidad: no prometo ganancias. Algunos enlaces son de afiliado (sin coste extra para ti).\n\nEn los próximos días, un par de correos útiles. El siguiente: cómo proteger tu dinero antes de jugar.\n\nDarte de baja en 1 clic: ${unsub}\nSolo +18. Juega con responsabilidad (Coljuegos / MINCETUR).`
        : `Your free guide is here\n\nI am Sirko007, behind CryptoLucky. As promised, your welcome guide "How to understand BetFury bonuses without losing money".\n\nDownload the guide (PDF): ${PDF_URL}\n\nInside: what a bonus really is, rollover/wagering with an example, the 5 costliest mistakes and a responsible-gambling checklist.\n\nSome links are affiliate links (no extra cost to you).\n\nUnsubscribe in 1 click: ${unsub}\nOnly 18+. Gamble responsibly.`);

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
            subject: isEs ? 'Tu guía gratis está aquí 🍀 (cómo entender los bonos sin perder dinero)' : 'Your free guide is here 🍀',
            html: welcomeHtml,
            text: welcomeText,
            headers: unsubHeaders(emailLower),
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

    // -- Programar secuencia drip (día 2/4/7 via Resend scheduled_at) ----------
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
            html: step.getHtml(emailLower),
            text: step.getText(emailLower),
            headers: unsubHeaders(emailLower),
            // API REST de Resend espera snake_case; con camelCase lo ignoraba
            // y enviaba todo el drip de golpe (a la vez = spam).
            scheduled_at: scheduledAt,
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

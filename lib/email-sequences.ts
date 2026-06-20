// ============================================================
// EMAIL DRIP SEQUENCE — CryptoLucky x BetFury
// 4 emails a lo largo de 20 dias. Diseño claro y profesional
// (consistente con el email de bienvenida), valor primero y
// SIN disparadores de spam (sin "590%/free spins/reclamar bono"
// destacados, sin barras de urgencia rojas). Incluye version
// texto plano (text/plain) para mejorar la entregabilidad.
// ============================================================

const AFFILIATE_LINK = 'https://betfury.io/?r=LUCKYSIRKO007';
const SITE_URL = 'https://cryptoluckyguia.com';

// Wrapper claro y profesional (mismo estilo que el email de bienvenida)
function wrap(preheader: string, inner: string): string {
  return `<!DOCTYPE html>
<html lang="es">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f4f5f7;font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;">
  <div style="display:none;max-height:0;overflow:hidden;color:#f4f5f7;">${preheader}</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f4f5f7;padding:24px 0;">
    <tr><td align="center">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border-radius:14px;overflow:hidden;border:1px solid #e6e8ec;">
        <tr><td style="padding:24px 32px 4px;">
          <a href="${SITE_URL}" style="text-decoration:none;"><span style="font-size:19px;font-weight:800;color:#0f172a;">🍀 CryptoLucky</span></a>
        </td></tr>
        ${inner}
        <tr><td style="padding:20px 32px 26px;border-top:1px solid #eef0f3;">
          <p style="margin:0 0 6px;font-size:12px;color:#94a3b8;line-height:1.6;">Recibes este email porque te suscribiste en <a href="${SITE_URL}" style="color:#ea580c;text-decoration:none;">cryptoluckyguia.com</a>.</p>
          <p style="margin:0;font-size:11px;color:#b0b7c3;line-height:1.6;">Para dejar de recibir, responde con BAJA. Contenido informativo. Juega con responsabilidad. +18.</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

// Botón sólido discreto (sin gradientes neón)
function btn(href: string, label: string): string {
  return `<a href="${href}" style="display:inline-block;background:#ea580c;color:#ffffff;text-decoration:none;font-weight:700;font-size:14px;padding:11px 20px;border-radius:8px;">${label}</a>`;
}

// Fila de enlace a artículo (valor)
function linkRow(href: string, title: string, sub: string, last = false): string {
  return `<tr><td style="padding:8px 0;${last ? '' : 'border-bottom:1px solid #eef0f3;'}">
    <a href="${href}" style="color:#0f172a;text-decoration:none;font-weight:600;font-size:15px;">${title}</a>
    <div style="color:#64748b;font-size:13px;">${sub}</div>
  </td></tr>`;
}

const eyebrow = (t: string) =>
  `<p style="font-size:12px;font-weight:700;color:#ea580c;text-transform:uppercase;letter-spacing:.05em;margin:18px 0 6px;">${t}</p>`;
const h1 = (t: string) => `<h1 style="font-size:21px;color:#0f172a;margin:6px 0 10px;line-height:1.3;">${t}</h1>`;
const p = (t: string) => `<p style="font-size:15px;line-height:1.6;color:#334155;margin:0 0 14px;">${t}</p>`;

// Caja BetFury suave y opcional (reutilizable)
function softBetFuryBox(campaign: string, intro: string): string {
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:22px 0 6px;">
    <tr><td style="background:#fff7ed;border:1px solid #fed7aa;border-radius:10px;padding:16px 18px;">
      <p style="margin:0 0 10px;font-size:13px;color:#7c2d12;line-height:1.5;">${intro}</p>
      <p style="margin:0 0 12px;font-size:13px;color:#7c2d12;">Código: <strong style="letter-spacing:.06em;">LUCKYSIRKO007</strong></p>
      ${btn(`${AFFILIATE_LINK}&utm_source=email&utm_medium=drip&utm_campaign=${campaign}`, 'Ir a BetFury →')}
    </td></tr>
  </table>`;
}

// ── EMAIL #2 — Día 2 — Staking BFG (ingresos pasivos) ──
export function getEmail2Html(): string {
  return wrap('Cómo generar ingresos pasivos con BetFury: staking de BFG explicado.', `
    <tr><td style="padding:4px 32px 0;">
      ${eyebrow('Guía')}
      ${h1('Cómo generar ingresos pasivos con BetFury')}
      ${p('La mayoría usa BetFury solo para jugar. Hay una forma menos conocida de sacarle partido: el <strong>staking de BFG</strong>, que reparte una parte de los ingresos del casino entre quienes tienen el token.')}
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f8fafc;border:1px solid #eef0f3;border-radius:10px;padding:4px 0;margin:0 0 14px;">
        <tr><td style="padding:12px 16px;">
          <p style="margin:0 0 8px;font-size:13px;font-weight:700;color:#0f172a;">Cómo funciona, en 4 pasos</p>
          <p style="margin:0;font-size:14px;color:#334155;line-height:1.7;">1. Juegas (a cualquier juego) y acumulas BFG por cada apuesta.<br>2. Haces staking de tus BFG en el pool.<br>3. Cada día recibes tu parte proporcional de los ingresos.<br>4. Los dividendos se pagan en BTC, ETH, BNB, USDT y más.</p>
        </td></tr>
      </table>
      ${p('Es la diferencia entre "gastar" y "construir": mientras juegas, vas acumulando un activo que te paga.')}
      <p style="font-size:13px;font-weight:700;color:#0f172a;text-transform:uppercase;letter-spacing:.04em;margin:22px 0 8px;">Guía completa</p>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
        ${linkRow(`${SITE_URL}/es/blog/betfury-staking-bfg-dividendos?utm_source=email&utm_medium=drip&utm_campaign=email2`, 'Staking de BFG: cómo ganar dividendos diarios', 'Paso a paso, con ejemplos reales.', true)}
      </table>
      ${softBetFuryBox('email2_staking', 'Si quieres empezar a acumular BFG, registrarte con nuestro código suma un extra de bienvenida. Opcional y sin coste para ti.')}
    </td></tr>`);
}

// ── EMAIL #3 — Día 5 — Juegos con mejor RTP ──
export function getEmail3Html(): string {
  return wrap('Los 3 juegos con mejor RTP en BetFury y por qué importan.', `
    <tr><td style="padding:4px 32px 0;">
      ${eyebrow('Datos')}
      ${h1('Los 3 juegos con mejor RTP en BetFury')}
      ${p('El RTP (Return To Player) determina cuánto devuelve un juego a largo plazo. No todos son iguales — estos tres son los más favorables:')}
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 8px;">
        <tr><td style="padding:10px 14px;background:#f8fafc;border:1px solid #eef0f3;border-radius:10px;">
          <p style="margin:0;font-size:15px;color:#0f172a;font-weight:700;">🎲 Dice — RTP 99%</p>
          <p style="margin:4px 0 0;font-size:13px;color:#64748b;">Dados con uno de los mejores RTP del mercado. Ajustas riesgo y multiplicador.</p>
        </td></tr>
      </table>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:8px 0;">
        <tr><td style="padding:10px 14px;background:#f8fafc;border:1px solid #eef0f3;border-radius:10px;">
          <p style="margin:0;font-size:15px;color:#0f172a;font-weight:700;">🚀 Crash — RTP 99%</p>
          <p style="margin:4px 0 0;font-size:13px;color:#64748b;">Retira antes de que explote el multiplicador. Con estrategia conservadora (1.2x–1.5x) es muy estable.</p>
        </td></tr>
      </table>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:8px 0 14px;">
        <tr><td style="padding:10px 14px;background:#f8fafc;border:1px solid #eef0f3;border-radius:10px;">
          <p style="margin:0;font-size:15px;color:#0f172a;font-weight:700;">💣 Mines — el más estratégico</p>
          <p style="margin:4px 0 0;font-size:13px;color:#64748b;">Eliges cuántas minas poner. Con pocas minas y retirada temprana, el RTP sube por encima del 99%.</p>
        </td></tr>
      </table>
      ${p('Dato útil: estos tres también te generan BFG con cada apuesta, así que mientras juegas vas acumulando para el staking.')}
      ${softBetFuryBox('email3_juegos', 'Con nuestro código, el bono de bienvenida en tu primer depósito es mayor. Totalmente opcional.')}
    </td></tr>`);
}

// ── EMAIL #4 — Día 10 — Lo que aprendimos (honesto) ──
export function getEmail4Html(): string {
  return wrap('Lo que aprendimos analizando BetFury durante meses: lo bueno y lo mejorable.', `
    <tr><td style="padding:4px 32px 0;">
      ${eyebrow('Análisis honesto')}
      ${h1('Lo que aprendimos analizando BetFury')}
      ${p('Llevamos meses probando BetFury de verdad (depósitos, retiros, bonos). Este es nuestro resumen honesto, sin postureo:')}
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:10px;margin:0 0 10px;">
        <tr><td style="padding:14px 16px;">
          <p style="margin:0 0 8px;font-size:13px;font-weight:700;color:#166534;">Lo que más nos gustó</p>
          <p style="margin:0;font-size:14px;color:#14532d;line-height:1.7;">• Retiros rápidos (a menudo en minutos)<br>• Sin KYC obligatorio para montos estándar<br>• Staking de BFG: ingresos pasivos reales<br>• Cajas y faucet gratis a diario</p>
        </td></tr>
      </table>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#fffbeb;border:1px solid #fde68a;border-radius:10px;margin:0 0 14px;">
        <tr><td style="padding:14px 16px;">
          <p style="margin:0 0 8px;font-size:13px;font-weight:700;color:#92400e;">Lo que mejoraríamos</p>
          <p style="margin:0;font-size:14px;color:#78350f;line-height:1.7;">• El soporte en español podría ser más rápido<br>• La app es web (no nativa), aunque funciona bien</p>
        </td></tr>
      </table>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
        ${linkRow(`${SITE_URL}/es/blog/betfury-seguro-es-legitimo-licencia?utm_source=email&utm_medium=drip&utm_campaign=email4`, '¿BetFury es seguro y legítimo?', 'Licencia, garantías y nuestro veredicto completo.', true)}
      </table>
      ${softBetFuryBox('email4_analisis', 'Si decides probarlo, con nuestro código el bono de bienvenida es mayor. Opcional y sin coste.')}
    </td></tr>`);
}

// ── EMAIL #5 — Día 20 — Resumen comparativo (sin urgencia falsa) ──
export function getEmail5Html(): string {
  return wrap('Tu guía rápida de BetFury: comparativa final y por dónde seguir.', `
    <tr><td style="padding:4px 32px 0;">
      ${eyebrow('Resumen')}
      ${h1('Tu guía rápida de BetFury')}
      ${p('Han pasado unas semanas desde que te suscribiste. Para cerrar, aquí tienes la comparativa rápida que resume por qué recomendamos BetFury frente a otras opciones:')}
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #eef0f3;border-radius:10px;overflow:hidden;margin:0 0 14px;font-size:13px;">
        <tr style="background:#f8fafc;">
          <td style="padding:10px 14px;color:#64748b;font-weight:700;">Característica</td>
          <td style="padding:10px 14px;text-align:center;color:#0f172a;font-weight:700;">BetFury</td>
          <td style="padding:10px 14px;text-align:center;color:#64748b;font-weight:700;">Otros</td>
        </tr>
        <tr style="border-top:1px solid #eef0f3;"><td style="padding:10px 14px;color:#334155;">Dividendos diarios (staking)</td><td style="padding:10px 14px;text-align:center;color:#16a34a;">Sí</td><td style="padding:10px 14px;text-align:center;color:#94a3b8;">No</td></tr>
        <tr style="border-top:1px solid #eef0f3;"><td style="padding:10px 14px;color:#334155;">Cajas / faucet gratis</td><td style="padding:10px 14px;text-align:center;color:#16a34a;">Sí</td><td style="padding:10px 14px;text-align:center;color:#94a3b8;">No</td></tr>
        <tr style="border-top:1px solid #eef0f3;"><td style="padding:10px 14px;color:#334155;">Sin KYC (montos estándar)</td><td style="padding:10px 14px;text-align:center;color:#16a34a;">Sí</td><td style="padding:10px 14px;text-align:center;color:#d97706;">Parcial</td></tr>
        <tr style="border-top:1px solid #eef0f3;"><td style="padding:10px 14px;color:#334155;">Contenido en español</td><td style="padding:10px 14px;text-align:center;color:#16a34a;">Sí</td><td style="padding:10px 14px;text-align:center;color:#d97706;">Limitado</td></tr>
      </table>
      ${softBetFuryBox('email5_resumen', 'Cuando quieras probarlo, registrarte con nuestro código te da un bono de bienvenida mayor. Sin prisa y sin coste para ti.')}
    </td></tr>`);
}

// ── Versiones texto plano (deliverability) ──
function text2() { return `Cómo generar ingresos pasivos con BetFury\n\nLa mayoría usa BetFury solo para jugar. El staking de BFG reparte parte de los ingresos del casino entre quienes tienen el token.\n\nEn 4 pasos: 1) juegas y acumulas BFG, 2) haces staking, 3) cada día recibes dividendos, 4) se pagan en BTC/ETH/BNB/USDT.\n\nGuía completa: ${SITE_URL}/es/blog/betfury-staking-bfg-dividendos\n\nSi quieres empezar, con el código LUCKYSIRKO007 tienes un extra de bienvenida (opcional): ${AFFILIATE_LINK}\n\nResponde BAJA para dejar de recibir. +18.`; }
function text3() { return `Los 3 juegos con mejor RTP en BetFury\n\n- Dice (RTP 99%): ajustas riesgo y multiplicador.\n- Crash (RTP 99%): retira antes del crash; con estrategia conservadora es estable.\n- Mines: el más estratégico; con pocas minas el RTP sube del 99%.\n\nAdemás generan BFG con cada apuesta (para el staking).\n\nCon el código LUCKYSIRKO007 el bono es mayor (opcional): ${AFFILIATE_LINK}\n\nResponde BAJA para dejar de recibir. +18.`; }
function text4() { return `Lo que aprendimos analizando BetFury\n\nLo mejor: retiros rápidos, sin KYC para montos estándar, staking de BFG, cajas/faucet gratis.\nLo mejorable: soporte en español más rápido; app web (no nativa).\n\n¿Es seguro y legítimo? ${SITE_URL}/es/blog/betfury-seguro-es-legitimo-licencia\n\nSi lo pruebas, con LUCKYSIRKO007 el bono es mayor (opcional): ${AFFILIATE_LINK}\n\nResponde BAJA para dejar de recibir. +18.`; }
function text5() { return `Tu guía rápida de BetFury\n\nComparativa: dividendos diarios (sí), cajas/faucet gratis (sí), sin KYC en montos estándar (sí), contenido en español (sí).\n\nCuando quieras probarlo, con LUCKYSIRKO007 tienes un bono de bienvenida mayor (sin coste): ${AFFILIATE_LINK}\n\nResponde BAJA para dejar de recibir. +18.`; }

// ── Config de la secuencia ──
export const EMAIL_SEQUENCE: Array<{
  delayDays: number;
  subject: string;
  getHtml: () => string;
  getText: () => string;
}> = [
  { delayDays: 2, subject: 'Cómo generar ingresos pasivos con BetFury', getHtml: getEmail2Html, getText: text2 },
  { delayDays: 5, subject: 'Los 3 juegos con mejor RTP en BetFury', getHtml: getEmail3Html, getText: text3 },
  { delayDays: 10, subject: 'Lo que aprendimos analizando BetFury', getHtml: getEmail4Html, getText: text4 },
  { delayDays: 20, subject: 'Tu guía rápida de BetFury — resumen', getHtml: getEmail5Html, getText: text5 },
];

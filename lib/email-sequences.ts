// ============================================================
// SECUENCIA DE EMAILS "value-first" — CryptoLucky x BetFury
// 4 emails: día 0 (bienvenida+PDF, en subscribe), día 2 (bankroll/
// juego responsable), día 4 (microguía wagering), día 7 (reseña honesta).
// Diseño claro y profesional, ~80% valor / 20% venta, sin disparadores
// de spam, versión texto plano (deliverability) y baja en 1 clic.
// ============================================================

import { unsubUrl } from './unsubscribe';

const AFFILIATE_LINK = 'https://betfury.io/?r=LUCKYSIRKO007';
const SITE_URL = 'https://cryptoluckyguia.com';
export const PDF_URL = `${SITE_URL}/descargas/guia-bienvenida-cryptolucky.pdf`;

// Wrapper claro y profesional. Footer con baja en 1 clic + +18/ayuda.
function wrap(preheader: string, inner: string, email?: string): string {
  const unsub = email ? unsubUrl(email) : `${SITE_URL}/api/unsubscribe`;
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
          <p style="margin:0 0 8px;font-size:12px;color:#94a3b8;line-height:1.6;"><a href="${unsub}" style="color:#94a3b8;text-decoration:underline;">Darte de baja en 1 clic</a></p>
          <p style="margin:0;font-size:11px;color:#b0b7c3;line-height:1.6;">Solo +18. Juega con responsabilidad. Si el juego deja de ser diversión, busca ayuda (Coljuegos · MINCETUR).</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

function btn(href: string, label: string): string {
  return `<a href="${href}" style="display:inline-block;background:#ea580c;color:#ffffff;text-decoration:none;font-weight:700;font-size:14px;padding:11px 20px;border-radius:8px;">${label}</a>`;
}
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
function infoBox(inner: string, bg = '#f8fafc', border = '#eef0f3'): string {
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 14px;">
    <tr><td style="background:${bg};border:1px solid ${border};border-radius:10px;padding:14px 16px;">${inner}</td></tr></table>`;
}
function softBetFuryBox(campaign: string, intro: string): string {
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:22px 0 6px;">
    <tr><td style="background:#fff7ed;border:1px solid #fed7aa;border-radius:10px;padding:16px 18px;">
      <p style="margin:0 0 10px;font-size:13px;color:#7c2d12;line-height:1.5;">${intro}</p>
      <p style="margin:0 0 12px;font-size:13px;color:#7c2d12;">Código: <strong style="letter-spacing:.06em;">LUCKYSIRKO007</strong></p>
      ${btn(`${AFFILIATE_LINK}&utm_source=email&utm_medium=drip&utm_campaign=${campaign}`, 'Probar BetFury con cabeza →')}
    </td></tr>
  </table>`;
}

// ── EMAIL 2 — Día 2 — Juego responsable + bankroll (valor puro, SIN afiliado) ──
export function getEmail2Html(email?: string): string {
  return wrap('Presupuesto, límites y la regla del stop-loss/stop-win. Sin venta.', `
    <tr><td style="padding:4px 32px 0;">
      ${eyebrow('Juego responsable')}
      ${h1('La regla nº1 antes de jugar: protege tu dinero')}
      ${p('Hoy no te traigo ningún casino ni ningún bono. Te traigo lo que de verdad marca la diferencia entre disfrutar y llevarte un disgusto: <strong>gestionar tu dinero (tu “bankroll”)</strong>.')}
      ${infoBox(`
        <p style="margin:0 0 6px;font-size:14px;color:#0f172a;"><strong>1. Presupuesto cerrado.</strong> Decide ANTES cuánto vas a usar, y que sea dinero que puedes permitirte perder. Nunca el alquiler, la comida ni un préstamo.</p>
        <p style="margin:8px 0 6px;font-size:14px;color:#0f172a;"><strong>2. Límite de tiempo.</strong> Ponte un tope (por ejemplo 45 min). Cuando suena, se acabó, ganes o pierdas.</p>
        <p style="margin:8px 0 0;font-size:14px;color:#0f172a;"><strong>3. Stop-loss y stop-win.</strong> Decide de antemano cuánto estás dispuesto a perder y, si ganas, en qué punto retiras. La trampa más cara es “ya recupero”: perseguir pérdidas vacía la cuenta.</p>`)}
      ${p('📋 Para que sea fácil de aplicar, tu <strong>Guía de bienvenida</strong> incluye un checklist de juego responsable y un esquema de bankroll para anotar depósitos, retiros y tu límite por sesión.')}
      <p style="margin:0 0 16px;">${btn(PDF_URL, 'Abrir el checklist (PDF)')}</p>
      ${p('Y si alguna vez notas que el juego deja de ser diversión, pedir ayuda es de listos: en Colombia tienes a <strong>Coljuegos</strong>; en Perú, el marco de <strong>MINCETUR</strong>. Casi todos los casinos serios permiten ponerte límites de depósito o autoexcluirte.')}
      ${p('En el próximo correo te enseño un truco práctico: <strong>leer el “wagering” de un bono en 3 minutos</strong> para saber si vale la pena.')}
      ${p('Cuídate,<br>Sirko007 — CryptoLucky')}
    </td></tr>`, email);
}

// ── EMAIL 3 — Día 4 — Microguía: leer un "wagering" en 3 minutos ──
export function getEmail3Html(email?: string): string {
  return wrap('El truco para saber en 3 minutos si un bono vale la pena.', `
    <tr><td style="padding:4px 32px 0;">
      ${eyebrow('Microguía')}
      ${h1('Cómo leer el “wagering” de un bono en 3 minutos')}
      ${p('Un bono no vale por su tamaño, sino por lo fácil que sea cumplir sus condiciones. Busca <strong>estas 5 cifras</strong> en la letra pequeña:')}
      ${infoBox(`
        <p style="margin:0 0 6px;font-size:14px;color:#334155;line-height:1.7;"><strong>1. Rollover (x__).</strong> Cuántas veces hay que apostar el bono antes de retirar. x20–x30 es razonable; x40 o más, piénsalo.</p>
        <p style="margin:0 0 6px;font-size:14px;color:#334155;line-height:1.7;"><strong>2. Juegos válidos y su peso.</strong> Las tragamonedas suelen contar 100%; ruleta o blackjack, a veces 10% o 0%.</p>
        <p style="margin:0 0 6px;font-size:14px;color:#334155;line-height:1.7;"><strong>3. Caducidad.</strong> Muchos bonos expiran en días. Si no llegas, lo pierdes.</p>
        <p style="margin:0 0 6px;font-size:14px;color:#334155;line-height:1.7;"><strong>4. Apuesta máxima con bono activo.</strong> Suele haber un tope por giro; pasarte puede anular el bono.</p>
        <p style="margin:0;font-size:14px;color:#334155;line-height:1.7;"><strong>5. Tope de retiro.</strong> A veces solo puedes sacar una cantidad máxima de lo ganado con el bono.</p>`)}
      ${p('<strong>Ejemplo en números:</strong> bono de 20 USD con rollover x35 → 20 × 35 = <strong>700 USD</strong> en apuestas acumuladas antes de poder retirar. No es perder 700; es el volumen que tienes que mover. Cuanto más alto, más riesgo de que el saldo se agote por el camino.')}
      ${p('¿Dónde practicar? En cualquier casino que mires. Por ejemplo, en <strong>BetFury</strong> —uno de los que he revisado— puedes ver sus condiciones y aplicar las 5 cifras tú mismo antes de aceptar nada. La idea es que tú decidas con criterio.')}
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
        ${linkRow(`${SITE_URL}/es/blog/betfury-bono-bienvenida-590?utm_source=email&utm_medium=drip&utm_campaign=email3_wagering`, 'Cómo aprovechar el bono de bienvenida', 'El ejemplo aplicado paso a paso.', true)}
      </table>
      ${p('En el próximo te cuento, sin marketing, <strong>qué aprendí analizando BetFury durante meses</strong> — lo bueno y lo mejorable.')}
      ${p('Un saludo,<br>Sirko007 — CryptoLucky')}
    </td></tr>`, email);
}

// ── EMAIL 4 — Día 7 — Reseña honesta + caso real ──
export function getEmail4Html(email?: string): string {
  return wrap('Sin humo: ventajas, peros y un caso real con bankroll de 50 USD.', `
    <tr><td style="padding:4px 32px 0;">
      ${eyebrow('Reseña honesta')}
      ${h1('Lo que aprendí analizando BetFury durante meses')}
      ${p('Llevo meses probando BetFury, así que te cuento la verdad, sin adornos.')}
      ${infoBox(`
        <p style="margin:0 0 8px;font-size:13px;font-weight:700;color:#166534;">Lo bueno</p>
        <p style="margin:0;font-size:14px;color:#14532d;line-height:1.7;">• Mucha variedad de juegos y catálogo amplio.<br>• Recompensas diarias (cajas, faucet) que está bien reclamar.<br>• Staking del token BFG: ingresos pasivos que explico en el blog.</p>`, '#f0fdf4', '#bbf7d0')}
      ${infoBox(`
        <p style="margin:0 0 8px;font-size:13px;font-weight:700;color:#92400e;">Lo mejorable</p>
        <p style="margin:0;font-size:14px;color:#78350f;line-height:1.7;">• Como en casi todos, las condiciones de algunos bonos conviene mirarlas con lupa (aplica las 5 cifras del correo anterior).<br>• La interfaz abruma un poco al principio.</p>`, '#fffbeb', '#fde68a')}
      ${p('<strong>Un caso real (para aprender, no para imitar):</strong> en una sesión con un bankroll de 50 USD me marqué stop-loss en 50 y stop-win en +30. Toqué el stop-win, retiré y cerré. Otro día toqué el stop-loss y también cerré. La lección no es “se gana”: es que tener los límites decididos de antemano me ahorró perseguir pérdidas. Eso es lo que de verdad protege tu dinero.')}
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
        ${linkRow(`${SITE_URL}/es/blog/betfury-seguro-es-legitimo-licencia?utm_source=email&utm_medium=drip&utm_campaign=email4_review`, '¿BetFury es seguro y legítimo?', 'Licencia, garantías y veredicto completo.', true)}
      </table>
      ${softBetFuryBox('email4_review', 'Si después de todo esto quieres probarlo con cabeza, puedes registrarte con mi código. Hazlo con tu checklist de juego responsable delante (lo tienes en el PDF de bienvenida). Empieza pequeño.')}
      ${p('Gracias por leerme estos días. Seguiré mandándote solo cosas útiles.<br><br>Un abrazo,<br>Sirko007 — CryptoLucky')}
    </td></tr>`, email);
}

// ── Versiones texto plano (deliverability) ──
function unsubLine(email?: string) {
  return email
    ? `Darte de baja en 1 clic: ${unsubUrl(email)}`
    : `Para darte de baja, responde con BAJA.`;
}
export function text2(email?: string) {
  return `La regla nº1 antes de jugar: protege tu dinero\n\nHoy no traigo ningún casino ni bono, sino lo que marca la diferencia: gestionar tu bankroll.\n\n1) Presupuesto cerrado: solo dinero que puedas permitirte perder.\n2) Límite de tiempo: pon un tope (p. ej. 45 min) y respétalo.\n3) Stop-loss y stop-win: decide de antemano cuánto perder y cuándo retirar. Perseguir pérdidas vacía la cuenta.\n\nTu Guía de bienvenida incluye un checklist de juego responsable: ${PDF_URL}\n\nSi el juego deja de ser diversión, busca ayuda (Coljuegos / MINCETUR).\n\n${unsubLine(email)}\nSolo +18. Juega con responsabilidad.`;
}
export function text3(email?: string) {
  return `Cómo leer el "wagering" de un bono en 3 minutos\n\nBusca estas 5 cifras: 1) Rollover (x20-30 razonable, x40+ piénsalo). 2) Juegos válidos y su peso. 3) Caducidad. 4) Apuesta máxima con bono activo. 5) Tope de retiro.\n\nEjemplo: bono 20 USD x35 = 700 USD en apuestas antes de retirar.\n\nAplícalo con el bono de bienvenida: ${SITE_URL}/es/blog/betfury-bono-bienvenida-590\n\n${unsubLine(email)}\nSolo +18. Juega con responsabilidad. Algún enlace puede ser de afiliado, sin coste extra para ti.`;
}
export function text4(email?: string) {
  return `Lo que aprendí analizando BetFury durante meses\n\nLo bueno: variedad de juegos, recompensas diarias (cajas/faucet), staking de BFG (ingresos pasivos).\nLo mejorable: revisar con lupa las condiciones de algunos bonos; interfaz que abruma al principio.\n\nCaso real: con bankroll de 50 USD, stop-loss en 50 y stop-win en +30. Tener los límites decididos me ahorró perseguir pérdidas.\n\n¿Es seguro y legítimo? ${SITE_URL}/es/blog/betfury-seguro-es-legitimo-licencia\n\nSi quieres probarlo con cabeza, con el código LUCKYSIRKO007: ${AFFILIATE_LINK}\n\n${unsubLine(email)}\nSolo +18. Juega con responsabilidad. Enlace de afiliado: puedo recibir una comisión sin coste extra para ti.`;
}

// ── Config de la secuencia drip (día 2 / 4 / 7) ──
export const EMAIL_SEQUENCE: Array<{
  delayDays: number;
  subject: string;
  getHtml: (email: string) => string;
  getText: (email: string) => string;
}> = [
  { delayDays: 2, subject: 'La regla nº1 antes de jugar: protege tu dinero', getHtml: getEmail2Html, getText: text2 },
  { delayDays: 4, subject: 'Cómo leer el “wagering” de un bono en 3 minutos', getHtml: getEmail3Html, getText: text3 },
  { delayDays: 7, subject: 'Lo que aprendí analizando BetFury durante meses', getHtml: getEmail4Html, getText: text4 },
];

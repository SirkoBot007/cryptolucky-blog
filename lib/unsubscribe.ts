// ============================================================
// Baja en 1 clic (List-Unsubscribe) — CryptoLucky
// Genera un token HMAC por email para que el enlace de baja no
// se pueda falsificar y funcione sin login (requisito Gmail/Yahoo).
// Solo servidor (usa crypto de Node).
// ============================================================
import { createHmac } from 'crypto';

const SECRET =
  process.env.UNSUBSCRIBE_SECRET ||
  process.env.RESEND_API_KEY ||
  'cryptolucky-unsub-2026';

export const UNSUB_SITE = 'https://cryptoluckyguia.com';

export function unsubToken(email: string): string {
  return createHmac('sha256', SECRET)
    .update((email || '').toLowerCase().trim())
    .digest('hex')
    .slice(0, 20);
}

/** URL de baja en 1 clic para un email concreto. */
export function unsubUrl(email: string): string {
  const e = (email || '').toLowerCase().trim();
  return `${UNSUB_SITE}/api/unsubscribe?e=${encodeURIComponent(e)}&t=${unsubToken(e)}`;
}

export function verifyUnsub(email: string, token: string): boolean {
  if (!email || !token) return false;
  return unsubToken(email) === token;
}

/** Cabeceras List-Unsubscribe para los envíos de Resend (one-click). */
export function unsubHeaders(email: string): Record<string, string> {
  return {
    'List-Unsubscribe': `<${unsubUrl(email)}>, <mailto:baja@cryptoluckyguia.com?subject=BAJA>`,
    'List-Unsubscribe-Post': 'List-Unsubscribe=One-Click',
  };
}

// article-visuals.ts — Estética "slot tile" vibrante por artículo (Parte A, v2).
// Cada tema = paleta viva (3 paradas) + emoji temático + color de glow. El render
// (components/ArticleThumb.tsx) compone gradiente + brillo + glow + destellos en CSS/emoji
// (0 KB de imagen, cero CLS). Todo ORIGINAL: emojis Unicode estándar (no assets de marcas).
// El tema se deriva del slug (más fiable) y, si no, de la categoría.

export interface ArticleVisual {
  key: string;
  /** Etiqueta temática (alt / categoría visual). */
  label: string;
  /** Emoji temático (Unicode estándar). */
  emoji: string;
  /** Gradiente vivo de fondo (3 paradas, hex). */
  c1: string;
  c2: string;
  c3: string;
  /** Color del glow detrás del símbolo. */
  glow: string;
}

const THEMES: Record<string, ArticleVisual> = {
  mundial:  { key: 'mundial',  label: 'Copa del Mundo 2026', emoji: '⚽', c1: '#34d399', c2: '#059669', c3: '#053b2b', glow: '#6ee7b7' },
  apuestas: { key: 'apuestas', label: 'Apuestas deportivas', emoji: '🎯', c1: '#38bdf8', c2: '#0284c7', c3: '#0b2a5e', glow: '#7dd3fc' },
  casino:   { key: 'casino',   label: 'Casino cripto',       emoji: '🎰', c1: '#c084fc', c2: '#9333ea', c3: '#3b0d66', glow: '#e9d5ff' },
  juegos:   { key: 'juegos',   label: 'Juegos de casino',    emoji: '🎲', c1: '#f472b6', c2: '#db2777', c3: '#6e1239', glow: '#fbcfe8' },
  staking:  { key: 'staking',  label: 'Staking BFG',         emoji: '🪙', c1: '#fbbf24', c2: '#d97706', c3: '#6b2e0c', glow: '#fde68a' },
  bonos:    { key: 'bonos',    label: 'Bonos y promociones', emoji: '🎁', c1: '#fb923c', c2: '#ea580c', c3: '#6e2410', glow: '#fed7aa' },
  sinkyc:   { key: 'sinkyc',   label: 'Casino sin KYC',      emoji: '🛡️', c1: '#2dd4bf', c2: '#0d9488', c3: '#0f3f3a', glow: '#99f6e4' },
  reviews:  { key: 'reviews',  label: 'Reseña y análisis',   emoji: '⭐', c1: '#fcd34d', c2: '#f59e0b', c3: '#6b3a09', glow: '#fde68a' },
  guias:    { key: 'guias',    label: 'Guía paso a paso',    emoji: '📘', c1: '#818cf8', c2: '#4f46e5', c3: '#27246b', glow: '#c7d2fe' },
  default:  { key: 'default',  label: 'CryptoLucky',         emoji: '🍀', c1: '#fbbf24', c2: '#f59e0b', c3: '#6b3a09', glow: '#fde68a' },
};

// El orden importa: lo más específico primero. Se evalúa contra el slug.
const SLUG_RULES: [RegExp, string][] = [
  [/mundial|copa-del-mundo|world-cup|goleador|octavos|grupos|favoritos|argentina|mexico|colombia-mundial|peru-mundial|chile-mundial|venezuela-mundial/i, 'mundial'],
  [/staking|bfg|dividendos|token-bfg/i, 'staking'],
  [/bono|free-spins|free-boxes|freebox|bienvenida|promocional|codigo-promo|deposito|590|cashback|rakeback|wheel|fury-wheel/i, 'bonos'],
  [/sin-kyc|no-kyc|kyc/i, 'sinkyc'],
  [/plinko|mines|crash|dice|space-dice|candy|provably|juego/i, 'juegos'],
  [/review|vs-|comparativa|seguro|legitimo|legit|opinion|estafa|confiable/i, 'reviews'],
  [/registr|paso-a-paso|como-|movil|android|ios|retiro|retiros|minimo|programa-vip|rank/i, 'guias'],
  [/apuestas|apostar|sportsbook|en-vivo|live-betting|cuotas/i, 'apuestas'],
  [/casino|legal-en-latinoamerica|mejores-casinos/i, 'casino'],
];

// Fallback por categoría (normalizada a minúsculas).
const CATEGORY_RULES: [RegExp, string][] = [
  [/copa del mundo|mundial/i, 'mundial'],
  [/apuestas|sportsbook/i, 'apuestas'],
  [/staking|bfg/i, 'staking'],
  [/bono/i, 'bonos'],
  [/sin kyc|kyc/i, 'sinkyc'],
  [/juego/i, 'juegos'],
  [/review/i, 'reviews'],
  [/gu[ií]a/i, 'guias'],
  [/casino/i, 'casino'],
];

/** Devuelve el tema visual (paleta + emoji) de un artículo a partir de su slug y categoría. */
export function getArticleVisual(slug = '', category = ''): ArticleVisual {
  for (const [re, key] of SLUG_RULES) {
    if (re.test(slug)) return THEMES[key];
  }
  for (const [re, key] of CATEGORY_RULES) {
    if (re.test(category)) return THEMES[key];
  }
  return THEMES.default;
}

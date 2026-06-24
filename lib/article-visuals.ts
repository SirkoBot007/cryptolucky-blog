// article-visuals.ts — Miniaturas temáticas por artículo (Parte A).
// Cada artículo recibe un tema (gradiente + icono + color) según su SLUG (más fiable que la
// categoría, que tiene variantes de mayúsculas/sinónimos) y, si no, según su categoría.
// Render en CSS/SVG puro (ver components/ArticleThumb.tsx): 0 KB de imagen, cero CLS.
// IMPORTANTE: las clases de gradiente van COMPLETAS (string literal) para que el JIT de
// Tailwind no las purgue. No construir nombres de clase dinámicamente.

export type IconKey =
  | 'trophy'
  | 'target'
  | 'dice'
  | 'gamepad'
  | 'coins'
  | 'gift'
  | 'shield'
  | 'star'
  | 'book'
  | 'clover';

export interface ArticleVisual {
  key: string;
  /** Etiqueta temática (para el alt / aria-label). */
  label: string;
  /** Clases Tailwind COMPLETAS del gradiente de fondo. */
  gradient: string;
  /** Color de acento del icono (clase de texto Tailwind). */
  accent: string;
  icon: IconKey;
}

const THEMES: Record<string, ArticleVisual> = {
  mundial:  { key: 'mundial',  label: 'Copa del Mundo 2026',  gradient: 'bg-gradient-to-br from-emerald-500 via-emerald-700 to-slate-900', accent: 'text-emerald-200', icon: 'trophy' },
  apuestas: { key: 'apuestas', label: 'Apuestas deportivas',  gradient: 'bg-gradient-to-br from-sky-500 via-sky-700 to-slate-900',         accent: 'text-sky-200',     icon: 'target' },
  casino:   { key: 'casino',   label: 'Casino cripto',        gradient: 'bg-gradient-to-br from-purple-500 via-purple-700 to-slate-900',   accent: 'text-purple-200',  icon: 'dice' },
  juegos:   { key: 'juegos',   label: 'Juegos de casino',     gradient: 'bg-gradient-to-br from-fuchsia-500 via-fuchsia-700 to-slate-900', accent: 'text-fuchsia-200', icon: 'gamepad' },
  staking:  { key: 'staking',  label: 'Staking BFG',          gradient: 'bg-gradient-to-br from-amber-400 via-amber-600 to-slate-900',     accent: 'text-amber-100',   icon: 'coins' },
  bonos:    { key: 'bonos',    label: 'Bonos y promociones',  gradient: 'bg-gradient-to-br from-orange-400 via-orange-600 to-slate-900',   accent: 'text-orange-100',  icon: 'gift' },
  sinkyc:   { key: 'sinkyc',   label: 'Casino sin KYC',       gradient: 'bg-gradient-to-br from-teal-400 via-teal-600 to-slate-900',       accent: 'text-teal-100',    icon: 'shield' },
  reviews:  { key: 'reviews',  label: 'Reseña y análisis',    gradient: 'bg-gradient-to-br from-yellow-400 via-amber-600 to-slate-900',    accent: 'text-yellow-100',  icon: 'star' },
  guias:    { key: 'guias',    label: 'Guía paso a paso',     gradient: 'bg-gradient-to-br from-indigo-500 via-indigo-700 to-slate-900',   accent: 'text-indigo-200',  icon: 'book' },
  default:  { key: 'default',  label: 'CryptoLucky',          gradient: 'bg-gradient-to-br from-amber-500 via-amber-700 to-slate-900',     accent: 'text-amber-100',   icon: 'clover' },
};

// El orden importa: lo más específico primero. Se evalúa contra el slug.
const SLUG_RULES: [RegExp, string][] = [
  [/mundial|copa-del-mundo|world-cup|goleador|octavos|grupos|favoritos|argentina|mexico|colombia-mundial|peru-mundial|chile-mundial|venezuela-mundial/i, 'mundial'],
  [/staking|bfg|dividendos|token-bfg/i, 'staking'],
  [/bono|free-spins|free-boxes|freebox|bienvenida|deposito|590|cashback|rakeback|wheel|fury-wheel/i, 'bonos'],
  [/sin-kyc|no-kyc|kyc/i, 'sinkyc'],
  [/plinko|mines|crash|dice|space-dice|candy|provably|juego|fury-wheel/i, 'juegos'],
  [/review|vs-|comparativa|seguro|legitimo|legit|opinion|estafa|confiable/i, 'reviews'],
  [/registr|paso-a-paso|como-|movil|android|ios|retiro|retiros|deposito|minimo|programa-vip|rank/i, 'guias'],
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

// Estilo para la imagen OG generada con @vercel/og (Satori usa estilos inline + emojis Twemoji,
// no Tailwind ni SVG por path → aquí van emoji y colores hex por tema).
export const OG_STYLE: Record<string, { emoji: string; from: string; fg: string }> = {
  mundial:  { emoji: '⚽', from: '#065f46', fg: '#6ee7b7' },
  apuestas: { emoji: '🎯', from: '#075985', fg: '#7dd3fc' },
  casino:   { emoji: '🎲', from: '#6b21a8', fg: '#d8b4fe' },
  juegos:   { emoji: '🎮', from: '#86198f', fg: '#f0abfc' },
  staking:  { emoji: '📈', from: '#b45309', fg: '#fcd34d' },
  bonos:    { emoji: '🎁', from: '#c2410c', fg: '#fdba74' },
  sinkyc:   { emoji: '🔒', from: '#115e59', fg: '#5eead4' },
  reviews:  { emoji: '⭐', from: '#a16207', fg: '#fde047' },
  guias:    { emoji: '📖', from: '#3730a3', fg: '#a5b4fc' },
  default:  { emoji: '🍀', from: '#1e293b', fg: '#fcd34d' },
};

/** Devuelve el tema visual de un artículo a partir de su slug y categoría. */
export function getArticleVisual(slug = '', category = ''): ArticleVisual {
  for (const [re, key] of SLUG_RULES) {
    if (re.test(slug)) return THEMES[key];
  }
  for (const [re, key] of CATEGORY_RULES) {
    if (re.test(category)) return THEMES[key];
  }
  return THEMES.default;
}

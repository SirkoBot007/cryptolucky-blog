// AUTO-GENERADO por tools/gen-thumb-manifest.py — NO editar a mano.
// Slugs con miniatura real en /images/thumbs/<slug>.webp. El resto usa el tile CSS temático.
export const THUMB_SLUGS: ReadonlySet<string> = new Set([
  "apuestas-mundial-2026-betfury",
  "betfury-bono-bienvenida-590",
  "betfury-bono-sin-deposito-free-spins",
  "betfury-casino-review-2026",
  "betfury-crash-juego-guia-completa",
  "betfury-dice-estrategia-probabilidades",
  "betfury-free-boxes-bitcoin-gratis",
  "betfury-fury-wheel-giros-gratis",
  "betfury-mines-estrategia-guia",
  "betfury-plinko-como-jugar-ganar",
  "betfury-programa-vip-rank-beneficios",
  "betfury-retiros-cuanto-tarda",
  "betfury-seguro-es-legitimo-licencia",
  "betfury-staking-bfg-dividendos",
  "betfury-vs-stake-comparativa-2026",
  "casino-bitcoin-sin-kyc-2026",
  "ganar-criptomonedas-gratis-2026",
  "mejores-casinos-criptomonedas-2026",
  "token-bfg-que-es-tokenomics-precio"
]);

export function hasThumb(slug: string): boolean {
  return THUMB_SLUGS.has(slug);
}

export function thumbSrc(slug: string): string {
  return `/images/thumbs/${slug}.webp`;
}

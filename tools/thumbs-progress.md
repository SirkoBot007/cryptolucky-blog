# Progreso miniaturas PicLumen (47 artículos)
> Reanudable. Generador: PicLumen Art V1, 16:9 (1344×768), WebP. Descarga por slug a `public/images/thumbs/<slug>.webp`.
> Prompts en `tools/thumb-prompts.json`. Tras cada lote: `python tools/gen-thumb-manifest.py` + tsc/build.
> Lumens: 10/día (reset diario) + Modo Relax (gratis, más lento; cap diario ~20). NO crear cuentas múltiples.

## ESTADO: 19/47 hechas · 28 pendientes

## LOTE 2 — HECHO (9 nuevas + regen) ✅
- [x] ganar-criptomonedas-gratis-2026  (REGENERADA limpia: gran bitcoin, sin slot/número)
- [x] betfury-seguro-es-legitimo-licencia (escudo+check verde+candado, esmeralda)
- [x] betfury-bono-sin-deposito-free-spins (caja regalo+monedas, naranja)
- [x] token-bfg-que-es-tokenomics-precio (mano+moneda+curva, ámbar)
- [x] betfury-retiros-cuanto-tarda (flujo monedas→cartera, púrpura)
- [x] betfury-free-boxes-bitcoin-gratis (cofre azul/oro+bitcoins)
- [x] betfury-vs-stake-comparativa-2026 (2 emblemas+rayo versus)
- [x] betfury-dice-estrategia-probabilidades (dados rojos+pips, fucsia)
- [x] betfury-mines-estrategia-guia (cuadrícula gemas, fucsia)
- [x] betfury-programa-vip-rank-beneficios (corona+fichas, púrpura)


## LOTE 1 — HECHO (10) ✅
- [x] mejores-casinos-criptomonedas-2026  (muestra PicLumen mapeada — slot 777)
- [x] apuestas-mundial-2026-betfury        (muestra PicLumen mapeada — trofeo+balón)
- [x] betfury-bono-bienvenida-590          (muestra PicLumen mapeada — regalo+monedas)
- [x] betfury-casino-review-2026           (escudo+check+fichas, teal)
- [x] casino-bitcoin-sin-kyc-2026          (escudo+bitcoin+candado, teal)
- [x] betfury-staking-bfg-dividendos       (monedas+flecha gráfico, amber)
- [x] betfury-crash-juego-guia-completa    (cohete+curva, fucsia)
- [x] betfury-plinko-como-jugar-ganar      (tablero pegs — REGENERADA, 1ª tenía texto "PLINNO")
- [x] betfury-fury-wheel-giros-gratis      (ruleta dorada, naranja — Relax)
- [x] ganar-criptomonedas-gratis-2026      (casino neón+monedas, púrpura — Relax; nº menor en slot)

## PENDIENTES (37 — lotes 2-5)
8 betfury-seguro-es-legitimo-licencia · 9 betfury-bono-sin-deposito-free-spins · 11 token-bfg-que-es-tokenomics-precio
12 betfury-retiros-cuanto-tarda · 13(hecho fury-wheel) · 14 betfury-free-boxes-bitcoin-gratis · 15 casino-cripto-mexico-mejores
16 betfury-vs-stake-comparativa-2026 · 17 betfury-dice-estrategia-probabilidades · 19 betfury-mines-estrategia-guia
20 betfury-programa-vip-rank-beneficios · 21 betfury-cashback-rakeback-explicado · 22 casino-cripto-colombia-mejores
23 copa-del-mundo-2026-favoritos-analisis-apuestas · 24 copa-del-mundo-2026-grupos-resultados-apuestas
25 apostar-copa-del-mundo-2026-criptomonedas-betfury-guia · 26 fury-world-cup-2026-betfury-promo-600000
27 mejores-apuestas-cripto-mundial-2026 · 28 cuotas-mundial-2026-betfury · 29 betfury-codigo-promocional-luckysirko007
30 argentina-mundial-2026-apuestas-betfury · 31 mexico-copa-del-mundo-2026-apuestas · 32 colombia-mundial-2026-betfury-apuestas
33 betfury-apuestas-en-vivo-mundial-como-funciona · 34 betfury-cuotas-octavos-final-mundial-2026 · 35 betfury-casino-argentina
36 betfury-casino-chile · 37 betfury-casino-peru · 38 betfury-casino-espana · 39 betfury-casino-venezuela
40 betfury-como-registrarse-paso-a-paso · 41 betfury-retiro-minimo-cuanto-es · 42 betfury-jugar-desde-movil-android-ios
43 betfury-bono-primer-deposito-como-funciona · 44 que-es-casino-cripto-como-funciona · 45 casino-cripto-legal-en-latinoamerica
46 provably-fair-que-significa-casinos-cripto · 47 mejores-goleadores-mundial-2026-apuestas
(prompts exactos por slug en tools/thumb-prompts.json)

## Integración (hecho)
- lib/thumb-manifest.ts (auto) + ArticleThumb usa next/image (WebP, object-cover, alt=título) si hay imagen real; si no, tile CSS temático (fallback futuros). tsc+build OK.

## Notas / barreras
- 2026-06-24: empecé con solo 6 Lumens (no 10) → 6 rápidas + Relax para el resto. Relax CONFIRMADO: gratis, más lento, banner "Creating in Relax Mode".
- Pipeline: prompt → Generate → verificar screenshot → URL images.piclumen.com → curl (referer piclumen.com) → <slug>.webp.
- Verificación: rechazar imágenes con texto basura/watermark/deformidades y regenerar (ej. plinko).

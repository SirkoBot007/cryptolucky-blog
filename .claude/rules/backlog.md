# Backlog del Blog — CryptoLucky
> Backlog técnico/contenido del repo. Cargado bajo demanda (no en el cerebro, para no pagarlo cada sesión). El backlog estratégico del workspace vive en `TAREAS.md` (raíz). Actualizado: 2026-06-24.

## En curso
- [ ] (libre — definir al iniciar sesión)

## Pendientes reales (verificadas por auditoría de código 2026-06-23)
- [ ] Integrar los 7 drafts FINALES en `articles-data.ts` + thumbnails + deploy (requiere push del CEO). Drafts en `BLOG-BETFURY/drafts/*-FINAL.md`: #1 registro, #2 hub originales, #3 sportsbook, #4 retiro pendiente, #5 elegir casino cripto, #6 provably fair, #7 apostar con cripto. Enfoque LATAM + compliance, revisados con prompt maestro Perplexity.
- [ ] BUILD ("blog completo"): banners del casino sin spam en todo el blog + animaciones modernas por sección (verificar tecnología gratis 2026 con Perplexity). Requiere preview antes de prod.
- [ ] Crear artículos de los huecos C1/C2 (ver `topic-clusters.md`) + CTAs contextuales en los existentes.
- [ ] PODA: consolidar variantes finas/Mundial-país (canibalización) según `calidad-y-poda-contenido.md` — requiere datos GSC; NO borrar a ciegas (validado Perplexity).
- [ ] Limpieza opcional: borrar 7 registros `Archivado` muertos de `articles-new.ts` (mantener sus redirects). Seguro pero requiere OK del CEO.
- [ ] Añadir headers CSP y HSTS en `next.config.mjs` (secundario, requiere test en preview).
- [ ] `messages/en.json` mínimo (631 B): revisar calidad real del contenido EN indexado (home/pillars).
- [ ] 1 artículo sin campo `image` (29/30 lo tienen).

## Ya resuelto / completado (referencia)
- [x] x-default en las 11 páginas pillar/estáticas (2026-06-23, tsc OK).
- [x] COMPLIANCE (CEO OK 2026-06-23): footer global disclaimer España/Curaçao (ES+EN); `betfury-casino-espana` → Archivado + redirect a /casino-cripto.
- [x] Schema completo · hreflang+x-default · i18n EN (redirect 308+noindex+canonical) · sponsored+disclosure · imágenes 29/30. Detalle en `seo.md`/`geo-targeting-y-compliance.md`/`calidad-y-poda-contenido.md`.
- [x] 7 artículos de calidad FINALES redactados y revisados (Perplexity).
- [x] 2026-06-24 Conversión CRO Fases A/B/C en producción (`main` @ b90b742). Ramas `feat/cro-fase-a|b|c` merged.

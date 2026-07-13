---
name: cryptolucky-seo
description: Verifica y optimiza el SEO técnico y on-page de páginas y artículos del blog CryptoLucky en Next.js 14. Úsala cuando el usuario pida "revisar SEO", "optimizar SEO de", "schema markup", "meta tags", "Core Web Vitals", "auditar SEO" o antes de publicar un artículo nuevo.
---

# CryptoLucky · Verificación SEO

## Objetivo
Auditar una página o artículo contra el checklist SEO 2026 y proponer correcciones concretas.

## Flujo
1. Revisar jerarquía de encabezados: 1 H1, H2 por bloques, H3 por subpuntos; sin saltos de nivel.
2. Comprobar keyword principal en title, H1, primer párrafo, URL y 1 sección (sin stuffing).
3. Validar meta: `<title>` 50-60c, `meta description` 140-160c, Open Graph + Twitter Card, `canonical`, `dateModified`.
4. Verificar schema: Article/BlogPosting + BreadcrumbList; FAQPage si hay FAQ visible; HowTo si es tutorial. **Review/aggregateRating: NO usar un rating editorial propio** (p. ej. "9.2/10" puesto por la redacción). Google exige ratings **de usuarios**, no compilados por el editor; en YMYL/casino un `aggregateRating` propio **no es elegible** para estrellas y arriesga acción por spam estructurado (verificado en Google Search Central, 2026-07-13). Reseñar a un tercero se permite, pero **sin inventar `aggregateRating`**.
5. Imágenes: WebP/AVIF, `alt` descriptivo, `width`/`height`, lazy load (excepto above-the-fold).
6. Core Web Vitals: LCP <= 2.5s, INP < 200ms, CLS < 0.1. Señalar fuentes de CLS (imágenes sin dimensiones, fuentes sin swap).
7. Enlaces: internos 3-8 con anchors descriptivos; afiliados con `rel="sponsored nofollow"` + disclosure visible + redirect con `noindex`.
8. Confirmar `app/sitemap.ts` (rutas ES y EN) y `app/robots.ts` (excluye /api/ y tracking); `public/llms.txt` actualizado.
9. GEO: TL;DR inicial, bloques estructurados, byline/fecha, fuentes citadas.

## Reglas
- No inventar ratings ni schema de contenido no visible.
- Reportar hallazgos por severidad (crítico / importante / mejora) con la corrección exacta.

## Referencias
- `.claude/rules/seo-buenas-practicas-ceo.md` (7 trucos SEO del CEO: keyword research, originalidad, carga, anti-black-hat)
- `.claude/rules/indexacion-y-medicion.md` (runbook indexación + GA4/GSC)
- `.claude/rules/calidad-y-poda-contenido.md` (checklist de calidad + árbol de decisión de poda)
- `.claude/rules/seo.md` (detalle completo) · `.claude/rules/afiliacion.md` · `.claude/rules/ecosistema-15-categorias.md` (auditar siempre las 15 categorías)

## Salida
- Checklist con OK / FALLO por punto + correcciones accionables priorizadas.

# Reglas SEO — CryptoLucky (detalle)
> Cargado bajo demanda por la skill `cryptolucky-seo`. Basado en investigación Perplexity Pro (2026). Fuentes: Google Search Central, Vercel.

## Encabezados
- 1 solo H1 por página, alineado con el `<title>`.
- H2 para 4-8 bloques principales; H3 para subpuntos. H4-H6 casi nunca en posts de afiliación.
- No saltar niveles por estilo visual (usar CSS, no un H4 donde toca H2).
- Encabezados "respondables": que prometan una respuesta concreta (mejor para snippets y motores IA).

## Keywords
- La densidad NO es métrica fiable. Keyword principal en: `<title>`, H1, primer párrafo, URL, y 1 sección.
- Secundarias: distribuir en H2/H3, FAQ, tablas. Trabajar con entidades y long-tail, no repetir frase exacta.
- Nada de keyword stuffing en alt ni en meta.

## Meta tags
- `<title>` ~50-60 caracteres, keyword al principio si es natural.
- `meta description` 140-160 caracteres, única y útil (no lista de keywords).
- Open Graph + Twitter Card obligatorios (og:title, og:description, og:image, og:url, og:type).
- `canonical` siempre (evitar duplicados entre paginacion y taxonomias: por coin vs por tipo).
- `dateModified` visible y en schema (Google penaliza contenido cripto con fecha vieja).

## Schema markup
- Base por artículo: `Article`/`BlogPosting` + `BreadcrumbList`.
- `FAQPage` solo si hay preguntas y respuestas visibles en la página.
- `HowTo` cuando el artículo es un tutorial paso a paso (coexiste con FAQ).
- `Review` SOLO si la reseña es real, con criterios y contenido visible. No inventar ratings.
- Incluir `author`, `datePublished`, `dateModified`, `publisher`, `mainEntityOfPage`.

## Imágenes
- Formato WebP/AVIF; JPEG/PNG solo si es necesario.
- `alt` breve y descriptivo (no spam de keywords). Nombre de archivo semántico.
- `width` y `height` explícitos para evitar CLS. Lazy load excepto la imagen above-the-fold.
- `srcset` para tamaños responsivos.

## Core Web Vitals (umbrales 2026)
- LCP <= 2.5 s · INP < 200 ms · CLS < 0.1.
- En cripto el enemigo es la suma de trackers, banners de afiliados, embeds y popups de consentimiento.
- Fuentes con `font-display: swap`; preload de la imagen principal; minimizar JS de terceros.

## GEO / AEO (motores de IA)
- Abrir con respuesta directa / TL;DR en las primeras ~50 palabras.
- Bloques: qué es · cómo funciona · pros y contras · riesgos · pasos · FAQ.
- Byline + bio del autor + "última actualización" visible. Citar fuentes primarias.
- `public/llms.txt` ya existe en el repo: mantenerlo actualizado con artículos recientes y entidades clave.

## Verificaciones técnicas del repo (ya presentes)
- `app/sitemap.ts` (incluir rutas ES y EN), `app/robots.ts` (excluir `/api/` y rutas de tracking).
- Topic clusters: artículo pilar + satélites enlazados, no posts sueltos.

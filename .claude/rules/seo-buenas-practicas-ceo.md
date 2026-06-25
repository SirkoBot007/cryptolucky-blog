# 7 trucos SEO del CEO — buenas prácticas permanentes (CryptoLucky)
> Norma directa del CEO (2026-06-23). Aplicar SIEMPRE. Adaptado a nuestro stack Next.js 14 (no WordPress).

## 1. Keyword research ANTES de crear contenido
- Nunca escribir sin estudio previo de palabras clave (intención, volumen, competencia). Usar herramientas, aunque sean gratis (Google Search Console, Google Trends, "búsquedas relacionadas", People Also Ask, Keyword Planner, AnswerThePublic gratis).
- Confirmar con Perplexity la intención y los términos reales antes de redactar (parte del workflow de artículos).

## 2. "Plugins SEO" → en Next.js, su equivalente nativo
- No usamos plugins de WordPress. El equivalente: la **Metadata API de Next.js** (ya en uso), schema JSON-LD, sitemap.ts/robots.ts, y NUESTRAS skills (`cryptolucky-seo`) que automatizan la verificación on-page. Mantenerlas y usarlas en cada artículo = ahorro de tiempo y optimización fácil.

## 3. Optimizar meta tags SIEMPRE (se muestran en el buscador)
- **Title** (~50-60c, keyword al inicio), **meta description** (140-160c, única, con gancho), **URL/slug** corto y descriptivo. Open Graph + Twitter Card. Canonical. (Detalle en `seo.md`.)

## 4. CONTENIDO ORIGINAL — ¡MUCHO OJO! (lo más importante)
- Textos 100% únicos. NUNCA copiar ni repetir contenido (ni de otros, ni duplicar entre nuestras propias URLs → canibalización). Google penaliza "scaled content" y duplicados.
- Cada artículo: ángulo propio, datos verificados, experiencia real (E-E-A-T). Verificar veracidad con Perplexity (no inventar).

## 5. Optimizar la carga de la web (Core Web Vitals)
- Comprimir/servir imágenes en WebP/AVIF, dimensiones fijas (evitar CLS), lazy-load (excepto above-the-fold).
- Solo dependencias necesarias (bundle mínimo); minimizar scripts y peticiones de terceros (ads, trackers, embeds).
- Objetivo: LCP ≤2.5s · INP <200ms · CLS <0.1. (`@vercel/speed-insights` ya monitoriza.)

## 6. NADA de Black Hat — ¡mucho cuidado!
- Prohibido: cloaking, keyword stuffing, PBNs, enlaces comprados manipulativos, doorway pages, contenido spineado/IA a escala, ocultar texto. Google penaliza y puede desindexar.
- Permitido y recomendado: **"spam de valor"** = difundir nuestros contenidos de calidad en sitios/comunidades relevantes aportando valor real (no spam vacío): responder con utilidad y enlazar cuando aporta, redes, foros cripto, etc. White hat siempre.

## 7. Mejora continua
- Aprender de GSC (qué rankea, qué no), iterar las mejores URLs, y registrar lecciones en el cerebro/skills.

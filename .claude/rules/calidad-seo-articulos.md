# Calidad SEO de artículos — método OBLIGATORIO (norma CEO permanente)
> Por qué: los artículos cortos/thin NO se indexan. Este es el estándar mínimo para CADA artículo, ahora (manual) y en la automatización n8n futura. Cargado bajo demanda. Creado: 2026-06-25.
> Regla madre: **investigar antes de escribir** (Perplexity Pro). Sin investigación no se escribe.

## 0 · Investigación PRIMERO (Perplexity Pro — innegociable)
Antes de escribir una sola línea, en un chat nuevo de Perplexity Pro (ver `perplexity-playbook.md`):
1. **Keyword principal** del tema + volumen/competencia aproximados.
2. **Long-tails** y variantes semánticas reales (preguntas que hace la gente).
3. **Intención de búsqueda** (informacional / comparativa / transaccional) y qué espera ver el usuario.
4. **SERP real**: qué rankea hoy, qué ángulo falta (hueco a explotar), entidades a cubrir.
> Salida de la investigación: keyword principal, 5-10 long-tails, intención, y outline de H2 que cubra el hueco. Pedir fuentes citadas. Si no se puede investigar, NO se publica.

## 1 · Estructura GEO/SEO obligatoria
- **Respuesta directa en la entrada (2-4 líneas)**: responde la pregunta principal en el primer párrafo (para AI Overviews / featured snippet / GEO).
- **H1 único** con la keyword principal; **H2/H3 lógicos** (jerarquía real, no decorativa).
- **Bloques mínimos** según tipo: *qué es · cómo funciona · pros y contras · riesgos/letra pequeña · cómo empezar (pasos)*. Comparativas → tabla.
- **FAQ** (3-6 preguntas long-tail reales) **con schema** `FAQPage` (ya soportado vía `faqs`).
- **Enlazado interno 3-8** a artículos/pilares existentes relevantes (anchor descriptivo). Cero huérfanos.
- **Afiliado**: CTA con `https://betfury.io/?r=LUCKYSIRKO007`, `rel="sponsored nofollow"` + **disclosure visible**.
- **E-E-A-T**: firma Sirko007, experiencia real/verificable (cuenta BetFury), datos concretos, nada inventado.
- **Imágenes** con `alt` descriptivo (keyword cuando aplique); miniatura temática por slug.
- **Meta**: `title` ≤60 car. con keyword + gancho (CTR); `description` 140-160 car. con keyword + propuesta de valor.

## 2 · Profundidad mínima (evitar thin content)
- **Orientativo 1.200-1.800+ palabras** según competencia del término (informacional largo > comparativo > nicho). Mejor cubrir la intención completa que rellenar.
- **Contenido ORIGINAL y útil**: 0 relleno, 0 copia, 0 repetición entre artículos. Cada sección aporta algo que el lector no encuentra fácil en otro sitio.
- Densidad de keyword natural; cubrir entidades/sinónimos (no keyword-stuffing).

## 3 · Compliance (no negociable)
- **+18** y mensaje de **juego responsable** visible.
- **Mercados D16/permitidos** (LATAM): BetFury restringe España → enfoque y disclaimers según `geo-targeting-y-compliance.md`.
- Nada de promesas de ganancias; tono honesto (ver `afiliacion.md`).

## 4 · Edición segura + verificación
- Editar `lib/articles-data.ts` con la **norma de edición** (`convenciones.md`): 1-pocos = edición nativa exacta por `id`/`slug`; nunca reimprimir el array.
- **Verificación OBLIGATORIA:** `git diff` → `npx tsc --noEmit` → `next build` → (preview HTML para el CEO) → commit. Deploy solo con OK del CEO.

## 5 · Checklist de "Definition of Done" (manual y n8n)
`[ ]` keyword+long-tails+intención investigadas (Perplexity) · `[ ]` respuesta directa en intro · `[ ]` H1 único + H2/H3 · `[ ]` bloques qué es/cómo/pros-contras/riesgos · `[ ]` FAQ con schema · `[ ]` 3-8 enlaces internos · `[ ]` CTA afiliado + rel sponsored + disclosure · `[ ]` E-E-A-T Sirko007 · `[ ]` imágenes con alt · `[ ]` meta title/desc optimizados · `[ ]` ≥1.200 palabras útiles · `[ ]` +18/juego responsable · `[ ]` tsc+build OK.
> Para n8n: este checklist es el contrato de calidad del nodo generador; un artículo que no lo cumpla NO se publica.

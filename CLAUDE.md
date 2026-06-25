# CLAUDE.md — Cerebro del Blog CryptoLucky
> Memoria persistente del repo `cryptolucky-blog`. Claude la lee automáticamente al iniciar.
> **Índice maestro / PRIMERA LECTURA:** `.claude/memory/MEMORY.md` (mapa de dónde está cada cosa) + `.claude/memory/preferencias-ceo.md`.
> Mantener <200 líneas. El detalle largo vive en `.claude/rules/`. Última actualización: 2026-06-25.

---

## 🟢 Estado Actual
- **Producción:** cryptoluckyguia.com (`main`, deploy auto en Vercel). SEO técnico maduro; CRO Fases A/B/C en producción. En vivo: logo de marca + favicon transparente + OG por defecto + secuencia de emails + páginas de confianza.
- **Próximo paso (validado Perplexity):** ECOSISTEMA — Hub SEO de problemas (cat. 14), luego conversor/depósito mínimo y calculadora rakeback. Planes: `BLOG-BETFURY/ECOSISTEMA-MASTER-PLAN-2026-06-23.md` + `PLAN-TOPIC-CLUSTERS-2026-06-23.md`.
- **Backlog detallado:** `.claude/rules/backlog.md`. **Bloqueantes:** ninguno.

---

## 🏗️ Arquitectura
- **Stack:** Next.js 14.2.29 (App Router) + TypeScript + Tailwind + next-intl (`/es/`, `/en/`).
- **Hosting:** Vercel (plan Hobby), repo `SirkoBot007/cryptolucky-blog`, branch `main` → producción auto.
- **Contenido:** artículos estáticos en `lib/articles-data.ts` (array TS). Sin CMS externo.
- **Datos auxiliares:** `lib/author.ts`, `lib/pillar-faqs.ts`, `lib/email-sequences.ts`.
- **Referencia técnica (Notion schema, env vars, componentes):** `.claude/rules/proyecto-datos.md`.
- **Leads:** API `app/api/subscribe/route.ts` → Notion DB + email de bienvenida (Resend).
- **SEO técnico ya presente:** `app/sitemap.ts`, `app/robots.ts`, `public/llms.txt`, `public/og-default.png`.
- **Analytics:** GA4 `G-0L45J61W69`, evento `lead_capture`.
- **Compilador:** SWC. Carpetas clave: `app/[locale]/`, `app/api/`, `components/`, `lib/`.

---

## ⚙️ Convenciones (detalle en `.claude/rules/convenciones.md`)
- **NORMA CEO (PERMANENTE, ver `.claude/rules/norma-perplexity-y-objetivo.md`; pasos exactos en `.claude/rules/perplexity-playbook.md`):** ante CUALQUIER duda, decisión no trivial o FALLO/ERROR → consultar SIEMPRE a Perplexity Pro qué pasa y cómo resolverlo, antes de improvisar; NUNCA aprobar métodos por cuenta propia. Presentarse ante Perplexity como "Claude Code ayudando a Sirko007" y pedir tecnología de última generación 2026. OBJETIVO: captar REFERIDOS ACTIVOS (registro con LUCKYSIRKO007 que jueguen slots/deportivas/ruleta), no solo tráfico.
- **NORMA CEO:** toda auditoría/análisis del blog debe contemplar las 15 categorías del ecosistema (`.claude/rules/ecosistema-15-categorias.md`). Metodología: investigar (Perplexity) → justificar → priorizar → NUNCA ejecutar sin validación del CEO.
- **7 trucos SEO del CEO** (keyword research antes de escribir · meta tags · CONTENIDO ORIGINAL sin copiar/repetir · carga/CWV · NADA black hat, sí "spam de valor" white hat): `.claude/rules/seo-buenas-practicas-ceo.md`.
- **Gestión de memoria por capas** (cerebro <200 líneas, reglas <120, historial ≤8, archivar lo viejo): `.claude/rules/gestion-memoria.md`. Evita context-rot/alucinaciones.
- **PROTOCOLO DE AUTONOMÍA** (qué ejecutar sin preguntar vs qué requiere OK del CEO; "Perplexity para TODO"; aprendizaje continuo): `.claude/rules/protocolo-autonomia.md`. Objetivo del CEO: cada vez menos verificación manual.
- **AHORRO DE TOKENS (norma activa permanente)** — gastar SIEMPRE el mínimo: cerebro corto, detalle en reglas/skills, prompts concisos, no releer, routing Haiku/Sonnet/Opus: `.claude/rules/ahorro-de-tokens.md`.
- **ORGANIZACIÓN CONTINUA** (en cada avance: ordenar, archivar lo obsoleto a `_ARCHIVO` —nunca borrar—, actualizar el índice `.claude/memory/MEMORY.md`; enganchada al handoff): `.claude/rules/organizacion-continua.md`.
- TypeScript; no romper el build de SWC.
- **NORMA DE EDICIÓN de `articles-data.ts` (única y vigente; deroga «siempre Python»):** método más seguro por caso (1-pocos = edición nativa exacta por `id`/`slug`; cambio masivo = script Python quirúrgico in-place; refactor de campos = AST `ts-morph`). Verificación OBLIGATORIA: `git diff` → `npx tsc --noEmit` → `next build` → commit. Detalle en `.claude/rules/lecciones-aprendidas.md` y `convenciones.md`. Misma norma en el `CLAUDE.md` raíz.
- **CALIDAD SEO DE ARTÍCULOS (norma activa permanente):** TODO artículo (manual o n8n) cumple el método obligatorio de `.claude/rules/calidad-seo-articulos.md` — investigar keyword/long-tails/intención en Perplexity ANTES de escribir, estructura GEO, profundidad ≥1.200 palabras útiles (no thin), FAQ+schema, enlazado interno, E-E-A-T, compliance +18. Los thin no se indexan. Estructura GEO detallada en skill `cryptolucky-articulos`.
- Commits limpios (uno por cambio lógico); verificar UTF-8.

---

## 🚫 Reglas No Negociables
- `\'` (comilla simple escapada) en template literals TS = **BUILD FAILURE en SWC**. Usar `'` o `"`.
- Todo enlace de afiliado lleva `rel="sponsored nofollow"` + disclosure visible (ver `.claude/rules/afiliacion.md`).
- NO crear archivos `.bat` ni scripts temporales basura.
- NO commitear `.env.local`, secretos ni `*service-account*.json` (ya en `.gitignore`).
- NO exponer secretos en variables `NEXT_PUBLIC_*`.
- Código afiliado: `LUCKYSIRKO007` · Link: `https://betfury.io/?r=LUCKYSIRKO007` (en TODOS los CTAs).
- El contenido debe parecer escrito por Sirko007, nunca por una IA.

---

## 📋 Decisiones clave
> Decisiones técnicas del repo (resumen). Las decisiones estratégicas/de negocio aprobadas por el CEO viven en la fuente única: `DECISIONES_CEO.md` (raíz del workspace).

| Fecha | Decisión | Motivo |
|-------|----------|--------|
| 2026-06-21 | Derogada la regla "Python via bash obligatorio" para `articles-data.ts` | Usar el método más seguro según el caso |
| 2026-06-23 | Cerebro = `CLAUDE.md` en raíz del repo + skills en `.claude/skills/` | Auto-carga sin fricción (validado Perplexity) |
| 2026-06-23 | Override `BLOG-BETFURY/CLAUDE.md` reducido a puntero (`@import`) hacia este cerebro | Una sola fuente de verdad, sin duplicidad (validado Perplexity) |
| 2026-06-23 | Deploy oficial: rama/PR → Preview Vercel → `vercel promote` (validado Perplexity). `.bat` y push directo a main OBSOLETOS | Cero downtime, preview y rollback instantáneo |

---

## 📖 Glosario y Entidades
- **GEO/AEO:** optimización para ser citado por motores de IA (ChatGPT, Perplexity, Google AI Overviews).
- **BetFury:** casino/casa cripto afiliada. Código `LUCKYSIRKO007`.
- **Topic cluster:** artículo pilar + satélites enlazados entre sí.
- **Lead form:** 3 variantes (inline, exit-intent popup, sticky).
- **RacoonFury:** mascota/banner de BetFury usado en sidebar y artículos.

---

## ✅ Tareas
> Backlog completo (pendientes/resueltas/completadas) en `.claude/rules/backlog.md`. Backlog estratégico del workspace en `TAREAS.md` (raíz).
- **Foco actual:** integrar los 7 drafts FINALES en `articles-data.ts` + deploy (push del CEO); luego ECOSISTEMA (Hub cat. 14).

---

## 🐛 Bugs y Lecciones
> Registro completo en `.claude/rules/lecciones-aprendidas.md` (apuntar ahí cada lección nueva → menos verificación del CEO). Lo más recurrente:
- **🔴 COMPLIANCE:** BetFury restringe España → target = LATAM permitido; disclaimers obligatorios (ver `geo-targeting-y-compliance.md`).
- **DEPLOY/git:** `push`/`merge`/`deploy` los autoriza y ejecuta el CEO (línea roja); NUNCA usar el PAT de `_SECRETOS`.
- **SWC:** comillas escapadas (`\'`) en template literals rompen el build.
- **Vercel ≠ type-check:** `next.config.mjs` tiene `ignoreBuildErrors:true`; correr `npx tsc --noEmit` aparte antes de publicar.

---

## 📅 Historial comprimido (máx 8, resto → `_ARCHIVO/historial-cerebro.md`)
- [2026-06-25] Cerebro ACTIVADO en `main` (traídos rules+skills+`CLAUDE.md` desde rama release `59b6817`, sin merge del resto). Logo de marca + versión transparente desplegados (favicon/OG/cabecera). Corrupción `articles-new.ts` (Chunk B Panamá huérfano) saneada; scripts de un solo uso retirados. Nuevas reglas: ahorro-tokens reforzada, índice `.claude/memory/MEMORY.md`, `organizacion-continua.md`, memoria `preferencias-ceo.md`.
- [2026-06-24] Conversión CRO Fases A/B/C en producción; ramas `feat/cro-fase-a|b|c` merged. Cerebro optimizado (ahorro de tokens): backlog y detalle movidos a `.claude/rules/`.
- [2026-06-23] Sesión maratón (validada con Perplexity): cerebro + 12 reglas + 6 skills; auditoría real (bugs P0 del override ya resueltos); x-default 11 pillars (tsc OK); compliance España→LATAM (footer + España archivada/redirigida); artículo #1 FINAL; runbooks indexación/deploy; 7 trucos SEO; gestión de memoria por capas.
- [2026-06-23] Norma permanente: consultar Perplexity ante fallos/decisiones; presentarse como Claude Code; objetivo = referidos ACTIVOS LATAM. (`norma-perplexity-y-obje
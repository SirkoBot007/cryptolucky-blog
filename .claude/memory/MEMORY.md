# MEMORY.md — Índice maestro del cerebro CryptoLucky
> **PRIMERA LECTURA del agente.** Mapa de "dónde está cada cosa" para no buscar a ciegas.
> Mantener corto (ahorro de tokens). Apunta; no duplica contenido. Actualizado: 2026-06-25.

## 📌 Regla de oro de lectura (qué cargar y cuándo)
1. **Siempre:** este `MEMORY.md` + `CLAUDE.md` (cerebro, capa 0) + `memory/preferencias-ceo.md`.
2. **Al trabajar el blog:** solo la(s) regla(s) de `.claude/rules/` del dominio de la tarea (capa 1, bajo demanda).
3. **Skill** del workflow concreto (`.claude/skills/`) cuando ejecutes ese workflow.
4. **Histórico/`_ARCHIVO/`:** nunca, salvo necesidad concreta.
> No leas todo el cerebro de golpe: progressive disclosure (ver `.claude/rules/gestion-memoria.md`).

## 🧠 Capas del cerebro
- **Capa 0 — `CLAUDE.md`** (raíz del repo): índice + reglas esenciales. Auto-carga. <200 líneas.
- **Capa 1 — `.claude/rules/*.md`**: detalle modular, bajo demanda (lista abajo).
- **Capa 2 — `_ARCHIVO/`**: historial viejo, no auto-carga.
- **Memoria — `.claude/memory/`**: este índice + preferencias CEO + sesiones.

## 📂 Reglas `.claude/rules/` (capa 1 — leer solo la del dominio)
| Fichero | Cuándo leerlo |
|---|---|
| `ahorro-de-tokens.md` | **Siempre operativa** (Regla A): gastar el mínimo de tokens. Routing Haiku/Sonnet/Opus. |
| `gestion-memoria.md` | Mantener/comprimir el cerebro; límites duros anti context-rot. |
| `organizacion-continua.md` | **En CADA avance** (Regla C): marcar/ordenar/archivar/actualizar índice. |
| `protocolo-autonomia.md` | Qué ejecutar sin preguntar vs qué requiere OK del CEO. |
| `norma-perplexity-y-objetivo.md` + `perplexity-playbook.md` | Ante duda/fallo/decisión: investigar en Perplexity Pro antes de actuar. |
| `convenciones.md` | Editar `articles-data.ts`, naming, commits, UTF-8. |
| `lecciones-aprendidas.md` | Error parecido o decisión delicada (registro de lecciones). |
| `seo.md` · `seo-buenas-practicas-ceo.md` · `indexacion-y-medicion.md` | Tareas SEO/medición. |
| `afiliacion.md` · `geo-targeting-y-compliance.md` | Enlaces afiliado, disclosures, compliance LATAM. |
| `proyecto-datos.md` | Notion schema, env vars, componentes. |
| `ecosistema-15-categorias.md` · `topic-clusters.md` · `backlog.md` · `calidad-y-poda-contenido.md` · `workflow-articulos-y-diseno.md` | Estrategia de contenido/ecosistema. |

## 🛠️ Skills `.claude/skills/` (activan por su descripción)
`cryptolucky-cerebro` (bootstrap/handoff de memoria) · `cryptolucky-articulos` · `cryptolucky-seo` · `cryptolucky-deploy` · `cryptolucky-compliance` · `cryptolucky-analytics`.

## 🗃️ Memoria `.claude/memory/`
- `preferencias-ceo.md` — preferencias estables del CEO (Regla D). Leer siempre.
- `sesiones/AAAA-MM-DD.md` — resumen por sesión (handoff). Solo el último es relevante.

## 🔑 Ficheros clave del repo (fuente de verdad)
- **Artículos (NO duplicados — complementarios):** `lib/articles-data.ts` es la fuente principal y **importa** `ARTICLES_NEW` de `lib/articles-new.ts` (lote nuevo); el sitio los combina. **Ambos son fuente de verdad y se usan juntos — NO archivar ninguno** (rompería el build). Contenido estático, NO en Notion.
- **Autor/marca:** `lib/author.ts` · logo `public/cryptolucky-logo.png` (con fondo) y `public/cryptolucky-logo-transparent.png` (sin fondo).
- **SEO:** `app/sitemap.ts`, `app/robots.ts`, `public/og-default.png`, favicon en `app/`.
- **Leads:** `app/api/subscribe/route.ts` → Notion + Resend. Secuencia: `lib/email-sequences.ts`.
- **Overrides CEO (no en git):** `CLAUDE.local.md`.

## 🌐 Gobernanza del workspace (raíz `PROYECTOS CLAUDE/`)
- `CLAUDE.md` (universal) · `AUDIT_SPECS.md` · `DECISIONES_CEO.md` · `TAREAS.md` · `ESTADO_ACTUAL.md` · `HANDOFF.md` · `BITACORA-SESIONES.md`.
- Índice del workspace completo: `INDICE.md` (raíz). Secretos: `_SECRETOS/`. Archivo: `_ARCHIVO/`.

## ✅ Reglas nuevas (2026-06-25)
- **A · Ahorro de tokens:** `ahorro-de-tokens.md` (norma activa permanente).
- **B · Índice/mapa:** este `MEMORY.md` + `INDICE.md` (raíz workspace).
- **C · Organización continua:** `organizacion-continua.md` (ordenar/archivar/indexar en cada avance).
- **D · Cerebro que aprende:** registrar lecciones (`lecciones-aprendidas.md`) y preferencias (`preferencias-ceo.md`) cada sesión; recomendar mejores prácticas; investigar en Perplexity.

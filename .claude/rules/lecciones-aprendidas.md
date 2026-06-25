# Lecciones Aprendidas — CryptoLucky
> Registro acumulativo. Cada vez que se resuelve algo no obvio, se apunta aquí (1 línea datada). Es lo que hace que cada sesión necesite MENOS verificación del CEO: lo ya resuelto no se vuelve a preguntar. Revisar al empezar cualquier tarea. Complementa la sección "Bugs y Lecciones" del `CLAUDE.md` (esa queda corta; el detalle persistente vive aquí).

> Formato: `- [AAAA-MM-DD] Tema — qué se aprendió / cómo se resolvió (fuente si aplica).`

---

## Métodos y herramientas
- [2026-06-24] **Edición de `articles-data.ts`** — NO es "siempre Python". Por caso: 1-pocos artículos = edición nativa exacta por `id`/`slug`; mismo cambio masivo = script Python quirúrgico in-place (UTF-8, abortar si nº coincidencias != esperado, nunca reimprimir el array); refactor de campos = AST `ts-morph`, no regex. Verificar siempre `git diff` -> `tsc` -> `build`. Norma completa en `CLAUDE.md` (raíz y repo). (Investigación verificada vía Perplexity.)
- [2026-06-24] **`git push` SÍ funciona** desde el sandbox (`credential.helper=store`, verificado con PR #2). La nota antigua "push bloqueado en sandbox" era OBSOLETA. Aun así, push/merge/deploy los autoriza el CEO; NUNCA usar el PAT de `_SECRETOS`.
- [2026-06-24] **El mount del sandbox NO permite borrar ficheros** (`rm`/`mv` dan "Operation not permitted"; resolver locks con rename donde se pueda). Consecuencia: no crear ficheros temporales en el repo — solo crear lo definitivo. Los `.git` locks se resuelven sin `rm`.
- [2026-06-24] **El verde de Vercel NO cubre el type-check** — `next.config.mjs` tiene `typescript.ignoreBuildErrors: true`, así que el build de Vercel pasa aunque haya errores de tipos. Correr SIEMPRE `npx tsc --noEmit` aparte antes de publicar.
- [2026-06-23] **SWC build** — comillas simples escapadas (`\'`) dentro de template literals TS rompen el build. Usar `'` o `"`.
- [2026-06-24] **Hook CockroachDB `check-sql-files.py`** — da error en cada Edit/Write de esta sesión por una instancia cargada en memoria; ya está desactivado en config. Es ruido inofensivo: la edición SÍ se aplica. Desaparece al reiniciar Claude. No tocar la config (sería un error).

## Estrategia y contenido
- [2026-06-24] **Compliance / mercados** — BetFury restringe EE. UU., España y (por la norma cripto) Brasil. Target = LATAM permitido (Colombia, Perú núcleo; Ecuador/Panamá/Costa Rica ampliación). Nunca afirmar disponibilidad universal; disclaimer "verifica tu jurisdicción". (Decisión D16, Perplexity Pro.)
- [2026-06-24] **Objetivo futuro del CEO (pendiente de investigar a fondo)** — sistema automatizado que investigue lo que publica la competencia y genere artículos originales MEJORADOS (sin copiar) para el blog.
- [2026-06-23] **Auditar el código real, no listas heredadas** — el override viejo listaba bugs P0 (i18n/schema/imágenes) que el código YA tenía resueltos desde el 21-jun. Antes de "arreglar", verificar el estado real.
- [2026-06-23] **i18n intencionado** — los artículos solo existen en ES; `/en/blog/*` redirige 308 a ES + noindex. NO es un bug.

## Gobernanza / proceso
- [2026-06-24] **ID de decisión duplicado** — D13 se usó dos veces (Marca SIRKO007 19/06 y Fase A 24/06). Al renumerar, mover el segundo a un ID libre (D17) y dejar nota "renumerado desde D13"; ajustar el índice. Trazabilidad > limpieza.
- [2026-06-24] **Una norma, una fuente** — cuando una regla se deroga (p. ej. "siempre Python"), actualizarla en TODOS los `CLAUDE.md` que la mencionen, no solo en uno, para no dejar contradicciones entre la raíz y el repo.
- [2026-06-24] **Discrepancia nombre-carpeta vs doc** — la doc decía `01-WEBS-Y-BLOGS` (con S) pero la carpeta real en disco es `01-WEBS-Y-BLOG` (sin S). Mejor práctica: el sistema de archivos es la fuente de verdad; NO renombrar la carpeta (rompería rutas y el repo git que cuelga dentro) — corregir la documentación. Aplicado en los 4 archivos activos (CLAUDE.md, DECISIONES_CEO.md, OFERTA_PRODUCTO.md, TAREAS.md). En decisiones del CEO (D09) no se borra el texto: se corrige y se añade nota datada. Los snapshots en `_ARCHIVO/` se dejan intactos (son 
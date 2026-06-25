# Organización continua — protocolo anti-desorden (norma CEO permanente)
> Objetivo: no volver a acumular caos. En CADA avance se ordena, se archiva y se actualiza el índice, para no repetir limpiezas grandes. Cargado bajo demanda. Creado: 2026-06-25.

## Principio
"Pon la información donde cambia": lo que solo afecta a un proyecto vive en ese proyecto; lo transversal, una sola vez en la raíz. Cada cosa, **una sola fuente de verdad**.

## En cada avance (durante el trabajo)
1. **Crear en el sitio correcto, con buen nombre.** `kebab-case`; nombrar por intención (`publicar-articulo.md`, no `notas.md`). Prohibido `temp`, `new`, `final-final`, `notas2`, `.bat`.
2. **No duplicar.** Si ya existe un doc del tema, edítalo; no crees una segunda versión.
3. **Archivar, no borrar.** Lo obsoleto/duplicado → `_ARCHIVO/` (o `archive/` del proyecto) con una nota: qué es, por qué se archivó y fecha. Nunca borrado destructivo de contenido.
4. **Sin scripts sueltos de un solo uso** en el repo (usa comandos inline; si dejas uno, archívalo al terminar).

## Al cerrar la sesión (handoff — engánchalo aquí)
1. Ejecutar la skill `cryptolucky-cerebro` (diff de `CLAUDE.md`: Estado Actual, Decisiones, Lecciones, Historial).
2. **Actualizar el índice** `.claude/memory/MEMORY.md` (y `INDICE.md` raíz) si cambió la estructura, se movió/creó/archivó algo, o se añadió una regla/skill.
3. Registrar lecciones nuevas en `.claude/rules/lecciones-aprendidas.md` y preferencias nuevas del CEO en `.claude/memory/preferencias-ceo.md`.
4. Añadir 1 línea a la sesión `.claude/memory/sesiones/AAAA-MM-DD.md` y a `BITACORA-SESIONES.md` (raíz, máx 5; la 6ª → `_ARCHIVO/`).
5. **Chequeo de límites** (ver `gestion-memoria.md`): comprimir/archivar si algo excede su tope.

## Disparadores
- Mover/renombrar documentos → actualizar el índice en el mismo commit.
- Crear regla/skill nueva → añadirla a `MEMORY.md`.
- Detectar duplicado/obsoleto → archivar en el momento, no "luego".

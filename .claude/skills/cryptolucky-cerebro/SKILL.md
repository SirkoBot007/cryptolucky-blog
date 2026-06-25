---
name: cryptolucky-cerebro
description: Gestiona la memoria persistente del blog CryptoLucky (CLAUDE.md). Bootstrap al inicio de sesión (resume el estado) y handoff al cierre (propone diffs y actualiza). Úsala cuando el usuario diga "estado del proyecto", "dónde quedamos", "cerrar sesión", "actualiza el cerebro", "handoff" o al empezar/terminar de trabajar en el blog.
---

# CryptoLucky · Gestión del Cerebro

## Objetivo
Mantener `CLAUDE.md` (raíz del repo) y `.claude/rules/` coherentes y actualizados, sin inflar el contexto.

## Bootstrap (inicio de sesión)
1. Leer `CLAUDE.md` (y `CLAUDE.local.md` si existe; si no, ofrecer crearlo desde plantilla).
2. Resumir en 3 líneas: estado actual, próximo paso y bloqueantes.
3. Correlacionar con `git log --oneline -10` para ver qué cambió desde la última sesión.
4. Preguntar: ¿qué trabajamos hoy?

## Handoff (cierre de sesión)
1. Revisar lo hecho en la sesión.
2. Proponer un **diff** (no reescritura completa) para:
   - `## Estado Actual` (nuevo próximo paso, ≤15 líneas).
   - `## Decisiones clave` (si hubo decisiones, con motivo).
   - `## Bugs y Lecciones` (fixes difíciles).
   - `## Historial comprimido` (1 línea datada `[AAAA-MM-DD]`).
3. El CEO confirma antes de aplicar.
4. **Chequeo de límites (ver `.claude/rules/gestion-memoria.md`):** medir `wc -l` del cerebro y reglas; si el cerebro >180 líneas o una sección excede su tope (Estado Actual >15, historial >8, bugs >8), comprimir y archivar a `_ARCHIVO/historial-cerebro.md` ANTES de cerrar. Ninguna regla debe superar 120 líneas.

## Reglas
- Persistir solo lo que cambia el comportamiento futuro: decisiones, bugs, estado, convenciones. NUNCA conversación literal.
- El procedimiento vive aquí (skill), no dentro de `CLAUDE.md` (separar datos del cómo).
- Mantener `CLAUDE.md` < 200 líneas; Estado Actual < 15 líneas.

## Salida
- Resumen de 3 líneas (bootstrap) o diffs propuestos por fichero (handoff) para aprobación del CEO.

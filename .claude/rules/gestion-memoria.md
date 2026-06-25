# Gestión de memoria por capas — anti context-rot (norma CEO permanente)
> Objetivo: que los ficheros de memoria NUNCA crezcan en exceso → evitar errores/alucinaciones y pérdida de hilo. Basado en context engineering validado con Perplexity.

## Sistema de 3 capas (separar + cargar solo lo importante)
- **Capa 0 — Cerebro `CLAUDE.md`** (ÍNDICE, se auto-carga siempre): solo lo esencial y punteros. Nada de detalle largo.
- **Capa 1 — `.claude/rules/*.md`** (DETALLE modular, se carga BAJO DEMANDA): una regla por dominio, enfocada y acotada. El grueso del conocimiento vive aquí, no en el cerebro.
- **Capa 2 — Archivo histórico** (`_ARCHIVO/historial-cerebro.md`, `_ARCHIVO/bitacora-historico.md`): historial viejo, decisiones >30 días, lecciones consolidadas. NO se auto-carga; se consulta solo si hace falta.

## Límites duros (no superar)
| Fichero | Límite | Si se supera |
|---------|--------|--------------|
| `CLAUDE.md` (cerebro) | **< 200 líneas** (ideal 120-150) | comprimir/archivar sin demora |
| Sección "Estado Actual" | **≤ 15 líneas** | mover detalle a su sección/regla |
| Historial comprimido | **≤ 8 entradas** | la 9ª desplaza la más antigua → `_ARCHIVO/historial-cerebro.md` |
| Bugs y Lecciones | **≤ 8 ítems** | consolidar; lecciones viejas → archivo |
| Tareas completadas listadas | **≤ 6** | el resto, fuera (ya está hecho) |
| Cada regla `.claude/rules/*.md` | **< 120 líneas** | dividir en sub-reglas por subtema |
| `BITACORA-SESIONES.md` | **5 entradas** | la 6ª → `_ARCHIVO/bitacora-historico.md` |

## Principios
- **Progressive disclosure:** el cerebro apunta; la skill/regla relevante se lee solo cuando la tarea lo pide.
- **Comprimir, no acumular:** el historial son líneas de 1 frase datadas `[AAAA-MM-DD]`, nunca conversación literal.
- **Una sola fuente de verdad** por tema (sin duplicar entre cerebro y reglas).
- **Archivar, no borrar:** lo viejo va al archivo; nada se pierde, pero no infla el contexto activo.

## Protocolo de mantenimiento (lo ejecuta la skill `cryptolucky-cerebro` en el handoff de cierre)
1. Medir tamaños (`wc -l` del cerebro y reglas).
2. Si el cerebro > 180 líneas o cualquier sección excede su tope → comprimir/archivar antes de cerrar.
3. Consolidar entradas del mismo día en el historial.
4. Confirmar que ninguna regla supera 120 líneas; si una crece, dividirla.

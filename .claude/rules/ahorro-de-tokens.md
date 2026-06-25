# Estrategia de Ahorro de Tokens — CryptoLucky
> Cargado bajo demanda. Por qué importa: el cerebro/`CLAUDE.md` se paga en CADA sesión; todo lo que sobra ahí cuesta dinero siempre. Objetivo: máximo resultado, mínimo gasto. Verificado 2026-06-24.

## Las 11 prácticas
1. **Modelo barato por tarea.** Routing por dificultad (tabla abajo). No usar Opus para trabajo mecánico.
2. **Cerrar agentes/subagentes al terminar.** No dejar contexto abierto consumiendo.
3. **Cerebro corto** (`CLAUDE.md` < ~200 líneas). Solo lo estable y esencial; el detalle largo, en `.claude/rules/` o skills.
4. **Instrucciones especializadas en skills, no en el contexto base.** Lo que solo se usa a veces no debe pagarse siempre.
5. **Prompts concisos con 4 piezas:** objetivo + archivos a tocar + criterio de éxito + qué NO tocar. Nada de relleno.
6. **Evitar releer archivos grandes.** Editar por coincidencia exacta; no reabrir un fichero ya editado para "verificar" (la herramienta ya falla si no aplica).
7. **Delegar salida verbosa a subagentes.** El subagente lee mucho y devuelve solo la conclusión; el contexto principal no se llena.
8. **`/clear` y `/compact` con disciplina.** Limpiar entre tareas no relacionadas; compactar hilos largos.
9. **Aprovechar prompt caching con prefijo estable.** No reordenar el cerebro a cada rato: un prefijo constante se cachea y abarata.
10. **Tareas pequeñas y autónomas.** Trocear el trabajo evita arrastrar contexto innecesario.
11. **Arquitectura orquestador + subagentes con contexto mínimo.** Cada subagente recibe solo lo que necesita, no todo el proyecto.

## Routing de modelos
| Modelo | Cuándo |
|--------|--------|
| **Haiku** | Subtareas mecánicas: renombrados, formato, búsquedas simples, ediciones triviales, resúmenes cortos. |
| **Sonnet** | Por defecto: la mayoría del trabajo (código, contenido, edición, análisis normal). |
| **Opus** | Solo razonamiento complejo: arquitectura, decisiones difíciles, depuración no trivial, planificación estratégica. |

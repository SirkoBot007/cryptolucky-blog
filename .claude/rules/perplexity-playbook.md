# Perplexity Pro — Manual reutilizable (vía Claude in Chrome)
> Pasos EXACTOS y verificados para que cualquier agente futuro consulte Perplexity Pro sin fricción. Complementa la norma "Perplexity para TODO" (`protocolo-autonomia.md` y `CLAUDE.md` raíz). El CEO tiene suscripción Pro activa.

---

## Cuándo usarlo
Ante cualquier duda factual o estratégica importante (mercado, normativa, precios, tendencias SEO, novedades de herramientas, métodos que el agente no domine al 100 %) → consultar Perplexity ANTES de responder de memoria o de preguntar al CEO.

## Reglas de oro
- **Un tema = un CHAT NUEVO.** Pulsar "Nuevo" antes de cada tarea. NUNCA continuar un hilo previo (evita contaminación de contexto).
- Entrar **como Claude (Claude Code/Cowork ayudando a Sirko007)**, NUNCA haciéndose pasar por el CEO.
- Usar el modo **"Búsqueda/Pro"**, NO el modo de pago **"Computer"** (consume créditos).
- Pedir SIEMPRE **fuentes citadas** y que avise si algo no está confirmado.
- **Verificar** los hallazgos con al menos una segunda fuente (WebSearch u otra) antes de concluir.
- Si Chrome no está conectado → **reportarlo al CEO**, no inventar la respuesta.

---

## Pasos que FUNCIONAN (verificados)

1. **Cargar las herramientas de Chrome.** Si los `mcp__Claude_in_Chrome__*` están diferidos, cargarlos con ToolSearch en UNA sola llamada, p. ej.:
   `ToolSearch { query: "select:mcp__Claude_in_Chrome__tabs_context_mcp,mcp__Claude_in_Chrome__navigate,mcp__Claude_in_Chrome__find,mcp__Claude_in_Chrome__computer,mcp__Claude_in_Chrome__get_page_text,mcp__Claude_in_Chrome__read_page,mcp__Claude_in_Chrome__tabs_create_mcp", max_results: 8 }`
   Si no hay navegador conectado (`list_connected_browsers` vacío) → pedir al CEO que abra Chrome con la extensión de Claude. No continuar a ciegas.

2. **Abrir Perplexity.** `navigate` a `https://www.perplexity.ai`. Para un tema nuevo, abrir pestaña nueva (`tabs_create_mcp`) o pulsar el botón "Nuevo/New Thread" de la propia web — una tarea = un chat limpio.

3. **Localizar el cuadro de entrada.** OJO: es un `div` **contenteditable**, NO un `<input>`/`<textarea>` normal. Localizarlo con `find` (texto tipo "Ask anything"/"Pregunta lo que sea") antes de escribir.

4. **Escribir la pregunta.** Hacer `click` en el contenteditable y escribir el texto. Si teclear falla o es lento, inyectar el texto con un evento `paste` en el editor (no teclear carácter a carácter). Redactar la pregunta con contexto: quién eres (Claude ayudando a Sirko007), el objetivo (referidos activos LATAM de BetFury si aplica) y pedir fuentes 2026 actualizadas.

5. **Enviar.** Pulsar `Enter` (o el botón de envío).

6. **Esperar y leer.** Esperar a que termine de generar (la respuesta deja de crecer). Leer el texto + las **fuentes citadas** con `get_page_text` o `read_page`. Si la respuesta es parcial o sin fuentes, repreguntar en el MISMO chat solo si es del mismo tema; si cambia el tema, abrir chat nuevo.

7. **Validar.** Contrastar lo clave con una segunda fuente (WebSearch u otra) antes de dar el dato por bueno. Apuntar la conclusión y la fuente en `lecciones-aprendidas.md` si es reutilizable.

---

## Errores típicos a evitar
- Escribir en el sitio equivocado porque el editor no es un input normal → usar `find` + contenteditable.
- Reutilizar un chat viejo → respuestas contaminadas. Siempre chat nuevo por tema.
- Activar el modo "Computer" (de pago) por error → quedarse sin créditos. Usar "Búsqueda/Pro".
- Hacerse pasar por el CEO → prohibido. Presentarse como Claude.
- Dar por cierto un dato sin segunda fuente.

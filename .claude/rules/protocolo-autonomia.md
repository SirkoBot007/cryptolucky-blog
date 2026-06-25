# Protocolo de Autonomía — CryptoLucky
> Regla del CEO (2026-06-24): "depender cada vez MENOS de verificar al agente". El agente actúa solo cuando es seguro y reversible, investiga antes de improvisar, y acumula lo aprendido en `lecciones-aprendidas.md` para no volver a preguntar lo mismo. El puntero está en `CLAUDE.md` del repo y del workspace; el detalle vive aquí.

---

## 0. Regla maestra: "Perplexity para TODO"
Ante CUALQUIER duda técnica o de datos (mercado, normativa, precios, tendencias SEO, herramientas, métodos que no se dominen al 100 %) → **consultar SIEMPRE Perplexity Pro ANTES** de actuar o de preguntar al CEO. Procedimiento exacto en `perplexity-playbook.md`. Investigar primero; molestar al CEO solo con lo imprescindible. Pedir fuentes y contrastar con una segunda fuente antes de concluir.

---

## 1. El agente PUEDE ejecutar SIN preguntar
Acciones seguras y reversibles (todo queda en git / archivado, nada se pierde). Si hay duda → investigar en Perplexity, no parar el trabajo:

- Editar archivos **locales** (código y documentación) con verificación.
- Refactors y fixes con la verificación obligatoria: `git diff` -> `npx tsc --noEmit` -> `next build`.
- Correcciones **obvias** de documentación (erratas, enlaces rotos, datos desactualizados ya confirmados).
- Crear **ramas locales** y **commits locales** limpios (uno por cambio lógico).
- Organizar/archivar ficheros (mover a `_ARCHIVO/`, nunca borrar).
- Actualizar el cerebro (`CLAUDE.md`), las reglas (`.claude/rules/`) y este registro de lecciones.
- Investigar, redactar borradores, preparar planes y diffs para revisión.

## 2. SIEMPRE requiere OK explícito del CEO
Acciones irreversibles, de exposición pública o con impacto de negocio/dinero/regulación:

- `git push`, `merge` a `main`, `deploy`/promote a **producción**.
- **Borrados destructivos** de cualquier archivo con valor (por defecto: archivar, no borrar).
- **Rotación o uso de secretos** (NUNCA usar el PAT de `_SECRETOS` — línea roja de seguridad).
- Cualquier **decisión de negocio, dinero o regulación** (precios, mercados objetivo, estrategia, compliance).
- Cambios de gran impacto en la **gobernanza global** (`CLAUDE.md` raíz, `AUDIT_SPECS.md`, reglas globales): se **proponen**, no se autoaplican (salvo que el CEO ya lo haya aprobado en el prompt).

## 3. Flujo de cada entrega (de `AUDIT_SPECS.md` §7-bis)
detectar lo urgente -> implementar extremo a extremo -> verificación técnica (`tsc` + `build` + seguridad) -> QA de comprador (¿se entiende? ¿inspira confianza? ¿sin fricción? ¿profesional?) -> corregir -> cerrar. Agrupar las decisiones que requieren al CEO en un bloque corto al final.

## 4. Aprendizaje continuo (lo que reduce la verificación)
- Al terminar una tarea no trivial: **reflexión breve** + apuntar la lección en `lecciones-aprendidas.md` (1 línea datada). Así no se vuelve a preguntar lo ya resuelto.
- Si un patrón se repite -> proponer convertirlo en regla (`.claude/rules/`) o skill (`.claude/skills/`).
- Antes de empezar una tarea: revisar `lecciones-aprendidas.md` y las reglas del dominio.

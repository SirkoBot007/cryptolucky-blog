# Convenciones de Código — CryptoLucky (detalle)
> Cargado bajo demanda. Stack: Next.js 14.2.29 App Router + TypeScript + Tailwind + next-intl.

## TypeScript / SWC
- NUNCA usar `\'` (comilla simple escapada) en template literals → BUILD FAILURE en SWC. Usar `'` o `"`.
- TypeScript estricto en lo posible; verificar `next build` antes de dar por bueno un cambio.
- Verificar UTF-8 antes de commits.

## Contenido (articles-data.ts)
- Es un array TypeScript estático grande. Editarlo con el método más seguro y adecuado al caso
  (script puntual, edición dirigida o regeneración) — NO hay regla obligatoria de "Python via bash" (derogada 2026-06-21).
- Antes de inserciones grandes, validar que el TS sigue compilando (`next build`).

## i18n (next-intl)
- Rutas `/es/` y `/en/`. Cada contenido nuevo debe existir en ambos idiomas o gestionar el fallback.
- Pendiente conocido: `/en/blog/[slug]` sirve ES; añadir hreflang.

## Git / commits
- Un commit por cambio lógico, mensaje claro (estilo Conventional Commits recomendado).
- No mezclar refactor + contenido + fix urgente en el mismo push.
- No `.bat` ni scripts temporales basura en el repo.

## Componentes
- Server Components por defecto; `"use client"` solo cuando haga falta (forms, popups, interactividad).
- Componentes clave: `LeadCaptureForm.tsx` (3 variantes), `ExitIntentPopup.tsx`, `MobileNav.tsx`.

---
name: cryptolucky-deploy
description: Checklist de deploy seguro a producción del blog CryptoLucky (Next.js 14 en Vercel, repo SirkoBot007/cryptolucky-blog). Úsala cuando el usuario diga "deploy", "subir a producción", "publicar la web", "hacer push", "lanzar cambios" o antes de promover a producción.
---

# CryptoLucky · Deploy Seguro

## Objetivo
Llevar cambios a producción (cryptoluckyguia.com) sin downtime, con preview previo y rollback fácil.

## Método oficial (validado en Perplexity Pro, 2026 — fuentes Vercel)
Patrón profesional: **PR previewado → validar → promover a producción**. NO push directo a `main`.
1. El agente trabaja en una **rama/PR** con commits limpios (nunca push directo a `main`).
2. Vercel genera una **Preview URL** automática para la rama/PR.
3. Validar la preview (ver smoke test) y obtener aprobación del CEO.
4. Promover a producción con **`vercel promote <deployment-url>`** (o merge aprobado a `main`).
   - Diferenciar: `vercel deploy` (preview/staged) → `vercel promote` (publicar). Evitar `vercel --prod` como camino normal.
5. Si el `git push` desde el sandbox falla por límites de filesystem, usar el MCP/CLI de Vercel para desplegar.
- **OBSOLETO:** archivos `.bat`, push automático a `main` desde sandbox, `vercel --prod` directo.

## Pre-deploy (verificación local)
1. `npm run lint` pasa.
2. `npx tsc --noEmit` pasa (type-check).
3. `npm run build` (`next build`) pasa — NO publicar si falla.
4. Sin `\'` en template literals (rompe SWC); sin imports rotos ni mezcla cliente/servidor incorrecta.
5. `.env.local` NO commiteado; secretos solo en Vercel; ninguno en `NEXT_PUBLIC_*`.

## Headers de seguridad (verificar en next.config.mjs)
- CSP, X-Frame-Options, HSTS — confianza en sitio de afiliación financiera.

## Post-deploy (smoke test sobre la preview y tras promover)
1. Home carga sin error.
2. 2-3 artículos reales: imágenes, metadata, enlaces internos OK.
3. **Probar enlaces de afiliado** (lista de URLs) — un enlace roto = comisión perdida.
4. 404, sitemap.xml, robots.txt y llms.txt responden.
5. Logs: `vercel logs --environment production --level error`.
6. Invalidar caché Edge si el contenido se sirve stale.

## Rollback (Instant Rollback)
- `vercel rollback` reasigna el dominio al deployment anterior (Hobby: el inmediatamente anterior). Segundos, sin rebuild.
- Identificar el deployment anterior ANTES de promover.

## Mejora futura (opcional, recomendada)
- GitHub Actions CI/CD: `vercel build` + `vercel deploy --prebuilt` para preview, y promoción controlada en release. Proteger `main` (sin pushes directos).

## Referencias
- `.claude/rules/indexacion-y-medicion.md` (runbook indexación + GA4/GSC)
- `.claude/rules/convenciones.md` · `.claude/rules/afiliacion.md`

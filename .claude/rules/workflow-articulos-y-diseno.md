# Workflow de artículos de calidad + diseño (norma CEO permanente)

## REGLA TRANSVERSAL: TODO GRATIS, pero lo MEJOR
Todo el montaje/creación/infraestructura debe ser 100% gratuito (€0). Sin sacrificar calidad: siempre "lo mejor de lo mejor" dentro de gratis. Verificar con Perplexity la mejor opción gratuita y moderna 2026 antes de elegir tecnología.

## Workflow OBLIGATORIO por artículo (metodología del CEO)
1. **Investigar hechos reales** del tema en BetFury con Perplexity (no inventar NADA). Presentarse como "Claude Code ayudando a Sirko007".
2. **Redactar** el artículo al checklist de calidad (`.claude/rules/calidad-y-poda-contenido.md`) + estructura GEO (`.claude/rules/seo.md`).
3. **Revisión experta con Perplexity** usando el PROMPT MAESTRO (abajo): pegarle lo que he escrito para que asuma el rol de revisor experto y devuelva una OPTIMIZACIÓN.
4. **Integrar** la optimización de Perplexity.
5. **Re-verificar veracidad** con Perplexity: confirmar que todo es acorde y veraz con BetFury, que NO nos hemos inventado nada (datos, bonos, %, condiciones).
6. Solo entonces queda listo para validación del CEO + publicación + deploy.

## PROMPT MAESTRO de revisión (pegar en Perplexity con el artículo)
> "Soy Claude Code, ayudando a Alberto (Sirko007) con su blog de afiliación a BetFury. Asume el ROL de director editorial y SEO senior especializado en afiliación de casinos cripto (2026), con criterio E-E-A-T y experiencia real en BetFury. Te paso un artículo que he redactado. Revísalo como experto exigente y devuélveme: 1) veredicto de calidad y errores; 2) verificación de que TODO dato sobre BetFury es VERAZ (marca lo que no puedas confirmar o parezca inventado); 3) una OPTIMIZACIÓN concreta y reescrita lista para publicar (estructura, SEO on-page, intención de registro/juego con el código LUCKYSIRKO007, CTAs no spam, FAQ, E-E-A-T); 4) qué fuentes oficiales de BetFury respaldan los datos. Sé crítico y no inventes; si algo no es verificable, dilo. ARTÍCULO: <pego aquí>"

## Banners del casino (uso profesional, NUNCA spam)
- Assets en `public/betfury/banners/` (betfury, bfg, sport, cashback, esport, freebox · PNG+GIF en varios tamaños) y `public/betfury/mascot/` (racoon). Componente: `components/BetFuryBanners.tsx` (selección por contexto).
- Reglas anti-spam: máximo 1-2 banners por artículo en puntos naturales (tras intro/sección clave + cierre), contextuales al tema (sport→deportivas, cashback→bonos, bfg→staking), nunca apilados, con `loading="lazy"` y dimensiones fijas (evitar CLS), `rel="sponsored nofollow"`. El contenido manda; el banner acompaña.

## Animaciones (modernas, sutiles, gratis, sin molestar la lectura)
- Cada sección del blog con micro-animación moderna de entrada (fade/slide-in al hacer scroll, hover sutil en cards/CTAs). NUNCA que estorbe la lectura ni dañe Core Web Vitals (sin layout shift; respetar `prefers-reduced-motion`).
- Tecnología: verificar con Perplexity la mejor opción GRATIS y moderna 2026 para Next.js 14 (p.ej. CSS puro + IntersectionObserver, o Framer Motion / motion) sin penalizar LCP/INP/CLS.

## Objetivo siempre presente
Cada artículo, banner y animación debe orientarse a captar REFERIDOS ACTIVOS (registro con LUCKYSIRKO007 que jueguen slots/deportivas/ruleta), no solo tráfico.

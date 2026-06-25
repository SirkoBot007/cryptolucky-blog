# Datos del Proyecto — CryptoLucky (referencia)
> Datos técnicos de referencia migrados del antiguo override BLOG-BETFURY/CLAUDE.md (archivado en _ARCHIVO/). Cargar bajo demanda.

## Datos técnicos
| Concepto | Valor |
|----------|-------|
| Dominio | cryptoluckyguia.com (conectado a Vercel) |
| GitHub | `SirkoBot007/cryptolucky-blog` · branch `main` |
| Vercel | proyecto `cryptolucky-blog` (plan Hobby) |
| Framework | Next.js 14 App Router + TypeScript + Tailwind + next-intl |
| i18n | `/es/` y `/en/` |
| Email | Resend (3.000/mes gratis) |
| Notion leads DB | `37ef3f0c-090c-8105-a42f-c2b3584c2e92` |
| GA4 | `G-0L45J61W69` |
| Automatización | n8n (Docker local) |

## Variables de entorno en Vercel (referencia, valores reales solo en Vercel/.env.local)
- `RESEND_API_KEY`, `NOTION_API_KEY`, `NOTION_LEADS_DATABASE_ID`, `N8N_LEADS_WEBHOOK_URL` (+ otras confirmadas).

## Schema Notion (leads DB)
| Campo | Tipo | Valores |
|-------|------|---------|
| Nombre | title | - |
| Email | email | - |
| Estado | select | Nuevo / Email enviado / Baja |
| Fuente | select | homepage / exit-intent / inline / sticky / article |
| Idioma | select | es / en |
| País | select | auto |
| Fecha | date | ISO |

## Archivos clave del código
- `lib/articles-data.ts` — artículos estáticos (array TS).
- `components/LeadCaptureForm.tsx` — form de email (3 variantes).
- `components/ExitIntentPopup.tsx` — popup de salida.
- `components/MobileNav.tsx` — nav móvil con CTA + locale switcher.
- `app/api/subscribe/route.ts` — guarda lead en Notion + envía email (Resend).
- `lib/author.ts`, `lib/pillar-faqs.ts`, `lib/email-sequences.ts`.

## Materiales BetFury (en /branding/ y /public/)
- `public/CryptoLucky.png` (logo), banners BetFury, sticker RacoonFury, `og-default.png`.

## Notificaciones
- Aviso de nuevo lead → `sirkokoloko007@gmail.com`.

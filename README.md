# 🍀 CryptoLucky Blog

Blog bilingual SEO (ES/EN) sobre criptomonedas, monetizado con el programa de afiliados de **BetFury**.

**URL de producción:** https://cryptolucky.vercel.app

---

## Stack

| Capa | Tecnología |
|---|---|
| Framework | Next.js 14 (App Router, SSG/ISR) |
| i18n | next-intl (ES por defecto, EN) |
| Contenido | **Estático en código** (`lib/articles-data.ts`) — NO headless Notion |
| Leads / CRM | Notion (base 📋 *CryptoLucky Leads*) vía `/api/subscribe` |
| Email | Resend (welcome + secuencia drip) |
| Hosting | Vercel (free tier) |
| Repo | GitHub @SirkoBot007 |
| Estilos | Tailwind CSS |

---

## Variables de entorno

Copia `.env.example` a `.env.local` y rellena los valores:

```
NOTION_API_KEY=             # Integration secret del workspace Notion
NOTION_LEADS_DATABASE_ID=   # 📋 CryptoLucky Leads — ALIMENTA EL CRM de suscriptores (/api/subscribe)
NOTION_DATABASE_ID=f909b580-4099-4b53-8e75-d663dfa68223  # 📰 Solo PLANIFICACIÓN/health-check. NO es la fuente de los artículos
RESEND_API_KEY=             # Envío de emails (welcome + drip) desde /api/subscribe
ADMIN_NOTIFICATION_EMAIL=   # A quién avisar de cada nuevo lead
NEXT_PUBLIC_BETFURY_AFFILIATE=https://betfury.io/?r=LUCKYSIRKO007
NEXT_PUBLIC_SITE_URL=https://cryptolucky.vercel.app
REVALIDATION_SECRET=        # Secreto para el webhook de revalidación ISR
```

> 🔑 **Dos bases de Notion distintas — no confundirlas:**
> - **`NOTION_LEADS_DATABASE_ID`** → base **📋 CryptoLucky Leads** = el CRM de suscriptores. `/api/subscribe` crea aquí cada email del formulario. **Imprescindible** para la captación.
> - **`NOTION_DATABASE_ID`** → base **📰 Artículos del Blog** = solo planificación manual + health-check. **NO** alimenta el sitio.

> ⚠️ NUNCA subas `.env.local` a Git. Ya está en `.gitignore`.

---

## Artículos del blog — ¿dónde viven?

> ⚠️ **Los artículos publicados son contenido ESTÁTICO en código: viven en `lib/articles-data.ts`** (y los nuevos en `lib/articles-new.ts`). **NO** se sirven desde Notion. Para añadir/editar un artículo del sitio, edita ese archivo (ver la norma de edición segura en `.claude/rules/convenciones.md`) y haz deploy.

La base de Notion **📰 Artículos del Blog** (`NOTION_DATABASE_ID`) es **solo planificación manual** del CEO + el health-check de `/api/notion-health`. Editarla **no cambia la web**. Esquema orientativo de esa base de planificación:

| Propiedad | Tipo | Notas |
|---|---|---|
| Titulo ES | Title | Título principal en español |
| Slug | Rich Text | URL-friendly, único |
| Categoria | Select | Ej: Casinos Cripto, Apuestas Deportivas, Mundial 2026 |
| Estado | Select | Estado de planificación (no afecta al sitio) |

### Leads / suscriptores (CRM)

La captación de emails sí usa Notion en vivo: el formulario → `/api/subscribe` crea un lead en la base **📋 CryptoLucky Leads** (`NOTION_LEADS_DATABASE_ID`) con `Email`, `País`, `Fuente`, `Estado`, `Fecha`, y dispara el welcome + la secuencia drip vía Resend.

---

## Comandos de desarrollo

```bash
npm install        # Instalar dependencias
npm run dev        # Servidor local http://localhost:3000
npm run build      # Build de producción
npm run start      # Servidor de producción local
```

---

## Banners BetFury

Los banners están en `public/banners/`:

| Archivo | Dimensiones | Uso |
|---|---|---|
| betfury-leaderboard.png | 728×90 | Pie de artículo |
| betfury-medium-rect.png | 300×250 | Inline en artículo |
| betfury-skyscraper.png | 160×600 | Sidebar (solo desktop) |

Todos los banners incluyen UTM tracking y el código de afiliado `LUCKYSIRKO007`.

---

## Revalidación ISR (Notion Webhook)

Endpoint: `POST /api/revalidate?secret=TU_REVALIDATE_SECRET`

Configura un webhook en Notion que llame a este endpoint cuando publiques o actualices artículos.

---

## Deploy en Vercel

1. Conecta el repo de GitHub con Vercel
2. Añade las variables de entorno en el panel de Vercel
3. Deploy automático en cada push a `main`

---

*Proyecto generado con Claude AI · BetFury affiliate: LUCKYSIRKO007*

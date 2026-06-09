# 🍀 CryptoLucky Blog

Blog bilingual SEO (ES/EN) sobre criptomonedas, monetizado con el programa de afiliados de **BetFury**.

**URL de producción:** https://cryptolucky.vercel.app

---

## Stack

| Capa | Tecnología |
|---|---|
| Framework | Next.js 14 (App Router, SSG/ISR) |
| i18n | next-intl (ES por defecto, EN) |
| CMS | Notion (headless via API) |
| Hosting | Vercel (free tier) |
| Repo | GitHub @SirkoBot007 |
| Estilos | Tailwind CSS |

---

## Variables de entorno

Copia `.env.example` a `.env.local` y rellena los valores:

```
NOTION_API_KEY=             # Integration secret de tu workspace Notion
NOTION_DATABASE_ID=f909b580-4099-4b53-8e75-d663dfa68223
NEXT_PUBLIC_BETFURY_AFFILIATE=https://betfury.io/?r=LUCKYSIRKO007
NEXT_PUBLIC_SITE_URL=https://cryptolucky.vercel.app
REVALIDATE_SECRET=          # Secreto para el webhook de revalidación ISR
```

> ⚠️ NUNCA subas `.env.local` a Git. Ya está en `.gitignore`.

---

## Estructura de artículos en Notion

La base de datos (`NOTION_DATABASE_ID`) debe tener las siguientes propiedades:

| Propiedad | Tipo | Notas |
|---|---|---|
| Titulo ES | Title | Título principal en español |
| Titulo EN | Rich Text | Título en inglés |
| Slug | Rich Text | URL-friendly, único |
| Meta ES | Rich Text | Meta description ES (≤160 chars) |
| Meta EN | Rich Text | Meta description EN |
| Categoria | Select | Ej: Bitcoin, DeFi, NFT, Casino Crypto |
| Keywords | Rich Text | Palabras clave separadas por comas |
| Estado | Select | **Publicado** = visible en el blog |
| Fecha Publicacion | Date | Fecha de publicación |

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

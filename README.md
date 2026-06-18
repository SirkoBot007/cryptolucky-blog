# 🍀 CryptoLucky Blog

Blog bilingual SEO (ES/EN) sobre criptomonedas, monetizado con el programa de afiliados de **BetFury**.

**URL de producción:** https://cryptoluckyguia.com

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
NOTION_API_KEY=              # Integration secret de tu workspace Notion
NOTION_DATABASE_ID=F909b580-4099-4b53-8e75-d663dfa68223
NEXT_PUBLIC_BETFURY_AFFILIATE=https://betfury.io/?r=LUCKYSIRKO007
NEXT_PUBLIC_SITE_URL=https://cryptoluckyguia.com
REVALIDATE_SECRET=           # Secreto de tu webhook de revalidación ISR
```

---

## Desarrollo local

```bash
npm install
cp .env.example .env.local
# Rellena .env.local con tus valores
npm run dev
```

Abre [http://localhost:3000/es](http://localhost:3000/es) para ver el resultado.

---

## Despliegue

El repositorio está conectado a **Vercel**. Cada push a `main` dispara un despliegue de producción automático en https://cryptoluckyguia.com.

La rama `develop` genera un **Preview Deployment** automático en Vercel.

---

## Monetización

- **BetFury Afiliados** — Código `LUCKYSIRKO007` en todos los CTAs
- **Google AdSense** — Activar añadiendo `NEXT_PUBLIC_ADSENSE_ID` en Vercel
- **Captación leads** — Formulario en artículos con endpoint `/api/subscribe`

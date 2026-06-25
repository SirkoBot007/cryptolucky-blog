---
name: cryptolucky-analytics
description: Implementa y revisa el tracking de conversiones de afiliado del blog CryptoLucky (GA4, clicks en enlaces BetFury). Úsala cuando el usuario pida "tracking de afiliados", "medir clicks", "eventos GA4", "conversiones", "qué artículo convierte" o quiera analítica de rendimiento.
---

# CryptoLucky · Analytics de Afiliación

## Objetivo
Medir qué artículos generan más clicks a BetFury, para no operar el SEO de afiliación a ciegas.

## Flujo
1. Definir el evento de conversión: click en enlace de afiliado (`affiliate_click`) con parámetros: `article_slug`, `cta_position` (inline/sidebar/popup/sticky), `destination`.
2. Implementar el disparo en cada CTA de afiliado (GA4 `G-0L45J61W69`). Reutilizar el patrón del evento existente `lead_capture`.
3. (Opcional privacidad) Considerar Plausible para métricas sin cookies.
4. Verificar en GA4 DebugView que el evento llega con sus parámetros.
5. Reporte: ranking de artículos por clicks de afiliado y por ratio clicks/visitas.

## Reglas
- No enviar datos personales en parámetros de evento.
- Cookies/analytics deben respetar el aviso de privacidad (ver compliance/GDPR).

## Referencias
- `.claude/rules/afiliacion.md` · evento existente `lead_capture` en el código.

## Salida
- Código del evento `affiliate_click` + checklist de verificación en GA4 + plantilla de reporte de conversión.

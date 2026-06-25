# Runbook de indexación y medición — CryptoLucky (validado Perplexity 2026-06-23, 45 fuentes)
> Flujo profesional para que páginas/artículos se indexen y midan bien. Fuentes: Google Search Central, Vercel/Next.js.

## Regla maestra
"No gana quien publica más URLs, sino menos URLs mejor indexadas, diferenciadas y medidas." Calidad e indexabilidad > volumen.

## A) Indexación (por artículo nuevo)
1. Publicar la URL DEFINITIVA con slug estable y contenido COMPLETO desde el minuto 1 (no borradores indexables).
2. El artículo entra automáticamente en `app/sitemap.ts` (solo URLs canónicas, indexables, con `lastModified` real). YA implementado.
3. Enlazado interno desde 2-4 URLs ya indexadas: home, categoría/pilar, hub topical y un relacionado. Acelera descubrimiento.
4. En GSC: enviar el sitemap UNA vez (no reenviar por cada post). Para un artículo importante: Inspección de URL → "Solicitar indexación".
5. La **Indexing API de Google NO sirve para artículos** (solo JobPosting/BroadcastEvent). No usarla aquí.

### Evitar estados de no-indexación
- "Detectada, no indexada" = crawl budget/prioridad: no publicar lotes de URLs débiles; arquitectura clara, enlazado fuerte, sitemap limpio.
- "Rastreada, no indexada" = valor relativo bajo: la página no se considera útil/distinta. Causas en afiliación: páginas casi duplicadas (BTC/ETH/USDT con 80% igual), thin affiliate (texto del operador rehecho sin valor), doorway query-by-query.

## B) GA4 + Search Console
- **Vincular GA4 ↔ GSC:** Admin > Product links > Search Console links > Link (elegir propiedad GSC + web data stream). Luego publicar la colección de informes GSC en GA4.
- **Eventos a medir:** base (page_view, session_start, user_engagement) + `affiliate_click` (marcar como conversión) + `lead_capture`/generate_lead + scroll. YA implementados affiliate_click y lead_capture.
- **Mejora opcional:** enriquecer affiliate_click con params article_slug (derivable de page_path), article_category, cta_position, content_group.
- **Verificar tracking:** GA4 Realtime + DebugView navegando una URL y pulsando un CTA; confirmar que affiliate_click llega CON parámetros. En GSC: Inspección de URL para cobertura/sitemap.
- **Web Vitals:** vigilar LCP ≤2.5s, INP <200ms, CLS <0.1 (ya hay @vercel/speed-insights).

### Dashboard semanal mínimo
Indexadas nuevas vs excluidas · clics/impresiones/CTR/posición por landing (GSC) · affiliate_click por landing/CTA/categoría · Web Vitals.

## C) SEO programático (solo tras calidad)
Funciona SOLO si cada plantilla produce páginas con propósito distinto + datos reales + valor específico. Patrón agencia: **plantilla + dataset + reglas de elegibilidad**.
- Buenos patrones: comparativas por necesidad (retiro rápido, sin KYC, apuestas bajas), por moneda (si depósitos/fees/redes varían de verdad), por método de pago, por país (si hay diferencias reales de elegibilidad/métodos), operador vs operador.
- Bloques OBLIGATORIOS por plantilla: resumen editorial propio + tabla comparativa original + criterios/metodología + FAQs específicas + enlaces a hubs + notas de actualización.
- LÍNEA ROJA (scaled content abuse / doorway): cambiar solo el H1 y 2 párrafos; decenas de landings sin diferencias materiales; "spinear" datos del operador con IA/humanos; comparativas que siempre empujan al mismo operador sin comparación útil.
- Regla de publicación: generar una URL solo si tiene diferenciación objetiva suficiente para llenar módulos únicos.

## D) Orden recomendado (para tráfico cuanto antes)
1. Cerrar capa técnica de indexación (GSC verificado, sitemap, robots, canonicals, metadata, enlazado, 200s, rendimiento). [casi hecho]
2. Configurar medición (GA4 + affiliate_click/lead + QA Realtime/DebugView + vincular GSC↔GA4). [eventos hechos; falta vincular GSC↔GA4 + QA]
3. Optimizar las 10-15 URLs con más potencial entre los ~47 (intención, enlazado, diferenciación, CTAs) ANTES de escalar. [requiere datos GSC]
4. Crear hubs + taxonomía fuerte que repartan autoridad interna.
5. Escalar SEO programático SOLO tras datasets/plantillas con valor diferencial comprobado.

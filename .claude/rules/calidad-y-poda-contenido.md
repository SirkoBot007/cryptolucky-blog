# Calidad de contenido y poda — CryptoLucky (validado Perplexity 2026-06-23, 30 fuentes)
> Norma para cryptolucky-seo y cryptolucky-articulos. Regla maestra: NUNCA borrar a ciegas; mejorar > consolidar > eliminar. Decidir con datos (GSC).

## Árbol de decisión (qué hacer con un artículo)
**Thin (poco contenido):**
- ¿Puede mejorarse de verdad (datos originales, FAQ, comparativa, capturas, ángulo propio)? → SÍ: mantener URL, expandir/reescribir (mejor si ya tiene enlaces/impresiones).
- ¿Sin ángulo propio? → consolidar en un pilar + 301/308 desde la URL vieja (transfiere señales).
- ¿Muy débil, sin valor ni enlaces? → retirar + redirigir, o 410 si no hay reemplazo.

**Duplicado / canibalización (p.ej. variantes Mundial por país):**
- Misma intención/SERP → fusionar en un único pilar.
- Matices reales pero insuficientes → pilar + el resto como secciones internas.
- Intención claramente distinta + datos propios → mantener separadas con interlinking fuerte y títulos no solapados.

**Estacional caducado:**
- Vuelve cada ciclo → URL pilar estable evergreen, actualizar cada edición.
- Noticia/ventana puntual → archivar fuera de sitemap (status Archivado) + redirect si tiene enlaces/tráfico residual.
- Obsoleto sin valor → retiro limpio con redirect (o 410).

**Efecto:** mejorar conserva URL+histórico+enlaces; consolidar transfiere señal a la URL destino y reduce dilución; noindex quita del índice pero NO gana autoridad (solo parche temporal, nunca solución final).

## Registros 'Archivado' muertos en el código
- Se pueden borrar del fichero de datos (ya no renderizan ni están en sitemap).
- MANTENER el redirect de su URL vieja mientras haya tráfico/enlaces/historial (coste bajo, protección SEO). No retirar redirects en masa "porque sí".
- Orden: quitar de frontend/sitemap (hecho vía status) → conservar redirect → borrar registro de código es opcional.

## Checklist de calidad MÍNIMA antes de publicar (artículo de afiliación cripto 2026)
- Byline real + página de autor.
- Propósito claro y UNA intención principal.
- Tesis/ángulo original (no reescritura de fuentes).
- Evidencia de experiencia: capturas, pruebas, configuraciones, resultados, casos reales.
- Estructura: resumen/TL;DR → criterios → desarrollo → FAQ → conclusión → CTA.
- Fuentes primarias/verificables para datos, tasas o claims.
- Disclosure de afiliación visible + rel="sponsored".
- Enlaces internos al pilar, comparativas y guías relacionadas.
- Título descriptivo (no clickbait). FAQ útil (no relleno). Fecha de actualización visible.
- Prueba final: ¿responde mejor que las SERPs que compite? ¿aporta valor sustancial? ¿no parece plantilla a escala? ¿no depende de una sola keyword/variante estacional para existir?
- La longitud por sí sola NO define calidad.

---
name: cryptolucky-articulos
description: Redacta y estructura artículos para el blog CryptoLucky (afiliación BetFury en español) con estructura GEO optimizada para Google y motores de IA. Úsala cuando el usuario pida "nuevo artículo", "redactar post", "escribir reseña", "añadir artículo a articles-data", o crear contenido para el blog cripto.
---

# CryptoLucky · Redacción de Artículos

## Objetivo
Crear artículos en `lib/articles-data.ts` que parezcan escritos por Sirko007 (nunca por una IA), optimizados para search intent y para ser citados por motores de IA (GEO/AEO).

## Flujo
1. Identificar keyword principal, search intent y a qué topic cluster pertenece (pilar o satélite).
2. Definir ángulo y audiencia. Si es satélite, enlazar al pilar; si es pilar, planear satélites.
3. Abrir con un **TL;DR / respuesta directa en las primeras ~50 palabras**.
4. Estructura del cuerpo (GEO): Qué es · Cómo funciona · Pros y contras · Riesgos · Pasos (si aplica) · FAQ.
5. Insertar CTA con enlace de afiliado `https://betfury.io/?r=LUCKYSIRKO007` (`rel="sponsored nofollow"`) + disclosure visible.
6. Añadir bloque "Última actualización: AAAA-MM-DD" (el contenido cripto envejece en semanas).
7. Enlaces internos a 3-8 artículos relacionados del cluster.
8. Generar la entrada en `articles-data.ts` en ambos idiomas si aplica (es/en).

## Reglas
- Tono Sirko007: cercano, experto, sin sonar a IA. Sin promesas de rentabilidad.
- Aplicar reglas SEO al escribir (ver skill `cryptolucky-seo` para verificación).
- Cumplir afiliación/compliance (ver skills `cryptolucky-compliance` y `.claude/rules/afiliacion.md`).
- Para editar `articles-data.ts`: usar el método más seguro y adecuado; validar `next build` tras inserciones grandes.

## Referencias
- `.claude/rules/geo-targeting-y-compliance.md` (CRÍTICO: España restringida → target LATAM + disclaimers)
- `.claude/rules/calidad-y-poda-contenido.md` (checklist de calidad + árbol de decisión de poda)
- `.claude/rules/seo.md` · `.claude/rules/afiliacion.md` · `.claude/rules/convenciones.md` · `.claude/rules/topic-clusters.md` (mapa de clusters y huecos de contenido)

## Salida
- Entrada lista para `articles-data.ts`: title, slug, meta description, fecha, contenido con H1-H3, FAQ y CTA.
- Lista de enlaces internos sugeridos.

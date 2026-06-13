# 📓 BITÁCORA DEL PROYECTO — CryptoLucky Blog

**URL producción:** https://cryptoluckyguia.com  
**Repositorio:** https://github.com/SirkoBot007/cryptolucky-blog  
**Plataforma:** Vercel (Hobby plan, gratuito)  
**Última actualización:** 2026-06-13

---

## ✅ ESTADO ACTUAL DEL PROYECTO

| Componente | Estado | Notas |
|---|---|---|
| Blog Next.js 14 | ✅ En producción | App Router + i18n (es/en) |
| Dominio personalizado | ✅ cryptoluckyguia.com | Configurado en Vercel |
| Artículos publicados | ✅ 23 artículos | Datos estáticos en lib/articles-data.ts |
| SEO / Metadata | ✅ Optimizado | Canonical, OG, keywords por artículo |
| Sección Copa del Mundo 2026 | ✅ Activo | Banner live + artículo #23 |
| Captación de leads (email) | ✅ Activo | Formulario en artículos con endpoint /api/subscribe |
| Afiliado BetFury | ✅ Integrado | Código: LUCKYSIRKO007 en todos los CTAs |
| Google AdSense | ✅ Configurado | Se activa con env NEXT_PUBLIC_ADSENSE_ID |
| Vercel Web Analytics | ✅ Habilitado | 50k eventos/mes gratis |
| Vercel Speed Insights | ✅ Habilitado | Core Web Vitals gratis |
| Google Analytics (GA4) | ✅ Condicional | Via ConsentAnalytics con cookie consent |

---

## 🐛 ERRORES ENCONTRADOS Y CORRECCIONES

### Error #1 — Archivo articles-data.ts truncado localmente
**Fecha:** 2026-06-13  
**Síntoma:** El archivo local terminaba en broken content en lugar de ]; Detectado con tail -10.  
**Causa:** El archivo fue editado y guardado de forma incompleta por una interrupción.  
**Corrección:** head -n 2422 + append article content + echo "];"

---

### Error #2 — Syntax error en build: "expression statement" líneas 2428-2429
**Fecha:** 2026-06-13  
**Síntoma:** Build de Vercel fallaba con error de TypeScript en lib/articles-data.ts  
**Causa raíz:** Al insertar el artículo #23 en GitHub web editor (CodeMirror 6), el cursor se posicionó DESPUÉS del ]; en lugar de antes. Resultado: ]; duplicado, artículo fuera del array.  
**Detección:** Error en logs: "This is the expression part of an expression statement" en línea 2428  
**Corrección:** Fetch raw content, lines.splice(2422, 1), selectAll + execCommand('insertText'), commit adcdcab

---

### Error #3 — git index.lock bloquea todos los commits desde sandbox
**Fecha:** 2026-06-13  
**Síntoma:** "fatal: Unable to create .git/index.lock: File exists."  
**Causa:** Sistema de archivos Windows montado en Linux no permite borrar el lock.  
**Workaround permanente:** Usar SIEMPRE el editor web de GitHub para commits.
Inyección de código: document.querySelector('.cm-content').focus(); document.execCommand('selectAll'); document.execCommand('insertText', false, newContent);

---

### Error #4 — Click en "Commit changes..." abría dropdown "Line wrap mode"
**Fecha:** 2026-06-13  
**Causa:** Coordenadas incorrectas — el click caía en el dropdown "No wrap" adyacente.  
**Corrección:** Usar find() del Chrome MCP para obtener ref correcto, no coordenadas absolutas.

---

### Error #5 — CORS bloquea PUT a la GitHub API
**Fecha:** 2026-06-13  
**Causa:** GitHub overrides fetch y CORS bloquea PUT desde el browser a su propia API.  
**Workaround:** Usar exclusivamente el editor web de GitHub con execCommand.

---

### Error #6 — Panel de búsqueda se abría en lugar del diálogo de commit
**Fecha:** 2026-06-13  
**Causa:** El focus quedaba en el editor después de execCommand.  
**Corrección:** Presionar Escape antes de hacer click en el botón de commit.

---

## 🏗️ ARQUITECTURA

- app/[locale]/layout.tsx ← Header, footer, AdSense, Analytics, SpeedInsights
- app/[locale]/blog/page.tsx ← Blog listing con sección Copa del Mundo
- lib/articles-data.ts ← 23 artículos datos estáticos TypeScript (~2500 líneas)
- components/AdSense.tsx ← Componente AdSense condicional
- components/ConsentAnalytics.tsx ← Cookie banner + GA4 condicional

---

## ⚠️ REGLAS DE TRABAJO

1. NUNCA usar git desde el sandbox — siempre usar el editor web de GitHub
2. Para inyectar código: selectAll + execCommand('insertText')
3. Para el botón commit: usar find() con ref, no coordenadas absolutas
4. Antes de commit: pulsar Escape para quitar focus del editor
5. Username GitHub: SirkoBot007 (NO sirkokoloko007)
6. URL repo: https://github.com/SirkoBot007/cryptolucky-blog

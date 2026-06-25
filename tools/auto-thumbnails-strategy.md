# Estrategia: generación AUTOMÁTICA de miniaturas para artículos nuevos (n8n)
> Documento de diseño para FASE FUTURA. **No implementar aún.** Redactado 2026-06-24.
> Objetivo: cuando n8n (self-hosted en Docker Desktop del CEO) cree un artículo nuevo, que su
> imagen de tarjeta (`public/images/thumbs/<slug>.webp`) se genere y commitee **sin intervención manual**.
> Requisitos duros: **0 €/mes**, licencia **uso comercial**, imagen **original** (sin marcas ajenas), 16:9.

---

## 0. Punto de partida (ya construido — no rehacer)
- `components/ArticleThumb.tsx`: si el slug tiene imagen real → `next/image` WebP; si no → **tile CSS temático** (gradiente+emoji por tema). → **Ya existe un fallback garantizado**: ningún artículo queda sin imagen aunque la generación falle.
- `lib/thumb-manifest.ts` (auto): set de slugs con imagen real. Generado por `tools/gen-thumb-manifest.py`.
- `tools/thumb-prompts.json` + lógica de `SLUG_RULES`/paleta en el script de prompts: **mapea slug/título/categoría → prompt específico + paleta**. Reutilizable tal cual para construir el prompt automático.
- Pipeline manual actual: prompt → generar → verificar → descargar `<slug>.webp` → `gen-thumb-manifest.py` → tsc/build → commit.

**Conclusión:** lo único que falta automatizar es el paso "generar imagen desde un prompt" sin un humano en PicLumen.

---

## 1. Opciones realistas (0 € / comercial)

| # | Opción | Coste | Licencia modelo | Fiabilidad | Encaje n8n+Docker | GPU local |
|---|--------|-------|-----------------|-----------|-------------------|-----------|
| A | **FLUX.1-schnell self-host** (ComfyUI/Forge en Docker, API HTTP) | 0 € | **Apache 2.0** (la más limpia) | Alta (sin límites de terceros) | Excelente (HTTP local) | **Sí** (~8–12 GB VRAM con fp8/GGUF) |
| B | **SDXL base 1.0 self-host** (igual que A) | 0 € | OpenRAIL++ (comercial con restricciones de uso) | Alta | Excelente | Sí (~8 GB) |
| C | **HF Inference API** (FLUX.1-schnell) | 0 € (free tier) | Apache 2.0 | Media (rate limits, colas, puede tardar/fallar) | Bueno (HTTP + token) | No |
| D | **HF Space público** vía `gradio_client` (black-forest-labs/FLUX.1-schnell) | 0 € | Apache 2.0 | Baja-Media (ZeroGPU con cola; ToS de uso "demo", puede romperse) | Regular | No |
| E | **PicLumen** (lo usado ahora) | 0 € (10/día+Relax) | Comercial OK | — | **NO automatizable** (sin API pública; cupo diario) | No |
| F | **Fallback: tile CSS temático** (ya hecho) | 0 € | Propio | Total | Trivial (ya en el código) | No |

Notas de licencia: **FLUX.1-schnell = Apache 2.0** (uso comercial sin fricción → recomendado). **FLUX.1-dev = NO comercial** (evitar). **SDXL = OpenRAIL++** (comercial OK, con cláusulas de uso aceptable).

---

## 2. Recomendación

**Arquitectura por capas (robusta y 0 €):**

1. **Generador primario: FLUX.1-schnell self-hosted en Docker** (Opción A) — *si la máquina del CEO tiene GPU NVIDIA con ≥8–12 GB VRAM*.
   - Contenedor **ComfyUI** (o Forge/A1111) con runtime NVIDIA (Docker Desktop + WSL2 + drivers CUDA). Modelo FLUX.1-schnell en **fp8 o GGUF** para caber en VRAM modesta. Pasos: 4 (schnell está destilado para 4 pasos → rápido).
   - Expone API HTTP local (ComfyUI `/prompt` + websocket, o Forge `/sdapi`). n8n la llama por HTTP **sin tokens ni límites**.
2. **Fallback automático si no hay GPU / falla la generación:**
   - **Opción C (HF Inference API free)** con token HF, reintentos con backoff; si agota cuota o falla →
   - **Opción F (tile CSS temático, ya implementado):** el artículo se publica igualmente con su miniatura temática. **Nunca queda sin imagen.**
3. (Descartar D para producción: el Space público es para demo, sin SLA, se cae; útil solo para pruebas. Descartar E: no tiene API.)

**Por qué A primero:** única vía con licencia Apache 2.0 + 0 € + sin límites de terceros + control total de estilo (mismos prompts/paleta que ya usamos). El cuello de botella es disponer de GPU; si no la hay, C+F cubren el caso con degradación elegante.

---

## 3. Flujo n8n propuesto (boceto de nodos)

```
[Trigger] artículo nuevo (webhook del pipeline de contenido / fila en DB / commit de .md)
   │  payload: { slug, title, category }
   ▼
[Function] construir prompt
   - replicar la lógica de tools/thumb-prompts.json (SLUG_RULES → subject, palette() → paleta)
   - prompt = subject(slug/title) + sufijo estilo "vibrant slot/casino, 16:9, no text, no logos..."
   ▼
[HTTP Request] generar imagen
   - A) POST a ComfyUI local (workflow FLUX schnell, width 1344 h 768, steps 4) → poll resultado
   - C) POST https://api-inference.huggingface.co/models/black-forest-labs/FLUX.1-schnell (Bearer HF_TOKEN)
   ▼
[IF] ¿imagen OK?  ── no ──► [Set] usar fallback (no escribir archivo → ArticleThumb usa tile CSS)
   │ sí
   ▼
[Function/Execute] optimizar
   - convertir/redimensionar a WebP ~1200px ancho (sharp/cwebp). Peso objetivo <200 KB.
   ▼
[Write Binary File] guardar en repo
   - ruta montada como volumen del contenedor n8n: <repo>/public/images/thumbs/<slug>.webp
   ▼
[Execute Command / Git node] integrar
   - python tools/gen-thumb-manifest.py   (actualiza lib/thumb-manifest.ts)
   - git add public/images/thumbs/<slug>.webp lib/thumb-manifest.ts
   - git commit -m "feat(thumbs): auto <slug>"   (push y deploy = decisión del CEO, NO automático)
```

**Verificación de calidad (opcional, fase 3):** nodo que pase la imagen por un modelo de visión/OCR ligero para detectar texto basura/watermark; si lo detecta, regenerar con otra seed (máx N intentos) o caer al fallback. Sin esto, schnell + prompt "no text, no logos" + negative prompt da buen resultado la mayoría de las veces (como hemos visto con PicLumen).

---

## 4. Docker / infra (Opción A, notas)
- **Imagen:** ComfyUI con CUDA (ej. `yanwk/comfyui-boot` o build propio) o `ghcr.io/.../comfyui`. Montar `models/` con FLUX.1-schnell (fp8/GGUF) + VAE + text encoders (t5xxl fp8, clip-l).
- **GPU passthrough:** Docker Desktop en Windows usa WSL2; requiere NVIDIA GPU + driver con soporte CUDA en WSL. `--gpus all` (o `deploy.resources` en compose).
- **VRAM:** FLUX schnell fp8 ≈ 8–12 GB; GGUF Q4 baja a ~6–8 GB con algo menos de calidad. Sin GPU NVIDIA → no viable self-host → ir a C+F.
- **Red:** ComfyUI escucha en `127.0.0.1:8188`; n8n (otro contenedor) lo alcanza por la red de Docker (`http://comfyui:8188`).
- **Coste:** 0 € (hardware ya existente). Solo electricidad/tiempo de generación (~seg por imagen con schnell).

---

## 5. Riesgos y mitigaciones
- **Sin GPU adecuada** → plan C (HF free, con límites) + F (CSS). Documentar que la calidad/uniformidad baja respecto a self-host.
- **HF free tier**: colas, "model loading" (503), rate limits → reintentos con backoff + timeout; si falla, fallback F. Nunca bloquea la publicación.
- **Deriva de estilo** vs las 47 actuales (PicLumen Art V1): FLUX schnell tiene "look" distinto. Mitigar fijando prompt/sufijo/paleta y, si se quiere uniformidad total, **regenerar también las 47 con el mismo generador self-host** cuando se monte (decisión del CEO).
- **Texto basura ocasional**: negative prompt + "no text/letters/numbers" + (fase 3) verificación OCR.
- **git push/deploy automáticos**: NO. El flujo deja el commit local; push/deploy a producción siguen requiriendo OK del CEO (regla de autonomía).

---

## 6. Plan por fases (cuando se aborde)
- **Fase 1 (ya hecha):** fallback CSS temático garantizado en `ArticleThumb`.
- **Fase 2:** montar generador (A si hay GPU; si no, C) + flujo n8n hasta escribir `<slug>.webp` y `gen-thumb-manifest.py` + commit local.
- **Fase 3:** verificación automática de calidad (OCR/visión) + reintentos; opcional regenerar las 47 con el generador self-host para uniformidad.

> Decisión pendiente del CEO para la Fase 2: ¿la máquina (Docker Desktop) tiene **GPU NVIDIA** con ≥8 GB VRAM? De eso depende A (ideal) vs C+F.

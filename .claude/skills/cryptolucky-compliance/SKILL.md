---
name: cryptolucky-compliance
description: Verifica el cumplimiento legal de los artículos del blog cripto CryptoLucky (España/UE: MiCA, CNMV, disclosure de afiliación). Úsala cuando el usuario pida "revisar compliance", "disclaimer legal", "verificar cumplimiento", "MiCA", "aviso de riesgo" o antes de publicar contenido de afiliación cripto.
---

# CryptoLucky · Compliance Legal

## Objetivo
Asegurar que cada artículo de afiliación cripto cumple los requisitos legales ES/UE antes de publicar, reduciendo riesgo regulatorio. (No es asesoramiento jurídico; ante duda seria, el CEO valida o consulta a un profesional.)

## Checklist por artículo
1. **Aviso de riesgo visible:** texto claro tipo "Invertir en criptomonedas conlleva riesgo de pérdida total. Esto no es consejo financiero."
2. **Sin promesas de rentabilidad:** prohibido "ganancias seguras", "dinero garantizado", cifras de retorno prometidas.
3. **Disclosure de afiliación explícita y visible:** declarar que el blog recibe comisión por los enlaces (no basta `rel="sponsored"`).
4. **Lenguaje no engañoso:** sin clickbait que prometa más de lo que el contenido entrega (Directiva de Prácticas Comerciales Desleales).
5. **Juego responsable** (BetFury): mención a juego responsable y +18 cuando aplique.
6. **Datos personales (GDPR):** formularios con base legal y aviso de privacidad; consentimiento correcto.

## Reglas
- Si un artículo no cumple un punto crítico (1, 2, 3), marcarlo como NO publicable hasta corregir.
- Marco de referencia: MiCA (vigor 2024) y supervisión CNMV; verificar antes de cada publicación.

## Referencias
- `.claude/rules/geo-targeting-y-compliance.md` (CRÍTICO: España restringida → target LATAM + disclaimers)
- `.claude/rules/afiliacion.md`

## Salida
- Reporte PASA/FALLA por punto + textos de disclaimer/disclosure listos para insertar.

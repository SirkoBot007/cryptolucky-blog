// ============================================================
// EMAIL DRIP SEQUENCE — CryptoLucky x BetFury
// 5 emails over 20 days → convert leads to BetFury referrals
// Each email uses Resend scheduledAt for autonomous delivery
// ============================================================

const AFFILIATE_LINK = 'https://betfury.io/?r=LUCKYSIRKO007';
const SITE_URL = 'https://cryptoluckyguia.com';

// Base HTML wrapper for all emails
function emailWrapper(content: string): string {
  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>CryptoLucky</title>
</head>
<body style="margin:0;padding:0;background:#0f172a;font-family:Arial,Helvetica,sans-serif">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0f172a;min-height:100vh">
    <tr><td align="center" style="padding:32px 16px">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%">

        <!-- Header -->
        <tr><td style="text-align:center;padding-bottom:24px">
          <a href="${SITE_URL}" style="text-decoration:none">
            <span style="color:#f59e0b;font-size:28px;font-weight:900;letter-spacing:-0.5px">🍀 CryptoLucky</span>
          </a>
        </td></tr>

        <!-- Main content -->
        ${content}

        <!-- Footer -->
        <tr><td style="padding-top:32px;text-align:center">
          <p style="color:#334155;font-size:11px;line-height:1.7;margin:0">
            Recibes este email porque te suscribiste en <a href="${SITE_URL}" style="color:#f59e0b;text-decoration:none">cryptoluckyguia.com</a><br>
            Para darte de baja, responde BAJA a este email.<br>
            © 2026 CryptoLucky · Contenido informativo y de entretenimiento.<br>
            Juega con responsabilidad. Prohibido menores de 18 años.
          </p>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

// ─────────────────────────────────────────────────────────
// EMAIL #2 — Day 2 — BFG Staking: dividendos diarios
// ─────────────────────────────────────────────────────────
export function getEmail2Html(): string {
  return emailWrapper(`
    <!-- Card principal -->
    <tr><td style="background:#1e293b;border-radius:16px;padding:32px;margin-bottom:16px">
      <p style="color:#f59e0b;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:1px;margin:0 0 8px 0">GUÍA EXCLUSIVA</p>
      <h1 style="color:#f1f5f9;font-size:24px;font-weight:900;margin:0 0 16px 0;line-height:1.3">
        Cómo generar dividendos diarios en BetFury (sin riesgo extra)
      </h1>
      <p style="color:#94a3b8;font-size:15px;line-height:1.7;margin:0 0 24px 0">
        La mayoría de jugadores usa BetFury solo para apostar. Los más listos descubrieron algo mejor: <strong style="color:#f1f5f9">el sistema BFG que paga dividendos cada 24 horas</strong>.
      </p>

      <!-- Cómo funciona BFG -->
      <div style="background:#0f172a;border-radius:12px;padding:20px;margin-bottom:24px;border-left:4px solid #f59e0b">
        <p style="color:#f59e0b;font-size:13px;font-weight:700;margin:0 0 12px 0">¿CÓMO FUNCIONA?</p>
        <table width="100%" cellpadding="0" cellspacing="0">
          <tr><td style="padding:6px 0">
            <span style="color:#f59e0b;font-weight:900;margin-right:8px">1.</span>
            <span style="color:#cbd5e1;font-size:14px">Juegas en BetFury (cualquier juego)</span>
          </td></tr>
          <tr><td style="padding:6px 0">
            <span style="color:#f59e0b;font-weight:900;margin-right:8px">2.</span>
            <span style="color:#cbd5e1;font-size:14px">Acumulas tokens BFG automáticamente por cada apuesta</span>
          </td></tr>
          <tr><td style="padding:6px 0">
            <span style="color:#f59e0b;font-weight:900;margin-right:8px">3.</span>
            <span style="color:#cbd5e1;font-size:14px">Haces staking de tus BFG en el pool</span>
          </td></tr>
          <tr><td style="padding:6px 0">
            <span style="color:#f59e0b;font-weight:900;margin-right:8px">4.</span>
            <span style="color:#cbd5e1;font-size:14px">Cada 24 horas recibes tu parte proporcional de los ingresos del casino</span>
          </td></tr>
        </table>
      </div>

      <!-- Pagos en criptos -->
      <div style="background:#0f172a;border-radius:12px;padding:20px;margin-bottom:24px">
        <p style="color:#94a3b8;font-size:13px;margin:0 0 12px 0">Los dividendos se pagan en múltiples criptomonedas:</p>
        <div style="display:flex;gap:8px;flex-wrap:wrap">
          <span style="background:#1e293b;color:#f59e0b;padding:4px 12px;border-radius:20px;font-size:12px;font-weight:700;display:inline-block;margin:3px">₿ BTC</span>
          <span style="background:#1e293b;color:#f59e0b;padding:4px 12px;border-radius:20px;font-size:12px;font-weight:700;display:inline-block;margin:3px">Ξ ETH</span>
          <span style="background:#1e293b;color:#f59e0b;padding:4px 12px;border-radius:20px;font-size:12px;font-weight:700;display:inline-block;margin:3px">BNB</span>
          <span style="background:#1e293b;color:#f59e0b;padding:4px 12px;border-radius:20px;font-size:12px;font-weight:700;display:inline-block;margin:3px">USDT</span>
          <span style="background:#1e293b;color:#f59e0b;padding:4px 12px;border-radius:20px;font-size:12px;font-weight:700;display:inline-block;margin:3px">TRX</span>
        </div>
      </div>

      <!-- CTA -->
      <a href="${AFFILIATE_LINK}&utm_source=email&utm_medium=drip&utm_campaign=email2_staking"
         style="display:block;background:linear-gradient(135deg,#f59e0b,#d97706);color:white;text-decoration:none;text-align:center;padding:18px 24px;border-radius:12px;font-weight:900;font-size:17px">
        Empezar a acumular BFG ahora →
      </a>
      <p style="color:#475569;font-size:12px;text-align:center;margin-top:12px">
        Usa el código <strong style="color:#f59e0b">LUCKYSIRKO007</strong> al registrarte
      </p>
    </td></tr>

    <!-- Guía completa -->
    <tr><td style="padding:16px 0">
      <table width="100%" cellpadding="0" cellspacing="0" style="background:#1e293b;border-radius:12px;padding:20px">
        <tr><td style="padding:20px">
          <p style="color:#94a3b8;font-size:14px;margin:0 0 8px 0">Guía completa:</p>
          <a href="${SITE_URL}/es/blog/betfury-staking-bfg-dividendos?utm_source=email&utm_medium=drip&utm_campaign=email2"
             style="color:#f59e0b;font-size:15px;font-weight:700;text-decoration:none">
            BetFury Staking BFG: Cómo ganar dividendos diarios →
          </a>
        </td></tr>
      </table>
    </td></tr>
  `);
}

// ─────────────────────────────────────────────────────────
// EMAIL #3 — Day 5 — Los 3 juegos con mejor RTP
// ─────────────────────────────────────────────────────────
export function getEmail3Html(): string {
  return emailWrapper(`
    <tr><td style="background:#1e293b;border-radius:16px;padding:32px;margin-bottom:16px">
      <p style="color:#f59e0b;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:1px;margin:0 0 8px 0">DATOS REALES</p>
      <h1 style="color:#f1f5f9;font-size:24px;font-weight:900;margin:0 0 16px 0;line-height:1.3">
        Los 3 juegos con mejor RTP en BetFury
      </h1>
      <p style="color:#94a3b8;font-size:15px;line-height:1.7;margin:0 0 24px 0">
        No todos los juegos son iguales. El RTP (Return To Player) determina cuánto devuelve el juego a largo plazo. Estos son los que más convienen:
      </p>

      <!-- Juego #1: Dice -->
      <div style="background:#0f172a;border-radius:12px;padding:20px;margin-bottom:16px;border:1px solid rgba(245,158,11,0.2)">
        <table width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td style="width:48px;vertical-align:top">
              <div style="background:#f59e0b;border-radius:8px;width:40px;height:40px;text-align:center;line-height:40px;font-size:20px">🎲</div>
            </td>
            <td style="padding-left:12px">
              <p style="color:#f1f5f9;font-weight:900;font-size:16px;margin:0 0 4px 0">BetFury Dice</p>
              <p style="color:#22c55e;font-size:13px;font-weight:700;margin:0 0 8px 0">RTP: 99% | Casa: 1%</p>
              <p style="color:#94a3b8;font-size:13px;margin:0">El juego de dados con uno de los mejores RTP del mercado. Puedes ajustar el porcentaje de riesgo y el multiplicador.</p>
            </td>
          </tr>
        </table>
      </div>

      <!-- Juego #2: Crash -->
      <div style="background:#0f172a;border-radius:12px;padding:20px;margin-bottom:16px;border:1px solid rgba(245,158,11,0.2)">
        <table width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td style="width:48px;vertical-align:top">
              <div style="background:#f59e0b;border-radius:8px;width:40px;height:40px;text-align:center;line-height:40px;font-size:20px">🚀</div>
            </td>
            <td style="padding-left:12px">
              <p style="color:#f1f5f9;font-weight:900;font-size:16px;margin:0 0 4px 0">BetFury Crash</p>
              <p style="color:#22c55e;font-size:13px;font-weight:700;margin:0 0 8px 0">RTP: 99% | Casa: 1%</p>
              <p style="color:#94a3b8;font-size:13px;margin:0">El multiplicador sube hasta que explota. Retira antes del crash. Con estrategia conservadora (1.2x-1.5x) es muy estable.</p>
            </td>
          </tr>
        </table>
      </div>

      <!-- Juego #3: Mines -->
      <div style="background:#0f172a;border-radius:12px;padding:20px;margin-bottom:24px;border:1px solid rgba(245,158,11,0.2)">
        <table width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td style="width:48px;vertical-align:top">
              <div style="background:#f59e0b;border-radius:8px;width:40px;height:40px;text-align:center;line-height:40px;font-size:20px">💣</div>
            </td>
            <td style="padding-left:12px">
              <p style="color:#f1f5f9;font-weight:900;font-size:16px;margin:0 0 4px 0">BetFury Mines</p>
              <p style="color:#22c55e;font-size:13px;font-weight:700;margin:0 0 8px 0">RTP variable | Mayor control</p>
              <p style="color:#94a3b8;font-size:13px;margin:0">Elige cuántas minas poner. Con 1 mina y retirada temprana, el RTP sube por encima del 99%. El más estratégico de los tres.</p>
            </td>
          </tr>
        </table>
      </div>

      <!-- Tip clave -->
      <div style="background:rgba(245,158,11,0.1);border:1px solid rgba(245,158,11,0.3);border-radius:12px;padding:16px;margin-bottom:24px">
        <p style="color:#f59e0b;font-size:13px;font-weight:700;margin:0 0 8px 0">💡 TIP SIRKO007</p>
        <p style="color:#cbd5e1;font-size:13px;line-height:1.6;margin:0">
          Estos 3 juegos también te generan BFG con cada apuesta, lo que significa que mientras juegas, también acumulas tokens para staking. Doble beneficio.
        </p>
      </div>

      <a href="${AFFILIATE_LINK}&utm_source=email&utm_medium=drip&utm_campaign=email3_juegos"
         style="display:block;background:linear-gradient(135deg,#f59e0b,#d97706);color:white;text-decoration:none;text-align:center;padding:18px 24px;border-radius:12px;font-weight:900;font-size:17px">
        Jugar ahora con bono de bienvenida →
      </a>
      <p style="color:#475569;font-size:12px;text-align:center;margin-top:12px">
        Código <strong style="color:#f59e0b">LUCKYSIRKO007</strong> · Bono hasta 590% en primer depósito
      </p>
    </td></tr>
  `);
}

// ─────────────────────────────────────────────────────────
// EMAIL #4 — Day 10 — Social proof + comunidad
// ─────────────────────────────────────────────────────────
export function getEmail4Html(): string {
  return emailWrapper(`
    <tr><td style="background:#1e293b;border-radius:16px;padding:32px;margin-bottom:16px">
      <p style="color:#f59e0b;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:1px;margin:0 0 8px 0">COMUNIDAD CRYPTOLUCKY</p>
      <h1 style="color:#f1f5f9;font-size:24px;font-weight:900;margin:0 0 16px 0;line-height:1.3">
        Nuestra comunidad ya está usando el código LUCKYSIRKO007
      </h1>
      <p style="color:#94a3b8;font-size:15px;line-height:1.7;margin:0 0 24px 0">
        Llevamos meses analizando BetFury en profundidad. Aquí tienes un resumen honesto de lo que hemos visto:
      </p>

      <!-- Stats -->
      <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px">
        <tr>
          <td width="33%" style="text-align:center;padding:16px;background:#0f172a;border-radius:12px 0 0 12px;border-right:1px solid #1e293b">
            <p style="color:#f59e0b;font-size:28px;font-weight:900;margin:0">35+</p>
            <p style="color:#64748b;font-size:12px;margin:4px 0 0 0">referidos activos</p>
          </td>
          <td width="33%" style="text-align:center;padding:16px;background:#0f172a;border-right:1px solid #1e293b">
            <p style="color:#f59e0b;font-size:28px;font-weight:900;margin:0">30</p>
            <p style="color:#64748b;font-size:12px;margin:4px 0 0 0">guías publicadas</p>
          </td>
          <td width="33%" style="text-align:center;padding:16px;background:#0f172a;border-radius:0 12px 12px 0">
            <p style="color:#f59e0b;font-size:28px;font-weight:900;margin:0">6+</p>
            <p style="color:#64748b;font-size:12px;margin:4px 0 0 0">meses analizando</p>
          </td>
        </tr>
      </table>

      <!-- Lo que más gusta -->
      <div style="background:#0f172a;border-radius:12px;padding:20px;margin-bottom:24px">
        <p style="color:#f1f5f9;font-weight:700;font-size:14px;margin:0 0 12px 0">Lo que más valoran los usuarios de nuestra comunidad:</p>
        <table width="100%" cellpadding="0" cellspacing="0">
          <tr><td style="padding:6px 0;color:#94a3b8;font-size:14px">
            ✅ <strong style="color:#f1f5f9">Retiros en menos de 10 minutos</strong> en la mayoría de casos
          </td></tr>
          <tr><td style="padding:6px 0;color:#94a3b8;font-size:14px">
            ✅ <strong style="color:#f1f5f9">Sin KYC obligatorio</strong> para montos estándar
          </td></tr>
          <tr><td style="padding:6px 0;color:#94a3b8;font-size:14px">
            ✅ <strong style="color:#f1f5f9">BFG staking</strong>: ingresos pasivos reales
          </td></tr>
          <tr><td style="padding:6px 0;color:#94a3b8;font-size:14px">
            ✅ <strong style="color:#f1f5f9">Free boxes diarios</strong>: BTC gratis cada 20 minutos
          </td></tr>
          <tr><td style="padding:6px 0;color:#94a3b8;font-size:14px">
            ✅ <strong style="color:#f1f5f9">Cashback semanal</strong>: recuperas parte de las pérdidas
          </td></tr>
        </table>
      </div>

      <!-- Lo que NO gusta -->
      <div style="background:#0f172a;border-radius:12px;padding:20px;margin-bottom:24px;border-left:4px solid #475569">
        <p style="color:#94a3b8;font-weight:700;font-size:14px;margin:0 0 12px 0">Honestidad total — lo que mejoraría:</p>
        <table width="100%" cellpadding="0" cellspacing="0">
          <tr><td style="padding:4px 0;color:#64748b;font-size:13px">
            ⚠️ Soporte en español podría ser más rápido
          </td></tr>
          <tr><td style="padding:4px 0;color:#64748b;font-size:13px">
            ⚠️ La app móvil web (no nativa) aunque funciona bien
          </td></tr>
        </table>
      </div>

      <a href="${AFFILIATE_LINK}&utm_source=email&utm_medium=drip&utm_campaign=email4_social"
         style="display:block;background:linear-gradient(135deg,#f59e0b,#d97706);color:white;text-decoration:none;text-align:center;padding:18px 24px;border-radius:12px;font-weight:900;font-size:17px">
        Unirme a la comunidad con LUCKYSIRKO007 →
      </a>
    </td></tr>

    <!-- Artículo relacionado -->
    <tr><td style="padding:16px 0">
      <table width="100%" cellpadding="0" cellspacing="0" style="background:#1e293b;border-radius:12px">
        <tr><td style="padding:20px">
          <p style="color:#94a3b8;font-size:13px;margin:0 0 6px 0">Lectura recomendada:</p>
          <a href="${SITE_URL}/es/blog/betfury-seguro-es-legitimo-licencia?utm_source=email&utm_medium=drip&utm_campaign=email4"
             style="color:#f59e0b;font-size:15px;font-weight:700;text-decoration:none">
            ¿BetFury es seguro y legítimo? Análisis completo →
          </a>
        </td></tr>
      </table>
    </td></tr>
  `);
}

// ─────────────────────────────────────────────────────────
// EMAIL #5 — Day 20 — Urgencia final
// ─────────────────────────────────────────────────────────
export function getEmail5Html(): string {
  return emailWrapper(`
    <tr><td style="background:#1e293b;border-radius:16px;padding:32px;margin-bottom:16px">
      <!-- Urgency bar -->
      <div style="background:linear-gradient(135deg,#dc2626,#b91c1c);border-radius:8px;padding:12px 16px;text-align:center;margin-bottom:24px">
        <p style="color:white;font-size:13px;font-weight:700;margin:0">
          ⏰ Tu bono del 590% sigue activo — pero no para siempre
        </p>
      </div>

      <h1 style="color:#f1f5f9;font-size:24px;font-weight:900;margin:0 0 16px 0;line-height:1.3">
        Último recordatorio: ¿sigues pensándotelo?
      </h1>
      <p style="color:#94a3b8;font-size:15px;line-height:1.7;margin:0 0 24px 0">
        Hace 20 días te registraste en CryptoLucky. Has recibido guías sobre staking, juegos y la comunidad. Puede que todavía no hayas dado el paso. Te entiendo — aquí va la comparativa final que necesitas:
      </p>

      <!-- Comparativa BetFury vs Stake -->
      <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;background:#0f172a;border-radius:12px;overflow:hidden">
        <tr style="background:#0f172a">
          <td style="padding:12px 16px;color:#64748b;font-size:12px;font-weight:700;text-transform:uppercase">Característica</td>
          <td style="padding:12px 16px;text-align:center;color:#f59e0b;font-size:12px;font-weight:700;text-transform:uppercase;background:rgba(245,158,11,0.1)">BetFury</td>
          <td style="padding:12px 16px;text-align:center;color:#64748b;font-size:12px;font-weight:700;text-transform:uppercase">Stake</td>
        </tr>
        <tr style="border-top:1px solid #1e293b">
          <td style="padding:12px 16px;color:#94a3b8;font-size:13px">Dividendos diarios</td>
          <td style="padding:12px 16px;text-align:center;color:#22c55e;font-size:13px;font-weight:700;background:rgba(245,158,11,0.05)">✅ Sí (BFG)</td>
          <td style="padding:12px 16px;text-align:center;color:#ef4444;font-size:13px">❌ No</td>
        </tr>
        <tr style="border-top:1px solid #1e293b">
          <td style="padding:12px 16px;color:#94a3b8;font-size:13px">Free boxes diarios</td>
          <td style="padding:12px 16px;text-align:center;color:#22c55e;font-size:13px;font-weight:700;background:rgba(245,158,11,0.05)">✅ Sí</td>
          <td style="padding:12px 16px;text-align:center;color:#ef4444;font-size:13px">❌ No</td>
        </tr>
        <tr style="border-top:1px solid #1e293b">
          <td style="padding:12px 16px;color:#94a3b8;font-size:13px">Sin KYC</td>
          <td style="padding:12px 16px;text-align:center;color:#22c55e;font-size:13px;font-weight:700;background:rgba(245,158,11,0.05)">✅ Sí</td>
          <td style="padding:12px 16px;text-align:center;color:#f59e0b;font-size:13px">⚠️ Parcial</td>
        </tr>
        <tr style="border-top:1px solid #1e293b">
          <td style="padding:12px 16px;color:#94a3b8;font-size:13px">Contenido en español</td>
          <td style="padding:12px 16px;text-align:center;color:#22c55e;font-size:13px;font-weight:700;background:rgba(245,158,11,0.05)">✅ Sí</td>
          <td style="padding:12px 16px;text-align:center;color:#f59e0b;font-size:13px">⚠️ Limitado</td>
        </tr>
        <tr style="border-top:1px solid #1e293b">
          <td style="padding:12px 16px;color:#94a3b8;font-size:13px">Bono de bienvenida</td>
          <td style="padding:12px 16px;text-align:center;color:#22c55e;font-size:13px;font-weight:700;background:rgba(245,158,11,0.05)">✅ 590%</td>
          <td style="padding:12px 16px;text-align:center;color:#f59e0b;font-size:13px">⚠️ Variable</td>
        </tr>
      </table>

      <!-- Resumen del bono -->
      <div style="background:#0f172a;border-radius:12px;padding:20px;text-align:center;margin-bottom:24px;border:2px solid rgba(245,158,11,0.4)">
        <p style="color:#94a3b8;font-size:12px;margin:0 0 8px 0;text-transform:uppercase;letter-spacing:1px">Tu código sigue activo</p>
        <p style="color:#f59e0b;font-size:32px;font-weight:900;letter-spacing:0.12em;margin:0 0 4px 0">LUCKYSIRKO007</p>
        <p style="color:#64748b;font-size:13px;margin:0">Bono 590% + Free Spins + Free Boxes diarios</p>
      </div>

      <a href="${AFFILIATE_LINK}&utm_source=email&utm_medium=drip&utm_campaign=email5_urgencia"
         style="display:block;background:linear-gradient(135deg,#f59e0b,#d97706);color:white;text-decoration:none;text-align:center;padding:20px 24px;border-radius:12px;font-weight:900;font-size:18px">
        Reclamar mi bono ahora →
      </a>
      <p style="color:#475569;font-size:12px;text-align:center;margin-top:12px">
        Registro gratis · Solo criptomonedas · Sin datos bancarios
      </p>
    </td></tr>
  `);
}

// ─────────────────────────────────────────────────────────
// SUBJECTS & SCHEDULE CONFIG
// ─────────────────────────────────────────────────────────
export const EMAIL_SEQUENCE: Array<{
  delayDays: number;
  subject: string;
  getHtml: () => string;
}> = [
  {
    delayDays: 2,
    subject: 'Cómo generar dividendos diarios en BetFury (sin riesgo extra)',
    getHtml: getEmail2Html,
  },
  {
    delayDays: 5,
    subject: 'Los 3 juegos con mejor RTP en BetFury [datos reales]',
    getHtml: getEmail3Html,
  },
  {
    delayDays: 10,
    subject: 'Nuestra comunidad ya usa el código — resultados reales',
    getHtml: getEmail4Html,
  },
  {
    delayDays: 20,
    subject: 'Último recordatorio: tu bono de 590% sigue activo ⏰',
    getHtml: getEmail5Html,
  },
];

'use client';

import { useState } from 'react';

interface LeadCaptureFormProps {
  locale?: string;
  variant?: 'inline' | 'popup' | 'sticky';
  source?: string;
}

export default function LeadCaptureForm({
  locale = 'es',
  variant = 'inline',
  source = 'inline',
}: LeadCaptureFormProps) {
  const [email, setEmail] = useState('');
  const [country, setCountry] = useState('');
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const isEs = locale === 'es';

  const copy = {
    headline: isEs
      ? 'ð Recibe alertas de bonos exclusivos'
      : 'ð Get exclusive bonus alerts',
    subheadline: isEs
      ? 'Bonos sin depÃ³sito, free spins y ofertas VIP de BetFury â directo a tu email.'
      : 'No-deposit bonuses, free spins and VIP offers from BetFury â straight to your inbox.',
    emailPlaceholder: isEs ? 'Tu email' : 'Your email',
    countryPlaceholder: isEs ? 'PaÃ­s (opcional)' : 'Country (optional)',
    cta: isEs ? 'Quiero mis bonos â' : 'Get my bonuses â',
    loading: isEs ? 'Enviando...' : 'Sending...',
    success: isEs
      ? 'â Â¡SuscripciÃ³n confirmada! Revisa tu email, te hemos enviado tu cÃ³digo de bienvenida.'
      : 'â Subscription confirmed! Check your email for your welcome code.',
    consent: isEs
      ? 'Acepto recibir emails con ofertas y novedades de CryptoLucky. Puedo darme de baja en cualquier momento.'
      : 'I agree to receive emails with offers and news from CryptoLucky. I can unsubscribe at any time.',
    privacy: isEs ? 'PolÃ­tica de privacidad' : 'Privacy policy',
    error: isEs ? 'Error al suscribirse. IntÃ©ntalo de nuevo.' : 'Subscription error. Please try again.',
    disclaimer: isEs
      ? 'ð Sin spam. Solo bonos y guÃ­as exclusivas.'
      : 'ð No spam. Only exclusive bonuses and guides.',
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!consent) {
      setErrorMsg(isEs ? 'Debes aceptar la polÃ­tica de privacidad' : 'You must accept the privacy policy');
      return;
    }
    setStatus('loading');
    setErrorMsg('');

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, country, source, locale }),
      });

      if (res.ok) {
        setStatus('success');
        if (typeof window !== 'undefined' && (window as any).gtag) {
          (window as any).gtag('event', 'lead_capture', {
            event_category: 'engagement',
            event_label: source,
            value: 1,
          });
        }
      } else {
        const data = await res.json().catch(() => ({}));
        if (data.error === 'already_subscribed') {
          setStatus('success');
        } else {
          throw new Error('server_error');
        }
      }
    } catch {
      setStatus('error');
      setErrorMsg(copy.error);
    }
  };

  if (status === 'success') {
    return (
      <div className="bg-green-900/30 border border-green-500/40 rounded-xl p-6 text-center">
        <p className="text-green-400 font-bold text-lg">{copy.success}</p>
        <p className="text-slate-400 text-sm mt-2">
          {isEs ? 'Pronto recibirÃ¡s tus primeras alertas de bonos.' : "You'll soon receive your first bonus alerts."}
        </p>
      </div>
    );
  }

  const inputClass =
    'w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 text-sm transition-colors';

  return (
    <div
      className={
        variant === 'sticky'
          ? 'bg-slate-900 border-t border-amber-500/30 p-4'
          : 'bg-gradient-to-br from-slate-900 to-slate-800 border border-amber-500/20 rounded-2xl p-6 md:p-8'
      }
    >
      {variant !== 'sticky' && (
        <>
          <h3 className="text-2xl font-black text-white mb-2">{copy.headline}</h3>
          <p className="text-slate-400 text-sm mb-6">{copy.subheadline}</p>
        </>
      )}

      <form onSubmit={handleSubmit} className={variant === 'sticky' ? 'flex gap-2 items-center' : 'space-y-4'}>
        {variant === 'sticky' ? (
          <>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={copy.emailPlaceholder}
              className="flex-1 bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-amber-400"
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              onClick={() => !consent && setConsent(true)}
              className="bg-amber-500 hover:bg-amber-400 text-white font-bold text-sm px-4 py-2 rounded-lg whitespace-nowrap transition-colors disabled:opacity-60"
            >
              {status === 'loading' ? copy.loading : copy.cta}
            </button>
          </>
        ) : (
          <>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={copy.emailPlaceholder}
              className={inputClass}
            />
            <select
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className={inputClass}
            >
              <option value="">{copy.countryPlaceholder}</option>
              <optgroup label="ââ LatinoamÃ©rica ââ">
                <option value="MX">ð²ð½ MÃ©xico</option>
                <option value="CO">ð¨ð´ Colombia</option>
                <option value="AR">ð¦ð· Argentina</option>
                <option value="PE">ðµðª PerÃº</option>
                <option value="CL">ð¨ð± Chile</option>
                <option value="VE">ð»ðª Venezuela</option>
                <option value="EC">ðªð¨ Ecuador</option>
                <option value="BO">ð§ð´ Bolivia</option>
                <option value="PY">ðµð¾ Paraguay</option>
                <option value="UY">ðºð¾ Uruguay</option>
                <option value="GT">ð¬ð¹ Guatemala</option>
                <option value="HN">ð­ð³ Honduras</option>
                <option value="SV">ð¸ð» El Salvador</option>
                <option value="CR">ð¨ð· Costa Rica</option>
                <option value="PA">ðµð¦ PanamÃ¡</option>
                <option value="DO">ð©ð´ Rep. Dominicana</option>
                <option value="CU">ð¨ðº Cuba</option>
                <option value="NI">ð³ð® Nicaragua</option>
                <option value="PR">ðµð· Puerto Rico</option>
                <option value="BR">ð§ð· Brasil</option>
              </optgroup>
              <optgroup label="ââ AmÃ©rica del Norte ââ">
                <option value="CA">ð¨ð¦ CanadÃ¡</option>
              </optgroup>
              <optgroup label="ââ Asia / PacÃ­fico ââ">
                <option value="IN">ð®ð³ India</option>
                <option value="PH">ðµð­ Filipinas</option>
                <option value="ID">ð®ð© Indonesia</option>
                <option value="TH">ð¹ð­ Tailandia</option>
                <option value="VN">ð»ð³ Vietnam</option>
                <option value="MY">ð²ð¾ Malasia</option>
                <option value="SG">ð¸ð¬ Singapur</option>
                <option value="KH">ð°ð­ Camboya</option>
                <option value="BD">ð§ð© Bangladesh</option>
                <option value="JP">ð¯ðµ JapÃ³n</option>
                <option value="KR">ð°ð· Corea del Sur</option>
                <option value="TW">ð¹ð¼ TaiwÃ¡n</option>
                <option value="HK">ð­ð° Hong Kong</option>
              </optgroup>
              <optgroup label="ââ Ãfrica ââ">
                <option value="NG">ð³ð¬ Nigeria</option>
                <option value="KE">ð°ðª Kenia</option>
                <option value="ZA">ð¿ð¦ SudÃ¡frica</option>
                <option value="GH">ð¬ð­ Ghana</option>
                <option value="TZ">ð¹ð¿ Tanzania</option>
                <option value="ET">ðªð¹ EtiopÃ­a</option>
              </optgroup>
              <optgroup label="ââ Europa ââ">
                <option value="IT">ð®ð¹ Italia</option>
                <option value="PL">ðµð± Polonia</option>
                <option value="CZ">ð¨ð¿ Rep. Checa</option>
                <option value="RO">ð·ð´ RumanÃ­a</option>
                <option value="BG">ð§ð¬ Bulgaria</option>
                <option value="GR">ð¬ð· Grecia</option>
                <option value="SE">ð¸ðª Suecia</option>
                <option value="NO">ð³ð´ Noruega</option>
                <option value="FI">ð«ð® Finlandia</option>
                <option value="DK">ð©ð° Dinamarca</option>
                <option value="LT">ð±ð¹ Lituania</option>
                <option value="LV">ð±ð» Letonia</option>
                <option value="EE">ðªðª Estonia</option>
                <option value="SK">ð¸ð° Eslovaquia</option>
                <option value="SI">ð¸ð® Eslovenia</option>
                <option value="HR">ð­ð· Croacia</option>
                <option value="RS">ð·ð¸ Serbia</option>
                <option value="CH">ð¨ð­ Suiza</option>
              </optgroup>
              <option value="OTHER">ð Otro</option>
            </select>

            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                className="mt-1 accent-amber-400 w-4 h-4 flex-shrink-0"
              />
              <span className="text-slate-400 text-xs leading-relaxed">
                {copy.consent}{' '}
                <a href={`/${locale}/privacidad`} className="text-amber-400 hover:underline">
                  {copy.privacy}
                </a>
              </span>
            </label>

            {errorMsg && <p className="text-red-400 text-sm">{errorMsg}</p>}

            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full bg-amber-500 hover:bg-amber-400 text-white font-black py-3 rounded-xl transition-colors disabled:opacity-60 text-base"
            >
              {status === 'loading' ? copy.loading : copy.cta}
            </button>

            <p className="text-center text-slate-500 text-xs">{copy.disclaimer}</p>
          </>
        )}
      </form>
    </div>
  );
}

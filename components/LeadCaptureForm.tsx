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
    headline: isEs ? '🎁 Recibe alertas de bonos exclusivos' : '🎁 Get exclusive bonus alerts',
    subheadline: isEs
      ? 'Bonos sin depósito, free spins y ofertas VIP de BetFury — directo a tu email.'
      : 'No-deposit bonuses, free spins and VIP offers from BetFury — straight to your inbox.',
    emailPlaceholder: isEs ? 'Tu email' : 'Your email',
    countryPlaceholder: isEs ? 'País (opcional)' : 'Country (optional)',
    cta: isEs ? 'Quiero mis bonos →' : 'Get my bonuses →',
    loading: isEs ? 'Enviando...' : 'Sending...',
    success: isEs ? '✅ ¡Listo! Revisa tu email para confirmar.' : '✅ Done! Check your email to confirm.',
    consent: isEs
      ? 'Acepto recibir emails con ofertas y novedades de CryptoLucky. Puedo darme de baja en cualquier momento.'
      : 'I agree to receive emails with offers and news from CryptoLucky. I can unsubscribe at any time.',
    privacy: isEs ? 'Política de privacidad' : 'Privacy policy',
    error: isEs ? 'Error al suscribirse. Inténtalo de nuevo.' : 'Subscription error. Please try again.',
    disclaimer: isEs ? '🔒 Sin spam. Solo bonos y guías exclusivas.' : '🔒 No spam. Only exclusive bonuses and guides.',
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!consent) {
      setErrorMsg(isEs ? 'Debes aceptar la política de privacidad' : 'You must accept the privacy policy');
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
          (window as any).gtag('event', 'lead_capture', { event_category: 'engagement', event_label: source, value: 1 });
        }
      } else {
        const data = await res.json().catch(() => ({}));
        if (data.error === 'already_subscribed') { setStatus('success'); } else { throw new Error('server_error'); }
      }
    } catch { setStatus('error'); setErrorMsg(copy.error); }
  };

  if (status === 'success') {
    return (
      <div className="bg-green-900/30 border border-green-500/40 rounded-xl p-6 text-center">
        <p className="text-green-400 font-bold text-lg">{copy.success}</p>
        <p className="text-slate-400 text-sm mt-2">
          {isEs ? 'Pronto recibirás tus primeras alertas de bonos.' : "You'll soon receive your first bonus alerts."}
        </p>
      </div>
    );
  }

  const inputClass = 'w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 text-sm transition-colors';

  return (
    <div className={variant === 'sticky' ? 'bg-slate-900 border-t border-amber-500/30 p-4' : 'bg-gradient-to-br from-slate-900 to-slate-800 border border-amber-500/20 rounded-2xl p-6 md:p-8'}>
      {variant !== 'sticky' && (
        <>
          <h3 className="text-2xl font-black text-white mb-2">{copy.headline}</h3>
          <p className="text-slate-400 text-sm mb-6">{copy.subheadline}</p>
        </>
      )}
      <form onSubmit={handleSubmit} className={variant === 'sticky' ? 'flex gap-2 items-center' : 'space-y-4'}>
        {variant === 'sticky' ? (
          <>
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder={copy.emailPlaceholder} className="flex-1 bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-amber-400" />
            <button type="submit" disabled={status === 'loading'} onClick={() => !consent && setConsent(true)} className="bg-amber-500 hover:bg-amber-400 text-white font-bold text-sm px-4 py-2 rounded-lg whitespace-nowrap transition-colors disabled:opacity-60">
              {status === 'loading' ? copy.loading : copy.cta}
            </button>
          </>
        ) : (
          <>
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder={copy.emailPlaceholder} className={inputClass} />
            <select value={country} onChange={(e) => setCountry(e.target.value)} className={inputClass}>
              <option value="">{copy.countryPlaceholder}</option>
              <option value="MX">🇲🇽 México</option>
              <option value="CO">🇨🇴 Colombia</option>
              <option value="AR">🇦🇷 Argentina</option>
              <option value="PE">🇵🇪 Perú</option>
              <option value="CL">🇨🇱 Chile</option>
              <option value="VE">🇻🇪 Venezuela</option>
              <option value="OTHER">🌍 Otro</option>
            </select>
            <label className="flex items-start gap-3 cursor-pointer">
              <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="mt-1 accent-amber-400 w-4 h-4 flex-shrink-0" />
              <span className="text-slate-400 text-xs leading-relaxed">
                {copy.consent}{' '}
                <a href={`/${locale}/privacidad`} className="text-amber-400 hover:underline">{copy.privacy}</a>
              </span>
            </label>
            {errorMsg && <p className="text-red-400 text-sm">{errorMsg}</p>}
            <button type="submit" disabled={status === 'loading'} className="w-full bg-amber-500 hover:bg-amber-400 text-white font-black py-3 rounded-xl transition-colors disabled:opacity-60 text-base">
              {status === 'loading' ? copy.loading : copy.cta}
            </button>
            <p className="text-center text-slate-500 text-xs">{copy.disclaimer}</p>
          </>
        )}
      </form>
    </div>
  );
}

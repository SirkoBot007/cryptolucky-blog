'use client';

import { useState, useEffect } from 'react';
import LeadCaptureForm from './LeadCaptureForm';

interface ExitIntentPopupProps {
  locale?: string;
}

export default function ExitIntentPopup({ locale = 'es' }: ExitIntentPopupProps) {
  const [show, setShow] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const isEs = locale === 'es';

  useEffect(() => {
    const alreadySubscribed = sessionStorage.getItem('cl_subscribed');
    const alreadyDismissed = sessionStorage.getItem('cl_popup_dismissed');
    if (alreadySubscribed || alreadyDismissed) return;
    let triggered = false;
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 5 && !triggered) { triggered = true; setShow(true); }
    };
    let mobileTimer: ReturnType<typeof setTimeout>;
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      mobileTimer = setTimeout(() => { if (!triggered) { triggered = true; setShow(true); } }, 45000);
    }
    document.addEventListener('mouseleave', handleMouseLeave);
    return () => { document.removeEventListener('mouseleave', handleMouseLeave); clearTimeout(mobileTimer); };
  }, []);

  const handleDismiss = () => {
    setShow(false);
    setDismissed(true);
    sessionStorage.setItem('cl_popup_dismissed', '1');
  };

  if (!show || dismissed) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm" onClick={handleDismiss} />
      <div className="relative bg-slate-900 border border-amber-500/30 rounded-2xl shadow-2xl max-w-md w-full p-8 z-10">
        <button onClick={handleDismiss} className="absolute top-4 right-4 text-slate-500 hover:text-slate-300 text-2xl leading-none" aria-label="Cerrar">×</button>
        <div className="text-center mb-6">
          <span className="text-4xl">🎰</span>
          <h2 className="text-2xl font-black text-white mt-3">
            {isEs ? '¡Espera! Hay un bono esperándote' : "Wait! There's a bonus waiting for you"}
          </h2>
          <p className="text-slate-400 text-sm mt-2">
            {isEs
              ? 'Suscríbete gratis y recibe alertas de bonos sin depósito, free spins y ofertas VIP de BetFury antes que nadie.'
              : 'Subscribe for free and get no-deposit bonus alerts, free spins and VIP BetFury offers before anyone else.'}
          </p>
        </div>
        <LeadCaptureForm locale={locale} variant="inline" source="exit-intent" />
        <div className="text-center mt-4 pt-4 border-t border-slate-700/40">
          <p className="text-xs text-slate-500 mb-3">
            {isEs ? 'O regístrate directamente con nuestro código:' : 'Or sign up directly with our code:'}
          </p>
          <a
            href="https://betfury.io/?r=LUCKYSIRKO007&utm_source=cryptolucky&utm_medium=exit-popup&utm_campaign=betfury"
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="inline-block bg-gradient-to-r from-[#FF6B35] to-[#ff8c5a] hover:from-[#ff5a1f] hover:to-[#FF6B35] text-white font-black text-sm px-6 py-2.5 rounded-lg transition-all"
          >
            {isEs ? '🎰 Ir a BetFury · LUCKYSIRKO007' : '🎰 Go to BetFury · LUCKYSIRKO007'}
          </a>
        </div>
        <p className="text-center text-slate-600 text-xs mt-4">
          {isEs ? 'Sin spam. Baja cuando quieras. +18 · Juega con responsabilidad.' : 'No spam. Unsubscribe anytime. 18+ · Gamble responsibly.'}
        </p>
      </div>
    </div>
  );
}

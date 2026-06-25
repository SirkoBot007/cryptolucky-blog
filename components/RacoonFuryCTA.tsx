'use client';

import { useState, useEffect } from 'react';

const AFFILIATE_URL =
  process.env.NEXT_PUBLIC_BETFURY_AFFILIATE || 'https://betfury.io/?r=LUCKYSIRKO007';

function buildUrl(campaign: string): string {
  try {
    const url = new URL(AFFILIATE_URL);
    url.searchParams.set('utm_source', 'cryptolucky');
    url.searchParams.set('utm_medium', 'floating');
    url.searchParams.set('utm_campaign', campaign);
    return url.toString();
  } catch {
    return AFFILIATE_URL;
  }
}

interface Props {
  locale?: string;
  delay?: number;
  /** Clases extra para el contenedor fijo. Ej.: 'hidden md:block' para mostrarlo solo en escritorio. */
  className?: string;
}

export default function RacoonFuryCTA({ locale = 'es', delay = 8000, className = '' }: Props) {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  const isEs = locale === 'es';

  useEffect(() => {
    const stored = localStorage.getItem('racoon-cta-dismissed');
    if (stored) {
      const dismissedAt = parseInt(stored, 10);
      if (Date.now() - dismissedAt < 24 * 60 * 60 * 1000) {
        return;
      }
    }
    const timer = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  function dismiss() {
    setDismissed(true);
    setTimeout(() => setVisible(false), 300);
    localStorage.setItem('racoon-cta-dismissed', String(Date.now()));
  }

  if (!visible) return null;

  return (
    <div
      className={`fixed bottom-5 right-5 z-50 transition-all duration-300 ${
        dismissed ? 'opacity-0 translate-y-4 pointer-events-none' : 'opacity-100 translate-y-0'
      } ${className}`.trim()}
      role="complementary"
      aria-label="BetFury promotion"
    >
      <div className="relative bg-gradient-to-br from-[#1B1B2F] to-[#12122a] border border-[#FF6B35]/40 rounded-2xl shadow-2xl shadow-black/60 p-4 w-[240px] max-w-[90vw]">
        <button
          onClick={dismiss}
          className="absolute top-2 right-2 w-6 h-6 rounded-full bg-slate-700 hover:bg-slate-600 text-slate-400 hover:text-white text-xs flex items-center justify-center transition-colors"
          aria-label="Cerrar"
        >
          &#x2715;
        </button>

        <div className="flex items-end gap-2 mb-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/betfury/mascot/racoon-money.png"
            alt="RacoonFury"
            width={72}
            height={72}
            className="object-contain flex-shrink-0 drop-shadow-lg"
            draggable={false}
          />
          <div className="flex-1">
            <p className="text-[#FF6B35] text-xs font-black uppercase tracking-widest leading-tight">
              {isEs ? 'BetFury Casino' : 'BetFury Casino'}
            </p>
            <p className="text-white text-sm font-black leading-snug mt-0.5">
              {isEs ? 'Gana dividendos cripto diarios' : 'Earn daily crypto dividends'}
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-2 mb-3">
          <div className="flex items-center gap-1.5">
            <span className="text-[#FF6B35] text-xs">&#x2713;</span>
            <span className="text-slate-300 text-xs">{isEs ? '+5.000 juegos' : '+5,000 games'}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-[#FF6B35] text-xs">&#x2713;</span>
            <span className="text-slate-300 text-xs">{isEs ? 'Sin KYC obligatorio' : 'No mandatory KYC'}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-[#FF6B35] text-xs">&#x2713;</span>
            <span className="text-slate-300 text-xs">{isEs ? 'Retiros en minutos' : 'Withdrawals in minutes'}</span>
          </div>
        </div>

        <a
          href={buildUrl('floating-cta')}
          target="_blank"
          rel="noopener noreferrer sponsored"
          onClick={() => {
            if (typeof window !== 'undefined' && typeof (window as { gtag?: (...a: unknown[]) => void }).gtag === 'function') {
              (window as { gtag: (...a: unknown[]) => void }).gtag('event', 'affiliate_click', { event_category: 'engagement', event_label: 'racoon-floating-cta' });
            }
          }}
          className="block w-full text-center bg-gradient-to-r from-[#FF6B35] to-[#ff8c5a] hover:from-[#ff5a1f] hover:to-[#FF6B35] text-white font-black text-sm py-2.5 rounded-xl transition-all duration-300 shadow-lg shadow-[#FF6B35]/30"
        >
          {isEs ? 'Jugar gratis →' : 'Play free →'}
        </a>

        <p className="text-slate-600 text-[10px] text-center mt-2">
          {isEs ? 'Cod: LUCKYSIRKO007' : 'Code: LUCKYSIRKO007'}
        </p>
      </div>
    </div>
  );
}

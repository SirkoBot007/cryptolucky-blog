'use client';

// StickyMobileCTA — barra de afiliado inferior SOLO en móvil (md:hidden).
// Aparece tras scroll profundo (translateY), reserva su espacio con un spacer (cero CLS),
// respeta prefers-reduced-motion (motion-reduce) y es descartable por sesión.
// Sustituye al CTA flotante (RacoonFury) en móvil para no apilar dos CTAs (anti-spam).

import { useEffect, useState } from 'react';
import { track } from '@vercel/analytics/react';

const AFFILIATE_URL =
  process.env.NEXT_PUBLIC_BETFURY_AFFILIATE || 'https://betfury.io/?r=LUCKYSIRKO007';

function buildUrl(campaign: string): string {
  try {
    const url = new URL(AFFILIATE_URL);
    url.searchParams.set('utm_source', 'cryptolucky');
    url.searchParams.set('utm_medium', 'sticky-mobile');
    url.searchParams.set('utm_campaign', campaign);
    return url.toString();
  } catch {
    return AFFILIATE_URL;
  }
}

interface Props {
  locale?: string;
  /** Slug del artículo, usado como utm_campaign. */
  slug?: string;
  /** Píxeles de scroll antes de mostrar la barra. */
  visibleAfterPx?: number;
}

export default function StickyMobileCTA({
  locale = 'es',
  slug = 'article',
  visibleAfterPx = 480,
}: Props) {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const isEs = locale === 'es';

  useEffect(() => {
    if (sessionStorage.getItem('cl_sticky_dismissed')) {
      setDismissed(true);
      return;
    }
    const onScroll = () => setVisible(window.scrollY > visibleAfterPx);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [visibleAfterPx]);

  function handleClick() {
    track('affiliate_click', { medium: 'sticky-mobile', campaign: slug });
    if (
      typeof window !== 'undefined' &&
      typeof (window as { gtag?: (...a: unknown[]) => void }).gtag === 'function'
    ) {
      (window as { gtag: (...a: unknown[]) => void }).gtag('event', 'affiliate_click', {
        event_category: 'engagement',
        event_label: 'sticky-mobile-cta',
      });
    }
  }

  function dismiss() {
    setDismissed(true);
    sessionStorage.setItem('cl_sticky_dismissed', '1');
  }

  if (dismissed) return null;

  return (
    <div className="md:hidden">
      {/* Spacer en el flujo: reserva el alto de la barra para que no tape el contenido (cero CLS). */}
      <div className="h-[76px]" aria-hidden="true" />

      <div
        className={[
          'fixed inset-x-0 bottom-0 z-40 border-t border-[#FF6B35]/30',
          'bg-slate-900/95 backdrop-blur-sm shadow-[0_-8px_24px_rgba(0,0,0,0.45)]',
          'transition-transform duration-300 will-change-transform motion-reduce:transition-none',
          visible ? 'translate-y-0' : 'translate-y-full',
        ].join(' ')}
        style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
        role="complementary"
        aria-label="BetFury"
        aria-hidden={!visible}
      >
        <div className="flex items-center gap-3 px-4 py-3">
          <div className="min-w-0 flex-1">
            <p className="text-[#FF6B35] text-[10px] font-black uppercase tracking-widest leading-tight">
              BetFury
            </p>
            <p className="text-white text-sm font-bold leading-snug truncate">
              {isEs ? 'Bono de bienvenida + giros gratis' : 'Welcome bonus + free spins'}
            </p>
          </div>
          <a
            href={buildUrl(slug)}
            target="_blank"
            rel="noopener noreferrer sponsored"
            onClick={handleClick}
            data-cta="sticky-mobile"
            className="flex-shrink-0 bg-gradient-to-r from-[#FF6B35] to-[#ff8c5a] hover:from-[#ff5a1f] hover:to-[#FF6B35] text-white font-black text-sm px-5 py-2.5 rounded-xl shadow-lg shadow-[#FF6B35]/25 whitespace-nowrap transition-colors"
          >
            {isEs ? 'Jugar gratis →' : 'Play free →'}
          </a>
          <button
            onClick={dismiss}
            aria-label={isEs ? 'Cerrar' : 'Close'}
            className="flex-shrink-0 -mr-1 w-7 h-7 rounded-full text-slate-500 hover:text-slate-300 flex items-center justify-center text-sm"
          >
            <span aria-hidden="true">&#x2715;</span>
          </button>
        </div>
      </div>
    </div>
  );
}

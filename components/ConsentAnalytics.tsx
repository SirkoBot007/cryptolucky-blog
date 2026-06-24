'use client';

// ============================================================
// ConsentAnalytics — banner de cookies + GA4 condicionado
// - CSS puro (Tailwind), sin librerías externas
// - GA4 solo se carga TRAS consentimiento explícito (GDPR/YMYL)
// - Eventos affiliate_click con slug de página para CTR por artículo
// - Cero impacto en LCP: nada se carga antes del consentimiento
// ============================================================

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';

const CONSENT_KEY = 'cl_consent';
const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

function loadGA() {
  if (!GA_ID || window.gtag) return;
  const s = document.createElement('script');
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(s);
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer!.push(arguments);
  };
  window.gtag('js', new Date());
  window.gtag('config', GA_ID, { anonymize_ip: true });
}

function trackAffiliateClicks() {
  document.addEventListener('click', (e) => {
    const target = e.target as HTMLElement | null;
    const link = target?.closest?.('a[href*="betfury.io"]') as HTMLAnchorElement | null;
    if (link && window.gtag) {
      window.gtag('event', 'affiliate_click', {
        link_url: link.href,
        page_path: window.location.pathname,
        link_text: (link.textContent || '').trim().slice(0, 60),
      });
    }
  });
}

export default function ConsentAnalytics({ locale }: { locale: string }) {
  const [visible, setVisible] = useState(false);
  const isEs = locale === 'es';
  const pathname = usePathname();
  const firstPv = useRef(true);

  // GA4 + App Router: las navegaciones cliente (<Link>) NO recargan la página, así que
  // gtag('config') solo envía page_view en la carga inicial. Enviamos page_view en cada
  // cambio de ruta (saltando la primera, ya cubierta por loadGA) → mide el 100% de las vistas.
  useEffect(() => {
    if (firstPv.current) {
      firstPv.current = false;
      return;
    }
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      window.gtag('event', 'page_view', {
        page_path: pathname,
        page_location: window.location.href,
        page_title: document.title,
      });
    }
  }, [pathname]);

  useEffect(() => {
    const consent = localStorage.getItem(CONSENT_KEY);
    if (consent === 'accepted') {
      loadGA();
      trackAffiliateClicks();
    } else if (consent !== 'rejected') {
      setVisible(true);
    }
  }, []);

  if (!visible) return null;

  const decide = (value: 'accepted' | 'rejected') => {
    localStorage.setItem(CONSENT_KEY, value);
    setVisible(false);
    if (value === 'accepted') {
      loadGA();
      trackAffiliateClicks();
    }
  };

  return (
    <div
      role="dialog"
      aria-label={isEs ? 'Consentimiento de cookies' : 'Cookie consent'}
      className="fixed bottom-0 inset-x-0 z-50 bg-slate-900 border-t border-slate-700 p-4"
    >
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center gap-3">
        <p className="text-slate-300 text-xs sm:text-sm flex-1">
          {isEs
            ? 'Usamos cookies analíticas (Google Analytics) solo si las aceptas, para entender qué contenido es útil. Sin cookies publicitarias.'
            : 'We use analytics cookies (Google Analytics) only if you accept, to understand which content is useful. No advertising cookies.'}{' '}
          <a href={`/${locale}/privacidad`} className="text-amber-400 hover:underline">
            {isEs ? 'Más información' : 'Learn more'}
          </a>
        </p>
        <div className="flex gap-2 flex-shrink-0">
          <button
            onClick={() => decide('rejected')}
            className="px-4 py-2 text-xs font-semibold rounded-lg border border-slate-600 text-slate-300 hover:bg-slate-800 transition-colors"
          >
            {isEs ? 'Rechazar' : 'Reject'}
          </button>
          <button
            onClick={() => decide('accepted')}
            className="px-4 py-2 text-xs font-bold rounded-lg bg-amber-500 hover:bg-amber-400 text-white transition-colors"
          >
            {isEs ? 'Aceptar' : 'Accept'}
          </button>
        </div>
      </div>
    </div>
  );
}

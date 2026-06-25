'use client';

// AffiliateClickTracker — UN listener delegado global para CTAs de afiliado SERVER-rendered.
// Captura clicks en cualquier [data-aff-track] y dispara track() (Vercel) + gtag affiliate_click (GA4).
// Permite mantener los CTAs in-content como Server Components (sin onClick).
// NO interfiere con StickyMobileCTA/RacoonFuryCTA: esos son client y trackean por su cuenta
// (no llevan data-aff-track), así que no se duplica el evento.

import { useEffect } from 'react';
import { track } from '@vercel/analytics/react';

export default function AffiliateClickTracker() {
  useEffect(() => {
    function onClick(e: MouseEvent) {
      const target = e.target as HTMLElement | null;
      const el = target?.closest('[data-aff-track]') as HTMLElement | null;
      if (!el) return;

      const medium = el.getAttribute('data-aff-medium') || 'affiliate';
      const campaign = el.getAttribute('data-aff-campaign') || '';
      const intent = el.getAttribute('data-aff-intent') || '';

      track('affiliate_click', { medium, campaign, intent });

      const w = window as { gtag?: (...args: unknown[]) => void };
      if (typeof w.gtag === 'function') {
        w.gtag('event', 'affiliate_click', {
          event_category: 'engagement',
          event_label: intent ? `${medium}:${intent}` : medium,
        });
      }
    }

    document.addEventListener('click', onClick, { passive: true });
    return () => document.removeEventListener('click', onClick);
  }, []);

  return null;
}

'use client';

/**
 * AdSense — Componente para monetizar el blog con Google AdSense
 *
 * CÓMO ACTIVAR (gratis, sin coste):
 * 1. Solicita una cuenta en https://www.google.com/adsense/
 * 2. Verifica tu dominio (cryptoluckyguia.com)
 * 3. Cuando Google apruebe tu cuenta, obtén tu Publisher ID (ca-pub-XXXXXXXXXXXXXXXX)
 * 4. En Vercel → Settings → Environment Variables:
 *    Añade: NEXT_PUBLIC_ADSENSE_ID = ca-pub-XXXXXXXXXXXXXXXX
 * 5. Haz un redeploy — los anuncios aparecerán automáticamente
 *
 * Mientras no esté configurado el ID, el componente no renderiza nada.
 */

import { useEffect } from 'react';

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

interface AdSenseProps {
  slot: string;
  format?: 'auto' | 'fluid' | 'rectangle' | 'vertical' | 'horizontal';
  responsive?: boolean;
  className?: string;
}

export default function AdSense({
  slot,
  format = 'auto',
  responsive = true,
  className = '',
}: AdSenseProps) {
  const publisherId = process.env.NEXT_PUBLIC_ADSENSE_ID;

  useEffect(() => {
    if (!publisherId) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      // silencioso — AdSense ya inicializado
    }
  }, [publisherId]);

  if (!publisherId) return null;

  return (
    <div className={`adsense-container ${className}`}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={publisherId}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive ? 'true' : 'false'}
      />
    </div>
  );
}

/**
 * AdSense Banner — horizontal para insertar entre secciones del artículo
 */
export function AdSenseBanner({ className = '' }: { className?: string }) {
  return (
    <AdSense
      slot="YOUR_BANNER_SLOT_ID"
      format="horizontal"
      responsive={true}
      className={`my-6 ${className}`}
    />
  );
}

/**
 * AdSense Rectangle — cuadrado para sidebar o mitad de artículo
 */
export function AdSenseRectangle({ className = '' }: { className?: string }) {
  return (
    <AdSense
      slot="YOUR_RECTANGLE_SLOT_ID"
      format="rectangle"
      responsive={false}
      className={`my-4 ${className}`}
    />
  );
}

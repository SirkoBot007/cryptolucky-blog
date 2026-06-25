// OG image única por artículo (1200x630) con @vercel/og — estética vibrante "slot tile":
// gradiente vivo + glow + emoji temático + título + marca. CDN-cacheada. 0€.
import { ImageResponse } from 'next/og';
import { getArticleBySlug, getTitle } from '@/lib/notion';
import { getArticleVisual } from '@/lib/article-visuals';

// Edge: @vercel/og carga fuentes y Twemoji correctamente en edge (evita el bug de Windows nodejs).
export const runtime = 'edge';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = 'CryptoLucky — Guía BetFury en español';

export default async function Image({ params }: { params: { locale: string; slug: string } }) {
  const data = await getArticleBySlug(params.slug).catch(() => null);
  const rawTitle = data ? getTitle(data.article, params.locale) : 'CryptoLucky';
  const title = rawTitle.length > 92 ? `${rawTitle.slice(0, 89)}…` : rawTitle;
  const v = getArticleVisual(params.slug, data?.article?.category ?? '');

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '64px',
          backgroundImage: `linear-gradient(135deg, ${v.c1} 0%, ${v.c2} 52%, ${v.c3} 100%)`,
          color: 'white',
          fontFamily: 'sans-serif',
        }}
      >
        {/* glow detrás del símbolo */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            display: 'flex',
            backgroundImage: `radial-gradient(circle at 32% 52%, ${v.glow}cc, transparent 42%)`,
          }}
        />
        {/* brillo glossy superior */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            display: 'flex',
            backgroundImage: 'linear-gradient(180deg, rgba(255,255,255,0.28) 0%, transparent 38%)',
          }}
        />

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', fontSize: 34, fontWeight: 700 }}>
            <span style={{ fontSize: 44 }}>🍀</span>
            <span>CryptoLucky</span>
          </div>
          <div style={{ display: 'flex', fontSize: 24, color: '#fff', textTransform: 'uppercase', letterSpacing: 2, fontWeight: 700, opacity: 0.92 }}>
            {v.label}
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '44px' }}>
          <div style={{ display: 'flex', fontSize: 170 }}>{v.emoji}</div>
          <div style={{ display: 'flex', fontSize: 62, fontWeight: 800, lineHeight: 1.12, maxWidth: 720 }}>{title}</div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 26 }}>
          <span style={{ display: 'flex', color: 'rgba(255,255,255,0.85)' }}>cryptoluckyguia.com</span>
          <span style={{ display: 'flex', color: '#fff', fontWeight: 700 }}>Guía BetFury · +18</span>
        </div>
      </div>
    ),
    size,
  );
}

// OG image única por artículo (1200x630) generada con @vercel/og (incluido en Next).
// Sin banner de casino: marca + categoría + emoji temático + título. CDN-cacheada. 0€.
import { ImageResponse } from 'next/og';
import { getArticleBySlug, getTitle } from '@/lib/notion';
import { getArticleVisual, OG_STYLE } from '@/lib/article-visuals';

// Edge: @vercel/og carga sus fuentes correctamente en edge (evita el bug de fileURLToPath
// en Windows con runtime nodejs). lib/notion lee datos locales → es edge-safe.
export const runtime = 'edge';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = 'CryptoLucky — Guía BetFury en español';

export default async function Image({ params }: { params: { locale: string; slug: string } }) {
  const data = await getArticleBySlug(params.slug).catch(() => null);
  const rawTitle = data ? getTitle(data.article, params.locale) : 'CryptoLucky';
  const title = rawTitle.length > 92 ? `${rawTitle.slice(0, 89)}…` : rawTitle;
  const category = data?.article?.category ?? '';
  const v = getArticleVisual(params.slug, category);
  const s = OG_STYLE[v.key] ?? OG_STYLE.default;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '70px',
          backgroundImage: `linear-gradient(135deg, ${s.from} 0%, #020617 72%)`,
          color: 'white',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', fontSize: 32, fontWeight: 700 }}>
            <span style={{ fontSize: 42 }}>🍀</span>
            <span>CryptoLucky</span>
          </div>
          <div style={{ display: 'flex', fontSize: 24, color: s.fg, textTransform: 'uppercase', letterSpacing: 2, fontWeight: 700 }}>
            {v.label}
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '40px' }}>
          <div style={{ display: 'flex', fontSize: 130 }}>{s.emoji}</div>
          <div style={{ display: 'flex', fontSize: 62, fontWeight: 800, lineHeight: 1.12, maxWidth: 780 }}>
            {title}
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 26 }}>
          <span style={{ color: '#cbd5e1' }}>cryptoluckyguia.com</span>
          <span style={{ display: 'flex', color: s.fg, fontWeight: 700 }}>Guía BetFury · +18</span>
        </div>
      </div>
    ),
    size,
  );
}

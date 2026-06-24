// ArticleThumb — miniatura temática por artículo en CSS/SVG puro.
// 0 KB de imagen, cero CLS, sin GIFs de banner. El tema (gradiente + icono + color)
// se deriva del slug/categoría (lib/article-visuals.ts). Server Component.

import { getArticleVisual, type IconKey } from '@/lib/article-visuals';

const ICONS: Record<IconKey, React.ReactNode> = {
  trophy: (
    <>
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
      <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
      <path d="M4 22h16" />
      <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
      <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
      <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
    </>
  ),
  target: (
    <>
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </>
  ),
  dice: (
    <>
      <rect width="18" height="18" x="3" y="3" rx="3" />
      <path d="M8 8h.01" />
      <path d="M16 8h.01" />
      <path d="M12 12h.01" />
      <path d="M8 16h.01" />
      <path d="M16 16h.01" />
    </>
  ),
  gamepad: (
    <>
      <line x1="6" x2="10" y1="12" y2="12" />
      <line x1="8" x2="8" y1="10" y2="14" />
      <line x1="15" x2="15.01" y1="13" y2="13" />
      <line x1="18" x2="18.01" y1="11" y2="11" />
      <rect width="20" height="12" x="2" y="6" rx="6" />
    </>
  ),
  coins: (
    <>
      <circle cx="8" cy="8" r="6" />
      <path d="M18.09 10.37A6 6 0 1 1 10.34 18" />
      <path d="M7 6h1v4" />
      <path d="m16.71 13.88.7.71-2.82 2.82" />
    </>
  ),
  gift: (
    <>
      <rect x="3" y="8" width="18" height="4" rx="1" />
      <path d="M12 8v13" />
      <path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7" />
      <path d="M7.5 8a2.5 2.5 0 0 1 0-5C9 3 12 5 12 8c0-3 3-5 4.5-5a2.5 2.5 0 0 1 0 5" />
    </>
  ),
  shield: (
    <>
      <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
      <path d="m9 12 2 2 4-4" />
    </>
  ),
  star: (
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  ),
  book: (
    <>
      <path d="M12 7v14" />
      <path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z" />
    </>
  ),
  clover: (
    <>
      <circle cx="9" cy="9" r="3.2" />
      <circle cx="15" cy="9" r="3.2" />
      <circle cx="9" cy="15" r="3.2" />
      <circle cx="15" cy="15" r="3.2" />
      <path d="M12 12v8" />
    </>
  ),
};

interface Props {
  slug: string;
  category?: string;
  /** Título del artículo → usado como alt/aria-label (único por artículo). */
  title: string;
  /** Clases de tamaño/posición del contenedor (ej. 'h-44', 'h-full absolute inset-0'). */
  className?: string;
}

export default function ArticleThumb({ slug, category = '', title, className = '' }: Props) {
  const v = getArticleVisual(slug, category);

  return (
    <div
      role="img"
      aria-label={`${v.label}: ${title}`}
      className={`overflow-hidden ${v.gradient} ${className}`}
    >
      {/* Brillo radial */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{ background: 'radial-gradient(circle at 72% 28%, rgba(255,255,255,0.22), transparent 58%)' }}
      />
      {/* Icono temático grande, marca de agua */}
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="absolute -right-5 -bottom-5 w-32 h-32 text-white opacity-20"
      >
        {ICONS[v.icon]}
      </svg>
      {/* Icono temático principal, centrado */}
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="absolute inset-0 m-auto w-20 h-20 text-white opacity-95 drop-shadow-lg"
      >
        {ICONS[v.icon]}
      </svg>
      {/* Marca CryptoLucky */}
      <div aria-hidden="true" className="absolute bottom-2.5 left-3 flex items-center gap-1.5">
        <span className="text-white text-sm leading-none">&#x2618;</span>
        <span className="text-white/90 text-[10px] font-bold tracking-wide drop-shadow">CryptoLucky</span>
      </div>
    </div>
  );
}

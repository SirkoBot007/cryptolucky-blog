// ArticleThumb — miniatura "slot tile" vibrante por artículo, en CSS + emoji (0 KB de imagen,
// cero CLS). Gradiente vivo + brillo glossy + glow + destellos + bisel. El tema (paleta + emoji)
// viene de lib/article-visuals.ts. Server Component. Escala con container queries (cqh).

import Image from 'next/image';
import { getArticleVisual } from '@/lib/article-visuals';
import { hasThumb, thumbSrc } from '@/lib/thumb-manifest';

interface Props {
  slug: string;
  category?: string;
  /** Título del artículo → alt/aria-label (único por artículo). */
  title: string;
  /** Clases de tamaño/posición del contenedor (ej. 'absolute inset-0', 'relative h-56'). */
  className?: string;
  /** true en la imagen LCP (hero) para no diferir su carga. */
  priority?: boolean;
}

export default function ArticleThumb({ slug, category = '', title, className = '', priority = false }: Props) {
  // Si el artículo ya tiene miniatura real (PicLumen), usar next/image (WebP, object-cover,
  // sin CLS porque el contenedor ya está dimensionado por className). Si no, tile CSS temático.
  if (hasThumb(slug)) {
    return (
      <div className={`overflow-hidden ${className}`}>
        <Image
          src={thumbSrc(slug)}
          alt={title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
          className="object-cover"
          priority={priority}
        />
      </div>
    );
  }

  const v = getArticleVisual(slug, category);

  return (
    <div
      role="img"
      aria-label={`${v.label}: ${title}`}
      className={`overflow-hidden ${className}`}
      style={{
        containerType: 'size',
        background: `linear-gradient(135deg, ${v.c1} 0%, ${v.c2} 52%, ${v.c3} 100%)`,
      }}
    >
      {/* Glow / foco detrás del símbolo */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{ background: `radial-gradient(circle at 50% 44%, ${v.glow}cc, transparent 47%)` }}
      />
      {/* Brillo glossy superior */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.32) 0%, rgba(255,255,255,0.06) 30%, transparent 46%)' }}
      />
      {/* Destellos */}
      <span aria-hidden="true" className="absolute" style={{ top: '13%', left: '15%', fontSize: '9cqh', color: '#ffffff', opacity: 0.9, textShadow: '0 0 8px #fff' }}>✦</span>
      <span aria-hidden="true" className="absolute" style={{ top: '60%', left: '23%', fontSize: '6cqh', color: v.glow, opacity: 0.85 }}>✦</span>
      <span aria-hidden="true" className="absolute" style={{ top: '22%', right: '13%', fontSize: '7cqh', color: '#fde68a', opacity: 0.95 }}>✦</span>
      <span aria-hidden="true" className="absolute" style={{ top: '70%', right: '17%', fontSize: '5cqh', color: '#ffffff', opacity: 0.7 }}>✦</span>
      {/* Símbolo (emoji) con glow */}
      <div aria-hidden="true" className="absolute inset-0 flex items-center justify-center">
        <span style={{ fontSize: '47cqh', lineHeight: 1, filter: `drop-shadow(0 3px 8px rgba(0,0,0,0.45)) drop-shadow(0 0 14px ${v.glow})` }}>
          {v.emoji}
        </span>
      </div>
      {/* Bisel: brillo arriba + sombra abajo para profundidad */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{ boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.35), inset 0 -30px 42px rgba(0,0,0,0.30)' }}
      />
      {/* Marca CryptoLucky */}
      <div aria-hidden="true" className="absolute bottom-2 left-3 flex items-center gap-1.5" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.55)' }}>
        <span className="text-white text-sm leading-none">&#x2618;</span>
        <span className="text-white/95 text-[10px] font-bold tracking-wide">CryptoLucky</span>
      </div>
    </div>
  );
}

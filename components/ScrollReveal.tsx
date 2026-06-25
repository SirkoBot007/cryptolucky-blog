'use client';

// ScrollReveal — micro-animación de entrada (fade + slide) al hacer scroll.
// CSS + IntersectionObserver (sin librerías). Respeta prefers-reduced-motion.
// Sin CLS: el bloque ocupa su espacio desde el primer render (solo anima opacity+transform).
// Validado con Perplexity (web.dev / Next.js) 2026-06-23.

import { useEffect, useRef, useState, type ElementType, type ReactNode } from 'react';

type Props = {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  delayMs?: number;
  once?: boolean;
};

export default function ScrollReveal({
  as: Tag = 'div',
  children,
  className = '',
  delayMs = 0,
  once = true,
}: Props) {
  const ref = useRef<HTMLElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setShown(true);
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          if (once) io.disconnect();
        } else if (!once) {
          setShown(false);
        }
      },
      { root: null, threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [once]);

  const cls = ['reveal', shown ? 'reveal--in' : '', className].filter(Boolean).join(' ');

  return (
    <Tag ref={ref as never} className={cls} style={{ '--reveal-delay': `${delayMs}ms` } as React.CSSProperties}>
      {children}
    </Tag>
  );
}

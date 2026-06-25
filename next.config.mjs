import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: { ignoreBuildErrors: true },
  eslint: { ignoreDuringBuilds: true },
  compress: true,
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  async redirects() {
    return [
      // Consolidación SEO (2026-06-21): artículos thin/duplicados → su mejor equivalente,
      // para concentrar autoridad y reducir canibalización (URLs sin tráfico que perder).
      { source: '/es/blog/copa-del-mundo-2026-favoritos-cuotas-actualizadas', destination: '/es/blog/copa-del-mundo-2026-favoritos-analisis-apuestas', permanent: true },
      { source: '/es/blog/betfury-apostar-mundial-2026-guia-completa', destination: '/es/blog/apostar-copa-del-mundo-2026-criptomonedas-betfury-guia', permanent: true },
      { source: '/es/blog/estrategia-apuestas-mundiales-cripto-2026', destination: '/es/blog/mejores-apuestas-cripto-mundial-2026', permanent: true },
      { source: '/es/blog/betfury-apuestas-deportivas-guia-principiantes', destination: '/es/blog/apostar-copa-del-mundo-2026-criptomonedas-betfury-guia', permanent: true },
      { source: '/es/blog/betfury-casino-panama', destination: '/es/casino-cripto', permanent: true },
      { source: '/es/blog/betfury-casino-bolivia', destination: '/es/casino-cripto', permanent: true },
      { source: '/es/blog/betfury-casino-ecuador', destination: '/es/casino-cripto', permanent: true },
      // Raíz → /es con redirect PERMANENTE (308). Antes next-intl la redirigía
      // con 307 temporal + Vary por idioma, y Google elegía "/" como canónica
      // en vez de "/es" (home sin indexar). Permanente consolida el canonical.
      {
        source: '/',
        destination: '/es',
        permanent: true,
      },
      // Sitio monolingüe español: TODAS las rutas /en/* tienen contenido en español
      // (no hay versión inglesa real) → redirect permanente a su equivalente /es/*.
      // Elimina los duplicados "Duplicada sin canónica" y consolida señales en /es.
      { source: '/en', destination: '/es', permanent: true },
      {
        source: '/en/:path*',
        destination: '/es/:path*',
        permanent: true,
      },
      // favicon.ico not present — redirect to SVG icon to avoid 404s
      {
        source: '/favicon.ico',
        destination: '/icon.svg',
        permanent: false,
      },
      // Common browser auto-requests that would 404
      {
        source: '/apple-touch-icon.png',
        destination: '/icon.svg',
        permanent: false,
      },
      {
        source: '/apple-touch-icon-precomposed.png',
        destination: '/icon.svg',
        permanent: false,
      },
    ];
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), payment=()' },
        ],
      },
    ];
  },
};

export default withNextIntl(nextConfig);

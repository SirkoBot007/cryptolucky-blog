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
      // Raíz → /es con redirect PERMANENTE (308). Antes next-intl la redirigía
      // con 307 temporal + Vary por idioma, y Google elegía "/" como canónica
      // en vez de "/es" (home sin indexar). Permanente consolida el canonical.
      {
        source: '/',
        destination: '/es',
        permanent: true,
      },
      // Blog articles only exist in Spanish — redirect EN versions to ES
      {
        source: '/en/blog/:slug*',
        destination: '/es/blog/:slug*',
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

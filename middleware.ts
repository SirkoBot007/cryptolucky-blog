import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  locales: ['es', 'en'],
  defaultLocale: 'es',
  localePrefix: 'always',
  // Desactivado: con detección por idioma, "/" redirige de forma variable
  // (Vary por Accept-Language) y Google elegía "/" como canónica en lugar de
  // "/es", dejando la home SIN indexar. Con detección off + redirect permanente
  // en next.config, "/" consolida limpio hacia "/es".
  localeDetection: false,
});

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};

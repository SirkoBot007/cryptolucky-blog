import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, unstable_setRequestLocale } from 'next-intl/server';
import ConsentAnalytics from '@/components/ConsentAnalytics';
import MobileNav from '@/components/MobileNav';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import '../globals.css';

const inter = Inter({ subsets: ['latin'] });

export function generateStaticParams() {
  return [{ locale: 'es' }, { locale: 'en' }];
}

export const metadata: Metadata = {
  title: {
    default: 'CryptoLucky',
    template: '%s | CryptoLucky',
  },
  description:
    'Guía de casinos cripto, apuestas deportivas y criptomonedas. BetFury análisis, bonos, staking BFG y más.',
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? 'https://cryptolucky-blog.vercel.app'
  ),
  verification: process.env.NEXT_PUBLIC_GSC_VERIFICATION
    ? { google: process.env.NEXT_PUBLIC_GSC_VERIFICATION }
    : undefined,
};

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);
  const messages = await getMessages();
  const isEs = locale === 'es';

  const navLinks = [
    { href: `/${locale}/betfury`, label: 'BetFury' },
    { href: `/${locale}/casino-cripto`, label: isEs ? 'Casino Cripto' : 'Crypto Casino' },
    { href: `/${locale}/apuestas-deportivas`, label: isEs ? 'Apuestas' : 'Sports Betting' },
    { href: `/${locale}/bonos-casino`, label: isEs ? 'Bonos' : 'Bonuses' },
    { href: `/${locale}/blog`, label: 'Blog' },
  ];

  const adsenseId = process.env.NEXT_PUBLIC_ADSENSE_ID;

  return (
    <html lang={locale}>
      <head>
        {adsenseId && (
          <script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseId}`}
            crossOrigin="anonymous"
          />
        )}
      </head>
      <body className={`${inter.className} bg-slate-950 text-white min-h-screen`}>
        <NextIntlClientProvider messages={messages}>
          <header className="bg-slate-900 border-b border-slate-800 sticky top-0 z-50">
            <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
              <a href={`/${locale}`} className="text-amber-400 font-black text-xl tracking-tight">
                🍀 CryptoLucky
              </a>
              <nav className="hidden md:flex items-center gap-5 text-sm">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="text-slate-300 hover:text-amber-400 transition-colors font-medium"
                  >
                    {link.label}
                  </a>
                ))}
                <a
                  href="https://betfury.io/?r=LUCKYSIRKO007"
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                  className="bg-amber-500 hover:bg-amber-400 text-white font-bold text-xs px-4 py-2 rounded-lg transition-colors"
                >
                  🎰 BetFury
                </a>
                <a
                  href={locale === 'es' ? '/en' : '/es'}
                  className="text-slate-400 hover:text-white text-xs"
                >
                  {locale === 'es' ? '🇬🇧 EN' : '🇪🇸 ES'}
                </a>
              </nav>
              <MobileNav
                navLinks={navLinks}
                locale={locale}
                affiliateUrl="https://betfury.io/?r=LUCKYSIRKO007"
              />
            </div>
          </header>

          {children}

          <footer className="bg-slate-950 border-t border-slate-800 mt-16 py-12">
            <div className="max-w-6xl mx-auto px-4">
              <div className="grid sm:grid-cols-3 gap-8 mb-8">
                <div>
                  <p className="text-amber-400 font-black text-lg mb-3">🍀 CryptoLucky</p>
                  <p className="text-slate-500 text-sm">
                    {isEs
                      ? 'Tu guía de referencia en casinos cripto, apuestas deportivas y criptomonedas.'
                      : 'Your reference guide for crypto casinos, sports betting and cryptocurrencies.'}
                  </p>
                </div>
                <div>
                  <p className="text-white font-bold text-sm mb-3">{isEs ? 'Categorías' : 'Categories'}</p>
                  <ul className="space-y-2">
                    {navLinks.map((link) => (
                      <li key={link.href}>
                        <a href={link.href} className="text-slate-400 hover:text-amber-400 text-sm transition-colors">
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-white font-bold text-sm mb-3">{isEs ? 'Guías rápidas' : 'Quick guides'}</p>
                  <ul className="space-y-2">
                    {[
                      { href: `/${locale}/staking-crypto`, label: isEs ? 'Staking BFG' : 'BFG Staking' },
                      { href: `/${locale}/ganar-criptomonedas`, label: isEs ? 'Ganar Cripto' : 'Earn Crypto' },
                      { href: `/${locale}/casino-sin-kyc`, label: isEs ? 'Casino Sin KYC' : 'No-KYC Casino' },
                      { href: `/${locale}/sobre-nosotros`, label: isEs ? 'Sobre Nosotros' : 'About Us' },
                      { href: `/${locale}/privacidad`, label: isEs ? 'Privacidad y Cookies' : 'Privacy & Cookies' },
                    ].map((link) => (
                      <li key={link.href}>
                        <a href={link.href} className="text-slate-400 hover:text-amber-400 text-sm transition-colors">
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="border-t border-slate-800 pt-6 text-center">
                <p className="text-slate-500 text-sm">
                  © {new Date().getFullYear()} CryptoLucky · {isEs ? 'Todos los derechos reservados' : 'All rights reserved'}
                </p>
                <p className="mt-2 text-xs text-slate-600 max-w-xl mx-auto">
                  {isEs
                    ? 'Este sitio contiene enlaces de afiliados. El contenido es solo para fines informativos y de entretenimiento. Juega con responsabilidad. Prohibido menores de 18 años.'
                    : 'This site contains affiliate links. Content is for informational and entertainment purposes only. Gamble responsibly. Under 18 prohibited.'}
                </p>
              </div>
            </div>
          </footer>

          <ConsentAnalytics locale={locale} />
        </NextIntlClientProvider>
        {/* Vercel Web Analytics */}
        <Analytics />
        {/* Vercel Speed Insights */}
        <SpeedInsights />
      </body>
    </html>
  );
}

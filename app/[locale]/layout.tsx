import type { Metadata } from 'next';
import Image from 'next/image';
import { Inter } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, unstable_setRequestLocale } from 'next-intl/server';
import ConsentAnalytics from '@/components/ConsentAnalytics';
import MobileNav from '@/components/MobileNav';
import { organizationSchema } from '@/lib/author';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import '../globals.css';

const inter = Inter({ subsets: ['latin'] });

export function generateStaticParams() {
  // Solo español (LATAM): /en se redirige con 308 → /es (next.config). No hace falta construir /en.
  return [{ locale: 'es' }];
}

export const metadata: Metadata = {
  title: {
    default: 'CryptoLucky',
    // La marca NO se añade automáticamente: los títulos de artículo ya usan sus 60
    // caracteres en keyword + gancho. Home y pilares llevan la marca escrita a mano.
    template: '%s',
  },
  description:
    'Guía de casinos cripto, apuestas deportivas y criptomonedas. BetFury análisis, bonos, staking BFG y más.',
  metadataBase: new URL(
        process.env.NEXT_PUBLIC_SITE_URL ?? 'https://cryptoluckyguia.com'
  ),
  openGraph: {
    type: 'website',
    siteName: 'CryptoLucky',
    images: ['/og-default.png'],
  },
  twitter: { card: 'summary_large_image', images: ['/og-default.png'] },
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
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://cryptoluckyguia.com';

  return (
    <html lang={locale}>
      <head>
        {/* hreflang + canonical se declaran por página en cada generateMetadata (alternates),
            apuntando a la URL real de esa página. NO poner hreflang global aquí: apuntaría
            siempre a la home y rompería la agrupación de versiones idiomáticas en Google. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema(locale)) }}
        />
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

          {/* ── HEADER ── */}
          <header className="bg-slate-900/80 backdrop-blur-xl border-b border-slate-800/60 sticky top-0 z-50">
            <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">

              {/* Logo */}
              <a href={`/${locale}`} className="flex items-center gap-2 group">
                <Image
                  src="/cryptolucky-logo-transparent.png"
                  alt="CryptoLucky"
                  width={36}
                  height={36}
                  priority
                  className="transition-transform duration-300 group-hover:scale-110"
                />
                <span className="font-black text-xl bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent tracking-tight">
                  CryptoLucky
                </span>
              </a>

              {/* Desktop nav */}
              <nav className="hidden md:flex items-center gap-6 text-sm">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="relative text-slate-400 hover:text-white transition-colors duration-200 font-medium group/nav"
                  >
                    {link.label}
                    <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-amber-400 rounded-full group-hover/nav:w-full transition-all duration-300" />
                  </a>
                ))}
                <a
                  href="https://betfury.io/?r=LUCKYSIRKO007"
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                  className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-white font-bold text-sm px-5 py-2 rounded-lg transition-all duration-300 shadow-md shadow-amber-500/20 hover:shadow-amber-500/30 hover:-translate-y-0.5"
                >
                  🎰 BetFury
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

          {/* ── FOOTER ── */}
          <footer className="relative bg-slate-950 mt-16 pt-1">
            <div className="h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />
            <div className="max-w-6xl mx-auto px-4 py-12">
              <div className="grid sm:grid-cols-3 gap-10 mb-10">

                {/* Brand */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-2xl">🍀</span>
                    <span className="font-black text-lg bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
                      CryptoLucky
                    </span>
                  </div>
                  <p className="text-slate-500 text-sm leading-relaxed">
                    {isEs
                      ? 'Tu guía de referencia en casinos cripto, apuestas deportivas y criptomonedas.'
                      : 'Your reference guide for crypto casinos, sports betting and cryptocurrencies.'}
                  </p>
                  <a
                    href="https://betfury.io/?r=LUCKYSIRKO007"
                    target="_blank"
                    rel="noopener noreferrer sponsored"
                    className="inline-block mt-4 text-xs font-bold text-amber-400 hover:text-amber-300 transition-colors border border-amber-500/20 hover:border-amber-500/40 px-3 py-1.5 rounded-lg"
                  >
                    {isEs ? 'Código: LUCKYSIRKO007 →' : 'Code: LUCKYSIRKO007 →'}
                  </a>
                </div>

                {/* Nav */}
                <div>
                  <p className="text-white font-bold text-sm mb-4">{isEs ? 'Categorías' : 'Categories'}</p>
                  <ul className="space-y-2.5">
                    {navLinks.map((link) => (
                      <li key={link.href}>
                        <a href={link.href} className="text-slate-500 hover:text-amber-400 text-sm transition-colors">
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Quick links */}
                <div>
                  <p className="text-white font-bold text-sm mb-4">{isEs ? 'Guías rápidas' : 'Quick guides'}</p>
                  <ul className="space-y-2.5">
                    {[
                      { href: `/${locale}/staking-crypto`, label: isEs ? 'Staking BFG' : 'BFG Staking' },
                      { href: `/${locale}/ganar-criptomonedas`, label: isEs ? 'Ganar Cripto' : 'Earn Crypto' },
                      { href: `/${locale}/casino-sin-kyc`, label: isEs ? 'Casino Sin KYC' : 'No-KYC Casino' },
                      { href: `/${locale}/autor/sirko007`, label: isEs ? 'Autor: Sirko007' : 'Author: Sirko007' },
                      { href: `/${locale}/sobre-nosotros`, label: isEs ? 'Sobre Nosotros' : 'About Us' },
                      { href: `/${locale}/contacto`, label: isEs ? 'Contacto' : 'Contact' },
                      { href: `/${locale}/juego-responsable`, label: isEs ? 'Juego Responsable' : 'Responsible Gambling' },
                      { href: `/${locale}/privacidad`, label: isEs ? 'Privacidad y Cookies' : 'Privacy & Cookies' },
                    ].map((link) => (
                      <li key={link.href}>
                        <a href={link.href} className="text-slate-500 hover:text-amber-400 text-sm transition-colors">
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Bottom bar */}
              <div className="border-t border-slate-800/80 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
                <p className="text-slate-600 text-xs">
                  © {new Date().getFullYear()} CryptoLucky ·{' '}
                  {isEs ? 'Todos los derechos reservados' : 'All rights reserved'}
                </p>
                <p className="text-slate-700 text-xs text-center max-w-md">
                  {isEs
                    ? 'Contiene enlaces de afiliados. Solo fines informativos. Juega con responsabilidad. +18.'
                    : 'Contains affiliate links. For informational purposes only. Gamble responsibly. 18+.'}
                </p>
              </div>
            </div>
          </footer>

          <ConsentAnalytics locale={locale} />
        </NextIntlClientProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}

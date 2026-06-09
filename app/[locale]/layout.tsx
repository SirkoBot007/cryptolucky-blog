import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, unstable_setRequestLocale } from 'next-intl/server';
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
    'Guia de criptomonedas: Bitcoin, Ethereum, DeFi, NFTs y casino crypto. Aprende, invierte y gana.',
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? 'https://cryptolucky.vercel.app'
  ),
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
  return (
    <html lang={locale}>
      <body className={inter.className}>
        <NextIntlClientProvider messages={messages}>
          <nav className="bg-slate-900 border-b border-slate-800 sticky top-0 z-50">
            <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
              <a href={`/${locale}`} className="text-amber-400 font-bold text-xl">
                🍀 CryptoLucky
              </a>
              <div className="flex gap-6 text-sm">
                <a href={`/${locale}/blog`} className="text-slate-300 hover:text-white">Blog</a>
                <a href={locale === 'es' ? '/en' : '/es'} className="text-slate-400 hover:text-white">
                  {locale === 'es' ? '🇬🇧 EN' : '🇪🇸 ES'}
                </a>
              </div>
            </div>
          </nav>
          {children}
          <footer className="bg-slate-950 border-t border-slate-800 mt-16 py-8 text-center text-slate-500 text-sm">
            <p>© {new Date().getFullYear()} CryptoLucky · Todos los derechos reservados</p>
            <p className="mt-2 text-xs max-w-lg mx-auto">
              Este sitio contiene enlaces de afiliados. El contenido es solo para fines informativos.
              Juega con responsabilidad. Solo mayores de 18.
            </p>
          </footer>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

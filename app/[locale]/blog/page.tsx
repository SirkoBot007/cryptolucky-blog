import { getPublishedArticles, getTitle, getDescription } from '@/lib/notion';
import { unstable_setRequestLocale } from 'next-intl/server';
import Link from 'next/link';
import type { Metadata } from 'next';
import { BetFuryBillboard, BetFuryMobileBanner } from '@/components/BetFuryBanners';
import RacoonFuryCTA from '@/components/RacoonFuryCTA';

export const revalidate = 3600;

const AFFILIATE = 'https://betfury.io/?r=LUCKYSIRKO007';

const SPORT_CATEGORIES = ['Copa del Mundo 2026', 'Sportsbook', 'Apuestas Deportivas'];

// Fallback images for cards without article.image — different per slot to avoid repetition
const MUNDIAL_FALLBACKS = [
  '/betfury/banners/sport-300x250.gif',
  '/betfury/banners/sport-970x250.gif',
  '/betfury/banners/betfury-300x250.png',
  '/betfury/banners/esport-300x250.gif',
  '/betfury/banners/bfg-300x250.gif',
  '/betfury/banners/cashback-300x250.gif',
];

const ARTICLE_FALLBACKS = [
  '/betfury/banners/bfg-300x250.gif',
  '/betfury/banners/cashback-300x250.gif',
  '/betfury/banners/freebox-300x250.gif',
  '/betfury/banners/esport-300x250.gif',
  '/betfury/banners/betfury-300x250.png',
  '/betfury/banners/sport-300x250.gif',
  '/betfury/mascot/racoon-money.png',
  '/betfury/banners/bfg-970x250.gif',
  '/betfury/mascot/racoon-money2.png',
  '/betfury/banners/cashback-970x250.gif',
  '/betfury/banners/freebox-728x90.gif',
  '/betfury/mascot/racoon-stop.png',
];

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://cryptoluckyguia.com';
  return {
    title:
      locale === 'es'
        ? 'Blog CryptoLucky | Guías BetFury, Mundial 2026 y Bonos Cripto'
        : 'CryptoLucky Blog | BetFury Guides, World Cup 2026 and Crypto Bonuses',
    description:
      locale === 'es'
        ? 'Guías completas de BetFury Casino: staking BFG, apuestas Copa del Mundo 2026, bonos sin depósito y análisis de casinos cripto. El blog de referencia en español.'
        : 'Complete BetFury Casino guides: BFG staking, World Cup 2026 bets, no deposit bonuses and crypto casino reviews. The reference blog in Spanish.',
    alternates: {
      canonical: `${siteUrl}/es/blog`,
      languages: {
        es: `${siteUrl}/es/blog`,
        'x-default': `${siteUrl}/es/blog`,
      },
    },
  };
}

export default async function BlogPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);
  const articles = await getPublishedArticles().catch(() => []);
  const isEs = locale === 'es';

  const mundialArticles = articles.filter((a) => SPORT_CATEGORIES.includes(a.category));
  const otherArticles = articles.filter((a) => !SPORT_CATEGORIES.includes(a.category));

  return (
    <main className="max-w-6xl mx-auto px-4 py-12">

      {/* ── HEADER ── */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 rounded-full px-3 py-1 mb-4">
          <span className="text-amber-400 text-xs font-bold uppercase tracking-widest">Blog</span>
        </div>

        <div className="flex flex-col md:flex-row md:items-end gap-6 mb-6">
          <div className="flex-1">
            <h1 className="text-4xl md:text-5xl font-black text-white mb-3 leading-tight">
              {isEs ? 'Guías ' : 'Guides '}
              <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
                CryptoLucky
              </span>
            </h1>
            <p className="text-slate-400 text-lg max-w-2xl">
              {isEs
                ? 'Guías completas, análisis y estrategias para sacar el máximo partido al casino cripto líder'
                : 'Complete guides, analysis and strategies to get the most out of the leading crypto casino'}
            </p>
            <div className="flex flex-wrap items-center gap-4 mt-4">
              <span className="bg-slate-800 border border-slate-700 text-slate-400 text-xs font-semibold px-3 py-1 rounded-full">
                {articles.length} {isEs ? 'artículos' : 'articles'}
              </span>
              <span className="flex items-center gap-1.5 text-green-400 text-sm font-semibold">
                <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                {isEs ? 'Mundial 2026 en directo' : 'World Cup 2026 live'}
              </span>
            </div>
          </div>

          {/* Mascot in header on desktop */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/betfury/mascot/racoon2.png"
            alt="RacoonFury"
            width={110}
            height={110}
            className="object-contain hidden md:block flex-shrink-0 drop-shadow-2xl"
            loading="eager"
          />
        </div>
      </div>

      {/* ── ANIMATED BILLBOARD (970x250) ── */}
      <BetFuryBillboard type="bfg" campaign="blog-billboard" className="mb-10" />
      <BetFuryMobileBanner type="bfg" campaign="blog-mobile" className="mb-6" />

      {/* ── MUNDIAL 2026 ── */}
      {mundialArticles.length > 0 && (
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-5">
            <span className="text-2xl">&#x1F3C6;</span>
            <h2 className="text-xl font-black text-white">
              {isEs ? 'Copa del Mundo 2026 — En Vivo' : 'FIFA World Cup 2026 — Live'}
            </h2>
            <span className="bg-green-500 text-white text-xs font-black px-2.5 py-0.5 rounded-full animate-pulse">
              LIVE
            </span>
            <span className="ml-auto text-slate-600 text-xs hidden sm:block">
              {mundialArticles.length} {isEs ? 'guías' : 'guides'}
            </span>
          </div>

          {/* Sport animated banner */}
          <div className="mb-6 rounded-2xl overflow-hidden shadow-xl shadow-black/40">
            <a
              href={`${AFFILIATE}&utm_source=cryptolucky&utm_medium=sport-banner&utm_campaign=mundial-2026`}
              target="_blank"
              rel="noopener noreferrer sponsored"
              aria-label="BetFury – Apuestas Copa del Mundo 2026"
              className="block hover:opacity-90 transition-opacity"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/betfury/banners/sport-728x90.gif"
                alt="BetFury Sports – Copa del Mundo 2026"
                width={728}
                height={90}
                className="w-full h-auto hidden md:block"
                loading="eager"
              />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/betfury/banners/sport-320x100.gif"
                alt="BetFury Sports – Copa del Mundo 2026"
                width={320}
                height={100}
                className="w-full h-auto block md:hidden"
                loading="eager"
              />
            </a>
          </div>

          {/* CTA strip */}
          <div className="relative overflow-hidden bg-gradient-to-br from-green-950/80 via-slate-900 to-slate-900 border border-green-500/25 rounded-2xl p-5 md:p-7 mb-6">
            <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/5 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />
            <div className="relative flex flex-col md:flex-row md:items-center gap-5">
              <div className="flex-1">
                <p className="text-green-400 text-xs font-black uppercase tracking-widest mb-2">
                  {isEs ? '⚽ APUESTAS EN CRIPTO · COPA DEL MUNDO 2026' : '⚽ CRYPTO BETS · FIFA WORLD CUP 2026'}
                </p>
                <p className="text-white font-black text-xl md:text-2xl mb-2 leading-snug">
                  {isEs
                    ? '104 partidos en directo. Cuotas en tiempo real. Retiros instantáneos.'
                    : '104 live matches. Real-time odds. Instant withdrawals.'}
                </p>
                <p className="text-slate-400 text-sm mb-4 max-w-lg">
                  {isEs
                    ? 'Cada apuesta genera tokens BFG. Ponlos en staking y cobra dividendos diarios en BTC.'
                    : 'Every bet generates BFG tokens. Stake them and earn daily BTC dividends.'}
                </p>
                <div className="flex flex-wrap gap-3">
                  <a
                    href={`${AFFILIATE}&utm_source=cryptolucky&utm_medium=mundial-cta&utm_campaign=blog`}
                    target="_blank"
                    rel="noopener noreferrer sponsored"
                    className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-400 hover:to-emerald-400 text-white font-black px-6 py-3 rounded-xl transition-all duration-300 text-sm shadow-lg shadow-green-500/20 hover:-translate-y-0.5"
                  >
                    {isEs ? '⚽ Apostar en el Mundial →' : '⚽ Bet on the World Cup →'}
                  </a>
                  {mundialArticles[0] && (
                    <Link
                      href={`/${locale}/blog/${mundialArticles[0].slug}`}
                      className="bg-slate-700/80 hover:bg-slate-700 border border-slate-600/50 text-white font-bold px-6 py-3 rounded-xl transition-all duration-300 text-sm"
                    >
                      {isEs ? 'Ver guía →' : 'See guide →'}
                    </Link>
                  )}
                </div>
              </div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/betfury/mascot/racoon3.png"
                alt="RacoonFury"
                width={100}
                height={100}
                className="object-contain hidden md:block flex-shrink-0 drop-shadow-lg opacity-90"
                loading="lazy"
              />
            </div>
          </div>

          {/* Cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {mundialArticles.map((article, idx) => (
              <Link
                key={article.id}
                href={`/${locale}/blog/${article.slug}`}
                className="group bg-slate-800/60 border border-green-500/15 rounded-2xl overflow-hidden hover:border-green-400/40 hover:-translate-y-1 transition-all duration-300 shadow-md flex flex-col"
              >
                <div className="relative h-40 overflow-hidden bg-slate-800 shrink-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={article.image ?? MUNDIAL_FALLBACKS[idx % MUNDIAL_FALLBACKS.length]}
                    alt={getTitle(article, locale)}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
                  <span className="absolute top-3 left-3 bg-green-500/90 backdrop-blur-sm text-white text-xs font-black px-2.5 py-0.5 rounded-full">
                    {isEs ? 'Mundial 2026' : 'World Cup 2026'}
                  </span>
                </div>
                <div className="p-4 flex flex-col flex-1">
                  <h3 className="text-white font-bold text-sm mt-1 mb-2 group-hover:text-green-400 transition-colors line-clamp-2 flex-1">
                    {getTitle(article, locale)}
                  </h3>
                  <p className="text-slate-400 text-xs line-clamp-2 mb-3">
                    {getDescription(article, locale)}
                  </p>
                  <span className="text-green-400 text-xs font-semibold">
                    {isEs ? 'Leer →' : 'Read →'}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* ── ALL ARTICLES ── */}
      <section>
        <div className="flex items-center justify-between mb-7">
          <h2 className="text-2xl font-black text-white">
            {isEs ? 'Todas las guías' : 'All guides'}
          </h2>
          <span className="text-slate-600 text-sm">
            {otherArticles.length} {isEs ? 'artículos' : 'articles'}
          </span>
        </div>

        {otherArticles.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-4xl mb-4">&#x1F680;</p>
            <p className="font-black text-white text-xl mb-2">{isEs ? 'Próximamente' : 'Coming soon'}</p>
            <p className="text-slate-500 text-sm">{isEs ? 'Nuevas guías en camino' : 'New guides on the way'}</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {otherArticles.map((article, idx) => (
              <Link
                key={article.id}
                href={`/${locale}/blog/${article.slug}`}
                className="group bg-slate-800/60 border border-slate-700/50 rounded-2xl overflow-hidden hover:border-amber-400/50 hover:-translate-y-1 transition-all duration-300 shadow-md flex flex-col"
              >
                <div className="relative h-44 overflow-hidden bg-slate-800 shrink-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={article.image ?? ARTICLE_FALLBACKS[idx % ARTICLE_FALLBACKS.length]}
                    alt={getTitle(article, locale)}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent pointer-events-none" />
                  {article.category && (
                    <span className="absolute top-3 left-3 bg-black/50 backdrop-blur-sm text-amber-400 text-xs font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wide">
                      {article.category}
                    </span>
                  )}
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <h3 className="text-white font-bold text-base mb-2 group-hover:text-amber-400 transition-colors line-clamp-2 flex-1">
                    {getTitle(article, locale)}
                  </h3>
                  <p className="text-slate-400 text-sm line-clamp-2 mb-4">
                    {getDescription(article, locale)}
                  </p>
                  <div className="flex items-center justify-between mt-auto">
                    <p className="text-slate-600 text-xs">
                      {new Date(article.publishedAt).toLocaleDateString(
                        isEs ? 'es-ES' : 'en-US',
                        { year: 'numeric', month: 'short', day: 'numeric' }
                      )}
                    </p>
                    <span className="text-amber-400 text-xs font-semibold group-hover:translate-x-1 transition-transform duration-200">
                      {isEs ? 'Leer →' : 'Read →'}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* ── BOTTOM BILLBOARD ── */}
      <div className="mt-16">
        <BetFuryBillboard type="cashback" campaign="blog-bottom-billboard" />
        <BetFuryMobileBanner type="cashback" campaign="blog-bottom-mobile" />
      </div>

      {/* ── RacoonFury floating CTA ── */}
      <RacoonFuryCTA locale={locale} delay={10000} />
    </main>
  );
}

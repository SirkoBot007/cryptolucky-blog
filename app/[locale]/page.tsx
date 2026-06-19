import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import Link from 'next/link';
import { getPublishedArticles, getTitle, getDescription } from '@/lib/notion';
import LeadCaptureForm from '@/components/LeadCaptureForm';
import { BetFuryBillboard, BetFuryMobileBanner } from '@/components/BetFuryBanners';
import RacoonFuryCTA from '@/components/RacoonFuryCTA';
import type { Metadata } from 'next';

export const revalidate = 3600;

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://cryptoluckyguia.com';
  const isEs = locale === 'es';
  return {
    title: isEs
      ? 'CryptoLucky — Guía BetFury Casino en Español | Staking BFG y Bonos 2026'
      : 'CryptoLucky — BetFury Casino Guide | BFG Staking & Bonuses 2026',
    description: isEs
      ? 'La guía más completa en español sobre BetFury Casino: staking BFG con dividendos diarios, bono sin depósito, juegos Provably Fair y apuestas deportivas. Código LUCKYSIRKO007.'
      : 'The most complete guide to BetFury Casino in Spanish: BFG staking with daily dividends, no-deposit bonus, Provably Fair games and sports betting. Code LUCKYSIRKO007.',
    alternates: {
      canonical: `${siteUrl}/${locale}`,
      languages: { es: `${siteUrl}/es`, en: `${siteUrl}/en` },
    },
    openGraph: {
      title: isEs ? 'CryptoLucky — Guía BetFury Casino en Español' : 'CryptoLucky — BetFury Casino Guide in Spanish',
      description: isEs ? 'Staking BFG, bonos, juegos y apuestas. Todo sobre BetFury en español.' : 'BFG staking, bonuses, games and betting. Everything about BetFury in Spanish.',
      url: `${siteUrl}/${locale}`,
      images: [{ url: `${siteUrl}/og-default.png`, width: 1200, height: 630, alt: 'CryptoLucky' }],
    },
  };
}

export default async function HomePage({ params: { locale } }: { params: { locale: string } }) {
  unstable_setRequestLocale(locale);
  const t = await getTranslations('hero');
  const tAffiliate = await getTranslations('affiliate');
  const articles = await getPublishedArticles().catch(() => []);
  const AFFILIATE = process.env.NEXT_PUBLIC_BETFURY_AFFILIATE || 'https://betfury.io/?r=LUCKYSIRKO007';
  const isEs = locale === 'es';

  return (
    <main className="overflow-x-hidden">

      {/* ── HERO ── */}
      <section className="relative bg-slate-950 pt-20 pb-16 text-center px-4">
        {/* Ambient glow orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/3 w-[700px] h-[500px] bg-amber-500/8 rounded-full blur-[100px]" />
          <div className="absolute right-0 top-1/4 w-80 h-80 bg-orange-600/8 rounded-full blur-3xl" />
          <div className="absolute left-0 bottom-0 w-80 h-80 bg-amber-600/8 rounded-full blur-3xl" />
        </div>

        {/* RacoonFury mascot — decorative, right side */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/betfury/mascot/racoon-money.png"
          alt="RacoonFury"
          width={180}
          height={180}
          className="absolute right-4 md:right-16 bottom-0 object-contain drop-shadow-2xl opacity-80 hidden lg:block pointer-events-none select-none"
          loading="eager"
          aria-hidden="true"
        />

        <div className="relative z-10 max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 rounded-full px-4 py-1.5 mb-6">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-amber-400 text-xs font-bold uppercase tracking-widest">
              {isEs ? 'CryptoLucky · Guía BetFury #1' : 'CryptoLucky · BetFury Guide #1'}
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-black mb-5 leading-tight">
            <span className="bg-gradient-to-br from-amber-300 via-amber-400 to-orange-500 bg-clip-text text-transparent">
              {t('title')}
            </span>
          </h1>

          <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-8 leading-relaxed">
            {t('subtitle')}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
            <Link
              href={`/${locale}/blog`}
              className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-white font-bold px-8 py-4 rounded-xl transition-all duration-300 shadow-lg shadow-amber-500/20 hover:shadow-amber-500/30 hover:-translate-y-0.5"
            >
              {t('cta')} →
            </Link>
            <a
              href={`${AFFILIATE}&utm_source=cryptolucky&utm_medium=hero&utm_campaign=homepage`}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="bg-slate-800 hover:bg-slate-700 border border-slate-700/80 hover:border-amber-500/40 text-white font-bold px-8 py-4 rounded-xl transition-all duration-300"
            >
              🎰 {isEs ? 'Bono +590%' : 'Bonus +590%'}
            </a>
          </div>

          {/* Stats row */}
          <div className="flex flex-wrap justify-center gap-8 md:gap-12 pt-6 border-t border-slate-800/60">
            <div className="text-center">
              <p className="text-2xl font-black bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
                {articles.length}+
              </p>
              <p className="text-slate-500 text-xs mt-0.5">{isEs ? 'Guías' : 'Guides'}</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-black text-white">#1</p>
              <p className="text-slate-500 text-xs mt-0.5">BetFury</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-black text-green-400">LIVE</p>
              <p className="text-slate-500 text-xs mt-0.5">Mundial 2026</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-black bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">+590%</p>
              <p className="text-slate-500 text-xs mt-0.5">{isEs ? 'Bono máx.' : 'Max. bonus'}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── AFFILIATE BANNER ── */}
      <section className="relative overflow-hidden bg-gradient-to-r from-slate-900 via-amber-950/20 to-slate-900 py-7 border-y border-amber-500/10">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(251,191,36,0.06),_transparent_70%)]" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
          <div className="flex-1">
            <p className="text-amber-400/70 text-xs font-bold uppercase tracking-widest mb-0.5">
              {tAffiliate('tagline')}
            </p>
            <p className="text-white font-black text-xl md:text-2xl">
              {isEs ? 'Código exclusivo: ' : 'Exclusive code: '}
              <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
                LUCKYSIRKO007
              </span>
            </p>
          </div>
          <a
            href={`${AFFILIATE}&utm_source=cryptolucky&utm_medium=affiliate_banner&utm_campaign=homepage`}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="shrink-0 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-white font-black px-7 py-3.5 rounded-xl transition-all duration-300 shadow-lg shadow-amber-500/20 hover:-translate-y-0.5 text-sm whitespace-nowrap"
          >
            {tAffiliate('cta')} 🎰
          </a>
        </div>
      </section>

      {/* ── ANIMATED BILLBOARD ── */}
      <section className="max-w-6xl mx-auto px-4 py-8">
        <BetFuryBillboard type="bfg" campaign="homepage-billboard" />
        <BetFuryMobileBanner type="bfg" campaign="homepage-mobile" />
      </section>

      {/* ── LATEST ARTICLES ── */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-3xl font-black text-white">
              {isEs ? 'Últimas Guías' : 'Latest Guides'}
            </h2>
            <p className="text-slate-500 text-sm mt-1">
              {isEs ? 'Estrategia, análisis y tutoriales de BetFury' : 'Strategy, analysis and BetFury tutorials'}
            </p>
          </div>
          {articles.length > 6 && (
            <Link
              href={`/${locale}/blog`}
              className="hidden md:block text-amber-400 hover:text-amber-300 text-sm font-semibold transition-colors"
            >
              {isEs ? `Ver ${articles.length} artículos →` : `View ${articles.length} articles →`}
            </Link>
          )}
        </div>

        {articles.length === 0 ? (
          <div className="text-center py-16 text-slate-500">
            <p className="text-3xl mb-3">🚀</p>
            <p className="text-lg">{isEs ? 'Próximamente…' : 'Coming soon…'}</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {articles.slice(0, 6).map((article) => (
              <Link
                key={article.id}
                href={`/${locale}/blog/${article.slug}`}
                className="group bg-slate-800/60 border border-slate-700/50 rounded-2xl overflow-hidden hover:border-amber-400/50 hover:-translate-y-1 transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-amber-500/5 flex flex-col"
              >
                <div className="relative h-44 overflow-hidden bg-slate-800 shrink-0">
                  {article.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={article.image}
                      alt={getTitle(article, locale)}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  ) : (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src="/betfury/banners/bfg-300x250.gif"
                      alt="BetFury Casino"
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent pointer-events-none" />
                  {article.category && (
                    <span className="absolute top-3 left-3 bg-black/50 backdrop-blur-sm text-amber-400 text-xs font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wide">
                      {article.category}
                    </span>
                  )}
                </div>
                <div className="p-5 flex flex-col flex-1">
                  {article.category && (
                    <span className="text-amber-400 text-xs font-bold uppercase tracking-wide">
                      {article.category}
                    </span>
                  )}
                  <h3 className="text-white font-bold text-base mt-2 mb-2 group-hover:text-amber-400 transition-colors line-clamp-2 flex-1">
                    {getTitle(article, locale)}
                  </h3>
                  <p className="text-slate-400 text-sm line-clamp-2 mb-4">
                    {getDescription(article, locale)}
                  </p>
                  <p className="text-slate-600 text-xs mt-auto">
                    {new Date(article.publishedAt).toLocaleDateString(
                      isEs ? 'es-ES' : 'en-US',
                      { year: 'numeric', month: 'short', day: 'numeric' }
                    )}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}

        {articles.length > 6 && (
          <div className="text-center mt-10">
            <Link
              href={`/${locale}/blog`}
              className="inline-flex items-center gap-2 border border-slate-700 hover:border-amber-400/50 text-slate-300 hover:text-amber-400 font-bold px-8 py-3.5 rounded-xl transition-all duration-300"
            >
              {isEs
                ? `Ver todos los ${articles.length} artículos`
                : `View all ${articles.length} articles`}{' '}
              →
            </Link>
          </div>
        )}
      </section>

      {/* ── LEAD CAPTURE ── */}
      <section className="max-w-2xl mx-auto px-4 pb-16">
        <LeadCaptureForm locale={locale} source="homepage" />
      </section>

      {/* RacoonFury floating CTA */}
      <RacoonFuryCTA locale={locale} delay={20000} />
    </main>
  );
}

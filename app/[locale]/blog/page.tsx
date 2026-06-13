import { getPublishedArticles, getTitle, getDescription } from '@/lib/notion';
import { unstable_setRequestLocale } from 'next-intl/server';
import Link from 'next/link';
import type { Metadata } from 'next';

export const revalidate = 3600;

const AFFILIATE = 'https://betfury.io/?r=LUCKYSIRKO007';

// Slugs de artículos del Mundial para destacarlos
const MUNDIAL_SLUGS = [
  'copa-del-mundo-2026-favoritos-analisis-apuestas',
  'apuestas-mundial-2026-betfury',
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
        en: `${siteUrl}/en/blog`,
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

  // Separar artículos del Mundial del resto
  const mundialArticles = articles.filter((a) => MUNDIAL_SLUGS.includes(a.slug));
  const otherArticles = articles.filter((a) => !MUNDIAL_SLUGS.includes(a.slug));

  return (
    <main className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-black text-white mb-2">
        {isEs ? 'Blog CryptoLucky' : 'CryptoLucky Blog'}
      </h1>
      <p className="text-slate-400 mb-8">
        {isEs
          ? 'Guías completas, análisis y estrategias para sacar el máximo partido al casino cripto líder'
          : 'Complete guides, analysis and strategies to get the most out of the leading crypto casino'}
      </p>

      {/* ── BLOQUE ESPECIAL MUNDIAL 2026 ── */}
      {mundialArticles.length > 0 && (
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-2xl">🏆</span>
            <h2 className="text-xl font-black text-white">
              {isEs ? 'Copa del Mundo 2026 — En Vivo' : 'FIFA World Cup 2026 — Live'}
            </h2>
            <span className="bg-green-500 text-white text-xs font-bold px-2 py-0.5 rounded-full animate-pulse">
              LIVE
            </span>
          </div>

          {/* Banner principal del Mundial */}
          <div className="bg-gradient-to-r from-green-900/60 to-slate-900 border border-green-500/40 rounded-2xl p-6 mb-4 flex flex-col md:flex-row md:items-center gap-6">
            <div className="flex-1">
              <p className="text-green-400 text-sm font-bold uppercase tracking-wide mb-1">
                {isEs ? '⚽ Apuesta en cripto · Gana en cripto' : '⚽ Bet in crypto · Win in crypto'}
              </p>
              <p className="text-white font-black text-xl md:text-2xl mb-2">
                {isEs
                  ? '104 partidos en directo. Cuotas en tiempo real. Retiros instantáneos.'
                  : '104 live matches. Real-time odds. Instant withdrawals.'}
              </p>
              <p className="text-slate-400 text-sm mb-4">
                {isEs
                  ? 'Cada apuesta genera tokens BFG. Ponlos en staking y cobra dividendos diarios en BTC además de tus ganancias deportivas.'
                  : 'Every bet generates BFG tokens. Stake them and earn daily dividends in BTC on top of your sports winnings.'}
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href={AFFILIATE}
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                  className="bg-green-500 hover:bg-green-400 text-white font-black px-6 py-3 rounded-xl transition-colors text-sm"
                >
                  {isEs ? '⚽ Apostar en el Mundial →' : '⚽ Bet on the World Cup →'}
                </a>
                <Link
                  href={`/${locale}/blog/copa-del-mundo-2026-favoritos-analisis-apuestas`}
                  className="bg-slate-700 hover:bg-slate-600 text-white font-bold px-6 py-3 rounded-xl transition-colors text-sm"
                >
                  {isEs ? 'Ver pronósticos →' : 'See predictions →'}
                </Link>
              </div>
            </div>
            <div className="text-6xl hidden md:block">🏆</div>
          </div>

          {/* Tarjetas de artículos del Mundial */}
          <div className="grid sm:grid-cols-2 gap-4">
            {mundialArticles.map((article) => (
              <Link
                key={article.id}
                href={`/${locale}/blog/${article.slug}`}
                className="bg-slate-800 border border-green-500/30 rounded-xl p-5 hover:border-green-400 transition-colors group flex flex-col"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-green-400 text-xs font-semibold uppercase tracking-wide">
                    {article.category}
                  </span>
                  <span className="bg-green-500/20 text-green-400 text-xs px-2 py-0.5 rounded-full">
                    {isEs ? 'Mundial 2026' : 'World Cup 2026'}
                  </span>
                </div>
                <h3 className="text-white font-bold text-base mt-1 mb-2 group-hover:text-green-400 transition-colors line-clamp-2 flex-1">
                  {getTitle(article, locale)}
                </h3>
                <p className="text-slate-400 text-sm line-clamp-2 mb-3">
                  {getDescription(article, locale)}
                </p>
                <span className="text-green-400 text-sm font-semibold">
                  {isEs ? 'Leer guía completa →' : 'Read full guide →'}
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* ── RESTO DE ARTÍCULOS ── */}
      <section>
        <h2 className="text-xl font-bold text-white mb-6">
          {isEs ? 'Todas las guías' : 'All guides'}
        </h2>
        {otherArticles.length === 0 ? (
          <div className="text-center py-24 text-slate-500">
            <p className="text-2xl mb-2">🚀</p>
            <p>{isEs ? 'Próximamente…' : 'Coming soon…'}</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherArticles.map((article) => (
              <Link
                key={article.id}
                href={`/${locale}/blog/${article.slug}`}
                className="bg-slate-800 border border-slate-700 rounded-xl p-6 hover:border-amber-400 transition-colors group flex flex-col"
              >
                {article.category && (
                  <span className="text-amber-400 text-xs font-semibold uppercase tracking-wide">
                    {article.category}
                  </span>
                )}
                <h2 className="text-white font-bold text-lg mt-2 mb-2 group-hover:text-amber-400 transition-colors line-clamp-2 flex-1">
                  {getTitle(article, locale)}
                </h2>
                <p className="text-slate-400 text-sm line-clamp-3 mb-4">
                  {getDescription(article, locale)}
                </p>
                <p className="text-slate-500 text-xs mt-auto">
                  {new Date(article.publishedAt).toLocaleDateString(
                    isEs ? 'es-ES' : 'en-US',
                    { year: 'numeric', month: 'long', day: 'numeric' }
                  )}
                </p>
              </Link>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

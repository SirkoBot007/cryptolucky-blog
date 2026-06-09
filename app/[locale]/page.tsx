import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import { getPublishedArticles, getTitle, getDescription } from '@/lib/notion';

export const revalidate = 3600;

export default async function HomePage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = await getTranslations('hero');
  const tAffiliate = await getTranslations('affiliate');
  const articles = await getPublishedArticles().catch(() => []);
  const AFFILIATE = process.env.NEXT_PUBLIC_BETFURY_AFFILIATE || 'https://betfury.io/?r=LUCKYSIRKO007';

  return (
    <main>
      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 py-20 text-center px-4">
        <p className="text-amber-400 text-sm font-semibold tracking-widest uppercase mb-3">CryptoLucky</p>
        <h1 className="text-4xl md:text-6xl font-black text-white mb-4 leading-tight">
          {t('title')}
        </h1>
        <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-8">{t('subtitle')}</p>
        <Link
          href={`/${locale}/blog`}
          className="inline-block bg-amber-400 hover:bg-amber-300 text-slate-900 font-bold px-8 py-3 rounded-full transition-colors"
        >
          {t('cta')} →
        </Link>
      </section>

      {/* BetFury CTA Banner */}
      <section className="bg-gradient-to-r from-orange-600 to-amber-500 py-6 text-center">
        <p className="text-white font-bold text-xl mb-1">{tAffiliate('tagline')}</p>
        <a
          href={`${AFFILIATE}&utm_source=cryptolucky&utm_medium=hero_cta&utm_campaign=homepage`}
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="inline-block mt-2 bg-white text-orange-600 font-black px-8 py-3 rounded-full hover:bg-slate-100 transition-colors"
        >
          {tAffiliate('cta')} 🎰
        </a>
        <p className="text-orange-100 text-xs mt-2">{tAffiliate('disclaimer')}</p>
      </section>

      {/* Latest Articles */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-white mb-8">
          {locale === 'es' ? 'Últimos Artículos' : 'Latest Articles'}
        </h2>
        {articles.length === 0 ? (
          <div className="text-center py-16 text-slate-500">
            <p className="text-lg">{locale === 'es' ? 'Próximamente…' : 'Coming soon…'}</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.slice(0, 6).map((article) => (
              <Link
                key={article.id}
                href={`/${locale}/blog/${article.slug}`}
                className="bg-slate-800 border border-slate-700 rounded-xl p-6 hover:border-amber-400 transition-colors group"
              >
                {article.category && (
                  <span className="text-amber-400 text-xs font-semibold uppercase tracking-wide">
                    {article.category}
                  </span>
                )}
                <h3 className="text-white font-bold text-lg mt-2 mb-2 group-hover:text-amber-400 transition-colors line-clamp-2">
                  {getTitle(article, locale)}
                </h3>
                <p className="text-slate-400 text-sm line-clamp-3">
                  {getDescription(article, locale)}
                </p>
                <p className="text-slate-500 text-xs mt-4">
                  {new Date(article.publishedAt).toLocaleDateString(
                    locale === 'es' ? 'es-ES' : 'en-US',
                    { year: 'numeric', month: 'long', day: 'numeric' }
                  )}
                </p>
              </Link>
            ))}
          </div>
        )}
        {articles.length > 6 && (
          <div className="text-center mt-10">
            <Link
              href={`/${locale}/blog`}
              className="inline-block border border-amber-400 text-amber-400 hover:bg-amber-400 hover:text-slate-900 font-bold px-8 py-3 rounded-full transition-colors"
            >
              {locale === 'es' ? 'Ver todos' : 'View all'} →
            </Link>
          </div>
        )}
      </section>
    </main>
  );
}

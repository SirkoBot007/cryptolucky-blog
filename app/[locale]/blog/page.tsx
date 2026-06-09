import { getPublishedArticles, getTitle, getDescription } from '@/lib/notion';
import { unstable_setRequestLocale } from 'next-intl/server';
import Link from 'next/link';
import type { Metadata } from 'next';

export const revalidate = 3600;

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  return {
    title: locale === 'es' ? 'Blog de Criptomonedas' : 'Crypto Blog',
    description:
      locale === 'es'
        ? 'Artículos sobre Bitcoin, Ethereum, DeFi, NFTs y casino crypto.'
        : 'Articles about Bitcoin, Ethereum, DeFi, NFTs and crypto casino.',
  };
}

export default async function BlogPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);
  const articles = await getPublishedArticles().catch(() => []);

  return (
    <main className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-black text-white mb-2">
        {locale === 'es' ? 'Blog Crypto' : 'Crypto Blog'}
      </h1>
      <p className="text-slate-400 mb-10">
        {locale === 'es'
          ? 'Guías, análisis y noticias del mundo crypto'
          : 'Guides, analysis and news from the crypto world'}
      </p>

      {articles.length === 0 ? (
        <div className="text-center py-24 text-slate-500">
          <p className="text-2xl mb-2">🚀</p>
          <p>{locale === 'es' ? 'Próximamente…' : 'Coming soon…'}</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
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
                  locale === 'es' ? 'es-ES' : 'en-US',
                  { year: 'numeric', month: 'long', day: 'numeric' }
                )}
              </p>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}

import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import Link from 'next/link';
import { getPublishedArticles, getTitle, getDescription } from '@/lib/notion';
import type { Metadata } from 'next';

export const revalidate = 3600;

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://cryptoluckyguia.com';
  const isEs = locale === 'es';
  return {
    title: isEs ? 'Blog BetFury Casino | Guías, Análisis y Bonos Cripto 2026' : 'BetFury Casino Blog | Guides, Reviews & Crypto Bonuses 2026',
    description: isEs
      ? 'Guías completas sobre BetFury Casino: staking BFG, bonos sin depósito, juegos Provably Fair y apuestas deportivas. El blog de referencia en español.'
      : 'Complete guides on BetFury Casino: BFG staking, no-deposit bonuses, Provably Fair games and sports betting.',
    alternates: { canonical: `${siteUrl}/${locale}/blog`, languages: { es: `${siteUrl}/es/blog`, en: `${siteUrl}/en/blog` } },
  };
}

export default async function BlogPage({ params: { locale } }: { params: { locale: string } }) {
  unstable_setRequestLocale(locale);
  const t = await getTranslations('blog');
  const articles = await getPublishedArticles().catch(() => []);
  const isEs = locale === 'es';

  return (
    <main className="max-w-6xl mx-auto px-4 py-12">
      <div className="mb-10">
        <h1 className="text-4xl font-black text-white mb-3">
          {isEs ? 'Blog BetFury Casino' : 'BetFury Casino Blog'}
        </h1>
        <p className="text-slate-400 text-lg">
          {isEs
            ? 'Guías, análisis y estrategias para sacar el máximo partido a BetFury Casino.'
            : 'Guides, reviews and strategies to get the most out of BetFury Casino.'}
        </p>
      </div>

      {articles.length === 0 ? (
        <div className="text-center py-20 text-slate-500">
          <p className="text-xl">{isEs ? 'Próximamente…' : 'Coming soon…'}</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <Link key={article.id} href={`/${locale}/blog/${article.slug}`}
              className="bg-slate-800 border border-slate-700 rounded-xl p-6 hover:border-amber-400 transition-colors group">
              {article.category && (
                <span className="text-amber-400 text-xs font-semibold uppercase tracking-wide">{article.category}</span>
              )}
              <h2 className="text-white font-bold text-lg mt-2 mb-2 group-hover:text-amber-400 transition-colors line-clamp-2">
                {getTitle(article, locale)}
              </h2>
              <p className="text-slate-400 text-sm line-clamp-3">{getDescription(article, locale)}</p>
              <p className="text-slate-500 text-xs mt-4">
                {new Date(article.publishedAt).toLocaleDateString(locale === 'es' ? 'es-ES' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}

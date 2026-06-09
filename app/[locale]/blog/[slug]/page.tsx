import { notFound } from 'next/navigation';
import { getArticleBySlug, getAllSlugs, getRelatedArticles, getTitle, getDescription } from '@/lib/notion';
import { BetFuryLeaderboard, BetFuryMediumRect, BetFurySkyscraper } from '@/components/BetFuryBanners';
import type { Metadata } from 'next';
import ReactMarkdown from 'react-markdown';
import Link from 'next/link';

interface Props {
  params: { locale: string; slug: string };
}

export const revalidate = 3600;

export async function generateStaticParams() {
  const slugs = await getAllSlugs().catch(() => []);
  const locales = ['es', 'en'];
  return locales.flatMap((locale) => slugs.map((slug) => ({ locale, slug })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const data = await getArticleBySlug(params.slug).catch(() => null);
  if (!data) return {};
  const { article } = data;
  const title = getTitle(article, params.locale);
  const description = getDescription(article, params.locale);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://cryptolucky.vercel.app';
  return {
    title,
    description,
    alternates: {
      canonical: `${siteUrl}/${params.locale}/blog/${params.slug}`,
      languages: {
        es: `${siteUrl}/es/blog/${params.slug}`,
        en: `${siteUrl}/en/blog/${params.slug}`,
      },
    },
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime: article.publishedAt,
    },
  };
}

export default async function ArticlePage({ params: { locale, slug } }: Props) {
  const data = await getArticleBySlug(slug).catch(() => null);
  if (!data) notFound();

  const { article, markdown } = data;
  const title = getTitle(article, locale);
  const description = getDescription(article, locale);
  const related = await getRelatedArticles(slug, article.category, 3).catch(() => []);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://cryptolucky.vercel.app';

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    datePublished: article.publishedAt,
    inLanguage: locale,
    url: `${siteUrl}/${locale}/blog/${slug}`,
    publisher: {
      '@type': 'Organization',
      name: 'CryptoLucky',
      url: siteUrl,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Article layout: content + sidebar */}
      <div className="max-w-6xl mx-auto px-4 py-12 flex gap-10">
        {/* Main content */}
        <article className="flex-1 min-w-0">
          {article.category && (
            <span className="text-amber-400 text-sm font-semibold uppercase tracking-wide">
              {article.category}
            </span>
          )}
          <h1 className="text-3xl md:text-4xl font-black text-white mt-2 mb-4 leading-tight">
            {title}
          </h1>
          <p className="text-slate-400 text-base mb-2">{description}</p>
          <p className="text-slate-500 text-sm mb-8">
            {new Date(article.publishedAt).toLocaleDateString(
              locale === 'es' ? 'es-ES' : 'en-US',
              { year: 'numeric', month: 'long', day: 'numeric' }
            )}
          </p>

          <hr className="border-slate-700 mb-8" />

          {/* Inline banner ~1/3 through article */}
          <BetFuryMediumRect />

          {/* Article body */}
          <div className="prose max-w-none">
            <ReactMarkdown>{markdown}</ReactMarkdown>
          </div>

          {/* Footer leaderboard banner */}
          <BetFuryLeaderboard />

          {/* Related articles */}
          {related.length > 0 && (
            <section className="mt-12">
              <h2 className="text-2xl font-bold text-white mb-6">
                {locale === 'es' ? 'Artículos Relacionados' : 'Related Articles'}
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {related.map((rel) => (
                  <Link
                    key={rel.id}
                    href={`/${locale}/blog/${rel.slug}`}
                    className="bg-slate-800 border border-slate-700 rounded-xl p-4 hover:border-amber-400 transition-colors group"
                  >
                    <p className="text-amber-400 text-xs font-semibold uppercase mb-1">{rel.category}</p>
                    <h3 className="text-white font-bold text-sm group-hover:text-amber-400 transition-colors line-clamp-2">
                      {getTitle(rel, locale)}
                    </h3>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </article>

        {/* Sidebar */}
        <aside className="w-[180px] flex-shrink-0">
          <BetFurySkyscraper />
        </aside>
      </div>
    </>
  );
}

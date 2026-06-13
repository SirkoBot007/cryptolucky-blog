import { notFound } from 'next/navigation';
import { unstable_setRequestLocale } from 'next-intl/server';
import { getArticleBySlug, getAllSlugs, getRelatedArticles, getTitle, getDescription } from '@/lib/notion';
import { BetFuryLeaderboard, BetFuryMediumRect, BetFurySkyscraper } from '@/components/BetFuryBanners';
import LeadCaptureForm from '@/components/LeadCaptureForm';
import ExitIntentPopup from '@/components/ExitIntentPopup';
import type { Metadata } from 'next';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Link from 'next/link';

interface Props { params: { locale: string; slug: string }; }

export const revalidate = 3600;

export async function generateStaticParams() {
  const slugs = await getAllSlugs().catch(() => []);
  return ['es', 'en'].flatMap((locale) => slugs.map((slug) => ({ locale, slug })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  unstable_setRequestLocale(params.locale);
  const data = await getArticleBySlug(params.slug).catch(() => null);
  if (!data) return {};
  const { article } = data;
  const title = getTitle(article, params.locale);
  const description = getDescription(article, params.locale);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://cryptoluckyguia.com';
  return {
    title, description, keywords: article.keywords,
    authors: article.author ? [{ name: article.author }] : undefined,
    alternates: {
      canonical: `${siteUrl}/es/blog/${params.slug}`,
      languages: { es: `${siteUrl}/es/blog/${params.slug}` },
    },
    openGraph: {
      title, description, type: 'article',
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt ?? article.publishedAt,
      authors: article.author ? [article.author] : undefined,
    },
  };
}

export default async function ArticlePage({ params: { locale, slug } }: Props) {
  unstable_setRequestLocale(locale);
  const data = await getArticleBySlug(slug).catch(() => null);
  if (!data) notFound();
  const { article, markdown } = data;
  const title = getTitle(article, locale);
  const description = getDescription(article, locale);
  const related = await getRelatedArticles(slug, article.category, 3).catch(() => []);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://cryptoluckyguia.com';

  const articleJsonLd = { '@context': 'https://schema.org', '@type': 'Article', headline: title, description, datePublished: article.publishedAt, dateModified: article.updatedAt ?? article.publishedAt, inLanguage: locale, url: `${siteUrl}/${locale}/blog/${slug}`, image: article.image ?? `${siteUrl}/og-default.png`, author: { '@type': 'Person', name: article.author ?? 'Carlos Mendoza', description: 'Analista de casinos cripto y blockchain con 5 años de experiencia en iGaming.', url: `${siteUrl}/${locale}/sobre-nosotros` }, publisher: { '@type': 'Organization', name: 'CryptoLucky', url: siteUrl } };
  const breadcrumbJsonLd = { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: locale === 'es' ? 'Inicio' : 'Home', item: `${siteUrl}/${locale}` }, { '@type': 'ListItem', position: 2, name: 'Blog', item: `${siteUrl}/${locale}/blog` }, { '@type': 'ListItem', position: 3, name: title, item: `${siteUrl}/${locale}/blog/${slug}` }] };
  const faqJsonLd = article.faqs?.length ? { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: article.faqs.map((faq) => ({ '@type': 'Question', name: faq.question, acceptedAnswer: { '@type': 'Answer', text: faq.answer } })) } : null;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      {faqJsonLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />}

      <div className="max-w-6xl mx-auto px-4 py-12 flex gap-10">
        <article className="flex-1 min-w-0">
          <nav className="text-slate-500 text-sm mb-4 flex items-center gap-1 flex-wrap">
            <Link href={`/${locale}`} className="hover:text-amber-400 transition-colors">{locale === 'es' ? 'Inicio' : 'Home'}</Link>
            <span>/</span><Link href={`/${locale}/blog`} className="hover:text-amber-400 transition-colors">Blog</Link>
            <span>/</span><span className="text-slate-400 truncate max-w-[200px]">{title}</span>
          </nav>

          {article.category && <span className="text-amber-400 text-sm font-semibold uppercase tracking-wide">{article.category}</span>}
          <h1 className="text-3xl md:text-4xl font-black text-white mt-2 mb-4 leading-tight">{title}</h1>
          <p className="text-slate-400 text-base mb-3">{description}</p>

          <div className="flex flex-wrap items-center gap-4 text-slate-500 text-sm mb-8">
            <span>✍️ {article.author ?? 'Carlos Mendoza'}</span>
            <span>📅 {new Date(article.publishedAt).toLocaleDateString(locale === 'es' ? 'es-ES' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
            {article.updatedAt && article.updatedAt !== article.publishedAt && <span>🔄 {locale === 'es' ? 'Actualizado' : 'Updated'}: {new Date(article.updatedAt).toLocaleDateString(locale === 'es' ? 'es-ES' : 'en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</span>}
          </div>
          <hr className="border-slate-700 mb-8" />

          {locale === 'en' && (
            <div className="bg-slate-800 border border-amber-500/30 rounded-lg p-4 mb-8 flex items-start gap-3">
              <span className="text-amber-400 text-lg">🌐</span>
              <p className="text-slate-300 text-sm"><strong className="text-amber-400">Note:</strong> This article is written in Spanish, as our primary audience is Latin America.{' '}<a href={`/es/blog/${slug}`} className="text-amber-400 hover:underline">Read in Spanish →</a></p>
            </div>
          )}

          <BetFuryMediumRect />

          <div className="prose prose-invert prose-amber max-w-none prose-headings:text-white prose-headings:font-bold prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4 prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3 prose-p:text-slate-300 prose-p:leading-relaxed prose-a:text-amber-400 prose-a:no-underline hover:prose-a:underline prose-strong:text-white prose-ul:text-slate-300 prose-ol:text-slate-300 prose-li:my-1 prose-blockquote:border-amber-400 prose-blockquote:text-slate-400 prose-table:text-slate-300 prose-th:text-white prose-th:bg-slate-800 prose-td:border-slate-700 prose-th:border-slate-700 prose-code:text-amber-400 prose-code:bg-slate-800 prose-code:px-1 prose-code:rounded prose-hr:border-slate-700">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdown}</ReactMarkdown>
          </div>

          {article.faqs && article.faqs.length > 0 && (
            <section className="mt-12 bg-slate-800 border border-slate-700 rounded-xl p-6">
              <h2 className="text-2xl font-bold text-white mb-6">{locale === 'es' ? 'Preguntas Frecuentes' : 'Frequently Asked Questions'}</h2>
              <div className="space-y-5">
                {article.faqs.map((faq, i) => (
                  <div key={i} className="border-b border-slate-700 pb-5 last:border-0 last:pb-0">
                    <p className="font-semibold text-white mb-2">❓ {faq.question}</p>
                    <p className="text-slate-400 text-sm leading-relaxed">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          <div className="mt-12"><LeadCaptureForm locale={locale} source={`article-${slug}`} /></div>
          <BetFuryLeaderboard />

          {related.length > 0 && (
            <section className="mt-12">
              <h2 className="text-2xl font-bold text-white mb-6">{locale === 'es' ? 'Artículos Relacionados' : 'Related Articles'}</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {related.map((rel) => (
                  <Link key={rel.id} href={`/${locale}/blog/${rel.slug}`} className="bg-slate-800 border border-slate-700 rounded-xl p-4 hover:border-amber-400 transition-colors group">
                    <p className="text-amber-400 text-xs font-semibold uppercase mb-1">{rel.category}</p>
                    <h3 className="text-white font-bold text-sm group-hover:text-amber-400 transition-colors line-clamp-2">{getTitle(rel, locale)}</h3>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </article>
        <aside className="w-[180px] flex-shrink-0 hidden lg:block"><BetFurySkyscraper /></aside>
      </div>
      <ExitIntentPopup locale={locale} />
    </>
  );
                    }

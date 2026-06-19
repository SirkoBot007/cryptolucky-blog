import { notFound } from 'next/navigation';
import { unstable_setRequestLocale } from 'next-intl/server';
import { getArticleBySlug, getAllSlugs, getRelatedArticles, getTitle, getDescription } from '@/lib/notion';
import { BetFuryLeaderboard, BetFuryMediumRect, BetFurySkyscraper } from '@/components/BetFuryBanners';
import LeadCaptureForm from '@/components/LeadCaptureForm';
import ExitIntentPopup from '@/components/ExitIntentPopup';
import RacoonFuryCTA from '@/components/RacoonFuryCTA';
import ReadingProgress from '@/components/ReadingProgress';
import SocialShare from '@/components/SocialShare';
import type { Metadata } from 'next';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Link from 'next/link';

interface Props { params: { locale: string; slug: string }; }

export const revalidate = 3600;

const AFFILIATE = 'https://betfury.io/?r=LUCKYSIRKO007';

type BannerType = 'betfury' | 'bfg' | 'sport' | 'cashback' | 'freebox' | 'esport';

function getBannerType(category: string): BannerType {
  const c = category.toLowerCase();
  if (c.includes('sport') || c.includes('copa') || c.includes('mundial') || c.includes('sportsbook') || c.includes('deport') || c.includes('apuesta')) return 'sport';
  if (c.includes('cashback') || c.includes('bono')) return 'cashback';
  if (c.includes('free') || c.includes('gratis')) return 'freebox';
  if (c.includes('esport')) return 'esport';
  if (c.includes('review') || c.includes('seguro') || c.includes('legit') || c.includes('vip')) return 'betfury';
  return 'bfg';
}

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
  const canonicalEs = `${siteUrl}/es/blog/${params.slug}`;
  return {
    title, description, keywords: article.keywords,
    authors: article.author ? [{ name: article.author }] : undefined,
    ...(params.locale === 'en' && { robots: { index: false, follow: false } }),
    alternates: {
      canonical: canonicalEs,
      languages: { es: canonicalEs, 'x-default': canonicalEs },
    },
    openGraph: {
      title, description, type: 'article',
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt ?? article.publishedAt,
      authors: article.author ? [article.author] : undefined,
      images: article.image ? [{ url: `https://cryptoluckyguia.com${article.image}`, width: 300, height: 250 }] : undefined,
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
  const isEs = locale === 'es';
  const bannerType = getBannerType(article.category);
  const wordCount = markdown.split(/\s+/).filter(Boolean).length;
  const readingMinutes = Math.max(1, Math.ceil(wordCount / 220));
  const articleUrl = `${siteUrl}/${locale}/blog/${slug}`;

  const articleJsonLd = { '@context': 'https://schema.org', '@type': 'Article', headline: title, description, datePublished: article.publishedAt, dateModified: article.updatedAt ?? article.publishedAt, inLanguage: locale, url: `${siteUrl}/${locale}/blog/${slug}`, image: article.image ? `${siteUrl}${article.image}` : `${siteUrl}/og-default.png`, author: { '@type': 'Person', name: article.author ?? 'Carlos Mendoza', description: 'Analista de casinos cripto y blockchain con 5 años de experiencia en iGaming.', url: `${siteUrl}/${locale}/sobre-nosotros` }, publisher: { '@type': 'Organization', name: 'CryptoLucky', url: siteUrl } };
  const breadcrumbJsonLd = { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: isEs ? 'Inicio' : 'Home', item: `${siteUrl}/${locale}` }, { '@type': 'ListItem', position: 2, name: 'Blog', item: `${siteUrl}/${locale}/blog` }, { '@type': 'ListItem', position: 3, name: title, item: `${siteUrl}/${locale}/blog/${slug}` }] };
  const faqJsonLd = article.faqs?.length ? { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: article.faqs.map((faq) => ({ '@type': 'Question', name: faq.question, acceptedAnswer: { '@type': 'Answer', text: faq.answer } })) } : null;

  return (
    <>
      <ReadingProgress />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      {faqJsonLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />}

      <div className="max-w-6xl mx-auto px-4 py-10 flex gap-10">

        {/* ── MAIN ARTICLE ── */}
        <article className="flex-1 min-w-0">

          {/* Breadcrumb */}
          <nav className="text-slate-500 text-sm mb-5 flex items-center gap-1 flex-wrap">
            <Link href={`/${locale}`} className="hover:text-amber-400 transition-colors">{isEs ? 'Inicio' : 'Home'}</Link>
            <span>/</span>
            <Link href={`/${locale}/blog`} className="hover:text-amber-400 transition-colors">Blog</Link>
            <span>/</span>
            <span className="text-slate-400 truncate max-w-[200px]">{title}</span>
          </nav>

          {/* Category badge */}
          {article.category && (
            <span className="inline-flex items-center gap-1.5 bg-amber-500/10 border border-amber-500/20 rounded-full px-3 py-1 text-amber-400 text-xs font-bold uppercase tracking-widest mb-3">
              {article.category}
            </span>
          )}

          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-black text-white mt-2 mb-4 leading-tight">{title}</h1>
          <p className="text-slate-400 text-base mb-4 leading-relaxed">{description}</p>

          {/* Meta info */}
          <div className="flex flex-wrap items-center gap-4 text-slate-500 text-sm mb-6">
            <span className="flex items-center gap-1.5">
              <span className="text-slate-600">✍</span>
              {article.author ?? 'Sirko007'}
            </span>
            <span className="flex items-center gap-1.5">
              <span className="text-slate-600">📅</span>
              {new Date(article.publishedAt).toLocaleDateString(isEs ? 'es-ES' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </span>
            <span className="flex items-center gap-1.5">
              <span className="text-slate-600">⏱</span>
              {readingMinutes} {isEs ? 'min de lectura' : 'min read'}
            </span>
            {article.updatedAt && article.updatedAt !== article.publishedAt && (
              <span className="flex items-center gap-1.5">
                <span className="text-slate-600">🔄</span>
                {isEs ? 'Actualizado' : 'Updated'}: {new Date(article.updatedAt).toLocaleDateString(isEs ? 'es-ES' : 'en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
              </span>
            )}
          </div>

          <hr className="border-slate-700/60 mb-7" />

          {/* EN notice */}
          {locale === 'en' && (
            <div className="bg-slate-800 border border-amber-500/30 rounded-lg p-4 mb-7 flex items-start gap-3">
              <span className="text-amber-400 text-lg">&#x1F310;</span>
              <p className="text-slate-300 text-sm">
                <strong className="text-amber-400">Note:</strong> This article is written in Spanish.{' '}
                <a href={`/es/blog/${slug}`} className="text-amber-400 hover:underline">Read in Spanish</a>
              </p>
            </div>
          )}

          {/* ── HERO BANNER (article image / animated GIF) ── */}
          {article.image && (
            <a
              href={`${AFFILIATE}&utm_source=cryptolucky&utm_medium=hero&utm_campaign=article-hero`}
              target="_blank"
              rel="noopener noreferrer sponsored"
              aria-label="BetFury Casino"
              className="block w-full mb-8 rounded-2xl overflow-hidden hover:opacity-90 transition-all duration-300 shadow-xl shadow-black/40 border border-white/5"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={article.image}
                alt={`BetFury Casino – ${title}`}
                className="w-full h-auto"
                loading="eager"
              />
            </a>
          )}

          {/* ── ARTICLE CONTENT ── */}
          <div className="prose prose-invert prose-amber max-w-none prose-headings:text-white prose-headings:font-bold prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4 prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3 prose-p:text-slate-300 prose-p:leading-relaxed prose-a:text-amber-400 prose-a:no-underline hover:prose-a:underline prose-strong:text-white prose-ul:text-slate-300 prose-ol:text-slate-300 prose-li:my-1 prose-blockquote:border-amber-400 prose-blockquote:text-slate-400 prose-table:text-slate-300 prose-th:text-white prose-th:bg-slate-800 prose-td:border-slate-700 prose-th:border-slate-700 prose-code:text-amber-400 prose-code:bg-slate-800 prose-code:px-1 prose-code:rounded prose-hr:border-slate-700">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdown}</ReactMarkdown>
          </div>

          {/* ── Social share ── */}
          <SocialShare url={articleUrl} title={title} locale={locale} />

          {/* ── CTA BOX — contextual by article category ── */}
          {(() => {
            const cta = {
              sport: {
                label: isEs ? 'Copa del Mundo 2026' : 'FIFA World Cup 2026',
                title: isEs ? 'Apuesta en cripto · Cuotas en tiempo real' : 'Bet in crypto · Real-time odds',
                sub: isEs ? 'Retiros en minutos. Sin límite de importe.' : 'Withdrawals in minutes. No amount limit.',
                btn: isEs ? 'Apostar en el Mundial →' : 'Bet on the World Cup →',
                mascot: '/betfury/mascot/racoon3.png',
              },
              bfg: {
                label: isEs ? 'Token BFG' : 'BFG Token',
                title: isEs ? 'Faucet gratuito disponible ahora — sin depósito' : 'Free faucet available now — no deposit',
                sub: isEs ? 'Haz staking de BFG y cobra dividendos en BTC cada día.' : 'Stake BFG and earn BTC dividends every day.',
                btn: isEs ? 'Reclamar faucet gratis →' : 'Claim free faucet →',
                mascot: '/betfury/mascot/racoon-money.png',
              },
              cashback: {
                label: isEs ? 'Cashback Semanal' : 'Weekly Cashback',
                title: isEs ? 'Recupera hasta el 25% de lo que juegas' : 'Get back up to 25% of what you play',
                sub: isEs ? 'Sin condiciones de apuesta. Se acredita cada lunes.' : 'No wagering requirements. Credited every Monday.',
                btn: isEs ? 'Activar cashback →' : 'Activate cashback →',
                mascot: '/betfury/mascot/racoon-money2.png',
              },
              freebox: {
                label: isEs ? 'Crypto Box Gratis' : 'Free Crypto Box',
                title: isEs ? 'Abre Crypto Boxes cada 20 minutos · 0 depósito' : 'Open Crypto Boxes every 20 min · 0 deposit',
                sub: isEs ? 'BTC · ETH · BNB disponibles desde el primer login.' : 'BTC · ETH · BNB available from your first login.',
                btn: isEs ? 'Abrir mi Crypto Box →' : 'Open my Crypto Box →',
                mascot: '/betfury/mascot/racoon2.png',
              },
              esport: {
                label: isEs ? 'eSports BetFury' : 'BetFury eSports',
                title: isEs ? 'CS2 · Dota 2 · LoL — pago instantáneo en cripto' : 'CS2 · Dota 2 · LoL — instant crypto payout',
                sub: isEs ? 'Casino y sportsbook en un solo wallet. Sin KYC.' : 'Casino and sportsbook in one wallet. No KYC.',
                btn: isEs ? 'Ver mercados eSports →' : 'See eSports markets →',
                mascot: '/betfury/mascot/racoon4.png',
              },
              betfury: {
                label: isEs ? 'BetFury Casino' : 'BetFury Casino',
                title: isEs ? 'Empieza en 2 minutos · Solo tu email · Sin KYC' : 'Start in 2 minutes · Email only · No KYC',
                sub: isEs ? '+5.000 juegos · Retiros sin límite · Casino en vivo.' : '+5,000 games · No withdrawal limits · Live casino.',
                btn: isEs ? 'Crear cuenta gratis →' : 'Create free account →',
                mascot: '/betfury/mascot/racoon1.png',
              },
            }[bannerType] ?? {
              label: 'BetFury',
              title: isEs ? 'Empieza en 2 minutos · Solo tu email · Sin KYC' : 'Start in 2 minutes · Email only · No KYC',
              sub: isEs ? '+5.000 juegos · Retiros sin límite · Casino en vivo.' : '+5,000 games · No withdrawal limits · Live casino.',
              btn: isEs ? 'Crear cuenta gratis →' : 'Create free account →',
              mascot: '/betfury/mascot/racoon1.png',
            };
            return (
              <div className="my-10 bg-gradient-to-br from-[#1B1B2F] via-slate-900 to-slate-900 border border-[#FF6B35]/30 rounded-2xl p-6 flex flex-col sm:flex-row items-center gap-5">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={cta.mascot} alt="RacoonFury" width={80} height={80} className="object-contain flex-shrink-0 drop-shadow-lg hidden sm:block" loading="lazy" />
                <div className="flex-1 text-center sm:text-left">
                  <p className="text-[#FF6B35] text-xs font-black uppercase tracking-widest mb-1">{cta.label}</p>
                  <p className="text-white font-black text-lg leading-snug mb-1">{cta.title}</p>
                  <p className="text-slate-400 text-sm">{cta.sub}</p>
                </div>
                <a
                  href={`${AFFILIATE}&utm_source=cryptolucky&utm_medium=cta-box&utm_campaign=${slug}`}
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                  className="flex-shrink-0 bg-gradient-to-r from-[#FF6B35] to-[#ff8c5a] hover:from-[#ff5a1f] hover:to-[#FF6B35] text-white font-black px-6 py-3 rounded-xl transition-all duration-300 text-sm shadow-lg shadow-[#FF6B35]/25 hover:-translate-y-0.5 whitespace-nowrap"
                >
                  {cta.btn}
                </a>
              </div>
            );
          })()}

          {/* ── FAQ ── */}
          {article.faqs && article.faqs.length > 0 && (
            <section className="mt-12 bg-slate-800/60 border border-slate-700/50 rounded-2xl p-6">
              <h2 className="text-2xl font-bold text-white mb-6">
                {isEs ? 'Preguntas Frecuentes' : 'Frequently Asked Questions'}
              </h2>
              <div className="space-y-5">
                {article.faqs.map((faq, i) => (
                  <div key={i} className="border-b border-slate-700/50 pb-5 last:border-0 last:pb-0">
                    <p className="font-semibold text-white mb-2 flex items-start gap-2">
                      <span className="text-amber-400 flex-shrink-0">&#x2753;</span>
                      {faq.question}
                    </p>
                    <p className="text-slate-400 text-sm leading-relaxed pl-5">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* ── Lead capture ── */}
          <div className="mt-12">
            <LeadCaptureForm locale={locale} source={`article-${slug}`} />
          </div>


          {/* ── Related articles ── */}
          {related.length > 0 && (
            <section className="mt-12">
              <h2 className="text-xl font-black text-white mb-5">
                {isEs ? 'Artículos Relacionados' : 'Related Articles'}
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {related.map((rel) => (
                  <Link
                    key={rel.id}
                    href={`/${locale}/blog/${rel.slug}`}
                    className="group bg-slate-800/60 border border-slate-700/50 rounded-xl overflow-hidden hover:border-amber-400/50 transition-all duration-300"
                  >
                    {rel.image && (
                      <div className="h-24 overflow-hidden bg-slate-700">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={rel.image}
                          alt={getTitle(rel, locale)}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                      </div>
                    )}
                    <div className="p-4">
                      <p className="text-amber-400 text-xs font-semibold uppercase mb-1">{rel.category}</p>
                      <h3 className="text-white font-bold text-sm group-hover:text-amber-400 transition-colors line-clamp-2">
                        {getTitle(rel, locale)}
                      </h3>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </article>

        {/* ── SIDEBAR ── */}
        <aside className="w-[200px] flex-shrink-0 hidden lg:flex flex-col gap-6">
          <div className="sticky top-24 flex flex-col gap-6">

            {/* RacoonFury CTA card */}
            <div className="bg-gradient-to-b from-[#1B1B2F] to-slate-900 border border-[#FF6B35]/30 rounded-2xl p-4 flex flex-col items-center gap-3 text-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/betfury/mascot/racoon-money.png"
                alt="RacoonFury"
                width={90}
                height={90}
                className="object-contain drop-shadow-lg"
                loading="lazy"
              />
              <div>
                <p className="text-[#FF6B35] text-[10px] font-black uppercase tracking-widest">BetFury</p>
                <p className="text-white font-black text-sm leading-snug mt-0.5">
                  {isEs ? 'Dividendos cripto diarios' : 'Daily crypto dividends'}
                </p>
              </div>
              <div className="flex flex-col gap-1.5 w-full text-left">
                {[
                  isEs ? '+5.000 juegos' : '+5,000 games',
                  isEs ? 'Sin KYC' : 'No KYC',
                  isEs ? 'Retiros en min.' : 'Fast withdrawals',
                ].map((feat) => (
                  <div key={feat} className="flex items-center gap-1.5">
                    <span className="text-[#FF6B35] text-xs">&#x2713;</span>
                    <span className="text-slate-300 text-xs">{feat}</span>
                  </div>
                ))}
              </div>
              <a
                href={`${AFFILIATE}&utm_source=cryptolucky&utm_medium=sidebar&utm_campaign=${slug}`}
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="block w-full bg-gradient-to-r from-[#FF6B35] to-[#ff8c5a] hover:from-[#ff5a1f] hover:to-[#FF6B35] text-white font-black text-xs py-2.5 rounded-xl transition-all duration-300 shadow-md shadow-[#FF6B35]/25 text-center"
              >
                {isEs ? 'Jugar gratis →' : 'Play free →'}
              </a>
              <p className="text-slate-600 text-[10px]">LUCKYSIRKO007</p>
            </div>

          </div>
        </aside>
      </div>

      {/* Floating CTA with RacoonFury */}
      <RacoonFuryCTA locale={locale} delay={12000} />
      <ExitIntentPopup locale={locale} />
    </>
  );
}

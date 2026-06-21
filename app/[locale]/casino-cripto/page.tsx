import { unstable_setRequestLocale } from 'next-intl/server';
import Link from 'next/link';
import type { Metadata } from 'next';
import { SITE_URL } from '@/lib/author';
import PillarNav from '@/components/PillarNav';

const AFFILIATE = 'https://betfury.io/?r=LUCKYSIRKO007';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const siteUrl = SITE_URL;
  return {
    title: locale === 'es' ? 'Mejores Casinos Cripto 2026: Guía Completa' : 'Best Crypto Casinos 2026: Complete Guide',
    description: locale === 'es'
      ? 'Descubre los mejores casinos de criptomonedas en 2026. Comparativa, análisis de bonos, seguridad y retiros. BetFury lidera el ranking con staking BFG.'
      : 'Discover the best cryptocurrency casinos in 2026. Comparison, bonus analysis, security and withdrawals. BetFury leads the ranking with BFG staking.',
    keywords: 'casino cripto, casino bitcoin, casino criptomonedas, mejores casinos crypto 2026',
    alternates: {
      canonical: `${siteUrl}/${locale}/casino-cripto`,
      languages: { es: `${siteUrl}/es/casino-cripto`, en: `${siteUrl}/en/casino-cripto` },
    },
  };
}

export default function CasinoCriptoPillarPage({ params: { locale } }: { params: { locale: string } }) {
  unstable_setRequestLocale(locale);
  const siteUrl = SITE_URL;
  const isEs = locale === 'es';

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: isEs ? 'Mejores Casinos Cripto 2026' : 'Best Crypto Casinos 2026',
    description: isEs ? 'Guía completa de los mejores casinos de criptomonedas en 2026.' : 'Complete guide to the best crypto casinos in 2026.',
    datePublished: '2026-01-01',
    dateModified: '2026-06-09',
    author: { '@type': 'Person', '@id': `${siteUrl}/autor/sirko007#person`, name: 'Sirko007', url: `${siteUrl}/${locale}/autor/sirko007` },
    publisher: { '@type': 'Organization', name: 'CryptoLucky', url: siteUrl },
    url: `${siteUrl}/${locale}/casino-cripto`,
  };

  const ranking = [
    { pos: 1, name: 'BetFury', score: '9.8/10', pros: isEs ? 'Staking BFG, +4.000 juegos, bono 590%' : 'BFG staking, +4,000 games, 590% bonus', link: AFFILIATE },
  ];

  const relatedArticles = [
    { slug: 'mejores-casinos-criptomonedas-2026', title: isEs ? 'Los 10 Mejores Casinos Cripto de 2026' : 'Top 10 Crypto Casinos of 2026' },
    { slug: 'casino-bitcoin-sin-kyc-2026', title: isEs ? 'Casinos Bitcoin Sin KYC 2026' : 'Bitcoin Casinos Without KYC 2026' },
    { slug: 'betfury-casino-review-2026', title: isEs ? 'BetFury Casino: Análisis Completo' : 'BetFury Casino: Complete Review' },
    { slug: 'betfury-seguro-es-legitimo-licencia', title: isEs ? 'BetFury: ¿Es Seguro y Legítimo?' : 'Is BetFury Safe and Legitimate?' },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <main className="max-w-4xl mx-auto px-4 py-12">
        <nav className="text-slate-500 text-sm mb-6 flex items-center gap-1">
          <Link href={`/${locale}`} className="hover:text-amber-400">{isEs ? 'Inicio' : 'Home'}</Link>
          <span>/</span>
          <span className="text-slate-400">{isEs ? 'Casino Cripto' : 'Crypto Casino'}</span>
        </nav>

        <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
          {isEs ? 'Mejores Casinos Cripto 2026' : 'Best Crypto Casinos 2026'}
        </h1>
        <p className="text-slate-400 text-lg mb-10">
          {isEs
            ? 'Análisis profundo de los casinos de criptomonedas más destacados. Criterios: seguridad, bonos, variedad de juegos, velocidad de retiro y sistema de staking.'
            : 'In-depth analysis of the most outstanding cryptocurrency casinos. Criteria: security, bonuses, game variety, withdrawal speed and staking system.'}
        </p>

        {/* Top ranking */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">🏆 {isEs ? 'Top Casino Cripto 2026' : 'Top Crypto Casino 2026'}</h2>
          {ranking.map((c) => (
            <div key={c.pos} className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-400/40 rounded-2xl p-6 flex flex-wrap items-center gap-4">
              <span className="text-4xl font-black text-amber-400">#{c.pos}</span>
              <div className="flex-1">
                <p className="text-white font-black text-xl">{c.name}</p>
                <p className="text-amber-400 font-bold">{c.score}</p>
                <p className="text-slate-400 text-sm mt-1">{c.pros}</p>
              </div>
              <a
                href={c.link}
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="bg-amber-500 hover:bg-amber-400 text-white font-bold px-6 py-3 rounded-xl transition-colors text-sm"
              >
                {isEs ? 'Visitar →' : 'Visit →'}
              </a>
            </div>
          ))}
        </section>

        {/* Contenido SEO */}
        <section className="mb-12 prose prose-invert prose-amber max-w-none
          prose-headings:text-white prose-p:text-slate-300 prose-a:text-amber-400">
          <h2>{isEs ? '¿Qué es un casino de criptomonedas?' : 'What is a cryptocurrency casino?'}</h2>
          <p>
            {isEs
              ? 'Un casino cripto es una plataforma de juego en línea que acepta exclusivamente criptomonedas como Bitcoin, Ethereum, BNB, USDT y otras monedas digitales. A diferencia de los casinos tradicionales, ofrecen transacciones instantáneas, mayor privacidad, juegos verificablemente justos y, en muchos casos, sistemas de staking que permiten generar ingresos pasivos.'
              : 'A crypto casino is an online gaming platform that exclusively accepts cryptocurrencies such as Bitcoin, Ethereum, BNB, USDT and other digital currencies. Unlike traditional casinos, they offer instant transactions, greater privacy, provably fair games and, in many cases, staking systems that allow generating passive income.'}
          </p>
          <h2>{isEs ? 'Ventajas de los casinos cripto' : 'Advantages of crypto casinos'}</h2>
          <p>
            {isEs
              ? 'Los casinos de criptomonedas presentan múltiples ventajas sobre los casinos tradicionales: retiros instantáneos sin esperas bancarias, privacidad sin documentación excesiva, bonos más generosos gracias a menores costes operativos, y acceso desde cualquier país. Además, los juegos provably fair permiten verificar matemáticamente que cada resultado es aleatorio.'
              : 'Cryptocurrency casinos offer multiple advantages over traditional casinos: instant withdrawals without banking delays, privacy without excessive documentation, more generous bonuses thanks to lower operating costs, and access from any country. Additionally, provably fair games allow you to mathematically verify that each result is random.'}
          </p>
          <h2>{isEs ? 'Cómo elegir un casino cripto seguro' : 'How to choose a safe crypto casino'}</h2>
          <p>
            {isEs
              ? 'Al elegir un casino cripto, verifica siempre: licencia de juego válida (Curaçao, Malta o Gibraltar), historial de pagos sin problemas, auditorías de RNG por terceros, sistema de soporte al cliente activo y reputación en comunidades como Reddit o Bitcointalk. BetFury cumple todos estos criterios y añade transparencia gracias a su blockchain.'
              : 'When choosing a crypto casino, always check: valid gambling license (Curaçao, Malta or Gibraltar), trouble-free payment history, third-party RNG audits, active customer support system and reputation in communities like Reddit or Bitcointalk. BetFury meets all these criteria and adds transparency thanks to its blockchain.'}
          </p>
        </section>

        {/* Artículos relacionados */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">{isEs ? 'Artículos sobre casinos cripto' : 'Crypto casino articles'}</h2>
          <div className="space-y-3">
            {relatedArticles.map((a) => (
              <Link key={a.slug} href={`/${locale}/blog/${a.slug}`}
                className="flex items-center gap-3 bg-slate-800 border border-slate-700 rounded-xl p-4 hover:border-amber-400 transition-colors group">
                <span className="text-amber-400 text-xl">📄</span>
                <span className="text-white group-hover:text-amber-400 transition-colors font-medium text-sm">{a.title}</span>
                <span className="ml-auto text-amber-400 text-sm">→</span>
              </Link>
            ))}
          </div>
        </section>

        <div className="text-center bg-slate-800 border border-amber-400/30 rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-white mb-3">
            {isEs ? '🥇 El #1 Casino Cripto: BetFury' : '🥇 The #1 Crypto Casino: BetFury'}
          </h2>
          <p className="text-slate-400 mb-6">
            {isEs ? 'Staking BFG + 590% bono bienvenida + +4.000 juegos + apuestas deportivas' : 'BFG staking + 590% welcome bonus + 4,000+ games + sports betting'}
          </p>
          <a href={AFFILIATE} target="_blank" rel="noopener noreferrer sponsored"
            className="inline-block bg-amber-500 hover:bg-amber-400 text-white font-black text-lg px-10 py-4 rounded-xl transition-colors">
            {isEs ? '🎰 Jugar en BetFury → LUCKYSIRKO007' : '🎰 Play at BetFury → LUCKYSIRKO007'}
          </a>
        </div>
        <PillarNav locale={locale} current="casino-cripto" />
      </main>
    </>
  );
}

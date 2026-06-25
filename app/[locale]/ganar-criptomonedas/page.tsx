import { unstable_setRequestLocale } from 'next-intl/server';
import Link from 'next/link';
import type { Metadata } from 'next';
import { SITE_URL } from '@/lib/author';
import PillarNav from '@/components/PillarNav';
import PillarFaq from '@/components/PillarFaq';
import { PILLAR_FAQS } from '@/lib/pillar-faqs';

const AFFILIATE = 'https://betfury.io/?r=LUCKYSIRKO007';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const siteUrl = SITE_URL;
  return {
    title: locale === 'es' ? 'Ganar Criptomonedas Gratis 2026: 10 Métodos Legítimos' : 'Earn Free Cryptocurrency 2026: 10 Legitimate Methods',
    description: locale === 'es'
      ? 'Descubre cómo ganar criptomonedas gratis en 2026: faucets, staking, play-to-earn, cashback y más. Guía completa con BetFury como la mejor opción.'
      : 'Discover how to earn free cryptocurrency in 2026: faucets, staking, play-to-earn, cashback and more. Complete guide with BetFury as the best option.',
    keywords: 'ganar criptomonedas gratis, earn free crypto, faucet bitcoin, play to earn 2026',
    alternates: {
      canonical: `${siteUrl}/${locale}/ganar-criptomonedas`,
      languages: { es: `${siteUrl}/es/ganar-criptomonedas`, 'x-default': `${siteUrl}/es/ganar-criptomonedas` },
    },
  };
}

export default function GanarCriptoPillarPage({ params: { locale } }: { params: { locale: string } }) {
  unstable_setRequestLocale(locale);
  const siteUrl = SITE_URL;
  const isEs = locale === 'es';

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: isEs ? 'Ganar Criptomonedas Gratis 2026' : 'Earn Free Cryptocurrency 2026',
    description: isEs ? 'Los 10 métodos más efectivos para ganar criptomonedas gratis en 2026.' : 'The 10 most effective methods to earn free cryptocurrency in 2026.',
    datePublished: '2026-01-01',
    dateModified: '2026-06-09',
    author: { '@type': 'Person', '@id': `${siteUrl}/autor/sirko007#person`, name: 'Sirko007', url: `${siteUrl}/${locale}/autor/sirko007` },
    publisher: { '@type': 'Organization', name: 'CryptoLucky', url: siteUrl },
    url: `${siteUrl}/${locale}/ganar-criptomonedas`,
  };

  const methods = isEs
    ? [
        { emoji: '🏦', title: 'Staking BFG en BetFury', desc: 'Dividendos diarios en BTC, ETH y BNB. La opción #1.', badge: '⭐ Recomendado', link: AFFILIATE },
        { emoji: '🎰', title: 'Faucet de BetFury', desc: 'Reclama cripto gratis cada hora sin depósito.', badge: null, link: AFFILIATE },
        { emoji: '🎮', title: 'Play-to-Earn', desc: 'Gana tokens jugando. BetFury genera BFG automáticamente.', badge: null, link: null },
        { emoji: '💳', title: 'Cashback en cripto', desc: 'Algunas tarjetas devuelven un % en Bitcoin o ETH.', badge: null, link: null },
        { emoji: '👥', title: 'Programa de referidos', desc: 'Invita amigos a BetFury y gana comisiones de por vida.', badge: null, link: AFFILIATE },
        { emoji: '📚', title: 'Learn & Earn', desc: 'Plataformas como Coinbase o Binance pagan por completar cursos.', badge: null, link: null },
      ]
    : [
        { emoji: '🏦', title: 'BFG Staking at BetFury', desc: 'Daily dividends in BTC, ETH and BNB. The #1 option.', badge: '⭐ Recommended', link: AFFILIATE },
        { emoji: '🎰', title: 'BetFury Faucet', desc: 'Claim free crypto every hour without deposit.', badge: null, link: AFFILIATE },
        { emoji: '🎮', title: 'Play-to-Earn', desc: 'Earn tokens by playing. BetFury automatically generates BFG.', badge: null, link: null },
        { emoji: '💳', title: 'Crypto Cashback', desc: 'Some cards return a % in Bitcoin or ETH.', badge: null, link: null },
        { emoji: '👥', title: 'Referral Program', desc: 'Invite friends to BetFury and earn lifetime commissions.', badge: null, link: AFFILIATE },
        { emoji: '📚', title: 'Learn & Earn', desc: 'Platforms like Coinbase or Binance pay for completing courses.', badge: null, link: null },
      ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <main className="max-w-4xl mx-auto px-4 py-12">
        <nav className="text-slate-500 text-sm mb-6 flex items-center gap-1">
          <Link href={`/${locale}`} className="hover:text-amber-400">{isEs ? 'Inicio' : 'Home'}</Link>
          <span>/</span>
          <span className="text-slate-400">{isEs ? 'Ganar Criptomonedas' : 'Earn Crypto'}</span>
        </nav>

        <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
          {isEs ? 'Ganar Criptomonedas Gratis 2026' : 'Earn Free Cryptocurrency 2026'}
        </h1>
        <p className="text-slate-400 text-lg mb-10">
          {isEs
            ? 'Los 10 métodos más efectivos y comprobados para ganar criptomonedas gratis o con mínima inversión en 2026. Sin estafas, solo estrategias reales.'
            : 'The 10 most effective and proven methods to earn free cryptocurrency or with minimal investment in 2026. No scams, only real strategies.'}
        </p>

        {/* Métodos */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">
            {isEs ? 'Métodos para ganar cripto en 2026' : 'Methods to earn crypto in 2026'}
          </h2>
          <div className="space-y-4">
            {methods.map((m, i) => (
              <div key={i} className={`flex items-start gap-4 rounded-xl p-5 border ${m.badge ? 'bg-amber-500/10 border-amber-400/40' : 'bg-slate-800 border-slate-700'}`}>
                <span className="text-3xl flex-shrink-0">{m.emoji}</span>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-white font-bold">{m.title}</p>
                    {m.badge && <span className="text-xs bg-amber-500 text-white px-2 py-0.5 rounded-full">{m.badge}</span>}
                  </div>
                  <p className="text-slate-400 text-sm">{m.desc}</p>
                </div>
                {m.link && (
                  <a href={m.link} target="_blank" rel="noopener noreferrer sponsored"
                    className="flex-shrink-0 text-amber-400 hover:text-amber-300 text-sm font-bold">
                    {isEs ? 'Ir →' : 'Go →'}
                  </a>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Contenido SEO */}
        <section className="mb-12 prose prose-invert prose-amber max-w-none
          prose-headings:text-white prose-p:text-slate-300">
          <h2>{isEs ? 'La mejor forma de ganar cripto en 2026: BetFury BFG' : 'The best way to earn crypto in 2026: BetFury BFG'}</h2>
          <p>
            {isEs
              ? 'Entre todos los métodos para ganar criptomonedas, el staking de BFG en BetFury destaca por su combinación única de simplicidad, seguridad y rentabilidad. No requiere conocimientos técnicos: simplemente juegas en la plataforma, acumulas tokens BFG de forma automática y los bloqueas en el pool de staking para recibir dividendos cada 24 horas.'
              : 'Among all methods to earn cryptocurrencies, BFG staking on BetFury stands out for its unique combination of simplicity, security and profitability. It requires no technical knowledge: you simply play on the platform, automatically accumulate BFG tokens and lock them in the staking pool to receive dividends every 24 hours.'}
          </p>
          <h2>{isEs ? 'El faucet de BetFury: cripto gratis cada hora' : 'BetFury\'s faucet: free crypto every hour'}</h2>
          <p>
            {isEs
              ? 'BetFury también cuenta con un sistema de faucet que permite reclamar pequeñas cantidades de criptomonedas gratis cada hora, sin necesidad de depositar. Es una excelente forma de empezar sin inversión inicial, conocer la plataforma y comenzar a acumular BFG para el staking desde el primer día.'
              : 'BetFury also has a faucet system that allows you to claim small amounts of free cryptocurrency every hour, without needing to deposit. It\'s an excellent way to start without initial investment, get to know the platform and begin accumulating BFG for staking from day one.'}
          </p>
        </section>

        {/* Artículos relacionados */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">{isEs ? 'Artículos relacionados' : 'Related articles'}</h2>
          <div className="space-y-3">
            {[
              { slug: 'ganar-criptomonedas-gratis-2026', title: isEs ? 'Guía Completa: Ganar Criptomonedas Gratis 2026' : 'Complete Guide: Earn Free Cryptocurrency 2026' },
              { slug: 'betfury-staking-bfg-dividendos', title: isEs ? 'Staking BFG: Dividendos Diarios en BetFury' : 'BFG Staking: Daily Dividends on BetFury' },
            ].map((a) => (
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
            {isEs ? '🚀 Empieza a ganar cripto hoy' : '🚀 Start earning crypto today'}
          </h2>
          <p className="text-slate-400 mb-6">
            {isEs ? 'BetFury · Faucet gratis + BFG Staking + Dividendos diarios' : 'BetFury · Free faucet + BFG Staking + Daily dividends'}
          </p>
          <a href={AFFILIATE} target="_blank" rel="noopener noreferrer sponsored"
            className="inline-block bg-amber-500 hover:bg-amber-400 text-white font-black text-lg px-10 py-4 rounded-xl transition-colors">
            {isEs ? '💰 Empezar Gratis → LUCKYSIRKO007' : '💰 Start Free → LUCKYSIRKO007'}
          </a>
        </div>
        <PillarFaq items={PILLAR_FAQS['ganar-criptomonedas']} locale={locale} />
        <PillarNav locale={locale} current="ganar-criptomonedas" />
      </main>
    </>
  );
}

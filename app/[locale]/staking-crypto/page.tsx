import { unstable_setRequestLocale } from 'next-intl/server';
import Link from 'next/link';
import type { Metadata } from 'next';

const AFFILIATE = 'https://betfury.io/?r=LUCKYSIRKO007';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://cryptolucky-blog.vercel.app';
  return {
    title: locale === 'es' ? 'Staking Cripto 2026: Gana Dividendos Diarios con BFG' : 'Crypto Staking 2026: Earn Daily Dividends with BFG',
    description: locale === 'es'
      ? 'Aprende cómo funciona el staking de BFG en BetFury y gana dividendos diarios en Bitcoin, ETH y BNB. La guía completa de staking cripto para 2026.'
      : 'Learn how BFG staking works on BetFury and earn daily dividends in Bitcoin, ETH and BNB. The complete crypto staking guide for 2026.',
    keywords: 'staking cripto, staking BFG, dividendos bitcoin, staking betfury, ganar cripto staking',
    alternates: {
      canonical: `${siteUrl}/${locale}/staking-crypto`,
      languages: { es: `${siteUrl}/es/staking-crypto`, en: `${siteUrl}/en/staking-crypto` },
    },
  };
}

export default function StakingCryptoPillarPage({ params: { locale } }: { params: { locale: string } }) {
  unstable_setRequestLocale(locale);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://cryptolucky-blog.vercel.app';
  const isEs = locale === 'es';

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: isEs ? 'Staking Cripto 2026: BFG y Dividendos Diarios' : 'Crypto Staking 2026: BFG and Daily Dividends',
    description: isEs ? 'Guía completa del staking de BFG en BetFury para ganar dividendos diarios en criptomonedas.' : 'Complete guide to BFG staking on BetFury to earn daily cryptocurrency dividends.',
    datePublished: '2026-01-01',
    dateModified: '2026-06-09',
    author: { '@type': 'Person', name: 'Carlos Mendoza' },
    publisher: { '@type': 'Organization', name: 'CryptoLucky', url: siteUrl },
    url: `${siteUrl}/${locale}/staking-crypto`,
  };

  const steps = isEs
    ? [
        { n: '1', title: 'Crea tu cuenta', desc: 'Regístrate en BetFury con código LUCKYSIRKO007' },
        { n: '2', title: 'Deposita cripto', desc: 'BTC, ETH, BNB, USDT u otras criptos aceptadas' },
        { n: '3', title: 'Juega y acumula BFG', desc: 'Cada apuesta te genera tokens BFG automáticamente' },
        { n: '4', title: 'Haz staking de BFG', desc: 'Bloquea tus tokens en el pool de staking' },
        { n: '5', title: 'Recibe dividendos diarios', desc: 'Cobra cada 24h en BTC, ETH, BNB, USDT y más' },
      ]
    : [
        { n: '1', title: 'Create your account', desc: 'Sign up at BetFury with code LUCKYSIRKO007' },
        { n: '2', title: 'Deposit crypto', desc: 'BTC, ETH, BNB, USDT or other accepted cryptos' },
        { n: '3', title: 'Play and accumulate BFG', desc: 'Every bet automatically generates BFG tokens' },
        { n: '4', title: 'Stake BFG', desc: 'Lock your tokens in the staking pool' },
        { n: '5', title: 'Receive daily dividends', desc: 'Collect every 24h in BTC, ETH, BNB, USDT and more' },
      ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <main className="max-w-4xl mx-auto px-4 py-12">
        <nav className="text-slate-500 text-sm mb-6 flex items-center gap-1">
          <Link href={`/${locale}`} className="hover:text-amber-400">{isEs ? 'Inicio' : 'Home'}</Link>
          <span>/</span>
          <span className="text-slate-400">{isEs ? 'Staking Cripto' : 'Crypto Staking'}</span>
        </nav>

        <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
          {isEs ? 'Staking Cripto 2026' : 'Crypto Staking 2026'}
        </h1>
        <p className="text-slate-400 text-lg mb-10">
          {isEs
            ? 'Aprende cómo el staking de BFG en BetFury genera dividendos diarios en Bitcoin, Ethereum y más. La forma más inteligente de ganar cripto pasivamente en 2026.'
            : 'Learn how BFG staking on BetFury generates daily dividends in Bitcoin, Ethereum and more. The smartest way to earn crypto passively in 2026.'}
        </p>

        {/* CTA */}
        <div className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl p-6 mb-12 text-center">
          <p className="text-white font-bold text-xl mb-2">
            {isEs ? '📈 Empieza a ganar dividendos diarios' : '📈 Start earning daily dividends'}
          </p>
          <p className="text-white/80 text-sm mb-4">
            {isEs ? 'BFG Staking en BetFury · Código LUCKYSIRKO007' : 'BFG Staking at BetFury · Code LUCKYSIRKO007'}
          </p>
          <a href={AFFILIATE} target="_blank" rel="noopener noreferrer sponsored"
            className="inline-block bg-white text-amber-600 font-black text-lg px-8 py-3 rounded-xl hover:bg-amber-50 transition-colors">
            {isEs ? 'Empezar Staking →' : 'Start Staking →'}
          </a>
        </div>

        {/* Cómo funciona */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">
            {isEs ? 'Cómo funciona el staking BFG' : 'How BFG staking works'}
          </h2>
          <div className="space-y-3">
            {steps.map((s) => (
              <div key={s.n} className="flex items-start gap-4 bg-slate-800 border border-slate-700 rounded-xl p-4">
                <span className="w-8 h-8 bg-amber-500 text-white font-black text-sm rounded-full flex items-center justify-center flex-shrink-0">
                  {s.n}
                </span>
                <div>
                  <p className="text-white font-bold text-sm">{s.title}</p>
                  <p className="text-slate-400 text-xs mt-1">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Estadísticas del pool */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">
            {isEs ? 'Criptomonedas en el pool de dividendos' : 'Cryptocurrencies in the dividend pool'}
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {['₿ BTC', 'Ξ ETH', '⬡ BNB', '💵 USDT', '🟡 TRX', '🔵 MATIC', '🟠 SOL', '🔷 XRP'].map((c) => (
              <div key={c} className="bg-slate-800 border border-slate-700 rounded-xl p-3 text-center">
                <p className="text-white font-bold text-sm">{c}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Contenido SEO */}
        <section className="mb-12 prose prose-invert prose-amber max-w-none
          prose-headings:text-white prose-p:text-slate-300">
          <h2>{isEs ? '¿Qué es el token BFG y por qué vale la pena?' : 'What is the BFG token and why is it worth it?'}</h2>
          <p>
            {isEs
              ? 'BFG (BetFury Token) es el token nativo de la plataforma BetFury. A diferencia de la mayoría de tokens de casino que no tienen utilidad real, el BFG tiene un modelo económico sostenible: el 100% de las comisiones generadas por la plataforma se distribuye entre los holders que hacen staking. Esto significa que cuanto más crezca BetFury, más dividendos reciben los stakers.'
              : 'BFG (BetFury Token) is the native token of the BetFury platform. Unlike most casino tokens with no real utility, BFG has a sustainable economic model: 100% of platform-generated fees are distributed among staking holders. This means the more BetFury grows, the more dividends stakers receive.'}
          </p>
          <p>
            {isEs
              ? 'El proceso de generación de BFG es simple: cada vez que apuestas en el casino o en el sportsbook de BetFury, recibes automáticamente tokens BFG proporcionales al volumen apostado. Estos tokens se pueden bloquear en el pool de staking en cualquier momento para empezar a recibir dividendos diarios sin necesidad de hacer nada más.'
              : 'The BFG generation process is simple: every time you bet in the casino or sportsbook on BetFury, you automatically receive BFG tokens proportional to the wagered volume. These tokens can be locked in the staking pool at any time to start receiving daily dividends without needing to do anything else.'}
          </p>
          <h2>{isEs ? 'Staking vs. DeFi: ¿cuál es mejor?' : 'Staking vs. DeFi: which is better?'}</h2>
          <p>
            {isEs
              ? 'El staking de BFG en BetFury tiene ventajas claras frente al DeFi tradicional: sin riesgo de smart contracts complejos, sin impermanent loss, sin necesidad de gestionar wallets de hardware, y con pagos garantizados respaldados por los ingresos reales de la plataforma. Es ideal para usuarios que buscan rendimientos estables sin la complejidad técnica del DeFi.'
              : 'BFG staking on BetFury has clear advantages over traditional DeFi: no complex smart contract risk, no impermanent loss, no need to manage hardware wallets, and with guaranteed payments backed by real platform revenues. It\'s ideal for users seeking stable returns without the technical complexity of DeFi.'}
          </p>
        </section>

        {/* Artículos relacionados */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">{isEs ? 'Artículos sobre staking y cripto' : 'Staking and crypto articles'}</h2>
          <div className="space-y-3">
            {[
              { slug: 'betfury-staking-bfg-dividendos', title: isEs ? 'Staking BFG en BetFury: Gana Dividendos Diarios' : 'BFG Staking on BetFury: Earn Daily Dividends' },
              { slug: 'ganar-criptomonedas-gratis-2026', title: isEs ? 'Cómo Ganar Criptomonedas Gratis en 2026' : 'How to Earn Free Cryptocurrency in 2026' },
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
            {isEs ? '📈 Empieza el staking hoy' : '📈 Start staking today'}
          </h2>
          <p className="text-slate-400 mb-6">
            {isEs ? 'BetFury BFG Staking · Dividendos diarios en BTC, ETH, BNB y más' : 'BetFury BFG Staking · Daily dividends in BTC, ETH, BNB and more'}
          </p>
          <a href={AFFILIATE} target="_blank" rel="noopener noreferrer sponsored"
            className="inline-block bg-amber-500 hover:bg-amber-400 text-white font-black text-lg px-10 py-4 rounded-xl transition-colors">
            {isEs ? '💰 Hacer Staking → LUCKYSIRKO007' : '💰 Start Staking → LUCKYSIRKO007'}
          </a>
        </div>
      </main>
    </>
  );
}

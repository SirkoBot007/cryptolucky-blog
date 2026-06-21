import { unstable_setRequestLocale } from 'next-intl/server';
import Link from 'next/link';
import type { Metadata } from 'next';

const AFFILIATE = 'https://betfury.io/?r=LUCKYSIRKO007';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://cryptolucky-blog.vercel.app';
  return {
    title: locale === 'es' ? 'BetFury Casino 2026: Todo lo que Necesitas Saber' : 'BetFury Casino 2026: Everything You Need to Know',
    description: locale === 'es'
      ? 'Guía completa de BetFury Casino: bonos, staking BFG, juegos, apuestas deportivas y retiros. Código exclusivo LUCKYSIRKO007 para bono de bienvenida.'
      : 'Complete BetFury Casino guide: bonuses, BFG staking, games, sports betting and withdrawals. Exclusive code LUCKYSIRKO007 for welcome bonus.',
    keywords: 'betfury, betfury casino, betfury opiniones, betfury bono, betfury staking',
    alternates: {
      canonical: `${siteUrl}/${locale}/betfury`,
      languages: { es: `${siteUrl}/es/betfury`, en: `${siteUrl}/en/betfury` },
    },
  };
}

export default function BetFuryPillarPage({ params: { locale } }: { params: { locale: string } }) {
  unstable_setRequestLocale(locale);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://cryptolucky-blog.vercel.app';
  const isEs = locale === 'es';

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: isEs ? 'BetFury Casino 2026: Todo lo que Necesitas Saber' : 'BetFury Casino 2026: Everything You Need to Know',
    description: isEs ? 'Guía completa de BetFury Casino con análisis de bonos, staking BFG y apuestas deportivas.' : 'Complete BetFury Casino guide with bonus analysis, BFG staking and sports betting.',
    datePublished: '2026-01-01',
    dateModified: '2026-06-09',
    author: { '@type': 'Person', '@id': `${siteUrl}/autor/sirko007#person`, name: 'Sirko007', url: `${siteUrl}/${locale}/autor/sirko007` },
    publisher: { '@type': 'Organization', name: 'CryptoLucky', url: siteUrl },
    url: `${siteUrl}/${locale}/betfury`,
  };

  // Review editorial de BetFury → elegible para rich result con estrellas en Google.
  const reviewJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Review',
    name: isEs ? 'Opiniones y análisis de BetFury Casino 2026' : 'BetFury Casino 2026 review',
    datePublished: '2026-01-01',
    author: { '@type': 'Person', '@id': `${siteUrl}/autor/sirko007#person`, name: 'Sirko007', url: `${siteUrl}/${locale}/autor/sirko007` },
    publisher: { '@type': 'Organization', name: 'CryptoLucky', url: siteUrl },
    itemReviewed: { '@type': 'Organization', name: 'BetFury', url: 'https://betfury.io', sameAs: 'https://betfury.io' },
    reviewRating: { '@type': 'Rating', ratingValue: '4.6', bestRating: '5', worstRating: '1' },
    reviewBody: isEs
      ? 'Análisis completo de BetFury: bonos hasta 590%, staking de BFG con dividendos diarios, +5.000 juegos, retiros rápidos en cripto y registro sin KYC.'
      : 'Full BetFury review: bonuses up to 590%, BFG staking with daily dividends, +5,000 games, fast crypto withdrawals and no-KYC signup.',
  };

  const relatedArticles = [
    { slug: 'betfury-casino-review-2026', title: isEs ? 'BetFury Casino: Opiniones y Análisis Completo 2026' : 'BetFury Casino Review 2026' },
    { slug: 'betfury-bono-bienvenida-590', title: isEs ? 'BetFury Bono de Bienvenida 590%: ¿Cómo Reclamarlo?' : 'BetFury 590% Welcome Bonus: How to Claim It?' },
    { slug: 'betfury-seguro-es-legitimo-licencia', title: isEs ? 'BetFury: ¿Es Seguro y Legítimo? Licencia y Garantías' : 'Is BetFury Safe and Legitimate? License & Guarantees' },
    { slug: 'betfury-staking-bfg-dividendos', title: isEs ? 'Staking BFG en BetFury: Gana Dividendos Diarios' : 'BFG Staking on BetFury: Earn Daily Dividends' },
    { slug: 'apuestas-mundial-2026-betfury', title: isEs ? 'Apuestas Mundial 2026 en BetFury: Guía Completa' : 'World Cup 2026 Betting on BetFury: Complete Guide' },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewJsonLd) }} />

      <main className="max-w-4xl mx-auto px-4 py-12">
        {/* Breadcrumb */}
        <nav className="text-slate-500 text-sm mb-6 flex items-center gap-1">
          <Link href={`/${locale}`} className="hover:text-amber-400">
            {isEs ? 'Inicio' : 'Home'}
          </Link>
          <span>/</span>
          <span className="text-slate-400">BetFury</span>
        </nav>

        <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
          {isEs ? 'BetFury Casino 2026' : 'BetFury Casino 2026'}
        </h1>
        <p className="text-slate-400 text-lg mb-8">
          {isEs
            ? 'La guía definitiva sobre el casino cripto más innovador del mercado. Bonos, staking, juegos y todo lo que necesitas saber.'
            : 'The definitive guide to the most innovative crypto casino on the market. Bonuses, staking, games and everything you need to know.'}
        </p>

        {/* CTA primario */}
        <div className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl p-6 mb-12 text-center">
          <p className="text-white font-bold text-xl mb-2">
            {isEs ? '🎁 Bono de Bienvenida hasta 590% + Giros Gratis' : '🎁 Welcome Bonus up to 590% + Free Spins'}
          </p>
          <p className="text-white/80 text-sm mb-4">
            {isEs ? 'Código exclusivo: LUCKYSIRKO007' : 'Exclusive code: LUCKYSIRKO007'}
          </p>
          <a
            href={AFFILIATE}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="inline-block bg-white text-amber-600 font-black text-lg px-8 py-3 rounded-xl hover:bg-amber-50 transition-colors"
          >
            {isEs ? 'Registrarse en BetFury →' : 'Sign up at BetFury →'}
          </a>
        </div>

        {/* Características clave */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">
            {isEs ? '¿Por qué elegir BetFury?' : 'Why choose BetFury?'}
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { icon: '🪙', title: isEs ? 'Staking con BFG' : 'BFG Staking', desc: isEs ? 'Gana dividendos diarios en BTC, ETH y BNB' : 'Earn daily dividends in BTC, ETH and BNB' },
              { icon: '🎰', title: isEs ? '+4.000 juegos' : '+4,000 games', desc: isEs ? 'Slots, mesas en vivo, crash y exclusivos cripto' : 'Slots, live tables, crash and crypto exclusives' },
              { icon: '⚽', title: isEs ? 'Apuestas Deportivas' : 'Sports Betting', desc: isEs ? 'Más de 30 deportes con cuotas competitivas' : 'Over 30 sports with competitive odds' },
              { icon: '🔒', title: isEs ? 'Licencia Curaçao' : 'Curaçao License', desc: isEs ? 'Casino regulado y verificado desde 2019' : 'Regulated and verified casino since 2019' },
              { icon: '⚡', title: isEs ? 'Retiros Instantáneos' : 'Instant Withdrawals', desc: isEs ? 'Sin límites absurdos, cripto directo a tu wallet' : 'No absurd limits, crypto directly to your wallet' },
              { icon: '🌍', title: isEs ? 'Sin KYC básico' : 'No basic KYC', desc: isEs ? 'Empieza a jugar sin verificación complicada' : 'Start playing without complex verification' },
            ].map((f, i) => (
              <div key={i} className="bg-slate-800 border border-slate-700 rounded-xl p-4 flex gap-3">
                <span className="text-2xl">{f.icon}</span>
                <div>
                  <p className="text-white font-bold text-sm">{f.title}</p>
                  <p className="text-slate-400 text-xs mt-1">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Sección de contenido */}
        <section className="mb-12 prose prose-invert prose-amber max-w-none
          prose-headings:text-white prose-p:text-slate-300 prose-a:text-amber-400">
          <h2>{isEs ? '¿Qué es BetFury Casino?' : 'What is BetFury Casino?'}</h2>
          <p>
            {isEs
              ? 'BetFury es una plataforma de casino y apuestas deportivas cripto fundada en 2019 y con licencia en Curaçao. Lo que la distingue del resto es su innovador sistema de tokenomía: al jugar, acumulas tokens BFG que puedes hacer staking para recibir dividendos diarios en criptomonedas reales.'
              : 'BetFury is a crypto casino and sports betting platform founded in 2019 and licensed in Curaçao. What sets it apart is its innovative tokenomics system: when you play, you accumulate BFG tokens that you can stake to receive daily dividends in real cryptocurrencies.'}
          </p>
          <p>
            {isEs
              ? 'En 2026, BetFury ha crecido hasta ofrecer más de 4.000 juegos de los mejores proveedores del sector, un sportsbook completo con apuestas en vivo, y uno de los programas de bienvenida más generosos del mercado con hasta un 590% de bono.'
              : 'In 2026, BetFury has grown to offer over 4,000 games from the best providers in the sector, a complete sportsbook with live betting, and one of the most generous welcome programs in the market with up to a 590% bonus.'}
          </p>
          <h2>{isEs ? 'El sistema BFG: el corazón de BetFury' : 'The BFG system: BetFury\'s heart'}</h2>
          <p>
            {isEs
              ? 'El token BFG es el núcleo del ecosistema BetFury. Cada apuesta que realizas en el casino o en deportes genera tokens BFG de manera automática. Estos tokens se pueden bloquear en el pool de staking para recibir una parte proporcional de los ingresos diarios de la plataforma, pagados en Bitcoin, Ethereum, BNB, USDT y otras criptomonedas.'
              : 'The BFG token is the core of the BetFury ecosystem. Every bet you place in the casino or sports automatically generates BFG tokens. These tokens can be locked in the staking pool to receive a proportional share of the platform\'s daily revenue, paid in Bitcoin, Ethereum, BNB, USDT and other cryptocurrencies.'}
          </p>
          <h2>{isEs ? 'Juegos disponibles en BetFury' : 'Games available at BetFury'}</h2>
          <p>
            {isEs
              ? 'BetFury ofrece una selección extraordinaria de juegos que incluye slots de Pragmatic Play, NetEnt, Hacksaw y más de 50 proveedores; juegos de mesa en vivo con crupieres reales; crash games, mines, plinko y otros juegos exclusivos de casino cripto. Todos los juegos son verificablemente justos (provably fair) en la sección de juegos originales.'
              : 'BetFury offers an extraordinary selection of games including slots from Pragmatic Play, NetEnt, Hacksaw and over 50 providers; live table games with real dealers; crash games, mines, plinko and other exclusive crypto casino games. All original games are provably fair.'}
          </p>
        </section>

        {/* Artículos relacionados */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">
            {isEs ? 'Guías y análisis de BetFury' : 'BetFury guides and analysis'}
          </h2>
          <div className="space-y-3">
            {relatedArticles.map((a) => (
              <Link
                key={a.slug}
                href={`/${locale}/blog/${a.slug}`}
                className="flex items-center gap-3 bg-slate-800 border border-slate-700 rounded-xl p-4 hover:border-amber-400 transition-colors group"
              >
                <span className="text-amber-400 text-xl">📄</span>
                <span className="text-white group-hover:text-amber-400 transition-colors font-medium text-sm">
                  {a.title}
                </span>
                <span className="ml-auto text-amber-400 text-sm">→</span>
              </Link>
            ))}
          </div>
        </section>

        {/* CTA final */}
        <div className="text-center bg-slate-800 border border-amber-400/30 rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-white mb-3">
            {isEs ? '¿Listo para empezar en BetFury?' : 'Ready to start at BetFury?'}
          </h2>
          <p className="text-slate-400 mb-6">
            {isEs
              ? 'Regístrate ahora con el código LUCKYSIRKO007 y reclama tu bono de bienvenida exclusivo.'
              : 'Sign up now with code LUCKYSIRKO007 and claim your exclusive welcome bonus.'}
          </p>
          <a
            href={AFFILIATE}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="inline-block bg-amber-500 hover:bg-amber-400 text-white font-black text-lg px-10 py-4 rounded-xl transition-colors"
          >
            {isEs ? '🎁 Reclamar Bono → LUCKYSIRKO007' : '🎁 Claim Bonus → LUCKYSIRKO007'}
          </a>
        </div>
      </main>
    </>
  );
}

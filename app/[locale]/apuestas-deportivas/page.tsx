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
    title: locale === 'es' ? 'Apuestas Deportivas Cripto 2026: Guía Completa' : 'Crypto Sports Betting 2026: Complete Guide',
    description: locale === 'es'
      ? 'Apuesta en fútbol, baloncesto, tenis y más con criptomonedas en BetFury. Mundial 2026, cuotas en vivo y retiros instantáneos. Código LUCKYSIRKO007.'
      : 'Bet on football, basketball, tennis and more with cryptocurrencies on BetFury. World Cup 2026, live odds and instant withdrawals. Code LUCKYSIRKO007.',
    keywords: 'apuestas deportivas cripto, apuestas bitcoin, sportsbook crypto, apuestas mundial 2026',
    alternates: {
      canonical: `${siteUrl}/${locale}/apuestas-deportivas`,
      languages: { es: `${siteUrl}/es/apuestas-deportivas`, 'x-default': `${siteUrl}/es/apuestas-deportivas` },
    },
  };
}

export default function ApuestasDeportivasPillarPage({ params: { locale } }: { params: { locale: string } }) {
  unstable_setRequestLocale(locale);
  const siteUrl = SITE_URL;
  const isEs = locale === 'es';

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: isEs ? 'Apuestas Deportivas Cripto 2026' : 'Crypto Sports Betting 2026',
    description: isEs ? 'Guía completa de apuestas deportivas con criptomonedas en BetFury 2026.' : 'Complete guide to crypto sports betting at BetFury 2026.',
    datePublished: '2026-01-01',
    dateModified: '2026-06-09',
    author: { '@type': 'Person', '@id': `${siteUrl}/autor/sirko007#person`, name: 'Sirko007', url: `${siteUrl}/${locale}/autor/sirko007` },
    publisher: { '@type': 'Organization', name: 'CryptoLucky', url: siteUrl },
    url: `${siteUrl}/${locale}/apuestas-deportivas`,
  };

  const deportes = [
    { emoji: '⚽', name: isEs ? 'Fútbol' : 'Football', note: isEs ? 'Liga, Champions, Premier y Mundial 2026' : 'League, Champions, Premier and World Cup 2026' },
    { emoji: '🏀', name: isEs ? 'Baloncesto' : 'Basketball', note: isEs ? 'NBA, Euroliga y ligas nacionales' : 'NBA, Euroleague and national leagues' },
    { emoji: '🎾', name: isEs ? 'Tenis' : 'Tennis', note: isEs ? 'Grand Slams y torneos ATP/WTA' : 'Grand Slams and ATP/WTA tournaments' },
    { emoji: '🏒', name: isEs ? 'Hockey' : 'Hockey', note: 'NHL y ligas europeas' },
    { emoji: '🥊', name: isEs ? 'MMA / Boxeo' : 'MMA / Boxing', note: isEs ? 'UFC, Bellator y grandes veladas' : 'UFC, Bellator and major events' },
    { emoji: '🎮', name: isEs ? 'eSports' : 'eSports', note: isEs ? 'CS2, Dota 2, League of Legends' : 'CS2, Dota 2, League of Legends' },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <main className="max-w-4xl mx-auto px-4 py-12">
        <nav className="text-slate-500 text-sm mb-6 flex items-center gap-1">
          <Link href={`/${locale}`} className="hover:text-amber-400">{isEs ? 'Inicio' : 'Home'}</Link>
          <span>/</span>
          <span className="text-slate-400">{isEs ? 'Apuestas Deportivas' : 'Sports Betting'}</span>
        </nav>

        {/* Urgency banner — World Cup 2026 */}
        <div className="bg-green-600/20 border border-green-500/40 rounded-xl p-4 mb-8 flex items-center gap-3">
          <span className="text-2xl">🏆</span>
          <div>
            <p className="text-green-400 font-bold text-sm">
              {isEs ? '¡EN VIVO! Copa del Mundo 2026' : 'LIVE! FIFA World Cup 2026'}
            </p>
            <p className="text-slate-300 text-xs">
              {isEs ? 'Apuesta en los partidos en BetFury con cuotas en vivo' : 'Bet on matches at BetFury with live odds'}
            </p>
          </div>
          <a href={AFFILIATE} target="_blank" rel="noopener noreferrer sponsored"
            className="ml-auto bg-green-500 hover:bg-green-400 text-white font-bold text-xs px-4 py-2 rounded-lg transition-colors">
            {isEs ? 'Apostar →' : 'Bet →'}
          </a>
        </div>

        <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
          {isEs ? 'Apuestas Deportivas Cripto' : 'Crypto Sports Betting'}
        </h1>
        <p className="text-slate-400 text-lg mb-10">
          {isEs
            ? 'Apuesta en tus deportes favoritos con Bitcoin, Ethereum y BNB. Sin cuentas bancarias, retiros instantáneos y cuotas competitivas en BetFury.'
            : 'Bet on your favorite sports with Bitcoin, Ethereum and BNB. No bank accounts, instant withdrawals and competitive odds at BetFury.'}
        </p>

        {/* CTA */}
        <div className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl p-6 mb-12 text-center">
          <p className="text-white font-bold text-xl mb-2">
            {isEs ? '⚽ Apuesta en el Mundial 2026 ahora mismo' : '⚽ Bet on World Cup 2026 right now'}
          </p>
          <p className="text-white/80 text-sm mb-4">{isEs ? 'Cuotas en vivo · Retiros instantáneos · Código LUCKYSIRKO007' : 'Live odds · Instant withdrawals · Code LUCKYSIRKO007'}</p>
          <a href={AFFILIATE} target="_blank" rel="noopener noreferrer sponsored"
            className="inline-block bg-white text-amber-600 font-black text-lg px-8 py-3 rounded-xl hover:bg-amber-50 transition-colors">
            {isEs ? 'Ir al Sportsbook →' : 'Go to Sportsbook →'}
          </a>
        </div>

        {/* Deportes disponibles */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">{isEs ? 'Deportes disponibles' : 'Available sports'}</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {deportes.map((d, i) => (
              <div key={i} className="bg-slate-800 border border-slate-700 rounded-xl p-4 flex items-center gap-3">
                <span className="text-2xl">{d.emoji}</span>
                <div>
                  <p className="text-white font-bold text-sm">{d.name}</p>
                  <p className="text-slate-400 text-xs">{d.note}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Contenido SEO */}
        <section className="mb-12 prose prose-invert prose-amber max-w-none
          prose-headings:text-white prose-p:text-slate-300">
          <h2>{isEs ? '¿Por qué apostar con cripto en BetFury?' : 'Why bet with crypto at BetFury?'}</h2>
          <p>
            {isEs
              ? 'BetFury Sportsbook ofrece apuestas en más de 30 deportes con cuotas competitivas y mercados en vivo. La principal ventaja frente a las casas de apuestas tradicionales es la velocidad: los retiros en criptomonedas son instantáneos, sin esperas de 3-5 días hábiles, y sin límites artificiales en las ganancias.'
              : 'BetFury Sportsbook offers betting on over 30 sports with competitive odds and live markets. The main advantage over traditional bookmakers is speed: cryptocurrency withdrawals are instant, without 3-5 business day waits, and without artificial limits on winnings.'}
          </p>
          <p>
            {isEs
              ? 'Además, al apostar en BetFury acumulas tokens BFG automáticamente, que luego puedes usar en staking para generar dividendos pasivos diarios. Es la única casa de apuestas cripto que te paga por jugar de dos maneras: con tus ganancias deportivas y con dividendos del token.'
              : 'Additionally, when betting on BetFury you automatically accumulate BFG tokens, which you can then use for staking to generate daily passive dividends. It\'s the only crypto sportsbook that pays you for playing in two ways: with your sports winnings and with token dividends.'}
          </p>
          <h2>{isEs ? 'Cómo hacer tu primera apuesta en BetFury' : 'How to make your first bet at BetFury'}</h2>
          <p>
            {isEs
              ? 'El proceso es simple: (1) Crea tu cuenta en BetFury usando el enlace con código LUCKYSIRKO007 para activar el bono. (2) Deposita criptomonedas desde tu wallet. (3) Ve a la sección Sportsbook y elige el deporte y partido de tu preferencia. (4) Selecciona el mercado y la cuota, introduce el importe y confirma la apuesta.'
              : 'The process is simple: (1) Create your account at BetFury using the link with code LUCKYSIRKO007 to activate the bonus. (2) Deposit cryptocurrencies from your wallet. (3) Go to the Sportsbook section and choose your preferred sport and match. (4) Select the market and odds, enter the amount and confirm the bet.'}
          </p>
        </section>

        {/* Artículos relacionados */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">{isEs ? 'Artículos de apuestas deportivas' : 'Sports betting articles'}</h2>
          <div className="space-y-3">
            {[
              { slug: 'apuestas-mundial-2026-betfury', title: isEs ? 'Apuestas Mundial 2026 en BetFury: Guía Completa' : 'World Cup 2026 Betting on BetFury: Complete Guide' },
              { slug: 'betfury-casino-review-2026', title: isEs ? 'BetFury Casino: Análisis Completo 2026' : 'BetFury Casino Review 2026' },
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
            {isEs ? '⚽ ¡Apuesta ahora en BetFury!' : '⚽ Bet now at BetFury!'}
          </h2>
          <p className="text-slate-400 mb-6">
            {isEs ? '+30 deportes · Cuotas en vivo · Apuestas combinadas · Retiros instantáneos' : '+30 sports · Live odds · Combo bets · Instant withdrawals'}
          </p>
          <a href={AFFILIATE} target="_blank" rel="noopener noreferrer sponsored"
            className="inline-block bg-amber-500 hover:bg-amber-400 text-white font-black text-lg px-10 py-4 rounded-xl transition-colors">
            {isEs ? '🏆 Apostar con LUCKYSIRKO007' : '🏆 Bet with LUCKYSIRKO007'}
          </a>
        </div>
        <PillarFaq items={PILLAR_FAQS['apuestas-deportivas']} locale={locale} />
        <PillarNav locale={locale} current="apuestas-deportivas" />
      </main>
    </>
  );
}

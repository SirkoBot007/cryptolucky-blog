import { unstable_setRequestLocale } from 'next-intl/server';
import Link from 'next/link';
import type { Metadata } from 'next';

const AFFILIATE = 'https://betfury.io/?r=LUCKYSIRKO007';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://cryptolucky-blog.vercel.app';
  return {
    title: locale === 'es' ? 'Bonos Casino Cripto 2026: Los Mejores Bonos de Bienvenida' : 'Crypto Casino Bonuses 2026: Best Welcome Bonuses',
    description: locale === 'es'
      ? 'Descubre los mejores bonos de casinos cripto en 2026. BetFury ofrece hasta 590% de bono de bienvenida más giros gratis con código LUCKYSIRKO007.'
      : 'Discover the best crypto casino bonuses in 2026. BetFury offers up to 590% welcome bonus plus free spins with code LUCKYSIRKO007.',
    keywords: 'bono casino cripto, bono bienvenida bitcoin, bono betfury, casino bono sin deposito cripto',
    alternates: {
      canonical: `${siteUrl}/${locale}/bonos-casino`,
      languages: { es: `${siteUrl}/es/bonos-casino`, en: `${siteUrl}/en/bonos-casino` },
    },
  };
}

export default function BonosCasinoPillarPage({ params: { locale } }: { params: { locale: string } }) {
  unstable_setRequestLocale(locale);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://cryptolucky-blog.vercel.app';
  const isEs = locale === 'es';

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: isEs ? 'Bonos Casino Cripto 2026' : 'Crypto Casino Bonuses 2026',
    description: isEs ? 'Los mejores bonos de bienvenida en casinos cripto para 2026.' : 'The best welcome bonuses at crypto casinos for 2026.',
    datePublished: '2026-01-01',
    dateModified: '2026-06-09',
    author: { '@type': 'Person', name: 'Carlos Mendoza' },
    publisher: { '@type': 'Organization', name: 'CryptoLucky', url: siteUrl },
    url: `${siteUrl}/${locale}/bonos-casino`,
  };

  const bonusTypes = [
    { emoji: '🎁', title: isEs ? 'Bono de Bienvenida' : 'Welcome Bonus', desc: isEs ? 'Porcentaje sobre tu primer depósito. BetFury ofrece hasta 590%.' : 'Percentage on your first deposit. BetFury offers up to 590%.' },
    { emoji: '🎰', title: isEs ? 'Giros Gratis' : 'Free Spins', desc: isEs ? 'Rondas gratuitas en slots seleccionados.' : 'Free rounds on selected slots.' },
    { emoji: '💰', title: isEs ? 'Cashback' : 'Cashback', desc: isEs ? 'Devolución de un porcentaje de tus pérdidas semanales.' : 'Refund of a percentage of your weekly losses.' },
    { emoji: '🔄', title: isEs ? 'Recarga Semanal' : 'Weekly Reload', desc: isEs ? 'Bono adicional en depósitos recurrentes.' : 'Additional bonus on recurring deposits.' },
    { emoji: '👥', title: isEs ? 'Referidos' : 'Referral', desc: isEs ? 'Gana comisiones por invitar amigos.' : 'Earn commissions for inviting friends.' },
    { emoji: '🏆', title: isEs ? 'VIP / Loyalty' : 'VIP / Loyalty', desc: isEs ? 'Beneficios exclusivos según tu nivel de actividad.' : 'Exclusive benefits based on your activity level.' },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <main className="max-w-4xl mx-auto px-4 py-12">
        <nav className="text-slate-500 text-sm mb-6 flex items-center gap-1">
          <Link href={`/${locale}`} className="hover:text-amber-400">{isEs ? 'Inicio' : 'Home'}</Link>
          <span>/</span>
          <span className="text-slate-400">{isEs ? 'Bonos Casino' : 'Casino Bonuses'}</span>
        </nav>

        <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
          {isEs ? 'Mejores Bonos Casino Cripto 2026' : 'Best Crypto Casino Bonuses 2026'}
        </h1>
        <p className="text-slate-400 text-lg mb-10">
          {isEs
            ? 'Guía completa de bonos de casinos cripto. Aprende a reclamar los mejores bonos de bienvenida, entender los requisitos de apuesta y maximizar tus beneficios.'
            : 'Complete guide to crypto casino bonuses. Learn to claim the best welcome bonuses, understand wagering requirements and maximize your benefits.'}
        </p>

        {/* Bono destacado */}
        <div className="bg-gradient-to-br from-amber-500/20 to-orange-500/20 border-2 border-amber-400 rounded-2xl p-6 mb-12">
          <div className="flex items-start gap-4">
            <span className="text-4xl">🥇</span>
            <div className="flex-1">
              <p className="text-amber-400 font-bold text-sm uppercase mb-1">{isEs ? 'Mejor Bono Actual' : 'Current Best Bonus'}</p>
              <h2 className="text-white font-black text-2xl mb-2">BetFury — 590% {isEs ? 'Bono de Bienvenida' : 'Welcome Bonus'}</h2>
              <ul className="text-slate-300 text-sm space-y-1 mb-4">
                <li>✅ {isEs ? 'Hasta 590% en el primer depósito' : 'Up to 590% on first deposit'}</li>
                <li>✅ {isEs ? 'Giros gratis incluidos' : 'Free spins included'}</li>
                <li>✅ {isEs ? 'Válido con código LUCKYSIRKO007' : 'Valid with code LUCKYSIRKO007'}</li>
                <li>✅ {isEs ? 'Aplicable con múltiples criptomonedas' : 'Applicable with multiple cryptocurrencies'}</li>
              </ul>
              <a href={AFFILIATE} target="_blank" rel="noopener noreferrer sponsored"
                className="inline-block bg-amber-500 hover:bg-amber-400 text-white font-black px-8 py-3 rounded-xl transition-colors">
                {isEs ? 'Reclamar Bono →' : 'Claim Bonus →'}
              </a>
            </div>
          </div>
        </div>

        {/* Tipos de bonos */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">{isEs ? 'Tipos de bonos en casinos cripto' : 'Types of bonuses at crypto casinos'}</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {bonusTypes.map((b, i) => (
              <div key={i} className="bg-slate-800 border border-slate-700 rounded-xl p-4 flex gap-3">
                <span className="text-2xl">{b.emoji}</span>
                <div>
                  <p className="text-white font-bold text-sm">{b.title}</p>
                  <p className="text-slate-400 text-xs mt-1">{b.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Contenido SEO */}
        <section className="mb-12 prose prose-invert prose-amber max-w-none
          prose-headings:text-white prose-p:text-slate-300">
          <h2>{isEs ? '¿Qué son los requisitos de apuesta (wagering)?' : 'What are wagering requirements?'}</h2>
          <p>
            {isEs
              ? 'Los requisitos de apuesta (rollover o wagering) indican cuántas veces debes apostar el importe del bono antes de poder retirarlo. Por ejemplo, si recibes 100€ de bono con un requisito 20x, necesitas apostar 2.000€ en total para liberar ese bono. En casinos cripto, estos requisitos suelen ser más bajos y transparentes que en casinos tradicionales.'
              : 'Wagering requirements (rollover) indicate how many times you must wager the bonus amount before you can withdraw it. For example, if you receive a $100 bonus with a 20x requirement, you need to wager $2,000 in total to release that bonus. At crypto casinos, these requirements tend to be lower and more transparent than at traditional casinos.'}
          </p>
          <h2>{isEs ? 'Consejos para aprovechar los bonos al máximo' : 'Tips to maximize bonus value'}</h2>
          <p>
            {isEs
              ? 'Para aprovechar al máximo un bono de casino cripto: lee siempre los términos y condiciones completos, presta atención al porcentaje de contribución de cada juego (los slots suelen contribuir 100%, las mesas menos), establece un presupuesto claro y utiliza el bono en juegos con baja ventaja de la casa. En BetFury, el staking de BFG te permite generar valor adicional incluso durante el proceso de cumplir el rollover.'
              : 'To make the most of a crypto casino bonus: always read the full terms and conditions, pay attention to each game\'s contribution percentage (slots usually contribute 100%, tables less), set a clear budget and use the bonus on games with low house edge. At BetFury, BFG staking lets you generate additional value even during the rollover fulfillment process.'}
          </p>
        </section>

        {/* Artículos relacionados */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">{isEs ? 'Artículos sobre bonos' : 'Bonus articles'}</h2>
          <div className="space-y-3">
            {[
              { slug: 'betfury-bono-bienvenida-590', title: isEs ? 'BetFury Bono de Bienvenida 590%: Cómo Reclamarlo' : 'BetFury 590% Welcome Bonus: How to Claim It' },
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
            {isEs ? '🎁 Reclama el mejor bono ahora' : '🎁 Claim the best bonus now'}
          </h2>
          <p className="text-slate-400 mb-6">
            {isEs ? 'BetFury · 590% bono bienvenida · Código exclusivo LUCKYSIRKO007' : 'BetFury · 590% welcome bonus · Exclusive code LUCKYSIRKO007'}
          </p>
          <a href={AFFILIATE} target="_blank" rel="noopener noreferrer sponsored"
            className="inline-block bg-amber-500 hover:bg-amber-400 text-white font-black text-lg px-10 py-4 rounded-xl transition-colors">
            {isEs ? '🎁 Activar Bono LUCKYSIRKO007' : '🎁 Activate Bonus LUCKYSIRKO007'}
          </a>
        </div>
      </main>
    </>
  );
}

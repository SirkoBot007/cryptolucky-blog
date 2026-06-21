import { unstable_setRequestLocale } from 'next-intl/server';
import Link from 'next/link';
import type { Metadata } from 'next';
import { AUTHOR, SITE_URL, fmt, personSchema } from '@/lib/author';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  return {
    title: locale === 'es' ? 'Sobre Nosotros: Quién Está Detrás de CryptoLucky' : 'About Us: Who Is Behind CryptoLucky',
    description: locale === 'es'
      ? 'Conoce a Sirko007, el autor de CryptoLucky: experiencia real y verificable en BetFury (cuenta de más de 5 años, Rank 7). Metodología editorial transparente y disclosure de afiliado.'
      : 'Meet Sirko007, the author behind CryptoLucky: real, verifiable BetFury experience (5+ year account, Rank 7). Transparent editorial methodology and affiliate disclosure.',
    alternates: {
      canonical: `${SITE_URL}/${locale}/sobre-nosotros`,
      languages: { es: `${SITE_URL}/es/sobre-nosotros`, en: `${SITE_URL}/en/sobre-nosotros` },
    },
  };
}

export default function AboutPage({ params: { locale } }: { params: { locale: string } }) {
  unstable_setRequestLocale(locale);
  const isEs = locale === 'es';
  const b = AUTHOR.betfury;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: isEs ? 'Sobre Nosotros — CryptoLucky' : 'About Us — CryptoLucky',
    url: `${SITE_URL}/${locale}/sobre-nosotros`,
    mainEntity: personSchema(locale),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <main className="max-w-4xl mx-auto px-4 py-12">
        <nav className="text-slate-500 text-sm mb-6 flex items-center gap-1">
          <Link href={`/${locale}`} className="hover:text-amber-400">{isEs ? 'Inicio' : 'Home'}</Link>
          <span>/</span>
          <span className="text-slate-400">{isEs ? 'Sobre Nosotros' : 'About Us'}</span>
        </nav>

        <h1 className="text-3xl md:text-4xl font-black text-white mb-6">
          {isEs ? 'Sobre Nosotros' : 'About Us'}
        </h1>

        <div className="prose prose-invert max-w-none prose-p:text-slate-300 prose-headings:text-white prose-a:text-amber-400">
          <p>
            {isEs
              ? 'CryptoLucky nació con un objetivo claro: ser la referencia en español sobre BetFury y los casinos de criptomonedas para LATAM. Analizamos cada bono, juego y mecánica de staking con experiencia real antes de escribir una sola línea.'
              : 'CryptoLucky was born with a clear goal: to be the Spanish-language reference on BetFury and crypto casinos for LATAM. We test every bonus, game and staking mechanic with real experience before writing a single line.'}
          </p>

          <h2>{isEs ? 'Quién publica' : 'Who publishes'}</h2>
          <div className="not-prose bg-slate-800 border border-slate-700 rounded-xl p-6 my-6">
            <p className="text-white font-bold text-lg mb-1">✍️ {AUTHOR.alias}</p>
            <p className="text-amber-400 text-sm mb-3">{isEs ? AUTHOR.jobTitleEs : AUTHOR.jobTitleEn}</p>
            <p className="text-slate-300 text-sm leading-relaxed mb-4">
              {isEs
                ? `Los contenidos de experiencia práctica de CryptoLucky están firmados por ${AUTHOR.alias}, alias público del autor. Su perfil público en BetFury respalda esa experiencia de primera mano.`
                : `CryptoLucky hands-on content is signed by ${AUTHOR.alias}, the author public alias. The public BetFury profile backs up that first-hand experience.`}
            </p>
            <ul className="text-slate-300 text-sm space-y-1.5 list-none m-0 p-0">
              <li>📅 {isEs ? 'Antigüedad de cuenta en BetFury' : 'BetFury account age'}: <strong>{isEs ? b.antiguedadEs : b.antiguedadEn}</strong></li>
              <li>🏆 Rank BetFury: <strong>{b.rank}</strong></li>
              <li>🎲 {isEs ? 'Total apostado histórico' : 'Total wagered'}: <strong>{fmt(b.totalApostadoUsd)} USD</strong></li>
              <li>🎯 {isEs ? 'Apuestas totales' : 'Total bets'}: <strong>{fmt(b.apuestasTotales)}</strong></li>
              <li>🕹️ {isEs ? 'Juegos más jugados' : 'Most played games'}: <strong>{b.juegosTop.join(', ')}</strong></li>
              <li>💬 {isEs ? 'Actividad en comunidad' : 'Community activity'}: <strong>{fmt(b.mensajesChat)} {isEs ? 'mensajes' : 'messages'} · {fmt(b.likes)} likes</strong></li>
            </ul>
            <p className="text-slate-500 text-xs mt-4 mb-0">
              {isEs
                ? 'Estos datos provienen del perfil público de BetFury y son verificables. No se usan para prometer resultados.'
                : 'These figures come from the public BetFury profile and are verifiable. They are not used to promise results.'}
            </p>
            <Link href={`/${locale}/autor/sirko007`} className="inline-block mt-4 text-amber-400 text-sm font-bold no-underline hover:text-amber-300">
              {isEs ? 'Ver perfil completo del autor →' : 'See full author profile →'}
            </Link>
          </div>

          <h2>{isEs ? 'Nuestra metodología' : 'Our methodology'}</h2>
          <p>
            {isEs
              ? 'Nos basamos en experiencia real con BetFury y en la observación directa de la plataforma. No inventamos resultados, ganancias ni capturas. Diferenciamos siempre entre experiencia personal, información pública verificable y contenido promocional. Si un dato no está confirmado, no lo presentamos como hecho.'
              : 'We rely on real BetFury experience and direct observation of the platform. We do not invent results, winnings or screenshots. We always separate personal experience, verifiable public information and promotional content. If a fact is not confirmed, we do not present it as fact.'}
          </p>

          <h2>{isEs ? 'Transparencia de afiliación' : 'Affiliate transparency'}</h2>
          <p>
            {isEs
              ? `Este sitio contiene enlaces de afiliado de BetFury (código ${AUTHOR.affiliateCode}). Si te registras a través de ellos, recibimos una comisión sin coste adicional para ti. Esto no condiciona nuestras valoraciones: nuestra credibilidad vale más que cualquier comisión.`
              : `This site contains BetFury affiliate links (code ${AUTHOR.affiliateCode}). If you sign up through them, we earn a commission at no extra cost to you. This never conditions our reviews: our credibility is worth more than any commission.`}
          </p>

          <h2>{isEs ? 'Juego responsable' : 'Responsible gambling'}</h2>
          <p>
            {isEs
              ? 'El juego debe ser entretenimiento, nunca una fuente de ingresos. Juega solo con dinero que puedas permitirte perder. Prohibido a menores de 18 años. '
              : 'Gambling should be entertainment, never a source of income. Only play with money you can afford to lose. 18+ only. '}
            <Link href={`/${locale}/juego-responsable`}>{isEs ? 'Lee nuestra guía de juego responsable.' : 'Read our responsible gambling guide.'}</Link>
          </p>

          <h2>{isEs ? 'Contacto' : 'Contact'}</h2>
          <p>
            {isEs ? 'Escríbenos a ' : 'Write to us at '}
            <a href={`mailto:${AUTHOR.email}`}>{AUTHOR.email}</a>.
          </p>
        </div>
      </main>
    </>
  );
}

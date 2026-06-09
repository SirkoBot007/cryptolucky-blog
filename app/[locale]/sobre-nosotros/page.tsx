import { unstable_setRequestLocale } from 'next-intl/server';
import Link from 'next/link';
import type { Metadata } from 'next';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://cryptolucky-blog.vercel.app';
  return {
    title: locale === 'es' ? 'Sobre Nosotros: Quién Está Detrás de CryptoLucky' : 'About Us: Who Is Behind CryptoLucky',
    description: locale === 'es'
      ? 'Conoce al equipo de CryptoLucky: analistas de casinos cripto con experiencia real en BetFury, staking BFG y apuestas con criptomonedas. Metodología editorial transparente.'
      : 'Meet the CryptoLucky team: crypto casino analysts with hands-on BetFury, BFG staking and crypto betting experience. Transparent editorial methodology.',
    alternates: {
      canonical: `${siteUrl}/${locale}/sobre-nosotros`,
      languages: { es: `${siteUrl}/es/sobre-nosotros`, en: `${siteUrl}/en/sobre-nosotros` },
    },
  };
}

export default function AboutPage({ params: { locale } }: { params: { locale: string } }) {
  unstable_setRequestLocale(locale);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://cryptolucky-blog.vercel.app';
  const isEs = locale === 'es';

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: isEs ? 'Sobre Nosotros — CryptoLucky' : 'About Us — CryptoLucky',
    url: `${siteUrl}/${locale}/sobre-nosotros`,
    mainEntity: {
      '@type': 'Person',
      name: 'Carlos Mendoza',
      jobTitle: isEs ? 'Analista de casinos cripto' : 'Crypto casino analyst',
      description: isEs
        ? 'Analista de casinos cripto y blockchain con 5 años de experiencia en iGaming. Especializado en BetFury, staking BFG y apuestas con criptomonedas.'
        : 'Crypto casino and blockchain analyst with 5 years of iGaming experience. Specialized in BetFury, BFG staking and cryptocurrency betting.',
      url: `${siteUrl}/${locale}/sobre-nosotros`,
      worksFor: { '@type': 'Organization', name: 'CryptoLucky', url: siteUrl },
    },
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
              ? 'CryptoLucky nació con un objetivo claro: ser la referencia en español sobre BetFury y los casinos de criptomonedas. Analizamos cada bono, juego y mecánica de staking con cuentas reales antes de escribir una sola línea.'
              : 'CryptoLucky was born with a clear goal: to be the reference on BetFury and crypto casinos. We test every bonus, game and staking mechanic with real accounts before writing a single line.'}
          </p>

          <h2>{isEs ? 'El autor' : 'The author'}</h2>
          <div className="not-prose bg-slate-800 border border-slate-700 rounded-xl p-6 my-6">
            <p className="text-white font-bold text-lg mb-1">✍️ Carlos Mendoza</p>
            <p className="text-amber-400 text-sm mb-3">{isEs ? 'Analista de casinos cripto y blockchain' : 'Crypto casino & blockchain analyst'}</p>
            <p className="text-slate-300 text-sm leading-relaxed">
              {isEs
                ? '5 años de experiencia en la industria iGaming, con foco en plataformas cripto desde 2021. Usuario activo de BetFury: staking BFG, juegos Originals y sportsbook. Cada guía publicada se basa en pruebas con fondos propios.'
                : '5 years in the iGaming industry, focused on crypto platforms since 2021. Active BetFury user: BFG staking, Originals games and sportsbook. Every published guide is based on tests with own funds.'}
            </p>
          </div>

          <h2>{isEs ? 'Nuestra metodología' : 'Our methodology'}</h2>
          <p>
            {isEs
              ? 'Probamos cada función con depósitos reales, verificamos tiempos de retiro, documentamos condiciones de bonos directamente desde los términos oficiales y actualizamos los artículos cuando la plataforma cambia. Si algo no nos convence, lo decimos.'
              : 'We test every feature with real deposits, verify withdrawal times, document bonus terms directly from official T&Cs and update articles whenever the platform changes. If something falls short, we say so.'}
          </p>

          <h2>{isEs ? 'Transparencia de afiliación' : 'Affiliate transparency'}</h2>
          <p>
            {isEs
              ? 'Este sitio contiene enlaces de afiliado de BetFury. Si te registras a través de ellos, recibimos una comisión sin coste adicional para ti. Esto no condiciona nuestras valoraciones: nuestra credibilidad vale más que cualquier comisión.'
              : 'This site contains BetFury affiliate links. If you sign up through them, we earn a commission at no extra cost to you. This never conditions our reviews: our credibility is worth more than any commission.'}
          </p>

          <h2>{isEs ? 'Juego responsable' : 'Responsible gambling'}</h2>
          <p>
            {isEs
              ? 'El juego debe ser entretenimiento, nunca una fuente de ingresos ni una vía de escape. Juega solo con dinero que puedas permitirte perder, establece límites y respétalos. Prohibido a menores de 18 años. BetFury no está disponible en todos los países: comprueba la legalidad en tu jurisdicción antes de registrarte.'
              : 'Gambling should be entertainment, never a source of income or an escape. Only play with money you can afford to lose, set limits and stick to them. 18+ only. BetFury is not available in all countries: check legality in your jurisdiction before signing up.'}
          </p>
        </div>
      </main>
    </>
  );
}

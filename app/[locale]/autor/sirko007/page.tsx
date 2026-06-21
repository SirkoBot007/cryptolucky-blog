import { unstable_setRequestLocale } from 'next-intl/server';
import Link from 'next/link';
import type { Metadata } from 'next';
import { AUTHOR, SITE_URL, fmt, personSchema } from '@/lib/author';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const isEs = locale === 'es';
  return {
    title: isEs ? 'Sirko007 — Autor experto en BetFury y casino cripto' : 'Sirko007 — BetFury and crypto casino author',
    description: isEs
      ? 'Sirko007, autor de CryptoLucky. Experiencia real y verificable en BetFury: cuenta de más de 5 años, Rank 7, millones de apuestas. Reseñas basadas en uso propio.'
      : 'Sirko007, CryptoLucky author. Real, verifiable BetFury experience: 5+ year account, Rank 7, millions of bets. Reviews based on first-hand use.',
    alternates: {
      canonical: `${SITE_URL}/${locale}/autor/sirko007`,
      languages: { es: `${SITE_URL}/es/autor/sirko007`, en: `${SITE_URL}/en/autor/sirko007` },
    },
  };
}

export default function AuthorPage({ params: { locale } }: { params: { locale: string } }) {
  unstable_setRequestLocale(locale);
  const isEs = locale === 'es';
  const b = AUTHOR.betfury;

  const stats = [
    { label: isEs ? 'Antigüedad en BetFury' : 'BetFury account age', value: isEs ? b.antiguedadEs : b.antiguedadEn },
    { label: 'Rank BetFury', value: String(b.rank) },
    { label: isEs ? 'Total apostado' : 'Total wagered', value: `${fmt(b.totalApostadoUsd)} USD` },
    { label: isEs ? 'Apuestas totales' : 'Total bets', value: fmt(b.apuestasTotales) },
    { label: isEs ? 'Mensajes en comunidad' : 'Community messages', value: fmt(b.mensajesChat) },
    { label: 'Likes', value: fmt(b.likes) },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema(locale)) }} />

      <main className="max-w-4xl mx-auto px-4 py-12">
        <nav className="text-slate-500 text-sm mb-6 flex items-center gap-1">
          <Link href={`/${locale}`} className="hover:text-amber-400">{isEs ? 'Inicio' : 'Home'}</Link>
          <span>/</span>
          <span className="text-slate-400">{isEs ? 'Autor' : 'Author'}</span>
        </nav>

        <header className="flex flex-col sm:flex-row items-start gap-6 mb-10">
          <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 border border-amber-500/30 flex items-center justify-center text-5xl shrink-0">
            🍀
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-black text-white mb-1">{AUTHOR.alias}</h1>
            <p className="text-amber-400 font-medium mb-3">{isEs ? AUTHOR.jobTitleEs : AUTHOR.jobTitleEn}</p>
            <p className="text-slate-300 leading-relaxed">
              {isEs
                ? `${AUTHOR.alias} firma los contenidos de experiencia práctica de CryptoLucky sobre BetFury y juego con criptomonedas. Su perfil público en BetFury muestra una cuenta de ${b.antiguedadEs}, Rank ${b.rank} y una actividad real prolongada en la plataforma.`
                : `${AUTHOR.alias} signs CryptoLucky hands-on content about BetFury and crypto gambling. The public BetFury profile shows a ${b.antiguedadEn} account, Rank ${b.rank} and long-term real activity on the platform.`}
            </p>
          </div>
        </header>

        <section className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-10">
          {stats.map((s) => (
            <div key={s.label} className="bg-slate-800/60 border border-slate-700 rounded-xl p-4">
              <p className="text-2xl font-black text-amber-400">{s.value}</p>
              <p className="text-slate-400 text-xs mt-1">{s.label}</p>
            </div>
          ))}
        </section>

        <div className="prose prose-invert max-w-none prose-p:text-slate-300 prose-headings:text-white prose-a:text-amber-400">
          <h2>{isEs ? 'Experiencia de primera mano' : 'First-hand experience'}</h2>
          <p>
            {isEs
              ? `Esa combinación de uso prolongado de la plataforma y participación pública (${fmt(b.mensajesChat)} mensajes y ${fmt(b.likes)} likes en la comunidad) es la base de las reseñas de CryptoLucky. Los juegos más jugados de ${AUTHOR.alias} son ${b.juegosTop.join(', ')}, lo que permite analizar funciones, dinámicas y promociones desde el uso real, no desde la teoría.`
              : `That combination of long-term platform use and public participation (${fmt(b.mensajesChat)} messages and ${fmt(b.likes)} community likes) is the basis of CryptoLucky reviews. ${AUTHOR.alias}'s most played games are ${b.juegosTop.join(', ')}, which allows analysing features, mechanics and promotions from real use, not theory.`}
          </p>
          <p>
            {isEs
              ? `En su perfil público de X existe además una victoria documentada de ${b.victoriaDocumentada} compartida hace aproximadamente dos años. En CryptoLucky no usamos ese dato para prometer resultados ni para presentar el juego como una forma de ingreso: se muestra únicamente como parte de un historial público verificable.`
              : `On the public X profile there is also a documented ${b.victoriaDocumentada} win shared about two years ago. At CryptoLucky we do not use this to promise results or present gambling as income: it is shown only as part of a verifiable public record.`}
          </p>

          <h2>{isEs ? 'Transparencia' : 'Transparency'}</h2>
          <p>
            {isEs
              ? `${AUTHOR.alias} es afiliado oficial de BetFury (código ${AUTHOR.affiliateCode}). Por eso CryptoLucky muestra disclosures claros donde existe relación comercial. `
              : `${AUTHOR.alias} is an official BetFury affiliate (code ${AUTHOR.affiliateCode}). That is why CryptoLucky shows clear disclosures wherever a commercial relationship exists. `}
            <Link href={`/${locale}/sobre-nosotros`}>{isEs ? 'Conoce nuestra metodología editorial.' : 'See our editorial methodology.'}</Link>
          </p>

          <h2>{isEs ? 'Contacto' : 'Contact'}</h2>
          <p>
            {isEs ? 'Para consultas o correcciones, escribe a ' : 'For questions or corrections, write to '}
            <a href={`mailto:${AUTHOR.email}`}>{AUTHOR.email}</a>.
          </p>
        </div>
      </main>
    </>
  );
}

import { unstable_setRequestLocale } from 'next-intl/server';
import Link from 'next/link';
import type { Metadata } from 'next';
import { SITE_URL } from '@/lib/author';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const isEs = locale === 'es';
  return {
    title: isEs ? 'Juego Responsable — CryptoLucky' : 'Responsible Gambling — CryptoLucky',
    description: isEs
      ? 'El juego es entretenimiento, no una fuente de ingresos. Reglas de juego responsable, señales de alerta y recursos de ayuda. Solo +18.'
      : 'Gambling is entertainment, not a source of income. Responsible gambling rules, warning signs and help resources. 18+ only.',
    alternates: {
      canonical: `${SITE_URL}/${locale}/juego-responsable`,
      languages: { es: `${SITE_URL}/es/juego-responsable`, en: `${SITE_URL}/en/juego-responsable` },
    },
  };
}

const HELP = [
  { name: 'Gamblers Anonymous', url: 'https://www.gamblersanonymous.org/', es: 'Ayuda entre pares, directorio internacional', en: 'Peer support, international directory' },
  { name: 'Gam-Anon', url: 'https://gam-anon.org/', es: 'Apoyo para familiares y personas cercanas', en: 'Support for family and close ones' },
  { name: 'International Center for Responsible Gaming', url: 'https://www.icrg.org/', es: 'Información educativa sobre juego', en: 'Educational information on gambling' },
  { name: 'Jugadores Anónimos', url: 'https://www.jugadoresanonimos.org/', es: 'Recurso en español', en: 'Spanish-language resource' },
];

export default function ResponsibleGamblingPage({ params: { locale } }: { params: { locale: string } }) {
  unstable_setRequestLocale(locale);
  const isEs = locale === 'es';

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: isEs ? 'Juego Responsable — CryptoLucky' : 'Responsible Gambling — CryptoLucky',
    url: `${SITE_URL}/${locale}/juego-responsable`,
    inLanguage: locale,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <main className="max-w-4xl mx-auto px-4 py-12">
        <nav className="text-slate-500 text-sm mb-6 flex items-center gap-1">
          <Link href={`/${locale}`} className="hover:text-amber-400">{isEs ? 'Inicio' : 'Home'}</Link>
          <span>/</span>
          <span className="text-slate-400">{isEs ? 'Juego Responsable' : 'Responsible Gambling'}</span>
        </nav>

        <h1 className="text-3xl md:text-4xl font-black text-white mb-6">
          {isEs ? 'Juego Responsable' : 'Responsible Gambling'}
        </h1>

        <div className="not-prose bg-amber-500/10 border border-amber-500/30 rounded-xl p-5 mb-8">
          <p className="text-amber-300 font-bold text-sm m-0">
            {isEs
              ? '+18. El juego con dinero real y con criptomonedas implica riesgo de pérdida. No prometemos ganancias.'
              : '18+. Real-money and crypto gambling involve risk of loss. We do not promise winnings.'}
          </p>
        </div>

        <div className="prose prose-invert max-w-none prose-p:text-slate-300 prose-headings:text-white prose-a:text-amber-400 prose-li:text-slate-300">
          <p>
            {isEs
              ? 'En CryptoLucky tratamos el juego como una actividad de entretenimiento, no como una forma de ingreso. Si decides participar, hazlo solo si eres mayor de edad y entiendes que siempre existe riesgo de pérdida.'
              : 'At CryptoLucky we treat gambling as entertainment, not as a way to earn money. If you choose to play, do it only if you are of legal age and understand there is always a risk of loss.'}
          </p>

          <h2>{isEs ? 'Reglas básicas' : 'Basic rules'}</h2>
          <ul>
            <li>{isEs ? 'Juega solo con un presupuesto que puedas perder.' : 'Only play with a budget you can afford to lose.'}</li>
            <li>{isEs ? 'No intentes recuperar pérdidas con apuestas más altas.' : 'Do not chase losses with bigger bets.'}</li>
            <li>{isEs ? 'Evita jugar cansado, con ansiedad o tras consumir alcohol.' : 'Avoid playing when tired, anxious or after drinking alcohol.'}</li>
            <li>{isEs ? 'Haz pausas y establece límites de tiempo y dinero.' : 'Take breaks and set time and money limits.'}</li>
            <li>{isEs ? 'Si deja de ser diversión y afecta tu vida, detente.' : 'If it stops being fun and affects your life, stop.'}</li>
          </ul>

          <h2>{isEs ? 'Señales de alerta' : 'Warning signs'}</h2>
          <ul>
            <li>{isEs ? 'Apostar más de lo planeado de forma repetida.' : 'Repeatedly betting more than planned.'}</li>
            <li>{isEs ? 'Ocultar el tiempo o el dinero dedicado al juego.' : 'Hiding time or money spent gambling.'}</li>
            <li>{isEs ? 'Pedir dinero prestado para seguir jugando.' : 'Borrowing money to keep playing.'}</li>
            <li>{isEs ? 'Sentir culpa o ansiedad relacionadas con el juego.' : 'Feeling guilt or anxiety related to gambling.'}</li>
          </ul>

          <h2>{isEs ? 'Juego con criptomonedas' : 'Crypto gambling'}</h2>
          <p>
            {isEs
              ? 'El juego con criptomonedas añade riesgos extra: alta volatilidad del valor de los activos, menor claridad regulatoria según el país y más dificultad para percibir la magnitud real de las pérdidas. Extrema el control del presupuesto y no uses fondos destinados a gastos esenciales.'
              : 'Crypto gambling adds extra risks: high asset volatility, less regulatory clarity depending on the country, and more difficulty perceiving the real size of losses. Be extra careful with your budget and never use funds meant for essential expenses.'}
          </p>

          <h2>{isEs ? 'Recursos de ayuda' : 'Help resources'}</h2>
          <ul>
            {HELP.map((h) => (
              <li key={h.url}>
                <a href={h.url} target="_blank" rel="noopener noreferrer">{h.name}</a> — {isEs ? h.es : h.en}
              </li>
            ))}
          </ul>
          <p>
            {isEs
              ? 'La disponibilidad de líneas nacionales puede variar según el país. Si estás en Latinoamérica, busca apoyo local con términos como "ayuda adicción al juego + tu país" o consulta los servicios públicos de salud de tu jurisdicción.'
              : 'Availability of national helplines varies by country. If you are in Latin America, look for local support using terms like "gambling addiction help + your country" or check your public health services.'}
          </p>

          <h2>{isEs ? 'Menores de edad' : 'Minors'}</h2>
          <p>
            {isEs
              ? 'Este sitio no está dirigido a menores de 18 años. Si compartes dispositivo con menores, usa controles parentales y protege tus cuentas.'
              : 'This site is not intended for people under 18. If you share a device with minors, use parental controls and protect your accounts.'}
          </p>
        </div>
      </main>
    </>
  );
}

import { unstable_setRequestLocale } from 'next-intl/server';
import Link from 'next/link';
import type { Metadata } from 'next';

const AFFILIATE = 'https://betfury.io/?r=LUCKYSIRKO007';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://cryptolucky-blog.vercel.app';
  return {
    title: locale === 'es' ? 'Casino Sin KYC 2026: Los Mejores Casinos Cripto Anónimos' : 'Casino Without KYC 2026: Best Anonymous Crypto Casinos',
    description: locale === 'es'
      ? 'Los mejores casinos cripto sin verificación KYC en 2026. Juega de forma anónima con Bitcoin, sin documentos ni esperas. BetFury es la mejor opción.'
      : 'The best crypto casinos without KYC verification in 2026. Play anonymously with Bitcoin, no documents or waiting. BetFury is the best option.',
    keywords: 'casino sin kyc, casino bitcoin anonimo, casino sin verificacion, casino cripto sin documentos',
    alternates: {
      canonical: `${siteUrl}/${locale}/casino-sin-kyc`,
      languages: { es: `${siteUrl}/es/casino-sin-kyc`, en: `${siteUrl}/en/casino-sin-kyc` },
    },
  };
}

export default function CasinoSinKYCPillarPage({ params: { locale } }: { params: { locale: string } }) {
  unstable_setRequestLocale(locale);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://cryptolucky-blog.vercel.app';
  const isEs = locale === 'es';

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: isEs ? 'Casino Sin KYC 2026: Los Mejores Casinos Cripto Anónimos' : 'Casino Without KYC 2026: Best Anonymous Crypto Casinos',
    description: isEs ? 'Guía de los mejores casinos cripto sin verificación KYC en 2026.' : 'Guide to the best crypto casinos without KYC verification in 2026.',
    datePublished: '2026-01-01',
    dateModified: '2026-06-09',
    author: { '@type': 'Person', '@id': `${siteUrl}/autor/sirko007#person`, name: 'Sirko007', url: `${siteUrl}/${locale}/autor/sirko007` },
    publisher: { '@type': 'Organization', name: 'CryptoLucky', url: siteUrl },
    url: `${siteUrl}/${locale}/casino-sin-kyc`,
  };

  const ventajas = isEs
    ? [
        { emoji: '🔒', title: 'Privacidad total', desc: 'Sin subir documentos de identidad ni justificantes de domicilio' },
        { emoji: '⚡', title: 'Acceso inmediato', desc: 'Juega en minutos, sin procesos de verificación que tardan días' },
        { emoji: '🌍', title: 'Sin restricciones geográficas', desc: 'Accesible desde cualquier país sin bloqueos por residencia' },
        { emoji: '💸', title: 'Retiros más rápidos', desc: 'Sin revisiones KYC que retrasen el cobro de tus ganancias' },
      ]
    : [
        { emoji: '🔒', title: 'Total privacy', desc: 'No need to upload ID documents or proof of address' },
        { emoji: '⚡', title: 'Immediate access', desc: 'Play in minutes, no verification processes that take days' },
        { emoji: '🌍', title: 'No geographic restrictions', desc: 'Accessible from any country without residence blocks' },
        { emoji: '💸', title: 'Faster withdrawals', desc: 'No KYC reviews delaying your winnings collection' },
      ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <main className="max-w-4xl mx-auto px-4 py-12">
        <nav className="text-slate-500 text-sm mb-6 flex items-center gap-1">
          <Link href={`/${locale}`} className="hover:text-amber-400">{isEs ? 'Inicio' : 'Home'}</Link>
          <span>/</span>
          <span className="text-slate-400">{isEs ? 'Casino Sin KYC' : 'Casino Without KYC'}</span>
        </nav>

        <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
          {isEs ? 'Casino Sin KYC 2026' : 'Casino Without KYC 2026'}
        </h1>
        <p className="text-slate-400 text-lg mb-10">
          {isEs
            ? 'Juega con total privacidad en los mejores casinos cripto sin verificación KYC. Sin pasaportes, sin selfies, sin esperas. Solo Bitcoin y diversión.'
            : 'Play with complete privacy at the best crypto casinos without KYC verification. No passports, no selfies, no waiting. Just Bitcoin and fun.'}
        </p>

        {/* CTA */}
        <div className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl p-6 mb-12 text-center">
          <p className="text-white font-bold text-xl mb-2">
            {isEs ? '🔒 Juega Anónimamente en BetFury' : '🔒 Play Anonymously at BetFury'}
          </p>
          <p className="text-white/80 text-sm mb-4">
            {isEs ? 'Sin KYC obligatorio · Retiros instantáneos · Código LUCKYSIRKO007' : 'No mandatory KYC · Instant withdrawals · Code LUCKYSIRKO007'}
          </p>
          <a href={AFFILIATE} target="_blank" rel="noopener noreferrer sponsored"
            className="inline-block bg-white text-amber-600 font-black text-lg px-8 py-3 rounded-xl hover:bg-amber-50 transition-colors">
            {isEs ? 'Jugar Ahora →' : 'Play Now →'}
          </a>
        </div>

        {/* Ventajas */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">
            {isEs ? 'Ventajas de jugar sin KYC' : 'Advantages of playing without KYC'}
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {ventajas.map((v, i) => (
              <div key={i} className="bg-slate-800 border border-slate-700 rounded-xl p-4 flex gap-3">
                <span className="text-2xl">{v.emoji}</span>
                <div>
                  <p className="text-white font-bold text-sm">{v.title}</p>
                  <p className="text-slate-400 text-xs mt-1">{v.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Contenido SEO */}
        <section className="mb-12 prose prose-invert prose-amber max-w-none
          prose-headings:text-white prose-p:text-slate-300">
          <h2>{isEs ? '¿Qué es el KYC en casinos?' : 'What is KYC in casinos?'}</h2>
          <p>
            {isEs
              ? 'KYC (Know Your Customer) es el proceso de verificación de identidad que exigen algunos casinos antes de permitir retiros. Típicamente implica enviar una copia del DNI o pasaporte, un justificante de domicilio (factura de servicios) y en algunos casos una selfie sosteniendo el documento. Este proceso puede tardar de 24 horas a varios días hábiles y supone una barrera importante para muchos jugadores que valoran su privacidad.'
              : 'KYC (Know Your Customer) is the identity verification process some casinos require before allowing withdrawals. Typically involves sending a copy of your ID or passport, proof of address (utility bill) and in some cases a selfie holding the document. This process can take from 24 hours to several business days and represents a significant barrier for many players who value their privacy.'}
          </p>
          <h2>{isEs ? '¿BetFury requiere KYC?' : 'Does BetFury require KYC?'}</h2>
          <p>
            {isEs
              ? 'BetFury no requiere verificación KYC para la mayoría de los usuarios estándar. Puedes registrarte, depositar, jugar y retirar criptomonedas sin necesidad de enviar documentación de identidad. Solo en casos excepcionales (cuentas con volúmenes muy altos o situaciones de seguridad específicas) puede solicitarse verificación adicional, lo que es completamente razonable para cualquier plataforma financiera responsable.'
              : 'BetFury does not require KYC verification for most standard users. You can register, deposit, play and withdraw cryptocurrencies without needing to submit identity documentation. Only in exceptional cases (accounts with very high volumes or specific security situations) may additional verification be requested, which is completely reasonable for any responsible financial platform.'}
          </p>
          <h2>{isEs ? 'Cómo mantener tu privacidad en casinos cripto' : 'How to maintain your privacy at crypto casinos'}</h2>
          <p>
            {isEs
              ? 'Para maximizar tu privacidad al jugar en casinos cripto: usa una wallet no-custodial dedicada al casino (no tu wallet principal), considera usar monedas con privacidad mejorada como Monero cuando esté disponible, no reutilices direcciones de wallet entre plataformas, y verifica siempre la política de privacidad del casino antes de registrarte.'
              : 'To maximize your privacy when playing at crypto casinos: use a dedicated non-custodial wallet for the casino (not your main wallet), consider using privacy-enhanced coins like Monero when available, don\'t reuse wallet addresses between platforms, and always check the casino\'s privacy policy before registering.'}
          </p>
        </section>

        {/* Artículos relacionados */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">{isEs ? 'Artículos sobre privacidad en casinos cripto' : 'Privacy in crypto casinos articles'}</h2>
          <div className="space-y-3">
            {[
              { slug: 'casino-bitcoin-sin-kyc-2026', title: isEs ? 'Casinos Bitcoin Sin KYC 2026: Los Mejores' : 'Bitcoin Casinos Without KYC 2026: The Best' },
              { slug: 'betfury-seguro-es-legitimo-licencia', title: isEs ? 'BetFury: ¿Es Seguro y Legítimo? Licencia y Garantías' : 'Is BetFury Safe and Legitimate? License & Guarantees' },
              { slug: 'mejores-casinos-criptomonedas-2026', title: isEs ? 'Los 10 Mejores Casinos Cripto de 2026' : 'Top 10 Crypto Casinos of 2026' },
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
            {isEs ? '🔒 El casino cripto más privado: BetFury' : '🔒 The most private crypto casino: BetFury'}
          </h2>
          <p className="text-slate-400 mb-6">
            {isEs ? 'Sin KYC · Retiros instantáneos · +4.000 juegos · Staking BFG' : 'No KYC · Instant withdrawals · +4,000 games · BFG staking'}
          </p>
          <a href={AFFILIATE} target="_blank" rel="noopener noreferrer sponsored"
            className="inline-block bg-amber-500 hover:bg-amber-400 text-white font-black text-lg px-10 py-4 rounded-xl transition-colors">
            {isEs ? '🎰 Jugar en BetFury → LUCKYSIRKO007' : '🎰 Play at BetFury → LUCKYSIRKO007'}
          </a>
        </div>
      </main>
    </>
  );
}

import { unstable_setRequestLocale } from 'next-intl/server';
import Link from 'next/link';
import type { Metadata } from 'next';
import { SITE_URL } from '@/lib/author';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const siteUrl = SITE_URL;
  return {
    title: locale === 'es' ? 'Política de Privacidad y Cookies' : 'Privacy and Cookie Policy',
    description: locale === 'es'
      ? 'Política de privacidad y cookies de CryptoLucky: qué datos tratamos, uso de Google Analytics, transparencia de afiliación y tus derechos.'
      : 'CryptoLucky privacy and cookie policy: what data we process, Google Analytics usage, affiliate transparency and your rights.',
    alternates: {
      canonical: `${siteUrl}/${locale}/privacidad`,
      languages: { es: `${siteUrl}/es/privacidad`, en: `${siteUrl}/en/privacidad` },
    },
  };
}

export default function PrivacyPage({ params: { locale } }: { params: { locale: string } }) {
  unstable_setRequestLocale(locale);
  const isEs = locale === 'es';
  const updated = '10/06/2026';

  if (!isEs) {
    return (
      <main className="max-w-4xl mx-auto px-4 py-12">
        <nav className="text-slate-500 text-sm mb-6 flex items-center gap-1">
          <Link href={`/${locale}`} className="hover:text-amber-400">Home</Link>
          <span>/</span>
          <span className="text-slate-400">Privacy Policy</span>
        </nav>
        <h1 className="text-3xl md:text-4xl font-black text-white mb-2">Privacy and Cookie Policy</h1>
        <p className="text-slate-500 text-sm mb-8">Last updated: {updated}</p>
        <div className="prose prose-invert max-w-none prose-p:text-slate-300 prose-headings:text-white prose-a:text-amber-400 prose-li:text-slate-300">
          <h2>Who we are</h2>
          <p>CryptoLucky is an informational blog about crypto casinos and cryptocurrencies. Contact: sirkokoloko007@gmail.com.</p>
          <h2>What data we process</h2>
          <p>We do not require registration and do not collect personal data directly. If you accept analytics cookies, we use <strong>Google Analytics 4</strong> with IP anonymization to measure visits, pages viewed and clicks on outbound links. This data is aggregated and does not identify you personally.</p>
          <h2>Cookies</h2>
          <ul>
            <li><strong>Essential</strong>: a single localStorage entry (cl_consent) remembering your cookie choice.</li>
            <li><strong>Analytics (optional)</strong>: Google Analytics 4 cookies, loaded only after you click &quot;Accept&quot; in the banner. You can reject them with no impact on browsing.</li>
            <li><strong>Advertising</strong>: we do not use advertising cookies.</li>
          </ul>
          <p>To change your choice, clear this site&apos;s data in your browser and reload.</p>
          <h2>Affiliate transparency</h2>
          <p>This site contains <strong>affiliate links</strong> (mainly to BetFury). If you sign up through them we earn a commission at no extra cost to you. This never conditions our editorial assessments.</p>
          <h2>Third parties</h2>
          <p>Outbound links (BetFury, exchanges) are governed by their own privacy policies. We are not responsible for the data processing of third-party sites.</p>
          <h2>Your rights</h2>
          <p>You may request access, rectification or deletion of any personal data by writing to the contact email. Since we do not store personal data directly, most requests are resolved by managing your browser cookies.</p>
          <h2>Responsible gambling</h2>
          <p>This content is for users aged 18+. Gambling involves risk: play responsibly. BetFury is not available in all jurisdictions; verify your local laws.</p>
        </div>
      </main>
    );
  }

  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      <nav className="text-slate-500 text-sm mb-6 flex items-center gap-1">
        <Link href={`/${locale}`} className="hover:text-amber-400">Inicio</Link>
        <span>/</span>
        <span className="text-slate-400">Política de Privacidad</span>
      </nav>
      <h1 className="text-3xl md:text-4xl font-black text-white mb-2">Política de Privacidad y Cookies</h1>
      <p className="text-slate-500 text-sm mb-8">Última actualización: {updated}</p>
      <div className="prose prose-invert max-w-none prose-p:text-slate-300 prose-headings:text-white prose-a:text-amber-400 prose-li:text-slate-300">
        <h2>Quiénes somos</h2>
        <p>CryptoLucky es un blog informativo sobre casinos cripto y criptomonedas. Contacto: sirkokoloko007@gmail.com.</p>
        <h2>Qué datos tratamos</h2>
        <p>No requerimos registro ni recogemos datos personales directamente. Si aceptas las cookies analíticas, usamos <strong>Google Analytics 4</strong> con anonimización de IP para medir visitas, páginas vistas y clics en enlaces salientes. Estos datos son agregados y no te identifican personalmente.</p>
        <h2>Cookies</h2>
        <ul>
          <li><strong>Esenciales</strong>: una única entrada en localStorage (cl_consent) que recuerda tu elección de cookies.</li>
          <li><strong>Analíticas (opcionales)</strong>: cookies de Google Analytics 4, que solo se cargan si pulsas &quot;Aceptar&quot; en el banner. Puedes rechazarlas sin que afecte a tu navegación.</li>
          <li><strong>Publicitarias</strong>: no usamos cookies publicitarias.</li>
        </ul>
        <p>Para cambiar tu elección, borra los datos de este sitio en tu navegador y recarga la página.</p>
        <h2>Transparencia de afiliación</h2>
        <p>Este sitio contiene <strong>enlaces de afiliado</strong> (principalmente a BetFury). Si te registras a través de ellos, recibimos una comisión sin coste adicional para ti. Esto nunca condiciona nuestras valoraciones editoriales.</p>
        <h2>Terceros</h2>
        <p>Los enlaces salientes (BetFury, exchanges) se rigen por sus propias políticas de privacidad. No somos responsables del tratamiento de datos en sitios de terceros.</p>
        <h2>Tus derechos</h2>
        <p>Puedes solicitar acceso, rectificación o supresión de cualquier dato personal escribiendo al email de contacto. Como no almacenamos datos personales directamente, la mayoría de solicitudes se resuelven gestionando las cookies de tu navegador.</p>
        <h2>Juego responsable</h2>
        <p>Este contenido es para mayores de 18 años. El juego implica riesgo: juega con responsabilidad. BetFury no está disponible en todas las jurisdicciones; verifica la legislación de tu país.</p>
      </div>
    </main>
  );
}

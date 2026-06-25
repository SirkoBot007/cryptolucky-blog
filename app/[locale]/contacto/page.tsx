import { unstable_setRequestLocale } from 'next-intl/server';
import Link from 'next/link';
import type { Metadata } from 'next';
import { AUTHOR, SITE_URL } from '@/lib/author';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const isEs = locale === 'es';
  return {
    title: isEs ? 'Contacto — CryptoLucky' : 'Contact — CryptoLucky',
    description: isEs
      ? 'Contacta con CryptoLucky (Sirko007): dudas sobre el contenido del blog, sugerencias y colaboraciones editoriales. Escríbenos a contacto@cryptoluckyguia.com.'
      : 'Contact CryptoLucky (Sirko007): questions about the blog content, suggestions and editorial collaborations. Write to contacto@cryptoluckyguia.com.',
    alternates: {
      canonical: `${SITE_URL}/${locale}/contacto`,
      languages: { es: `${SITE_URL}/es/contacto`, 'x-default': `${SITE_URL}/es/contacto` },
    },
  };
}

export default function ContactPage({ params: { locale } }: { params: { locale: string } }) {
  unstable_setRequestLocale(locale);
  const isEs = locale === 'es';

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: isEs ? 'Contacto — CryptoLucky' : 'Contact — CryptoLucky',
    url: `${SITE_URL}/${locale}/contacto`,
    mainEntity: {
      '@type': 'Organization',
      name: 'CryptoLucky',
      url: `${SITE_URL}/`,
      email: `mailto:${AUTHOR.email}`,
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <main className="max-w-4xl mx-auto px-4 py-12">
        <nav className="text-slate-500 text-sm mb-6 flex items-center gap-1">
          <Link href={`/${locale}`} className="hover:text-amber-400">{isEs ? 'Inicio' : 'Home'}</Link>
          <span>/</span>
          <span className="text-slate-400">{isEs ? 'Contacto' : 'Contact'}</span>
        </nav>

        <h1 className="text-3xl md:text-4xl font-black text-white mb-6">
          {isEs ? 'Contacto' : 'Contact'}
        </h1>

        <div className="prose prose-invert max-w-none prose-p:text-slate-300 prose-headings:text-white prose-a:text-amber-400">
          <p>
            {isEs
              ? '¿Tienes una duda, una sugerencia o quieres proponer una colaboración? Estaremos encantados de leerte.'
              : 'Have a question, a suggestion or a collaboration idea? We would be glad to hear from you.'}
          </p>

          <div className="not-prose bg-slate-800 border border-slate-700 rounded-xl p-6 my-6 space-y-2">
            <p className="text-slate-300 text-sm m-0">
              📧 <span className="text-white font-semibold">{isEs ? 'Correo:' : 'Email:'}</span>{' '}
              <a href={`mailto:${AUTHOR.email}`} className="text-amber-400 font-bold no-underline hover:text-amber-300">{AUTHOR.email}</a>
            </p>
            <p className="text-slate-300 text-sm m-0">
              ✍️ <span className="text-white font-semibold">{isEs ? 'Autor responsable:' : 'Responsible author:'}</span>{' '}
              <Link href={`/${locale}/autor/sirko007`} className="text-amber-400 no-underline hover:text-amber-300">{AUTHOR.alias}</Link>
            </p>
            <p className="text-slate-300 text-sm m-0">
              🍀 <span className="text-white font-semibold">{isEs ? 'Proyecto:' : 'Project:'}</span> CryptoLucky —{' '}
              <a href={SITE_URL} className="text-amber-400 no-underline hover:text-amber-300">cryptoluckyguia.com</a>
            </p>
          </div>

          <p>
            {isEs
              ? 'Respondemos consultas sobre el contenido del blog y posibles colaboraciones editoriales. No ofrecemos soporte de las plataformas de terceros (para eso, contacta directamente con el casino correspondiente).'
              : 'We answer questions about the blog content and possible editorial collaborations. We do not provide support for third-party platforms (for that, contact the relevant casino directly).'}
          </p>

          <p className="text-slate-500 text-sm">
            {isEs
              ? 'Contenido +18. Juega de forma responsable.'
              : '18+ content. Gamble responsibly.'}
          </p>
        </div>
      </main>
    </>
  );
}

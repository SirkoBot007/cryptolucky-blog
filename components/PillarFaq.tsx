interface FaqItem { q: string; a: string; }

// FAQ visible (acordeón nativo <details>) + FAQPage schema para rich snippets en Google.
// Las money pages (pilares) ganan elegibilidad a featured snippets en queries de gambling.
export default function PillarFaq({
  items,
  locale,
}: {
  items: { es: FaqItem[]; en: FaqItem[] };
  locale: string;
}) {
  const isEs = locale === 'es';
  const faqs = isEs ? items.es : items.en;
  if (!faqs?.length) return null;

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  return (
    <section className="my-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <h2 className="text-2xl font-bold text-white mb-6">
        {isEs ? 'Preguntas frecuentes' : 'Frequently asked questions'}
      </h2>
      <div className="space-y-3">
        {faqs.map((f, i) => (
          <details key={i} className="bg-slate-800/60 border border-slate-700/50 rounded-xl p-5 group">
            <summary className="text-white font-semibold cursor-pointer list-none flex justify-between items-center gap-3">
              <span>{f.q}</span>
              <span className="text-amber-400 group-open:rotate-180 transition-transform shrink-0">▾</span>
            </summary>
            <p className="text-slate-400 text-sm leading-relaxed mt-3">{f.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

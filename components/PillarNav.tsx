import Link from 'next/link';

// Silo comercial: enlaza todas las "money pages" (pilares) entre sí y desde los artículos.
// Insertar en cada pilar (con `current` para omitir la propia) y en los artículos del blog
// (sin `current`, para que cada artículo dirija tráfico a las 7 money pages).
const PILLARS = [
  { slug: 'betfury', es: 'BetFury Casino', en: 'BetFury Casino' },
  { slug: 'casino-cripto', es: 'Casinos Cripto', en: 'Crypto Casinos' },
  { slug: 'bonos-casino', es: 'Bonos de Casino', en: 'Casino Bonuses' },
  { slug: 'apuestas-deportivas', es: 'Apuestas Deportivas', en: 'Sports Betting' },
  { slug: 'staking-crypto', es: 'Staking BFG', en: 'BFG Staking' },
  { slug: 'ganar-criptomonedas', es: 'Ganar Cripto', en: 'Earn Crypto' },
  { slug: 'casino-sin-kyc', es: 'Casino sin KYC', en: 'No-KYC Casino' },
];

export default function PillarNav({ locale, current }: { locale: string; current?: string }) {
  const isEs = locale === 'es';
  const items = PILLARS.filter((p) => p.slug !== current);
  return (
    <section className="my-12 border-t border-slate-800 pt-8">
      <h2 className="text-lg font-black text-white mb-1">
        {isEs ? 'Guías principales de CryptoLucky' : 'CryptoLucky main guides'}
      </h2>
      <p className="text-slate-500 text-sm mb-4">
        {isEs ? 'Explora nuestras guías clave sobre BetFury y casino cripto.' : 'Explore our key BetFury and crypto casino guides.'}
      </p>
      <div className="flex flex-wrap gap-2.5">
        {items.map((p) => (
          <Link
            key={p.slug}
            href={`/${locale}/${p.slug}`}
            className="bg-slate-800/70 border border-slate-700 hover:border-amber-400/60 hover:text-amber-400 text-slate-300 text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
          >
            {isEs ? p.es : p.en}
          </Link>
        ))}
      </div>
    </section>
  );
}

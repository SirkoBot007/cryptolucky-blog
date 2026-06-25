// CountryAvailabilityNote — nota de disponibilidad y juego responsable (Fase C).
// NO afirma disponibilidad por país. Informa: BetFury opera bajo licencia de Curaçao y
// restringe ciertas jurisdicciones (España y EE. UU. como ejemplos no permitidos), y pide
// al lector verificar la legalidad/disponibilidad en SU jurisdicción antes de registrarse.
// Server Component (sin 'use client'), not-prose, cero CLS. Sin cifras de bono.
// Coherente con el disclaimer global del footer y la decisión del CEO D16 (2026-06-24).

interface Props {
  locale?: string;
}

export default function CountryAvailabilityNote({ locale = 'es' }: Props) {
  const isEs = locale === 'es';

  return (
    <aside
      className="not-prose my-8 rounded-2xl border border-amber-500/25 bg-amber-500/5 p-5"
      role="note"
      aria-label={isEs ? 'Disponibilidad y juego responsable' : 'Availability and responsible gaming'}
    >
      <p className="flex items-center gap-2 text-amber-400 text-[11px] font-black uppercase tracking-widest mb-2">
        <span aria-hidden="true">&#x26A0;&#xFE0F;</span>
        {isEs ? 'Disponibilidad y juego responsable' : 'Availability & responsible gaming'}
      </p>
      <p className="text-slate-300 text-sm leading-relaxed">
        {isEs
          ? 'BetFury opera bajo licencia de Curaçao y restringe el acceso desde ciertas jurisdicciones (por ejemplo, España y Estados Unidos). No publicamos una lista país por país: comprueba siempre la disponibilidad y la legalidad del juego online con criptomonedas en tu propia jurisdicción antes de registrarte.'
          : 'BetFury operates under a Curaçao license and restricts access from certain jurisdictions (for example, Spain and the United States). We do not publish a country-by-country list: always check the availability and legality of online crypto gambling in your own jurisdiction before signing up.'}
      </p>
      <p className="text-slate-500 text-xs mt-2">
        {isEs
          ? 'Contenido informativo; no garantiza acceso ni legalidad en tu país. Juega con responsabilidad. +18.'
          : 'Informational content; it does not guarantee access or legality in your country. Play responsibly. 18+.'}
      </p>
    </aside>
  );
}

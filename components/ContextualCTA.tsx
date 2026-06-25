// ContextualCTA — CTA de afiliado in-content (Fase B), SERVER component (sin 'use client').
// Se inyecta tras los H2 de alta intención desde la plantilla del artículo (componentes de ReactMarkdown).
// Tracking: NO usa onClick (es server). Lleva data-aff-track + data-aff-* y el listener global
// AffiliateClickTracker captura el click y dispara track()+gtag. Estático en el flujo → cero CLS.

const AFFILIATE_URL =
  process.env.NEXT_PUBLIC_BETFURY_AFFILIATE || 'https://betfury.io/?r=LUCKYSIRKO007';

export type CTAIntent = 'bono' | 'registro' | 'pago' | 'retiro';

function buildUrl(campaign: string): string {
  try {
    const url = new URL(AFFILIATE_URL);
    url.searchParams.set('utm_source', 'cryptolucky');
    url.searchParams.set('utm_medium', 'contextual-cta');
    url.searchParams.set('utm_campaign', campaign);
    return url.toString();
  } catch {
    return AFFILIATE_URL;
  }
}

const COPY: Record<'es' | 'en', Record<CTAIntent, { eyebrow: string; title: string; sub: string; btn: string }>> = {
  es: {
    bono: {
      eyebrow: 'Bono de bienvenida',
      title: 'Activa el bono de bienvenida en BetFury',
      sub: 'Regístrate con el código LUCKYSIRKO007 y reclámalo en tu primer depósito.',
      btn: 'Reclamar bono →',
    },
    registro: {
      eyebrow: 'Registro',
      title: 'Crea tu cuenta en BetFury en 2 minutos',
      sub: 'Solo tu email · sin KYC para empezar a jugar.',
      btn: 'Crear cuenta gratis →',
    },
    pago: {
      eyebrow: 'Depósito',
      title: 'Deposita en cripto y empieza a jugar',
      sub: 'BTC, ETH, USDT y más · acreditación casi al instante.',
      btn: 'Depositar en BetFury →',
    },
    retiro: {
      eyebrow: 'Retiros',
      title: 'Retiros rápidos en cripto',
      sub: 'Directo a tu wallet, sin complicaciones.',
      btn: 'Probar BetFury →',
    },
  },
  en: {
    bono: {
      eyebrow: 'Welcome bonus',
      title: "Claim BetFury's welcome bonus",
      sub: 'Sign up with code LUCKYSIRKO007 and claim it on your first deposit.',
      btn: 'Claim bonus →',
    },
    registro: {
      eyebrow: 'Sign up',
      title: 'Create your BetFury account in 2 minutes',
      sub: 'Email only · no KYC to get started.',
      btn: 'Create free account →',
    },
    pago: {
      eyebrow: 'Deposit',
      title: 'Deposit in crypto and start playing',
      sub: 'BTC, ETH, USDT and more · near-instant credit.',
      btn: 'Deposit on BetFury →',
    },
    retiro: {
      eyebrow: 'Withdrawals',
      title: 'Fast crypto withdrawals',
      sub: 'Straight to your wallet, no hassle.',
      btn: 'Try BetFury →',
    },
  },
};

interface Props {
  intent: CTAIntent;
  locale?: string;
  slug?: string;
}

export default function ContextualCTA({ intent, locale = 'es', slug = 'article' }: Props) {
  const isEs = locale === 'es';
  const c = COPY[isEs ? 'es' : 'en'][intent];

  return (
    <aside
      className="not-prose my-7 bg-gradient-to-br from-[#1B1B2F] via-slate-900 to-slate-900 border border-[#FF6B35]/30 rounded-2xl p-5 flex flex-col sm:flex-row items-center gap-4"
      aria-label={c.title}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/betfury/mascot/racoon-money.png"
        alt=""
        width={64}
        height={64}
        className="object-contain flex-shrink-0 drop-shadow-lg hidden sm:block"
        loading="lazy"
      />
      <div className="flex-1 text-center sm:text-left min-w-0">
        <p className="text-[#FF6B35] text-[11px] font-black uppercase tracking-widest mb-1">{c.eyebrow}</p>
        <p className="text-white font-black text-base leading-snug mb-1">{c.title}</p>
        <p className="text-slate-400 text-sm">{c.sub}</p>
      </div>
      <a
        href={buildUrl(slug)}
        target="_blank"
        rel="noopener noreferrer sponsored"
        data-aff-track
        data-aff-medium="contextual-cta"
        data-aff-campaign={slug}
        data-aff-intent={intent}
        className="flex-shrink-0 bg-gradient-to-r from-[#FF6B35] to-[#ff8c5a] hover:from-[#ff5a1f] hover:to-[#FF6B35] text-white font-black px-6 py-3 rounded-xl transition-colors duration-300 text-sm shadow-lg shadow-[#FF6B35]/25 whitespace-nowrap motion-reduce:transition-none"
      >
        {c.btn}
      </a>
    </aside>
  );
}

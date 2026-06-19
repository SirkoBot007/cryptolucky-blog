'use client';

const AFFILIATE_URL =
  process.env.NEXT_PUBLIC_BETFURY_AFFILIATE || 'https://betfury.io/?r=LUCKYSIRKO007';

function buildUrl(campaign: string): string {
  try {
    const url = new URL(AFFILIATE_URL);
    url.searchParams.set('utm_source', 'cryptolucky');
    url.searchParams.set('utm_medium', 'banner');
    url.searchParams.set('utm_campaign', campaign);
    return url.toString();
  } catch {
    return AFFILIATE_URL;
  }
}

type BannerType = 'betfury' | 'bfg' | 'sport' | 'cashback' | 'freebox' | 'esport';

function getBannerSrc(type: BannerType, size: string): string {
  const map: Record<BannerType, Record<string, string>> = {
    betfury: {
      '300x250': '/betfury/banners/betfury-300x250.png',
      '728x90':  '/betfury/banners/betfury-728x90.png',
      '160x600': '/betfury/banners/betfury-160x600.png',
      '970x250': '/betfury/banners/betfury-970x250.png',
      '320x100': '/betfury/banners/bfg-320x100.gif',
    },
    bfg: {
      '300x250': '/betfury/banners/bfg-300x250.gif',
      '728x90':  '/betfury/banners/bfg-728x90.gif',
      '160x600': '/betfury/banners/bfg-160x600.gif',
      '970x250': '/betfury/banners/bfg-970x250.gif',
      '320x100': '/betfury/banners/bfg-320x100.gif',
      '250x250': '/betfury/banners/bfg-250x250.gif',
    },
    sport: {
      '300x250': '/betfury/banners/sport-300x250.gif',
      '728x90':  '/betfury/banners/sport-728x90.gif',
      '160x600': '/betfury/banners/sport-160x600.gif',
      '970x250': '/betfury/banners/sport-970x250.gif',
      '320x100': '/betfury/banners/sport-320x100.gif',
    },
    cashback: {
      '300x250': '/betfury/banners/cashback-300x250.gif',
      '728x90':  '/betfury/banners/cashback-728x90.gif',
      '160x600': '/betfury/banners/cashback-160x600.gif',
      '970x250': '/betfury/banners/cashback-970x250.gif',
      '320x100': '/betfury/banners/cashback-320x100.gif',
    },
    freebox: {
      '300x250': '/betfury/banners/freebox-300x250.gif',
      '728x90':  '/betfury/banners/freebox-728x90.gif',
      '160x600': '/betfury/banners/freebox-160x600.gif',
      '320x100': '/betfury/banners/freebox-320x100.gif',
    },
    esport: {
      '300x250': '/betfury/banners/esport-300x250.gif',
      '728x90':  '/betfury/banners/esport-728x90.gif',
      '160x600': '/betfury/banners/esport-160x600.gif',
    },
  };
  return map[type]?.[size] ?? map.bfg[size] ?? '/betfury/banners/bfg-300x250.gif';
}

export function categoryToBannerType(category: string): BannerType {
  const c = category.toLowerCase();
  if (c.includes('sport') || c.includes('copa') || c.includes('mundial') || c.includes('apuesta')) return 'sport';
  if (c.includes('cashback') || c.includes('bono') || c.includes('bonus')) return 'cashback';
  if (c.includes('esport')) return 'esport';
  if (c.includes('free') || c.includes('gratis') || c.includes('fury wheel')) return 'freebox';
  return 'bfg';
}

interface BannerProps {
  type?: BannerType;
  campaign?: string;
  className?: string;
}

/** 728x90 – article footer / leaderboard */
export function BetFuryLeaderboard({ type = 'bfg', campaign = 'article-footer', className = '' }: BannerProps) {
  return (
    <div className={`w-full flex justify-center my-8 ${className}`}>
      <a
        href={buildUrl(campaign)}
        target="_blank"
        rel="noopener noreferrer sponsored"
        aria-label="BetFury Casino – Juega con cripto"
        className="block rounded-xl overflow-hidden hover:opacity-90 transition-opacity max-w-[728px] w-full shadow-lg shadow-black/30"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={getBannerSrc(type, '728x90')}
          alt="BetFury Casino"
          width={728}
          height={90}
          className="w-full h-auto"
          loading="lazy"
        />
      </a>
    </div>
  );
}

/** 160x600 – right sidebar (hidden on mobile) */
export function BetFurySkyscraper({ type = 'bfg', campaign = 'sidebar', className = '' }: BannerProps) {
  return (
    <div className={`hidden lg:block sticky top-24 ${className}`}>
      <a
        href={buildUrl(campaign)}
        target="_blank"
        rel="noopener noreferrer sponsored"
        aria-label="BetFury Casino – Juega con cripto"
        className="block rounded-xl overflow-hidden hover:opacity-90 transition-opacity shadow-xl shadow-black/40"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={getBannerSrc(type, '160x600')}
          alt="BetFury Casino"
          width={160}
          height={600}
          className="w-full h-auto"
          loading="lazy"
        />
      </a>
    </div>
  );
}

/** 300x250 – inline within article */
export function BetFuryMediumRect({ type = 'bfg', campaign = 'inline-article', className = '' }: BannerProps) {
  return (
    <div className={`flex justify-center my-8 ${className}`}>
      <a
        href={buildUrl(campaign)}
        target="_blank"
        rel="noopener noreferrer sponsored"
        aria-label="BetFury Casino – Juega con cripto"
        className="block rounded-xl overflow-hidden hover:opacity-90 transition-opacity shadow-lg shadow-black/30"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={getBannerSrc(type, '300x250')}
          alt="BetFury Casino"
          width={300}
          height={250}
          className="w-full h-auto"
          loading="lazy"
        />
      </a>
    </div>
  );
}

/** 970x250 – wide billboard (homepage / top of section) */
export function BetFuryBillboard({ type = 'bfg', campaign = 'billboard', className = '' }: BannerProps) {
  return (
    <div className={`w-full flex justify-center my-6 ${className}`}>
      <a
        href={buildUrl(campaign)}
        target="_blank"
        rel="noopener noreferrer sponsored"
        aria-label="BetFury Casino – Juega con cripto"
        className="block rounded-2xl overflow-hidden hover:opacity-90 transition-opacity max-w-[970px] w-full shadow-2xl shadow-black/40"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={getBannerSrc(type, '970x250')}
          alt="BetFury Casino"
          width={970}
          height={250}
          className="w-full h-auto"
          loading="lazy"
        />
      </a>
    </div>
  );
}

/** 320x100 – mobile banner */
export function BetFuryMobileBanner({ type = 'bfg', campaign = 'mobile', className = '' }: BannerProps) {
  return (
    <div className={`block lg:hidden w-full flex justify-center my-4 ${className}`}>
      <a
        href={buildUrl(campaign)}
        target="_blank"
        rel="noopener noreferrer sponsored"
        aria-label="BetFury Casino – Juega con cripto"
        className="block rounded-xl overflow-hidden hover:opacity-90 transition-opacity max-w-[320px] w-full shadow-md"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={getBannerSrc(type, '320x100')}
          alt="BetFury Casino"
          width={320}
          height={100}
          className="w-full h-auto"
          loading="lazy"
        />
      </a>
    </div>
  );
}

/** Article thumbnail – 300x250 sized card banner */
export function BetFuryThumbnail({ type = 'bfg', campaign = 'thumbnail', className = '' }: BannerProps) {
  return (
    <a
      href={buildUrl(campaign)}
      target="_blank"
      rel="noopener noreferrer sponsored"
      aria-label="BetFury Casino"
      className={`block w-full overflow-hidden hover:opacity-90 transition-opacity ${className}`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={getBannerSrc(type, '300x250')}
        alt="BetFury Casino"
        width={300}
        height={250}
        className="w-full h-full object-cover"
        loading="lazy"
      />
    </a>
  );
}

/** RacoonFury mascot image — decorative */
export function RacoonFury({
  variant = 1,
  size = 120,
  className = '',
}: {
  variant?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 'money' | 'money2' | 'stop';
  size?: number;
  className?: string;
}) {
  const src =
    variant === 'money' ? '/betfury/mascot/racoon-money.png' :
    variant === 'money2' ? '/betfury/mascot/racoon-money2.png' :
    variant === 'stop' ? '/betfury/mascot/racoon-stop.png' :
    `/betfury/mascot/racoon${variant}.png`;

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt="RacoonFury – BetFury mascot"
      width={size}
      height={size}
      className={`object-contain select-none pointer-events-none ${className}`}
      loading="lazy"
      draggable={false}
    />
  );
}

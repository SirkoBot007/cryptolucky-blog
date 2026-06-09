'use client';

import Image from 'next/image';

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

/** 728×90 – article footer / below the fold */
export function BetFuryLeaderboard() {
  return (
    <div className="w-full flex justify-center my-8">
      <a
        href={buildUrl('article-footer')}
        target="_blank"
        rel="noopener noreferrer sponsored"
        aria-label="BetFury – Leading Social Bitcoin Casino"
        className="block rounded-lg overflow-hidden hover:opacity-90 transition-opacity max-w-[728px] w-full"
      >
        <Image
          src="/banners/betfury-leaderboard.png"
          alt="BetFury – Leading Social Bitcoin Casino"
          width={728}
          height={90}
          priority={false}
          className="w-full h-auto"
        />
      </a>
    </div>
  );
}

/** 160×600 – right sidebar (hidden on mobile) */
export function BetFurySkyscraper() {
  return (
    <div className="hidden lg:block sticky top-24">
      <a
        href={buildUrl('sidebar')}
        target="_blank"
        rel="noopener noreferrer sponsored"
        aria-label="BetFury – Leading Social Bitcoin Casino"
        className="block rounded-lg overflow-hidden hover:opacity-90 transition-opacity"
      >
        <Image
          src="/banners/betfury-skyscraper.png"
          alt="BetFury – Leading Social Bitcoin Casino"
          width={160}
          height={600}
          priority={false}
          className="w-full h-auto"
        />
      </a>
    </div>
  );
}

/** 300×250 – inline within article */
export function BetFuryMediumRect() {
  return (
    <div className="flex justify-center my-8">
      <a
        href={buildUrl('inline-article')}
        target="_blank"
        rel="noopener noreferrer sponsored"
        aria-label="BetFury – Leading Social Bitcoin Casino"
        className="block rounded-lg overflow-hidden hover:opacity-90 transition-opacity"
      >
        <Image
          src="/banners/betfury-medium-rect.png"
          alt="BetFury – Leading Social Bitcoin Casino"
          width={300}
          height={250}
          priority={false}
          className="w-full h-auto"
        />
      </a>
    </div>
  );
}

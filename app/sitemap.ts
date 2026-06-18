import { MetadataRoute } from 'next';
import { getAllSlugs } from '@/lib/notion';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://cryptoluckyguia.com';
const LOCALES = ['es', 'en'];
const SITE_LAST_BUILD = new Date('2026-06-18');

const PILLAR_ROUTES = ['betfury','casino-cripto','apuestas-deportivas','bonos-casino','staking-crypto','ganar-criptomonedas','casino-sin-kyc'];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const slugs = await getAllSlugs().catch(() => [] as string[]);
  const staticRoutes: MetadataRoute.Sitemap = LOCALES.flatMap((locale) => [
    { url: `${BASE_URL}/${locale}`, changeFrequency: 'weekly' as const, priority: 1.0, lastModified: SITE_LAST_BUILD },
    { url: `${BASE_URL}/${locale}/blog`, changeFrequency: 'weekly' as const, priority: 0.9, lastModified: SITE_LAST_BUILD },
    ...PILLAR_ROUTES.map((route) => ({ url: `${BASE_URL}/${locale}/${route}`, changeFrequency: 'monthly' as const, priority: 0.8, lastModified: SITE_LAST_BUILD })),
    { url: `${BASE_URL}/${locale}/sobre-nosotros`, changeFrequency: 'yearly' as const, priority: 0.5, lastModified: new Date('2026-06-09') },
    { url: `${BASE_URL}/${locale}/privacidad`, changeFrequency: 'yearly' as const, priority: 0.3, lastModified: new Date('2026-06-09') },
  ]);
  // EN blog slugs 301-redirect to ES — include them in sitemap so Google
  // follows the canonical signal correctly and consolidates link equity
  const articleRoutes: MetadataRoute.Sitemap = LOCALES.flatMap((locale) =>
    slugs.map((slug) => ({
      url: `${BASE_URL}/${locale}/blog/${slug}`,
      changeFrequency: 'monthly' as const,
      priority: locale === 'es' ? 0.8 : 0.5,
      lastModified: new Date('2026-06-10'),
    }))
  );
  return [...staticRoutes, ...articleRoutes];
}

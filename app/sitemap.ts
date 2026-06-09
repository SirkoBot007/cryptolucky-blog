import { MetadataRoute } from 'next';
import { getAllSlugs } from '@/lib/notion';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://cryptolucky.vercel.app';
const LOCALES = ['es', 'en'];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const slugs = await getAllSlugs().catch(() => [] as string[]);

  const staticRoutes: MetadataRoute.Sitemap = LOCALES.flatMap((locale) => [
    {
      url: `${BASE_URL}/${locale}`,
      changeFrequency: 'weekly' as const,
      priority: 1.0,
      lastModified: new Date(),
    },
    {
      url: `${BASE_URL}/${locale}/blog`,
      changeFrequency: 'daily' as const,
      priority: 0.9,
      lastModified: new Date(),
    },
  ]);

  const articleRoutes: MetadataRoute.Sitemap = LOCALES.flatMap((locale) =>
    slugs.map((slug) => ({
      url: `${BASE_URL}/${locale}/blog/${slug}`,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
      lastModified: new Date(),
    }))
  );

  return [...staticRoutes, ...articleRoutes];
}

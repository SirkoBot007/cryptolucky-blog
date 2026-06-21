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
    { url: `${BASE_URL}/${locale}/autor/sirko007`, changeFrequency: 'monthly' as const, priority: 0.6, lastModified: SITE_LAST_BUILD },
    { url: `${BASE_URL}/${locale}/sobre-nosotros`, changeFrequency: 'yearly' as const, priority: 0.5, lastModified: SITE_LAST_BUILD },
    { url: `${BASE_URL}/${locale}/juego-responsable`, changeFrequency: 'yearly' as const, priority: 0.4, lastModified: SITE_LAST_BUILD },
    { url: `${BASE_URL}/${locale}/privacidad`, changeFrequency: 'yearly' as const, priority: 0.3, lastModified: new Date('2026-06-09') },
  ]);
  // Los artículos solo existen en español; las URLs /en/blog/* hacen 308 -> /es.
  // No se incluyen las /en/blog en el sitemap (Google marca "Página con redirección,
  // no indexada" y malgasta presupuesto de rastreo). Solo se envían las /es/blog.
  const articleRoutes: MetadataRoute.Sitemap = slugs.map((slug) => ({
    url: `${BASE_URL}/es/blog/${slug}`,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
    lastModified: new Date('2026-06-10'),
  }));
  return [...staticRoutes, ...articleRoutes];
}

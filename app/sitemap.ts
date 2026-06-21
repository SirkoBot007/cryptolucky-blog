import { MetadataRoute } from 'next';
import { getPublishedArticles } from '@/lib/notion';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://cryptoluckyguia.com';
const LOCALES = ['es', 'en'];
const SITE_LAST_BUILD = new Date('2026-06-21');

const PILLAR_ROUTES = ['betfury', 'casino-cripto', 'apuestas-deportivas', 'bonos-casino', 'staking-crypto', 'ganar-criptomonedas', 'casino-sin-kyc'];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const articles = await getPublishedArticles().catch(() => []);

  // Estáticas en ES y EN (ambas tienen contenido real bilingüe → indexables en los dos idiomas).
  const staticRoutes: MetadataRoute.Sitemap = LOCALES.flatMap((locale) => [
    { url: `${BASE_URL}/${locale}`, changeFrequency: 'weekly' as const, priority: 1.0, lastModified: SITE_LAST_BUILD },
    { url: `${BASE_URL}/${locale}/blog`, changeFrequency: 'daily' as const, priority: 0.9, lastModified: SITE_LAST_BUILD },
    // Pilares = money pages: prioridad alta (0.9), por encima de los artículos de cola larga.
    ...PILLAR_ROUTES.map((route) => ({ url: `${BASE_URL}/${locale}/${route}`, changeFrequency: 'weekly' as const, priority: 0.9, lastModified: SITE_LAST_BUILD })),
    { url: `${BASE_URL}/${locale}/autor/sirko007`, changeFrequency: 'monthly' as const, priority: 0.6, lastModified: SITE_LAST_BUILD },
    { url: `${BASE_URL}/${locale}/sobre-nosotros`, changeFrequency: 'yearly' as const, priority: 0.5, lastModified: SITE_LAST_BUILD },
    { url: `${BASE_URL}/${locale}/juego-responsable`, changeFrequency: 'yearly' as const, priority: 0.4, lastModified: SITE_LAST_BUILD },
    { url: `${BASE_URL}/${locale}/privacidad`, changeFrequency: 'yearly' as const, priority: 0.3, lastModified: new Date('2026-06-09') },
  ]);

  // Los artículos solo existen en español; las URLs /en/blog/* hacen 308 -> /es y NO se incluyen
  // (Google las marcaría "Página con redirección, no indexada" y malgasta presupuesto de rastreo).
  // lastModified usa la fecha REAL de cada artículo (updatedAt ?? publishedAt) para guiar el re-crawl.
  const articleRoutes: MetadataRoute.Sitemap = articles.map((a) => ({
    url: `${BASE_URL}/es/blog/${a.slug}`,
    changeFrequency: 'weekly' as const,
    priority: 0.75,
    lastModified: new Date(a.updatedAt ?? a.publishedAt),
  }));

  return [...staticRoutes, ...articleRoutes];
}

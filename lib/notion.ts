// ============================================================
// lib/notion.ts — Static data reader (no API calls)
// All content lives in lib/articles-data.ts
// Zero tokens, zero cost, zero rate limits — free forever
// ============================================================

import { ARTICLES } from './articles-data';

export interface Article {
  id: string;
  slug: string;
  titleEs: string;
  titleEn: string;
  descriptionEs: string;
  descriptionEn: string;
  category: string;
  keywords: string;
  publishedAt: string;
  updatedAt?: string;
  status: string;
  author?: string;
  image?: string;
  faqs?: Array<{ question: string; answer: string }>;
}

export function getTitle(article: Article, locale: string): string {
  return locale === 'en' ? article.titleEn || article.titleEs : article.titleEs;
}

export function getDescription(article: Article, locale: string): string {
  return locale === 'en' ? article.descriptionEn || article.descriptionEs : article.descriptionEs;
}

function toArticle(a: (typeof ARTICLES)[number]): Article {
  return {
    id: a.id,
    slug: a.slug,
    titleEs: a.titleEs,
    titleEn: a.titleEn,
    descriptionEs: a.descriptionEs,
    descriptionEn: a.descriptionEn,
    category: a.category,
    keywords: a.keywords,
    publishedAt: a.publishedAt,
    updatedAt: a.updatedAt,
    status: a.status,
    author: a.author,
    image: a.image,
    faqs: a.faqs,
  };
}

export async function getPublishedArticles(): Promise<Article[]> {
  return ARTICLES.filter((a) => a.status === 'Publicado')
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .map(toArticle);
}

export async function getArticleBySlug(
  slug: string
): Promise<{ article: Article; markdown: string } | null> {
  const found = ARTICLES.find((a) => a.slug === slug && a.status === 'Publicado');
  if (!found) return null;
  return { article: toArticle(found), markdown: found.content };
}

export async function getAllSlugs(): Promise<string[]> {
  return ARTICLES.filter((a) => a.status === 'Publicado').map((a) => a.slug);
}

/**
 * Agrupa categorías equivalentes (variantes de mayúsculas/nombre) en una clave
 * canónica para emparejar artículos del mismo tema aunque la categoría difiera
 * ('Casino Cripto' vs 'Casinos Cripto', 'Guías' vs 'Guías BetFury', etc.).
 */
function normalizeCategory(c: string): string {
  const s = (c || '').toLowerCase();
  if (s.includes('mundial') || s.includes('mundo') || s.includes('copa')) return 'mundial';
  if (s.includes('apuesta') || s.includes('sportsbook')) return 'apuestas';
  if (s.includes('staking') || s.includes('bfg')) return 'staking';
  if (s.includes('bono')) return 'bonos';
  if (s.includes('juego')) return 'juegos';
  if (s.includes('review')) return 'reviews';
  if (s.includes('casino')) return 'casino';
  if (s.includes('betfury')) return 'betfury';
  if (s.includes('guía') || s.includes('guia')) return 'guias';
  return s || 'otros';
}

/**
 * Relacionados para enlazado interno denso: primero artículos del mismo tema
 * (categoría normalizada); si faltan, RELLENA con otros publicados para que
 * NINGÚN post quede con pocos enlaces (sin huérfanos, rastreo poco profundo).
 */
export async function getRelatedArticles(
  slug: string,
  category: string,
  limit = 6
): Promise<Article[]> {
  const pool = ARTICLES.filter((a) => a.slug !== slug && a.status === 'Publicado');
  const want = normalizeCategory(category);
  const sameTopic = pool.filter((a) => normalizeCategory(a.category) === want);
  const others = pool.filter((a) => normalizeCategory(a.category) !== want);
  return [...sameTopic, ...others].slice(0, limit).map(toArticle);
}

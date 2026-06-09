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

export async function getRelatedArticles(
  slug: string,
  category: string,
  limit = 3
): Promise<Article[]> {
  return ARTICLES.filter(
    (a) => a.slug !== slug && a.category === category && a.status === 'Publicado'
  )
    .slice(0, limit)
    .map(toArticle);
}

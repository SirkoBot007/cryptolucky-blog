import { Client } from '@notionhq/client';
import { NotionToMarkdown } from 'notion-to-md';

const notion = new Client({ auth: process.env.NOTION_API_KEY || 'placeholder' });
const n2m = new NotionToMarkdown({ notionClient: notion });
const DB_ID = process.env.NOTION_DATABASE_ID || '';

const isConfigured =
  process.env.NOTION_API_KEY &&
  process.env.NOTION_API_KEY !== 'secret_PENDIENTE_DE_CONFIGURAR' &&
  process.env.NOTION_API_KEY !== 'placeholder';

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
  status: string;
}

export function getTitle(article: Article, locale: string): string {
  return locale === 'en' ? article.titleEn || article.titleEs : article.titleEs;
}

export function getDescription(article: Article, locale: string): string {
  return locale === 'en' ? article.descriptionEn || article.descriptionEs : article.descriptionEs;
}

function mapPage(page: any): Article {
  const p = page.properties;
  return {
    id: page.id,
    slug: p['Slug']?.rich_text?.[0]?.plain_text ?? '',
    titleEs: p['Título ES']?.title?.[0]?.plain_text ?? '',
    titleEn: p['Título EN']?.rich_text?.[0]?.plain_text ?? '',
    descriptionEs: p['Meta Descripción ES']?.rich_text?.[0]?.plain_text ?? '',
    descriptionEn: p['Meta Descripción EN']?.rich_text?.[0]?.plain_text ?? '',
    category: p['Categoría']?.select?.name ?? '',
    keywords: p['Keyword Principal']?.rich_text?.[0]?.plain_text ?? '',
    publishedAt: p['Fecha Publicación']?.date?.start ?? new Date().toISOString(),
    status: p['Estado']?.select?.name ?? 'Borrador',
  };
}

export async function getPublishedArticles(): Promise<Article[]> {
  if (!isConfigured) return [];
  try {
    const res = await notion.databases.query({
      database_id: DB_ID,
      filter: { property: 'Estado', select: { equals: 'Publicado' } },
      sorts: [{ property: 'Fecha Publicación', direction: 'descending' }],
    });
    return res.results.map(mapPage);
  } catch (e) {
    console.error('[CryptoLucky] Notion API error in getPublishedArticles:', e);
    return [];
  }
}

export async function getArticleBySlug(
  slug: string
): Promise<{ article: Article; markdown: string } | null> {
  if (!isConfigured) return null;
  try {
    const res = await notion.databases.query({
      database_id: DB_ID,
      filter: { property: 'Slug', rich_text: { equals: slug } },
    });
    if (!res.results.length) return null;
    const article = mapPage(res.results[0]);
    const mdBlocks = await n2m.pageToMarkdown(res.results[0].id);
    const markdown = n2m.toMarkdownString(mdBlocks).parent;
    return { article, markdown };
  } catch (e) {
    console.error('[CryptoLucky] Notion API error in getArticleBySlug:', e);
    return null;
  }
}

export async function getAllSlugs(): Promise<string[]> {
  const articles = await getPublishedArticles();
  return articles.map((a) => a.slug).filter(Boolean);
}

export async function getRelatedArticles(
  slug: string,
  category: string,
  limit = 3
): Promise<Article[]> {
  const all = await getPublishedArticles();
  return all.filter((a) => a.slug !== slug && a.category === category).slice(0, limit);
}

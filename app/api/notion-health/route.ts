import { NextResponse } from 'next/server';
import { Client } from '@notionhq/client';

export const dynamic = 'force-dynamic';

export async function GET() {
  const token = process.env.NOTION_API_KEY;
  const dbId = process.env.NOTION_DATABASE_ID;
  if (!token) return NextResponse.json({ ok: false, error: 'NOTION_API_KEY not set' });
  const notion = new Client({ auth: token });
  try {
    const dbInfo = await notion.databases.retrieve({ database_id: dbId });
    const q1 = await notion.databases.query({ database_id: dbId, page_size: 3 });
    const q2 = await notion.databases.query({ database_id: dbId, filter: { property: 'Estado', select: { equals: 'Publicado' } }, page_size: 10 });
    return NextResponse.json({ ok: true, tokenPrefix: token.slice(0,10)+'...', dbTitle: dbInfo.title?.[0]?.plain_text, total: q1.results.length, publicado: q2.results.length, slugs: q2.results.map(r => r.properties?.Slug?.rich_text?.[0]?.plain_text) });
  } catch (e) {
    return NextResponse.json({ ok: false, tokenPrefix: token.slice(0,10)+'...', dbId, code: e?.code, status: e?.status, msg: e?.message });
  }
}

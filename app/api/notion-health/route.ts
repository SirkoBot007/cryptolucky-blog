import { NextResponse } from 'next/server';
import { Client } from '@notionhq/client';

export const dynamic = 'force-dynamic';

export async function GET() {
  const token = process.env.NOTION_API_KEY;
  const dbId = process.env.NOTION_DATABASE_ID;

  if (!token) {
    return NextResponse.json({ ok: false, error: 'NOTION_API_KEY not set' });
  }

  const notion = new Client({ auth: token });

  try {
    // 1. Test: retrieve the database (no filter)
    const dbInfo = await notion.databases.retrieve({ database_id: dbId! });

    // 2. Test: query with no filter (first 3 results)
    const queryResult = await notion.databases.query({
      database_id: dbId!,
      page_size: 3,
    });

    // 3. Test: query with Estado = Publicado filter
    const filtered = await notion.databases.query({
      database_id: dbId!,
      filter: { property: 'Estado', select: { equals: 'Publicado' } },
      page_size: 10,
    });

    return NextResponse.json({
      ok: true,
      tokenPrefix: token.substring(0, 10) + '...',
      dbTitle: (dbInfo as any).title?.[0]?.plain_text ?? 'unknown',
      totalUnfiltered: queryResult.results.length,
      totalPublicado: filtered.results.length,
      slugs: filtered.results.map((r: any) => r.properties?.Slug?.rich_text?.[0]?.plain_text ?? '(no slug)'),
    });
  } catch (e: any) {
    return NextResponse.json({
      ok: false,
      tokenPrefix: token.substring(0, 10) + '...',
      dbId,
      errorCode: e?.code,
      errorStatus: e?.status,
      errorMessage: e?.message,
      errorBody: e?.body,
    });
  }
}

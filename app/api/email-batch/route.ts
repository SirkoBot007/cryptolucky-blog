// ============================================================
// /api/email-batch — Envío único de email #2 a leads existentes
// Llamar UNA sola vez después de activar la secuencia drip.
// Requiere: BATCH_SECRET en env para evitar uso no autorizado.
// Uso: POST /api/email-batch con body { secret: "..." }
// ============================================================

import { NextRequest, NextResponse } from 'next/server';
import { getEmail2Html } from '@/lib/email-sequences';

const LEADS_DATABASE_ID = process.env.NOTION_LEADS_DATABASE_ID ?? '';
const NOTION_API_KEY = process.env.NOTION_API_KEY ?? '';
const RESEND_API_KEY = process.env.RESEND_API_KEY ?? '';
const BATCH_SECRET = process.env.BATCH_SECRET ?? '';

interface NotionEmailProp {
  email?: string;
}

interface NotionPage {
  id: string;
  properties: {
    Email?: NotionEmailProp;
    Estado?: { select?: { name?: string } };
  };
}

async function getLeadsFromNotion(): Promise<string[]> {
  const emails: string[] = [];
  let cursor: string | undefined;

  do {
    const res = await fetch(
      `https://api.notion.com/v1/databases/${LEADS_DATABASE_ID}/query`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${NOTION_API_KEY}`,
          'Notion-Version': '2022-06-28',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          filter: { property: 'Estado', select: { equals: 'Nuevo' } },
          page_size: 100,
          ...(cursor ? { start_cursor: cursor } : {}),
        }),
      }
    );

    if (!res.ok) break;
    const data = await res.json() as { results: NotionPage[]; has_more: boolean; next_cursor?: string };

    for (const page of data.results) {
      const emailVal = page.properties?.Email?.email;
      if (emailVal) emails.push(emailVal);
    }

    cursor = data.has_more ? data.next_cursor : undefined;
  } while (cursor);

  return emails;
}

export async function POST(req: NextRequest) {
  try {
    const { secret } = await req.json() as { secret?: string };

    if (!BATCH_SECRET || secret !== BATCH_SECRET) {
      return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
    }

    if (!NOTION_API_KEY || !LEADS_DATABASE_ID || !RESEND_API_KEY) {
      return NextResponse.json({ error: 'missing_config' }, { status: 500 });
    }

    const emails = await getLeadsFromNotion();

    if (emails.length === 0) {
      return NextResponse.json({ sent: 0, message: 'No leads found with Estado=Nuevo' });
    }

    let sent = 0;
    let failed = 0;
    const FROM = 'CryptoLucky <noreply@cryptoluckyguia.com>';
    const SUBJECT = 'Cómo generar dividendos diarios en BetFury (sin riesgo extra)';
    const html = getEmail2Html();

    // Enviar en batches de 10 para no saturar Resend
    const BATCH_SIZE = 10;
    for (let i = 0; i < emails.length; i += BATCH_SIZE) {
      const batch = emails.slice(i, i + BATCH_SIZE);
      await Promise.all(
        batch.map(async (email) => {
          try {
            const res = await fetch('https://api.resend.com/emails', {
              method: 'POST',
              headers: {
                Authorization: `Bearer ${RESEND_API_KEY}`,
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                from: FROM,
                to: [email],
                subject: SUBJECT,
                html,
                tags: [{ name: 'campaign', value: 'batch_email2' }],
              }),
            });
            if (res.ok) sent++;
            else failed++;
          } catch {
            failed++;
          }
        })
      );
      // Pequeña pausa entre batches para respetar rate limits
      if (i + BATCH_SIZE < emails.length) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
    }

    return NextResponse.json({
      success: true,
      total: emails.length,
      sent,
      failed,
    });
  } catch (err) {
    console.error('[email-batch] Error:', err);
    return NextResponse.json({ error: 'server_error' }, { status: 500 });
  }
}

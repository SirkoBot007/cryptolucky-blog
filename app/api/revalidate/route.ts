import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

export async function POST(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get('secret');

  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ message: 'Invalid secret' }, { status: 401 });
  }

  try {
    // Solo /es: las rutas /en hacen 308 -> /es (no hay páginas /en que revalidar).
    revalidatePath('/');
    revalidatePath('/es');
    revalidatePath('/es/blog');
    revalidatePath('/es/blog/[slug]', 'page');

    return NextResponse.json({ revalidated: true, timestamp: Date.now() });
  } catch (err) {
    return NextResponse.json({ message: 'Revalidation error', error: String(err) }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ status: 'ok', message: 'Revalidate endpoint active. Use POST with ?secret=' });
}

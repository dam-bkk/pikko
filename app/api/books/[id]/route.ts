import { ensureSeeded, getBookById } from '@/lib/db';

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  ensureSeeded();
  const { id } = await params;
  const book = getBookById(id);
  if (!book) return Response.json({ error: 'Not found' }, { status: 404 });
  return Response.json({ book });
}

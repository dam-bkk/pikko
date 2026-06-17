import { ensureSeeded, getAllBooks, getFavorites } from '@/lib/db';

export async function GET() {
  ensureSeeded();
  const books = getAllBooks();
  const favorites = getFavorites();
  return Response.json({ books, favorites });
}

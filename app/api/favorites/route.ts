import { toggleFavorite } from '@/lib/db';

export async function POST(req: Request) {
  const { bookId } = await req.json();
  const isFavorite = toggleFavorite(bookId);
  return Response.json({ isFavorite });
}

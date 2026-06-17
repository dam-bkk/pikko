import { startSession, updateSession, recordVocabExposure } from '@/lib/db';

export async function POST(req: Request) {
  const body = await req.json();
  const { action, bookId, sessionId, pagesRead, completed, vocabWords } = body;

  if (action === 'start') {
    const id = startSession(bookId);
    return Response.json({ sessionId: id });
  }

  if (action === 'update') {
    updateSession(sessionId, pagesRead, completed);
    if (vocabWords?.length) {
      recordVocabExposure(sessionId, bookId, vocabWords);
    }
    return Response.json({ ok: true });
  }

  return Response.json({ error: 'Unknown action' }, { status: 400 });
}

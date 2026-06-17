import { getStreak, getWeeklyStats, getVocabularyProgress } from '@/lib/db';

export async function GET() {
  const streak = getStreak();
  const sessions = getWeeklyStats();
  const vocabulary = getVocabularyProgress();

  const booksReadThisWeek = sessions.filter((s) => s.completed).length;
  const totalTimeSeconds = sessions.reduce((sum, s) => sum + (s.total_time_seconds || 0), 0);

  return Response.json({ streak, booksReadThisWeek, totalTimeSeconds, vocabulary, sessions });
}

import { redirect } from 'next/navigation';
import { auth } from '@/auth';
import { getChildProfile, getAllBooks, getStreak, ensureSeeded } from '@/lib/db';
import KidsDashboard from './KidsDashboard';

export default async function KidsPage() {
  const session = await auth();
  const email   = session?.user?.email;

  if (!email) redirect('/parent/login');

  ensureSeeded();

  const profile = getChildProfile(email);
  if (!profile?.child_name) redirect('/onboarding');

  const books  = getAllBooks();
  const streak = getStreak();

  return (
    <KidsDashboard
      profile={profile}
      books={books}
      streak={streak.current_streak ?? 0}
    />
  );
}

import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { submitStory, getStorySubmissions, useBookCredit, getBookCredits, ensureSeeded } from '@/lib/db';

async function getEmail(): Promise<string | null> {
  const session = await auth();
  return session?.user?.email ?? null;
}

export async function GET() {
  const email = await getEmail();
  if (!email) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  ensureSeeded();
  const submissions = getStorySubmissions(email);
  const credits     = getBookCredits(email);
  return NextResponse.json({ submissions, credits });
}

export async function POST(req: NextRequest) {
  const email = await getEmail();
  if (!email) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  ensureSeeded();

  const credits = getBookCredits(email);
  if (credits <= 0) {
    return NextResponse.json({ error: 'No book credits available' }, { status: 403 });
  }

  const { title, narratorName, body, ageRange } = await req.json();
  if (!title || !body) {
    return NextResponse.json({ error: 'title and body required' }, { status: 400 });
  }

  useBookCredit(email);
  const submission = submitStory(email, title, narratorName ?? '', body, ageRange ?? '4-6');
  return NextResponse.json({ submission });
}

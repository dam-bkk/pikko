import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { getChildProfile, upsertChildProfile, addXp, ensureSeeded } from '@/lib/db';

async function requireEmail(): Promise<string | null> {
  const session = await auth();
  return session?.user?.email ?? null;
}

export async function GET() {
  const email = await requireEmail();
  if (!email) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  ensureSeeded();
  const profile = getChildProfile(email);
  return NextResponse.json({ profile });
}

export async function POST(req: NextRequest) {
  const email = await requireEmail();
  if (!email) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  ensureSeeded();
  const { childName, childAvatar } = await req.json();
  const profile = upsertChildProfile(email, childName ?? '', childAvatar ?? 'rabbit');
  return NextResponse.json({ profile });
}

export async function PATCH(req: NextRequest) {
  const email = await requireEmail();
  if (!email) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  ensureSeeded();
  const { xp } = await req.json();
  const profile = addXp(email, typeof xp === 'number' ? xp : 50);
  return NextResponse.json({ profile });
}

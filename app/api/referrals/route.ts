import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { createReferral, getReferrals, getBookCredits, ensureSeeded } from '@/lib/db';

async function getEmail(): Promise<string | null> {
  const session = await auth();
  return session?.user?.email ?? null;
}

export async function GET() {
  const email = await getEmail();
  if (!email) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  ensureSeeded();
  const referrals = getReferrals(email);
  const credits   = getBookCredits(email);
  return NextResponse.json({ referrals, credits });
}

export async function POST(req: NextRequest) {
  const email = await getEmail();
  if (!email) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  ensureSeeded();
  const { referredName, referredEmail } = await req.json();
  if (!referredName || !referredEmail) {
    return NextResponse.json({ error: 'referredName and referredEmail required' }, { status: 400 });
  }
  createReferral(email, referredName, referredEmail);
  const referrals = getReferrals(email);
  const credits   = getBookCredits(email);
  return NextResponse.json({ referrals, credits });
}

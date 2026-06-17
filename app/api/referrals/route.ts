import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { createReferral, getReferrals, getBookCredits, grantBookCredit, ensureSeeded } from '@/lib/db';

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
  // Demo: grant the referrer a story credit immediately so the funnel
  // (sponsor → earn credit → submit story) is walkable end-to-end.
  // In production this should be gated on the referred user actually signing up.
  grantBookCredit(email);
  const referrals = getReferrals(email);
  const credits   = getBookCredits(email);
  return NextResponse.json({ referrals, credits });
}

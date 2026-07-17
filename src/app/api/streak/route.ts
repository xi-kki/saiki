import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { users, dailyStreaks } from '@/db/schema';
import { eq, and, desc } from 'drizzle-orm';
import { getToday } from '@/lib/utils';

export async function GET() {
  try {
    // TODO: Get actual user from session
    const userId = 'demo-user';

    const user = await db.query.users.findFirst({
      where: eq(users.id, userId),
    });

    if (!user) {
      return NextResponse.json({ streak: 0, xp: 0, level: 1 });
    }

    return NextResponse.json({
      streak: user.streak || 0,
      bestStreak: user.bestStreak || 0,
      xp: user.xp || 0,
      level: user.level || 1,
      totalRead: user.totalRead || 0,
      totalFaved: user.totalFaved || 0,
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch streak' },
      { status: 500 }
    );
  }
}

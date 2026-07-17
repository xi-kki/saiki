import { db } from './db';
import { tips, favorites, readingHistory, dailyStreaks } from '@/db/schema';
import { eq, and, desc, sql } from 'drizzle-orm';
import { getToday, generateId, calculateXp } from './utils';

// ─── Get Today's Tips ────────────────────────────────────
export async function getTodaysTips(limit = 3) {
  const today = getToday();
  const todayStart = new Date(today).getTime();
  const todayEnd = todayStart + 86400000;

  return db.query.tips.findMany({
    where: and(
      sql`${tips.publishedAt} >= ${todayStart}`,
      sql`${tips.publishedAt} < ${todayEnd}`
    ),
    orderBy: [desc(tips.publishedAt)],
    limit,
  });
}

// ─── Get All Tips (Feed) ─────────────────────────────────
export async function getAllTips(page = 1, limit = 20, school?: string) {
  const offset = (page - 1) * limit;
  const where = school ? eq(tips.school, school) : undefined;

  return db.query.tips.findMany({
    where,
    orderBy: [desc(tips.publishedAt)],
    limit,
    offset,
  });
}

// ─── Get Single Tip ──────────────────────────────────────
export async function getTipById(id: string) {
  return db.query.tips.findFirst({
    where: eq(tips.id, id),
  });
}

// ─── Record Reading ──────────────────────────────────────
export async function recordReading(userId: string, tipId: string) {
  const today = getToday();

  // Record in history
  await db.insert(readingHistory).values({
    id: generateId(),
    userId,
    tipId,
  });

  // Update tip views
  await db
    .update(tips)
    .set({ views: sql`${tips.views} + 1` })
    .where(eq(tips.id, tipId));

  // Update daily streak
  const existing = await db.query.dailyStreaks.findFirst({
    where: and(
      eq(dailyStreaks.userId, userId),
      eq(dailyStreaks.date, today)
    ),
  });

  if (existing) {
    await db
      .update(dailyStreaks)
      .set({
        tipsRead: existing.tipsRead + 1,
        xpEarned: existing.xpEarned + 10,
        completed: true,
      })
      .where(eq(dailyStreaks.id, existing.id));
  } else {
    await db.insert(dailyStreaks).values({
      id: generateId(),
      userId,
      date: today,
      tipsRead: 1,
      xpEarned: 10,
      completed: true,
    });
  }

  // Update user stats
  const user = await db.query.users.findFirst({
    where: eq(users.id, userId),
  });

  if (user) {
    const newStreak = await calculateStreak(userId);
    const xp = calculateXp(user.totalRead + 1, newStreak, false);

    await db
      .update(users)
      .set({
        totalRead: user.totalRead + 1,
        streak: newStreak,
        bestStreak: Math.max(user.bestStreak || 0, newStreak),
        xp: user.xp + xp,
      })
      .where(eq(users.id, userId));
  }
}

// ─── Calculate Streak ────────────────────────────────────
async function calculateStreak(userId: string): Promise<number> {
  const records = await db.query.dailyStreaks.findMany({
    where: eq(dailyStreaks.userId, userId),
    orderBy: [desc(dailyStreaks.date)],
    limit: 60,
  });

  let streak = 0;
  const today = getToday();

  for (const record of records) {
    if (!record.completed) break;

    const expectedDate = new Date();
    expectedDate.setDate(expectedDate.getDate() - streak);
    const expected = expectedDate.toISOString().split('T')[0];

    if (record.date === expected) {
      streak++;
    } else if (record.date === today && streak === 0) {
      streak++; // Count today
    } else {
      break;
    }
  }

  return streak;
}

// ─── Toggle Favorite ─────────────────────────────────────
export async function toggleFavorite(userId: string, tipId: string, note?: string) {
  const existing = await db.query.favorites.findFirst({
    where: and(
      eq(favorites.userId, userId),
      eq(favorites.tipId, tipId)
    ),
  });

  if (existing) {
    await db.delete(favorites).where(eq(favorites.id, existing.id));
    return { favorited: false };
  } else {
    await db.insert(favorites).values({
      id: generateId(),
      userId,
      tipId,
      note,
    });

    // Update user's fave count
    await db
      .update(users)
      .set({ totalFaved: sql`${users.totalFaved} + 1` })
      .where(eq(users.id, userId));

    return { favorited: true };
  }
}

// ─── Get User Favorites ──────────────────────────────────
export async function getUserFavorites(userId: string) {
  return db.query.favorites.findMany({
    where: eq(favorites.userId, userId),
    orderBy: [desc(favorites.createdAt)],
  });
}

// ─── Check if Favorited ──────────────────────────────────
export async function isFavorited(userId: string, tipId: string): Promise<boolean> {
  const existing = await db.query.favorites.findFirst({
    where: and(
      eq(favorites.userId, userId),
      eq(favorites.tipId, tipId)
    ),
  });
  return !!existing;
}

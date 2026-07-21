import { sqliteTable, text, integer, real } from 'drizzle-orm/sqlite-core';
import { relations } from 'drizzle-orm';

// ─── Users ───────────────────────────────────────────────
export const users = sqliteTable('users', {
  id: text('id').primaryKey(),
  name: text('name'),
  email: text('email').notNull().unique(),
  emailVerified: integer('email_verified', { mode: 'timestamp_ms' }),
  image: text('image'),
  // Saiki-specific fields
  streak: integer('streak').default(0),
  bestStreak: integer('best_streak').default(0),
  totalRead: integer('total_read').default(0),
  totalFaved: integer('total_faved').default(0),
  xp: integer('xp').default(0),
  level: integer('level').default(1),
  preferredSchools: text('preferred_schools'), // JSON array
  pushSubscription: text('push_subscription'), // JSON
  emailDigest: integer('email_digest', { mode: 'boolean' }).default(true),
  createdAt: integer('created_at', { mode: 'timestamp_ms' }).$defaultFn(() => new Date()),
});

// ─── Accounts (NextAuth) ─────────────────────────────────
export const accounts = sqliteTable('accounts', {
  id: text('id').primaryKey(),
  userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  type: text('type').notNull(),
  provider: text('provider').notNull(),
  providerAccountId: text('provider_account_id').notNull(),
  refreshToken: text('refresh_token'),
  accessToken: text('access_token'),
  expiresAt: integer('expires_at'),
  tokenType: text('token_type'),
  scope: text('scope'),
  idToken: text('id_token'),
  sessionState: text('session_state'),
});

// ─── Sessions (NextAuth) ─────────────────────────────────
export const sessions = sqliteTable('sessions', {
  id: text('id').primaryKey(),
  sessionToken: text('session_token').notNull().unique(),
  userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  expires: integer('expires', { mode: 'timestamp_ms' }).notNull(),
});

// ─── Tips ────────────────────────────────────────────────
export const tips = sqliteTable('tips', {
  id: text('id').primaryKey(),
  title: text('title').notNull(),
  content: text('content').notNull(),
  summary: text('summary'), // Short summary for notifications
  school: text('school').notNull(), // stoicism, existentialism, behaviorism, etc.
  thinker: text('thinker'), // Marcus Aurelius, Nietzsche, etc.
  source: text('source'), // Original source work
  category: text('category').notNull(), // philosophy, psychology, neuroscience
  difficulty: text('difficulty').default('intermediate'), // beginner, intermediate, advanced
  // Engagement
  likes: integer('likes').default(0),
  views: integer('views').default(0),
  // Meta
  generatedBy: text('generated_by').default('ai'), // ai, curated
  publishedAt: integer('published_at', { mode: 'timestamp_ms' }),
  createdAt: integer('created_at', { mode: 'timestamp_ms' }).$defaultFn(() => new Date()),
});

// ─── User Favorites ──────────────────────────────────────
export const favorites = sqliteTable('favorites', {
  id: text('id').primaryKey(),
  userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  tipId: text('tip_id').notNull().references(() => tips.id, { onDelete: 'cascade' }),
  note: text('note'), // Personal reflection
  createdAt: integer('created_at', { mode: 'timestamp_ms' }).$defaultFn(() => new Date()),
});

// ─── Reading History ─────────────────────────────────────
export const readingHistory = sqliteTable('reading_history', {
  id: text('id').primaryKey(),
  userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  tipId: text('tip_id').notNull().references(() => tips.id, { onDelete: 'cascade' }),
  readAt: integer('read_at', { mode: 'timestamp_ms' }).$defaultFn(() => new Date()),
  timeSpent: integer('time_spent'), // seconds
});

// ─── Daily Streaks ───────────────────────────────────────
export const dailyStreaks = sqliteTable('daily_streaks', {
  id: text('id').primaryKey(),
  userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  date: text('date').notNull(), // YYYY-MM-DD
  tipsRead: integer('tips_read').default(0),
  xpEarned: integer('xp_earned').default(0),
  completed: integer('completed', { mode: 'boolean' }).default(false),
});

// ─── Push Subscriptions ──────────────────────────────────
export const pushSubscriptions = sqliteTable('push_subscriptions', {
  id: text('id').primaryKey(),
  userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  endpoint: text('endpoint').notNull(),
  p256dh: text('p256dh').notNull(),
  auth: text('auth').notNull(),
  createdAt: integer('created_at', { mode: 'timestamp_ms' }).$defaultFn(() => new Date()),
});

// ─── Relations ───────────────────────────────────────────
export const usersRelations = relations(users, ({ many }) => ({
  accounts: many(accounts),
  sessions: many(sessions),
  favorites: many(favorites),
  readingHistory: many(readingHistory),
  dailyStreaks: many(dailyStreaks),
  pushSubscriptions: many(pushSubscriptions),
}));

export const tipsRelations = relations(tips, ({ many }) => ({
  favorites: many(favorites),
  readingHistory: many(readingHistory),
}));

export const favoritesRelations = relations(favorites, ({ one }) => ({
  user: one(users, { fields: [favorites.userId], references: [users.id] }),
  tip: one(tips, { fields: [favorites.tipId], references: [tips.id] }),
}));

export const readingHistoryRelations = relations(readingHistory, ({ one }) => ({
  user: one(users, { fields: [readingHistory.userId], references: [users.id] }),
  tip: one(tips, { fields: [readingHistory.tipId], references: [tips.id] }),
}));

export const dailyStreaksRelations = relations(dailyStreaks, ({ one }) => ({
  user: one(users, { fields: [dailyStreaks.userId], references: [users.id] }),
}));

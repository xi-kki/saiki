import { type ClassValue, clsx } from 'clsx';

// Simple cn utility (no twMerge dependency needed for now)
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

// ─── XP & Levels ─────────────────────────────────────────
export function calculateXp(tipsRead: number, streak: number, hasFaved: boolean): number {
  let xp = 10; // Base XP per tip
  if (streak >= 7) xp += 5; // Streak bonus
  if (streak >= 30) xp += 10;
  if (hasFaved) xp += 3; // Engagement bonus
  return xp;
}

export function getLevel(xp: number): { level: number; progress: number; nextLevelXp: number } {
  const levels = [0, 50, 150, 300, 500, 750, 1050, 1400, 1800, 2250, 2800, 3500, 4300, 5200, 6200];
  let level = 1;
  for (let i = 1; i < levels.length; i++) {
    if (xp >= levels[i]) level = i + 1;
    else break;
  }
  const currentLevelXp = levels[level - 1] || 0;
  const nextLevelXp = levels[level] || levels[levels.length - 1] + 1000;
  const progress = ((xp - currentLevelXp) / (nextLevelXp - currentLevelXp)) * 100;
  return { level, progress: Math.min(progress, 100), nextLevelXp };
}

export function getLevelTitle(level: number): string {
  const titles: Record<number, string> = {
    1: 'Seeker',
    2: 'Student',
    3: 'Thinker',
    4: 'Scholar',
    5: 'Sage',
    6: 'Philosopher',
    7: 'Stoic',
    8: 'Enlightened',
    9: 'Master',
    10: 'Oracle',
  };
  return titles[level] || 'Oracle';
}

// ─── Schools of Thought ──────────────────────────────────
export const SCHOOLS = [
  { id: 'stoicism', name: 'Stoicism', icon: '🏛️', color: '#c9a84c' },
  { id: 'existentialism', name: 'Existentialism', icon: '🌑', color: '#8b5cf6' },
  { id: 'behaviorism', name: 'Behaviorism', icon: '🐀', color: '#3b82f6' },
  { id: 'jungian', name: 'Jungian Psychology', icon: '🔮', color: '#a855f7' },
  { id: 'buddhist', name: 'Buddhist Philosophy', icon: '🪷', color: '#f59e0b' },
  { id: 'nihilism', name: 'Nihilism', icon: '🕳️', color: '#6b7280' },
  { id: 'absurdism', name: 'Absurdism', icon: '🎭', color: '#ef4444' },
  { id: 'pragmatism', name: 'Pragmatism', icon: '🔧', color: '#10b981' },
  { id: 'humanism', name: 'Humanism', icon: '🤝', color: '#f97316' },
  { id: 'cognitive', name: 'Cognitive Psychology', icon: '🧠', color: '#06b6d4' },
  { id: 'freudian', name: 'Freudian Psychology', icon: '🛋️', color: '#ec4899' },
  { id: 'taoism', name: 'Taoism', icon: '☯️', color: '#22d3ee' },
] as const;

export type SchoolId = typeof SCHOOLS[number]['id'];

// ─── Date Helpers ────────────────────────────────────────
export function getToday(): string {
  return new Date().toISOString().split('T')[0];
}

export function formatDate(timestamp: number): string {
  return new Date(timestamp).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export function getStreakEmoji(streak: number): string {
  if (streak >= 30) return '🔥';
  if (streak >= 14) return '⚡';
  if (streak >= 7) return '✨';
  if (streak >= 3) return '🌱';
  return '📖';
}

// ─── Generate unique ID ──────────────────────────────────
export function generateId(): string {
  return crypto.randomUUID();
}

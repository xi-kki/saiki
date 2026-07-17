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

// ─── Content Categories ─────────────────────────────────
export type ContentCategory = 'philosophy' | 'psychology' | 'mental-model' | 'meta-thinking' | 'thought-experiment' | 'empirical' | 'mind';

export const CONTENT_CATEGORIES: Record<ContentCategory, { name: string; icon: string; color: string; description: string }> = {
  philosophy: { name: 'Philosophy', icon: '📜', color: '#c9a84c', description: 'Wisdom from the great thinkers' },
  psychology: { name: 'Psychology', icon: '🧠', color: '#a855f7', description: 'How the mind works' },
  'mental-model': { name: 'Mental Models', icon: '🗺️', color: '#3b82f6', description: 'Frameworks for thinking clearly' },
  'meta-thinking': { name: 'Meta Thinking', icon: '🪞', color: '#06b6d4', description: 'Thinking about thinking' },
  'thought-experiment': { name: 'Thought Experiments', icon: '🧪', color: '#f59e0b', description: 'Hypothetical scenarios that reveal truth' },
  empirical: { name: 'Empirical Evidence', icon: '🔬', color: '#10b981', description: 'Experiments that prove ideas true' },
  mind: { name: 'Mind Science', icon: '⚡', color: '#ec4899', description: 'How to sharpen, reprogram, and master your mind' },
};

// ─── Schools of Thought ──────────────────────────────────
export const SCHOOLS = [
  // Philosophy
  { id: 'stoicism', name: 'Stoicism', icon: '🏛️', color: '#c9a84c', category: 'philosophy' as const },
  { id: 'existentialism', name: 'Existentialism', icon: '🌑', color: '#8b5cf6', category: 'philosophy' as const },
  { id: 'buddhist', name: 'Buddhist Philosophy', icon: '🪷', color: '#f59e0b', category: 'philosophy' as const },
  { id: 'nihilism', name: 'Nihilism', icon: '🕳️', color: '#6b7280', category: 'philosophy' as const },
  { id: 'absurdism', name: 'Absurdism', icon: '🎭', color: '#ef4444', category: 'philosophy' as const },
  { id: 'pragmatism', name: 'Pragmatism', icon: '🔧', color: '#10b981', category: 'philosophy' as const },
  { id: 'humanism', name: 'Humanism', icon: '🤝', color: '#f97316', category: 'philosophy' as const },
  { id: 'taoism', name: 'Taoism', icon: '☯️', color: '#22d3ee', category: 'philosophy' as const },
  // Psychology
  { id: 'behaviorism', name: 'Behaviorism', icon: '🐀', color: '#3b82f6', category: 'psychology' as const },
  { id: 'jungian', name: 'Jungian Psychology', icon: '🔮', color: '#a855f7', category: 'psychology' as const },
  { id: 'cognitive', name: 'Cognitive Psychology', icon: '🧠', color: '#06b6d4', category: 'psychology' as const },
  { id: 'freudian', name: 'Freudian Psychology', icon: '🛋️', color: '#ec4899', category: 'psychology' as const },
  // Mental Models
  { id: 'inversion', name: 'Inversion', icon: '🔄', color: '#f97316', category: 'mental-model' as const },
  { id: 'first-principles', name: 'First Principles', icon: '💎', color: '#8b5cf6', category: 'mental-model' as const },
  { id: 'second-order', name: 'Second-Order Thinking', icon: '♟️', color: '#06b6d4', category: 'mental-model' as const },
  { id: 'map-territory', name: 'Map vs Territory', icon: '🗺️', color: '#10b981', category: 'mental-model' as const },
  { id: 'bayesian', name: 'Bayesian Thinking', icon: '📊', color: '#f59e0b', category: 'mental-model' as const },
  { id: 'circle-competence', name: 'Circle of Competence', icon: '⭕', color: '#ef4444', category: 'mental-model' as const },
  { id: 'probabilistic', name: 'Probabilistic Thinking', icon: '🎲', color: '#a855f7', category: 'mental-model' as const },
  // Meta Thinking
  { id: 'cognitive-biases', name: 'Cognitive Biases', icon: '🪞', color: '#ec4899', category: 'meta-thinking' as const },
  { id: 'steel-manning', name: 'Steel Manning', icon: '🛡️', color: '#3b82f6', category: 'meta-thinking' as const },
  { id: 'epistemic-humility', name: 'Epistemic Humility', icon: '🙏', color: '#c9a84c', category: 'meta-thinking' as const },
  { id: 'paul-graham', name: 'Paul Graham Essays', icon: '✍️', color: '#f97316', category: 'meta-thinking' as const },
  // Thought Experiments
  { id: 'trolley-problem', name: 'Trolley Problems', icon: '🚃', color: '#ef4444', category: 'thought-experiment' as const },
  { id: 'veil-ignorance', name: 'Veil of Ignorance', icon: '🥷', color: '#8b5cf6', category: 'thought-experiment' as const },
  { id: 'chinese-room', name: 'Chinese Room', icon: '🚪', color: '#06b6d4', category: 'thought-experiment' as const },
  { id: 'experience-machine', name: 'Experience Machine', icon: '🎮', color: '#a855f7', category: 'thought-experiment' as const },
  { id: 'ship-theseus', name: 'Ship of Theseus', icon: '🚢', color: '#f59e0b', category: 'thought-experiment' as const },
  { id: 'brain-vat', name: 'Brain in a Vat', icon: '🧪', color: '#10b981', category: 'thought-experiment' as const },
  // Empirical Evidence
  { id: 'stanford-prison', name: 'Stanford Prison Experiment', icon: '👮', color: '#ef4444', category: 'empirical' as const },
  { id: 'milgram', name: 'Milgram Obedience Study', icon: '⚡', color: '#f59e0b', category: 'empirical' as const },
  { id: 'marshmallow', name: 'Marshmallow Test', icon: '🍫', color: '#ec4899', category: 'empirical' as const },
  { id: 'dunbar-number', name: "Dunbar's Number", icon: '👥', color: '#3b82f6', category: 'empirical' as const },
  { id: '10000-hours', name: '10,000 Hour Rule', icon: '⏱️', color: '#c9a84c', category: 'empirical' as const },
  { id: 'hedonic-treadmill', name: 'Hedonic Treadmill', icon: '🏃', color: '#06b6d4', category: 'empirical' as const },
  { id: 'clever-hans', name: 'Clever Hans Effect', icon: '🐴', color: '#f97316', category: 'empirical' as const },
  // Mind Science
  { id: 'subconscious', name: 'The Subconscious', icon: '🌙', color: '#a855f7', category: 'mind' as const },
  { id: 'neuroplasticity', name: 'Neuroplasticity', icon: '🧬', color: '#3b82f6', category: 'mind' as const },
  { id: 'focus-attention', name: 'Focus & Attention', icon: '🎯', color: '#ef4444', category: 'mind' as const },
  { id: 'mental-models-mind', name: 'Mental Sharpening', icon: '⚔️', color: '#c9a84c', category: 'mind' as const },
  { id: 'emotional-intelligence', name: 'Emotional Intelligence', icon: '💓', color: '#ec4899', category: 'mind' as const },
  { id: 'meditation-mindfulness', name: 'Meditation & Mindfulness', icon: '🧘', color: '#10b981', category: 'mind' as const },
  { id: 'memory-cognition', name: 'Memory & Cognition', icon: '💾', color: '#f59e0b', category: 'mind' as const },
  { id: 'unconscious-biases', name: 'Unconscious Biases', icon: '🎭', color: '#06b6d4', category: 'mind' as const },
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

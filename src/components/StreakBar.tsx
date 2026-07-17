'use client';

import { motion } from 'framer-motion';
import { Flame, Star, Zap } from 'lucide-react';
import { getLevel, getLevelTitle, getStreakEmoji } from '@/lib/utils';

export default function StreakBar({
  streak,
  xp,
  totalRead,
}: {
  streak: number;
  xp: number;
  totalRead: number;
}) {
  const { level, progress } = getLevel(xp);
  const title = getLevelTitle(level);
  const emoji = getStreakEmoji(streak);

  return (
    <div className="rounded-2xl border border-saiki-border/50 bg-saiki-card/60 p-5">
      {/* Streak */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-2xl">
            <span className="fire-animation">{emoji}</span>
            <span className="font-bold text-saiki-accent">{streak}</span>
          </div>
          <div>
            <p className="text-sm font-medium text-saiki-text">Day Streak</p>
            <p className="text-xs text-saiki-muted">
              {streak >= 30 ? 'Legendary!' : streak >= 7 ? 'On fire!' : streak >= 3 ? 'Building momentum' : 'Keep going'}
            </p>
          </div>
        </div>

        <div className="text-right">
          <div className="flex items-center gap-1 text-saiki-accent">
            <Zap size={14} />
            <span className="font-semibold">{xp}</span>
            <span className="text-xs text-saiki-muted">XP</span>
          </div>
        </div>
      </div>

      {/* Level Progress */}
      <div className="mb-3">
        <div className="flex items-center justify-between text-xs mb-1.5">
          <span className="flex items-center gap-1 text-saiki-muted">
            <Star size={10} className="text-saiki-accent" />
            Level {level}: {title}
          </span>
          <span className="text-saiki-muted">{Math.round(progress)}%</span>
        </div>
        <div className="h-1.5 overflow-hidden rounded-full bg-saiki-border/50">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="h-full rounded-full bg-gradient-to-r from-saiki-accent/80 to-saiki-gold"
          />
        </div>
      </div>

      {/* Stats Row */}
      <div className="flex items-center justify-between border-t border-saiki-border/30 pt-3 text-xs text-saiki-muted">
        <span>{totalRead} tips read</span>
        <span>{30 - streak > 0 ? `${30 - streak} days to next milestone` : 'Milestone reached!'}</span>
      </div>
    </div>
  );
}

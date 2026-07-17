'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, BookOpen, Brain } from 'lucide-react';
import Header from '@/components/Header';
import TipCard from '@/components/TipCard';
import StreakBar from '@/components/StreakBar';
import QuoteHero from '@/components/QuoteHero';

// Demo data for MVP preview
const demoTips = [
  {
    id: '1',
    title: 'The Dichotomy of Control',
    content: 'Epictetus taught that some things are within our control and others are not. Our opinions, desires, and aversions are up to us. Our bodies, possessions, and reputations are not. Freedom comes from focusing only on what you can control and accepting what you cannot.',
    summary: 'Focus only on what you can control — your thoughts, actions, and character.',
    school: 'stoicism',
    thinker: 'Epictetus',
    source: 'Enchiridion',
    category: 'philosophy',
    difficulty: 'beginner',
    likes: 42,
    views: 180,
  },
  {
    id: '2',
    title: 'The Shadow Self',
    content: 'Carl Jung believed everyone carries a "shadow" — the unconscious parts of ourselves we reject or deny. This shadow contains instincts, desires, and traits we\'ve been taught to hide. Shadow work involves acknowledging and integrating these parts, not destroying them. Wholeness comes not from perfection, but from accepting all parts of yourself.',
    summary: 'Your shadow isn\'t your enemy — it\'s the key to wholeness.',
    school: 'jungian',
    thinker: 'Carl Jung',
    source: 'Aion',
    category: 'psychology',
    difficulty: 'intermediate',
    likes: 38,
    views: 156,
  },
  {
    id: '3',
    title: 'The Absurd Hero',
    content: 'Camus argued that life is inherently meaningless — the universe offers no answers. But instead of despair, he proposed we embrace the absurd. Like Sisyphus rolling his boulder, we can find joy in the struggle itself. "One must imagine Sisyphus happy." The meaning isn\'t out there. It\'s in the act of living fully, despite the void.',
    summary: 'Meaning isn\'t found — it\'s created in the act of living fully.',
    school: 'absurdism',
    thinker: 'Albert Camus',
    source: 'The Myth of Sisyphus',
    category: 'philosophy',
    difficulty: 'advanced',
    likes: 55,
    views: 230,
  },
];

export default function HomePage() {
  const [tips, setTips] = useState(demoTips);
  const [loading, setLoading] = useState(false);

  return (
    <div className="min-h-screen">
      <Header streak={7} />

      <main className="mx-auto max-w-3xl px-4 pt-24 pb-12">
        {/* Greeting */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-saiki-text md:text-4xl">
            Good evening, <span className="text-gold-gradient">Isaac</span>
          </h1>
          <p className="mt-2 text-saiki-muted">
            Here&apos;s your daily wisdom. 3 insights curated for your mind.
          </p>
        </motion.div>

        {/* Streak Bar */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <StreakBar streak={7} xp={285} totalRead={42} />
        </motion.div>

        {/* Quote Hero */}
        <QuoteHero />

        {/* Today's Tips Header */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles size={18} className="text-saiki-accent" />
            <h2 className="text-lg font-semibold text-saiki-text">Today&apos;s Tips</h2>
          </div>
          <span className="text-xs text-saiki-muted">July 17, 2026</span>
        </div>

        {/* Tips */}
        <div className="space-y-4">
          {tips.map((tip, i) => (
            <TipCard key={tip.id} tip={tip} index={i} />
          ))}
        </div>

        {/* CTA to see more */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-8 text-center"
        >
          <a
            href="/history"
            className="inline-flex items-center gap-2 rounded-full border border-saiki-border/50 bg-saiki-card/50 px-6 py-3 text-sm font-medium text-saiki-muted transition-all hover:border-saiki-accent/50 hover:text-saiki-accent"
          >
            <BookOpen size={16} />
            Browse All Tips
            <ArrowRight size={14} />
          </a>
        </motion.div>

        {/* Stats Preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-12 grid grid-cols-3 gap-4"
        >
          <div className="rounded-xl border border-saiki-border/30 bg-saiki-card/30 p-4 text-center">
            <Brain size={20} className="mx-auto mb-2 text-saiki-accent" />
            <p className="text-2xl font-bold text-saiki-text">12</p>
            <p className="text-xs text-saiki-muted">Schools</p>
          </div>
          <div className="rounded-xl border border-saiki-border/30 bg-saiki-card/30 p-4 text-center">
            <BookOpen size={20} className="mx-auto mb-2 text-saiki-accent" />
            <p className="text-2xl font-bold text-saiki-text">365+</p>
            <p className="text-xs text-saiki-muted">Tips/Year</p>
          </div>
          <div className="rounded-xl border border-saiki-border/30 bg-saiki-card/30 p-4 text-center">
            <Sparkles size={20} className="mx-auto mb-2 text-saiki-accent" />
            <p className="text-2xl font-bold text-saiki-text">AI</p>
            <p className="text-xs text-saiki-muted">Personalized</p>
          </div>
        </motion.div>
      </main>
    </div>
  );
}

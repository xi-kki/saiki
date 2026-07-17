'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Calendar, TrendingUp } from 'lucide-react';
import Header from '@/components/Header';
import TipCard from '@/components/TipCard';
import SchoolFilter from '@/components/SchoolFilter';

const demoFeed = [
  {
    id: '3',
    title: 'The Absurd Hero',
    content: 'Camus argued that life is inherently meaningless.',
    summary: 'Meaning isn\'t found — it\'s created in the act of living fully.',
    school: 'absurdism',
    thinker: 'Albert Camus',
    source: 'The Myth of Sisyphus',
    category: 'philosophy',
    likes: 55,
    views: 230,
  },
  {
    id: '4',
    title: 'Operant Conditioning',
    content: 'B.F. Skinner demonstrated that behavior is shaped by consequences.',
    summary: 'Behavior is shaped by what follows it — reinforcement and punishment.',
    school: 'behaviorism',
    thinker: 'B.F. Skinner',
    source: 'Beyond Freedom and Dignity',
    category: 'psychology',
    likes: 31,
    views: 142,
  },
  {
    id: '5',
    title: 'The Tao of Nothing',
    content: 'Lao Tzu taught that the Tao that can be spoken is not the eternal Tao.',
    summary: 'True wisdom lies in embracing the void, not filling it.',
    school: 'taoism',
    thinker: 'Lao Tzu',
    source: 'Tao Te Ching',
    category: 'philosophy',
    likes: 47,
    views: 198,
  },
  {
    id: '6',
    title: 'Cognitive Dissonance',
    content: 'Leon Festinger showed that holding contradictory beliefs creates psychological discomfort.',
    summary: 'We change our beliefs to match our actions, not the other way around.',
    school: 'cognitive',
    thinker: 'Leon Festinger',
    source: 'A Theory of Cognitive Dissonance',
    category: 'psychology',
    likes: 39,
    views: 167,
  },
  {
    id: '7',
    title: 'The Will to Power',
    content: 'Nietzsche saw the will to power as the fundamental drive of all life.',
    summary: 'Growth, creativity, and self-overcoming are expressions of your will to power.',
    school: 'existentialism',
    thinker: 'Friedrich Nietzsche',
    source: 'Thus Spoke Zarathustra',
    category: 'philosophy',
    likes: 52,
    views: 215,
  },
];

export default function HistoryPage() {
  const [filter, setFilter] = useState<string | null>(null);

  const filtered = filter ? demoFeed.filter((t) => t.school === filter) : demoFeed;

  return (
    <div className="min-h-screen">
      <Header />

      <main className="mx-auto max-w-3xl px-4 pt-24 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-2">
            <BookOpen size={24} className="text-saiki-accent" />
            <h1 className="text-3xl font-bold text-saiki-text">Feed</h1>
          </div>
          <p className="text-saiki-muted">
            Browse all tips from every school of thought. New insights daily.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6 grid grid-cols-3 gap-3"
        >
          <div className="rounded-lg border border-saiki-border/30 bg-saiki-card/30 p-3 text-center">
            <Calendar size={16} className="mx-auto mb-1 text-saiki-accent" />
            <p className="text-lg font-bold text-saiki-text">365+</p>
            <p className="text-xs text-saiki-muted">Tips/Year</p>
          </div>
          <div className="rounded-lg border border-saiki-border/30 bg-saiki-card/30 p-3 text-center">
            <TrendingUp size={16} className="mx-auto mb-1 text-saiki-accent" />
            <p className="text-lg font-bold text-saiki-text">12</p>
            <p className="text-xs text-saiki-muted">Schools</p>
          </div>
          <div className="rounded-lg border border-saiki-border/30 bg-saiki-card/30 p-3 text-center">
            <BookOpen size={16} className="mx-auto mb-1 text-saiki-accent" />
            <p className="text-lg font-bold text-saiki-text">50+</p>
            <p className="text-xs text-saiki-muted">Thinkers</p>
          </div>
        </motion.div>

        {/* School Filter */}
        <SchoolFilter selected={filter} onSelect={setFilter} />

        {/* Feed */}
        <div className="space-y-3">
          {filtered.map((tip, i) => (
            <TipCard key={tip.id} tip={tip} index={i} compact />
          ))}
        </div>
      </main>
    </div>
  );
}

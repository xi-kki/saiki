'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Search, Filter } from 'lucide-react';
import Header from '@/components/Header';
import TipCard from '@/components/TipCard';
import SchoolFilter from '@/components/SchoolFilter';

const demoFavorites = [
  {
    id: '1',
    title: 'The Dichotomy of Control',
    content: 'Epictetus taught that some things are within our control and others are not.',
    summary: 'Focus only on what you can control.',
    school: 'stoicism',
    thinker: 'Epictetus',
    source: 'Enchiridion',
    category: 'philosophy',
    likes: 42,
    views: 180,
  },
  {
    id: '2',
    title: 'The Shadow Self',
    content: 'Carl Jung believed everyone carries a shadow.',
    summary: 'Your shadow is the key to wholeness.',
    school: 'jungian',
    thinker: 'Carl Jung',
    source: 'Aion',
    category: 'psychology',
    likes: 38,
    views: 156,
  },
];

export default function FavoritesPage() {
  const [filter, setFilter] = useState<string | null>(null);
  const [search, setSearch] = useState('');

  const filtered = demoFavorites.filter((tip) => {
    if (filter && tip.school !== filter) return false;
    if (search && !tip.title.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

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
            <Heart size={24} className="text-saiki-accent" />
            <h1 className="text-3xl font-bold text-saiki-text">Saved Insights</h1>
          </div>
          <p className="text-saiki-muted">
            Your curated collection of wisdom. {demoFavorites.length} insights saved.
          </p>
        </motion.div>

        {/* Search */}
        <div className="relative mb-4">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-saiki-muted" />
          <input
            type="text"
            placeholder="Search saved tips..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-saiki-border/50 bg-saiki-card/50 py-3 pl-10 pr-4 text-sm text-saiki-text placeholder-saiki-muted/50 focus:border-saiki-accent/50 focus:outline-none"
          />
        </div>

        {/* School Filter */}
        <SchoolFilter selected={filter} onSelect={setFilter} />

        {/* Tips */}
        <div className="space-y-3">
          {filtered.length > 0 ? (
            filtered.map((tip, i) => (
              <TipCard key={tip.id} tip={tip} index={i} isFavorited compact />
            ))
          ) : (
            <div className="rounded-xl border border-dashed border-saiki-border/50 p-12 text-center">
              <Heart size={32} className="mx-auto mb-3 text-saiki-muted/50" />
              <p className="text-sm text-saiki-muted">
                {search ? 'No tips match your search' : 'No saved insights yet. Start exploring!'}
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

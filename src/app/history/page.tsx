'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Brain, Map, Sparkles } from 'lucide-react';
import Header from '@/components/Header';
import TipCard from '@/components/TipCard';
import CategoryTabs from '@/components/CategoryTabs';
import type { ContentCategory } from '@/lib/utils';

interface Tip {
  id: string;
  title: string;
  content: string;
  summary: string;
  school: string;
  thinker: string;
  source: string;
  category: string;
  difficulty: string;
  likes: number;
  views: number;
}

export default function HistoryPage() {
  const [category, setCategory] = useState<ContentCategory | 'all'>('all');
  const [tips, setTips] = useState<Tip[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadTips() {
      setLoading(true);
      try {
        const res = await fetch('/api/tips?limit=50');
        if (res.ok) {
          const data = await res.json();
          setTips(data.tips || []);
        }
      } catch (err) {
        console.error('Failed to load tips:', err);
      } finally {
        setLoading(false);
      }
    }
    loadTips();
  }, []);

  const filtered = category === 'all' ? tips : tips.filter((t) => t.category === category);

  // Count unique schools and categories
  const uniqueSchools = new Set(tips.map((t) => t.school)).size;
  const uniqueCategories = new Set(tips.map((t) => t.category)).size;

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
            Browse all insights — philosophy, psychology, mental models, thought experiments, and empirical evidence.
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
            <Brain size={16} className="mx-auto mb-1 text-saiki-accent" />
            <p className="text-lg font-bold text-saiki-text">{tips.length}</p>
            <p className="text-xs text-saiki-muted">Insights</p>
          </div>
          <div className="rounded-lg border border-saiki-border/30 bg-saiki-card/30 p-3 text-center">
            <Map size={16} className="mx-auto mb-1 text-blue-400" />
            <p className="text-lg font-bold text-saiki-text">{uniqueSchools}</p>
            <p className="text-xs text-saiki-muted">Schools</p>
          </div>
          <div className="rounded-lg border border-saiki-border/30 bg-saiki-card/30 p-3 text-center">
            <Sparkles size={16} className="mx-auto mb-1 text-emerald-400" />
            <p className="text-lg font-bold text-saiki-text">{uniqueCategories}</p>
            <p className="text-xs text-saiki-muted">Categories</p>
          </div>
        </motion.div>

        {/* Category Filter */}
        <CategoryTabs selected={category} onSelect={setCategory} />

        {/* Feed */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="w-8 h-8 border-2 border-[#c9a84c]/30 border-t-[#c9a84c] rounded-full animate-spin" />
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.length > 0 ? (
              filtered.map((tip, i) => (
                <TipCard key={tip.id} tip={tip} index={i} compact />
              ))
            ) : (
              <div className="rounded-xl border border-dashed border-saiki-border/50 p-12 text-center">
                <BookOpen size={32} className="mx-auto mb-3 text-saiki-muted/50" />
                <p className="text-sm text-saiki-muted">
                  {category !== 'all' ? 'No tips in this category yet' : 'No tips available'}
                </p>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

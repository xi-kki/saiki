'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Heart, Share2, BookOpen, Brain, Clock, RefreshCw, Sparkles } from 'lucide-react';
import Header from '@/components/Header';

const SCHOOLS: Record<string, { name: string; color: string; icon: string }> = {
  stoicism: { name: 'Stoicism', color: '#c9a84c', icon: '🏛️' },
  buddhist: { name: 'Buddhism', color: '#f4c542', icon: '☸️' },
  taoism: { name: 'Taoism', color: '#4ecdc4', icon: '☯️' },
  absurdist: { name: 'Absurdism', color: '#ff6b6b', icon: '🎭' },
  logotherapy: { name: 'Logotherapy', color: '#dda0dd', icon: '💡' },
  jungian: { name: 'Jungian', color: '#e07c4f', icon: '🧠' },
  cognitivePsych: { name: 'Cognitive Psychology', color: '#a8e6cf', icon: '🧠' },
  socialPsych: { name: 'Social Psychology', color: '#20c997', icon: '👥' },
  humanism: { name: 'Humanism', color: '#20c997', icon: '🤝' },
  nihilism: { name: 'Nihilism', color: '#6c757d', icon: '🌑' },
  pragmatism: { name: 'Pragmatism', color: '#dda0dd', icon: '🔧' },
  existentialism: { name: 'Existentialism', color: '#7c6aef', icon: '🌀' },
};

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

function estimateReadTime(content: string): number {
  const words = content.split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}

export default function TodayPage() {
  const router = useRouter();
  const [tip, setTip] = useState<Tip | null>(null);
  const [loading, setLoading] = useState(true);
  const [faved, setFaved] = useState(false);
  const [showReflection, setShowReflection] = useState(false);
  const [reflection, setReflection] = useState('');

  useEffect(() => {
    loadRandomTip();
  }, []);

  async function loadRandomTip() {
    setLoading(true);
    try {
      const res = await fetch('/api/tips?limit=50');
      if (res.ok) {
        const data = await res.json();
        const tips = data.tips || [];
        if (tips.length > 0) {
          // Pick a random tip
          const randomIndex = Math.floor(Math.random() * tips.length);
          setTip(tips[randomIndex]);
        }
      }
    } catch (err) {
      console.error('Failed to load tip:', err);
    } finally {
      setLoading(false);
    }
  }

  const handleShare = async () => {
    if (!tip) return;
    if (navigator.share) {
      await navigator.share({ title: tip.title, text: `${tip.title} — ${tip.thinker}`, url: window.location.href });
    }
  };

  const handleSaveReflection = async () => {
    setShowReflection(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="w-12 h-12 border-2 border-[#c9a84c]/30 border-t-[#c9a84c] rounded-full animate-spin mx-auto mb-4" />
            <p className="text-saiki-muted text-sm">Preparing your daily insight...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!tip) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="flex flex-col items-center justify-center min-h-screen gap-4">
          <p className="text-saiki-muted">No tips available yet</p>
          <Link href="/history" className="text-[#c9a84c] hover:underline">Browse the Feed</Link>
        </div>
      </div>
    );
  }

  const school = SCHOOLS[tip.school] || { name: tip.school, color: '#c9a84c', icon: '📚' };
  const readTime = estimateReadTime(tip.content);

  return (
    <div className="min-h-screen">
      <Header />

      <main className="mx-auto max-w-2xl px-4 pt-24 pb-12">
        {/* Top Bar */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-sm text-saiki-muted transition-colors hover:text-saiki-text"
          >
            <ArrowLeft size={16} />
            Back
          </button>

          <button
            onClick={loadRandomTip}
            className="flex items-center gap-2 text-sm text-saiki-accent transition-colors hover:text-[#d4af37]"
          >
            <RefreshCw size={14} />
            New Insight
          </button>
        </motion.div>

        {/* Today Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mb-6 flex justify-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-saiki-accent/30 bg-saiki-accent/10 px-4 py-2">
            <Sparkles size={14} className="text-saiki-accent" />
            <span className="text-sm font-medium text-saiki-accent">Today&apos;s Insight</span>
          </div>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <div className="mb-4 flex items-center gap-2 flex-wrap">
            <span
              className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium"
              style={{ backgroundColor: `${school.color}15`, color: school.color }}
            >
              {school.icon} {school.name}
            </span>
            <span className="rounded-full bg-saiki-border/50 px-2 py-0.5 text-xs text-saiki-muted capitalize">
              {tip.category}
            </span>
          </div>

          <h1 className="mb-3 text-3xl md:text-4xl font-bold leading-tight text-saiki-text font-serif">
            {tip.title}
          </h1>

          <p className="text-lg text-saiki-muted italic">
            — {tip.thinker}
            {tip.source && <span className="not-italic">, {tip.source}</span>}
          </p>
        </motion.div>

        {/* Summary Callout */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8 rounded-xl border border-saiki-accent/20 bg-saiki-accent/5 p-5"
        >
          <div className="flex items-start gap-3">
            <Brain size={18} className="mt-0.5 shrink-0 text-saiki-accent" />
            <div>
              <p className="text-xs font-medium text-saiki-accent mb-1">Key Insight</p>
              <p className="text-sm text-saiki-warm leading-relaxed">{tip.summary}</p>
            </div>
          </div>
        </motion.div>

        {/* Content */}
        <motion.article
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-10"
        >
          {tip.content.split('\n\n').map((para, i) => (
            <p
              key={i}
              className="mb-6 text-base leading-relaxed text-saiki-text/90 first:text-lg first:font-medium first:text-saiki-text"
            >
              {para}
            </p>
          ))}
        </motion.article>

        {/* Action Bar */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex items-center justify-between rounded-xl border border-saiki-border/50 bg-saiki-card/50 p-4"
        >
          <div className="flex items-center gap-4">
            <button
              onClick={() => setFaved(!faved)}
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-saiki-border/30"
            >
              <Heart size={18} className={faved ? 'fill-saiki-accent text-saiki-accent' : 'text-saiki-muted'} />
              <span className={faved ? 'text-saiki-accent' : 'text-saiki-muted'}>{faved ? 'Saved' : 'Save'}</span>
            </button>
            <button
              onClick={handleShare}
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-saiki-muted transition-colors hover:bg-saiki-border/30 hover:text-saiki-text"
            >
              <Share2 size={16} />
              <span>Share</span>
            </button>
          </div>

          <div className="flex items-center gap-3 text-xs text-saiki-muted">
            <span className="flex items-center gap-1"><BookOpen size={12} /> {tip.views} reads</span>
            <span className="flex items-center gap-1"><Clock size={12} /> {readTime} min</span>
          </div>
        </motion.div>

        {/* Reflection Prompt */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-6 rounded-xl border border-saiki-border/30 bg-saiki-card/30 p-5"
        >
          <h3 className="mb-2 text-sm font-medium text-saiki-text">💭 Reflection</h3>
          <p className="mb-3 text-xs text-saiki-muted">How does this apply to your life right now?</p>

          {showReflection ? (
            <div>
              <textarea
                value={reflection}
                onChange={(e) => setReflection(e.target.value)}
                placeholder="Write your thoughts..."
                className="w-full rounded-lg border border-saiki-border/50 bg-saiki-bg p-3 text-sm text-saiki-text placeholder-saiki-muted/50 focus:border-saiki-accent/50 focus:outline-none focus:ring-1 focus:ring-saiki-accent/30"
                rows={4}
              />
              <div className="mt-2 flex gap-2">
                <button onClick={handleSaveReflection} className="rounded-lg bg-saiki-accent px-4 py-2 text-sm font-medium text-saiki-bg transition-colors hover:bg-saiki-gold">Save</button>
                <button onClick={() => setShowReflection(false)} className="rounded-lg px-4 py-2 text-sm text-saiki-muted transition-colors hover:text-saiki-text">Cancel</button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setShowReflection(true)}
              className="w-full rounded-lg border border-dashed border-saiki-border/50 p-4 text-sm text-saiki-muted transition-colors hover:border-saiki-accent/30 hover:text-saiki-text"
            >
              Add a reflection...
            </button>
          )}
        </motion.div>

        {/* Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-8 grid grid-cols-2 gap-3"
        >
          <Link
            href="/history"
            className="flex items-center justify-center gap-2 rounded-xl border border-saiki-border/50 bg-saiki-card/50 p-4 text-sm font-medium text-saiki-text transition-colors hover:border-saiki-accent/30"
          >
            <BookOpen size={16} />
            Browse Feed
          </Link>
          <button
            onClick={loadRandomTip}
            className="flex items-center justify-center gap-2 rounded-xl border border-saiki-accent/30 bg-saiki-accent/5 p-4 text-sm font-medium text-saiki-accent transition-colors hover:bg-saiki-accent/10"
          >
            <Sparkles size={16} />
            Another Insight
          </button>
        </motion.div>
      </main>
    </div>
  );
}

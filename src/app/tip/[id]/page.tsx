'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, Heart, Share2, BookOpen, Brain, Clock } from 'lucide-react';
import Header from '@/components/Header';
import { SCHOOLS } from '@/lib/utils';

// Demo tip data
const demoTip = {
  id: '1',
  title: 'The Dichotomy of Control',
  content: `Epictetus, a former slave who became one of the most influential Stoic philosophers, taught a deceptively simple but profoundly liberating idea: distinguish between what is within your control and what is not.

"In our control are opinion, impulse, desire, aversion — in a word, whatever is our own doing. Not in our control are body, property, reputation, office — in a word, whatever is not our own doing." — Epictetus, Enchiridion

This isn't about becoming passive or indifferent. It's about redirecting your energy toward the things you can actually influence: your thoughts, your actions, your character.

When you're stuck in traffic, raging won't move the cars — but choosing patience transforms the experience. When someone criticizes you unfairly, you can't control their words, but you can control whether those words define your self-worth.

The Stoics called this "prohairesis" — the faculty of choice. It's the one thing that can never be taken from you. A tyrant can imprison your body, but not your mind. Fortune can strip your wealth, but not your capacity to respond with virtue.

Practice today: When something frustrates you, pause and ask — "Is this within my control?" If yes, act. If no, accept. This single practice can transform your relationship with anxiety, anger, and disappointment.`,
  summary: 'Focus only on what you can control — your thoughts, actions, and character.',
  school: 'stoicism',
  thinker: 'Epictetus',
  source: 'Enchiridion',
  category: 'philosophy',
  difficulty: 'beginner',
  likes: 42,
  views: 180,
};

export default function TipPage() {
  const params = useParams();
  const router = useRouter();
  const [faved, setFaved] = useState(false);
  const [showReflection, setShowReflection] = useState(false);
  const [reflection, setReflection] = useState('');

  const tip = demoTip;
  const school = SCHOOLS.find((s) => s.id === tip.school);

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: tip.title,
        text: `${tip.title} — ${tip.thinker}`,
        url: window.location.href,
      });
    }
  };

  const handleSaveReflection = async () => {
    // TODO: Save reflection to DB
    setShowReflection(false);
  };

  return (
    <div className="min-h-screen">
      <Header />

      <main className="mx-auto max-w-2xl px-4 pt-24 pb-12">
        {/* Back button */}
        <motion.button
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => router.back()}
          className="mb-6 flex items-center gap-2 text-sm text-saiki-muted transition-colors hover:text-saiki-text"
        >
          <ArrowLeft size={16} />
          Back
        </motion.button>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="mb-4 flex items-center gap-2">
            <span
              className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium"
              style={{
                backgroundColor: `${school?.color}15`,
                color: school?.color,
              }}
            >
              {school?.icon} {school?.name}
            </span>
            <span className="rounded-full bg-saiki-border/50 px-2 py-0.5 text-xs text-saiki-muted capitalize">
              {tip.category}
            </span>
            <span className="rounded-full bg-saiki-border/50 px-2 py-0.5 text-xs text-saiki-muted capitalize">
              {tip.difficulty}
            </span>
          </div>

          <h1 className="mb-3 text-3xl font-bold leading-tight text-saiki-text font-serif">
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
          transition={{ delay: 0.1 }}
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
          transition={{ delay: 0.2 }}
          className="prose prose-invert prose-pie max-w-none"
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
          transition={{ delay: 0.3 }}
          className="mt-10 flex items-center justify-between rounded-xl border border-saiki-border/50 bg-saiki-card/50 p-4"
        >
          <div className="flex items-center gap-4">
            <button
              onClick={() => setFaved(!faved)}
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-saiki-border/30"
            >
              <Heart
                size={18}
                className={faved ? 'fill-saiki-accent text-saiki-accent' : 'text-saiki-muted'}
              />
              <span className={faved ? 'text-saiki-accent' : 'text-saiki-muted'}>
                {faved ? 'Saved' : 'Save'}
              </span>
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
            <span className="flex items-center gap-1">
              <BookOpen size={12} /> {tip.views} reads
            </span>
            <span className="flex items-center gap-1">
              <Clock size={12} /> 3 min
            </span>
          </div>
        </motion.div>

        {/* Reflection Prompt */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-6 rounded-xl border border-saiki-border/30 bg-saiki-card/30 p-5"
        >
          <h3 className="mb-2 text-sm font-medium text-saiki-text">💭 Reflection</h3>
          <p className="mb-3 text-xs text-saiki-muted">
            How does this apply to your life right now?
          </p>

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
                <button
                  onClick={handleSaveReflection}
                  className="rounded-lg bg-saiki-accent px-4 py-2 text-sm font-medium text-saiki-bg transition-colors hover:bg-saiki-gold"
                >
                  Save
                </button>
                <button
                  onClick={() => setShowReflection(false)}
                  className="rounded-lg px-4 py-2 text-sm text-saiki-muted transition-colors hover:text-saiki-text"
                >
                  Cancel
                </button>
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
      </main>
    </div>
  );
}

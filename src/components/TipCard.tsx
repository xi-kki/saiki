'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Heart, Eye, ArrowRight, BookOpen } from 'lucide-react';
import { SCHOOLS, type SchoolId } from '@/lib/utils';

interface Tip {
  id: string;
  title: string;
  content: string;
  summary?: string | null;
  school: string;
  thinker?: string | null;
  source?: string | null;
  category: string;
  difficulty?: string | null;
  likes?: number | null;
  views?: number | null;
}

export default function TipCard({
  tip,
  index = 0,
  isFavorited = false,
  compact = false,
}: {
  tip: Tip;
  index?: number;
  isFavorited?: boolean;
  compact?: boolean;
}) {
  const [faved, setFaved] = useState(isFavorited);
  const [likeCount, setLikeCount] = useState(tip.likes || 0);
  const school = SCHOOLS.find((s) => s.id === tip.school);

  const handleFav = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setFaved(!faved);
    setLikeCount((c) => (faved ? c - 1 : c + 1));

    try {
      await fetch('/api/favorites', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tipId: tip.id }),
      });
    } catch {
      setFaved(faved);
      setLikeCount(tip.likes || 0);
    }
  };

  if (compact) {
    return (
      <Link href={`/tip/${tip.id}`}>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
          className="group cursor-pointer rounded-xl border border-saiki-border/50 bg-saiki-card/50 p-4 card-hover"
        >
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <div className="mb-2 flex items-center gap-2">
                <span
                  className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium"
                  style={{
                    backgroundColor: `${school?.color}15`,
                    color: school?.color,
                  }}
                >
                  {school?.icon} {school?.name}
                </span>
                {tip.thinker && (
                  <span className="text-xs text-saiki-muted">· {tip.thinker}</span>
                )}
              </div>
              <h3 className="font-medium text-saiki-text group-hover:text-saiki-accent transition-colors line-clamp-1">
                {tip.title}
              </h3>
              <p className="mt-1 text-sm text-saiki-muted line-clamp-2">{tip.summary || tip.content.slice(0, 120)}...</p>
            </div>
            <ArrowRight size={16} className="mt-1 text-saiki-muted group-hover:text-saiki-accent transition-colors shrink-0" />
          </div>
        </motion.div>
      </Link>
    );
  }

  return (
    <Link href={`/tip/${tip.id}`}>
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
        className="group relative cursor-pointer overflow-hidden rounded-2xl border border-saiki-border/50 bg-saiki-card/60 p-6 card-hover"
      >
        {/* Decorative corner accent */}
        <div
          className="absolute top-0 right-0 h-24 w-24 opacity-10 blur-2xl"
          style={{ background: school?.color }}
        />

        {/* Header */}
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
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
          </div>

          <button
            onClick={handleFav}
            className="rounded-full p-2 transition-colors hover:bg-saiki-border/50"
          >
            <Heart
              size={18}
              className={faved ? 'fill-saiki-accent text-saiki-accent' : 'text-saiki-muted'}
            />
          </button>
        </div>

        {/* Title */}
        <h2 className="mb-2 text-xl font-semibold leading-tight text-saiki-text group-hover:text-saiki-accent transition-colors font-serif">
          {tip.title}
        </h2>

        {/* Thinker */}
        {tip.thinker && (
          <p className="mb-3 text-sm text-saiki-muted italic">
            — {tip.thinker}
            {tip.source && <span className="not-italic">, {tip.source}</span>}
          </p>
        )}

        {/* Content Preview */}
        <p className="mb-4 line-clamp-3 text-sm leading-relaxed text-saiki-text/80">
          {tip.content}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-saiki-border/30 pt-3">
          <div className="flex items-center gap-4 text-xs text-saiki-muted">
            <span className="flex items-center gap-1">
              <Eye size={12} /> {tip.views || 0}
            </span>
            <span className="flex items-center gap-1">
              <Heart size={12} /> {likeCount}
            </span>
          </div>
          <span className="flex items-center gap-1 text-xs font-medium text-saiki-accent opacity-0 transition-opacity group-hover:opacity-100">
            Read more <ArrowRight size={12} />
          </span>
        </div>
      </motion.article>
    </Link>
  );
}

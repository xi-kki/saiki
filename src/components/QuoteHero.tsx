'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const quotes = [
  {
    text: "The unexamined life is not worth living.",
    author: "Socrates",
    school: "Classical Philosophy",
  },
  {
    text: "He who has a why to live can bear almost any how.",
    author: "Friedrich Nietzsche",
    school: "Existentialism",
  },
  {
    text: "Between stimulus and response there is a space. In that space is our freedom.",
    author: "Viktor Frankl",
    school: "Logotherapy",
  },
  {
    text: "The mind is everything. What you think, you become.",
    author: "Buddha",
    school: "Buddhist Philosophy",
  },
  {
    text: "We are what we repeatedly do. Excellence, then, is not an act but a habit.",
    author: "Aristotle",
    school: "Virtue Ethics",
  },
];

export default function QuoteHero() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % quotes.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative mb-8 overflow-hidden rounded-2xl border border-saiki-border/30 bg-gradient-to-br from-saiki-card to-saiki-bg p-8 md:p-12">
      {/* Decorative elements */}
      <div className="absolute top-4 left-4 text-6xl opacity-10 font-serif">"</div>
      <div className="absolute bottom-4 right-4 text-6xl opacity-10 font-serif rotate-180">"</div>

      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.5 }}
          className="relative z-10 text-center"
        >
          <p className="mb-4 text-xl md:text-2xl font-serif italic leading-relaxed text-saiki-warm">
            &ldquo;{quotes[current].text}&rdquo;
          </p>
          <div className="flex items-center justify-center gap-2">
            <span className="h-px w-8 bg-saiki-accent/40" />
            <p className="text-sm text-saiki-accent">
              {quotes[current].author}
            </p>
            <span className="h-px w-8 bg-saiki-accent/40" />
          </div>
          <p className="mt-1 text-xs text-saiki-muted">
            {quotes[current].school}
          </p>
        </motion.div>
      </AnimatePresence>

      {/* Dots */}
      <div className="mt-6 flex justify-center gap-2">
        {quotes.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-1.5 rounded-full transition-all ${
              i === current
                ? 'w-6 bg-saiki-accent'
                : 'w-1.5 bg-saiki-border hover:bg-saiki-muted'
            }`}
          />
        ))}
      </div>
    </div>
  );
}

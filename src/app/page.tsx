'use client';

import { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Sparkles, ArrowRight, BookOpen, Brain, Map, Microscope, Zap, Eye, Moon } from 'lucide-react';
import Header from '@/components/Header';
import TipCard from '@/components/TipCard';
import StreakBar from '@/components/StreakBar';
import QuoteHero from '@/components/QuoteHero';
import CategoryTabs from '@/components/CategoryTabs';
import type { ContentCategory } from '@/lib/utils';

// Demo data — sharp, clear, insightful "shots"
const demoTips = [
  {
    id: '1',
    title: 'The Dichotomy of Control',
    content: 'Epictetus taught that some things are within our control and others are not. Our opinions, desires, and aversions are up to us. Our bodies, possessions, and reputations are not. Freedom comes from focusing only on what you can control.',
    summary: 'Focus only on what you can control — your thoughts, actions, and character.',
    school: 'stoicism',
    thinker: 'Epictetus',
    source: 'Enchiridion',
    category: 'philosophy',
    likes: 42,
    views: 180,
  },
  {
    id: '2',
    title: 'Inversion: Think Backwards',
    content: 'Instead of asking "How do I succeed?", ask "How do I fail?" Then avoid those things. Carl Jacobi said "Invert, always invert." Most people focus on what they want. The smartest focus on what they want to avoid.',
    summary: 'Invert the problem. Instead of asking how to succeed, ask how to fail — then avoid that.',
    school: 'inversion',
    thinker: 'Charlie Munger',
    source: "Poor Charlie's Almanack",
    category: 'mental-model',
    likes: 67,
    views: 312,
  },
  {
    id: '3',
    title: 'The Experience Machine',
    content: 'Robert Nozick asked: If you could plug into a machine that gives you any experience you desire — perfect love, endless adventure, total fulfillment — would you do it? Most people say no. Why? Because we value actually doing things, not just the experience of doing them.',
    summary: 'Would you plug into a machine that gives perfect experiences? Most say no — revealing we value reality over pleasure.',
    school: 'experience-machine',
    thinker: 'Robert Nozick',
    source: 'Anarchy, State, and Utopia',
    category: 'thought-experiment',
    likes: 55,
    views: 230,
  },
  {
    id: '4',
    title: 'The Dunning-Kruger Effect',
    content: 'People who are incompetent at something are unable to recognize their own incompetence. They don\'t know what they don\'t know. Meanwhile, experts underestimate their abilities. The less you know, the more you think you know.',
    summary: 'The less you know, the more you think you know. The more you know, the more you realize you don\'t.',
    school: 'cognitive-biases',
    thinker: 'Dunning & Kruger',
    source: 'Journal of Personality and Social Psychology (1999)',
    category: 'meta-thinking',
    likes: 89,
    views: 445,
  },
  {
    id: '5',
    title: 'The Marshmallow Test',
    content: 'In the 1960s, Walter Mischel gave children a marshmallow. They could eat it now, or wait 15 minutes and get two. The kids who waited went on to have higher SAT scores, lower BMI, better social skills, and lower rates of addiction.',
    summary: 'Children who could delay gratification had better life outcomes across every metric measured.',
    school: 'marshmallow',
    thinker: 'Walter Mischel',
    source: 'Stanford Marshmallow Experiment (1972)',
    category: 'empirical',
    likes: 73,
    views: 380,
  },
  {
    id: '6',
    title: 'The Subconscious Runs the Show',
    content: 'Your subconscious mind processes 11 million bits of information per second. Your conscious mind? Only 50. You are not running your life — your subconscious is. Habits, biases, emotional reactions, even your "gut feelings" — all subconscious. The goal isn\'t to control it, but to reprogram it through repetition, visualization, and awareness.',
    summary: 'Your subconscious processes 11 million bits/sec. Your conscious mind? Only 50. You\'re not running your life — your habits are.',
    school: 'subconscious',
    thinker: 'Dr. Joseph Murphy',
    source: 'The Power of Your Subconscious Mind',
    category: 'mind',
    likes: 94,
    views: 510,
  },
];

export default function HomePage() {
  const [category, setCategory] = useState<ContentCategory | 'all'>('all');
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.5], [0, -200]);
  const tips = category === 'all' ? demoTips : demoTips.filter((t) => t.category === category);

  return (
    <div className="min-h-screen bg-black">
      <Header streak={7} />

      {/* ═══════════════════════════════════════════════════════
          HERO — "Sharpen Your Mind in a Distracted World"
          Based on Mindloop prompt, adapted for Saiki
         ═══════════════════════════════════════════════════════ */}
      <section ref={heroRef} className="relative min-h-screen overflow-hidden">
        {/* Background gradient orbs */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-saiki-accent/5 blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-purple-500/5 blur-[120px]" />
        </div>

        {/* Hero Content */}
        <motion.div
          style={{ opacity: heroOpacity, y: heroY }}
          className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 text-center"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="liquid-glass mb-8 rounded-full px-4 py-2"
          >
            <span className="flex items-center gap-2 text-sm text-white/80">
              <span className="rounded-md bg-white px-2 py-0.5 text-xs font-medium text-black">New</span>
              Philosophy · Psychology · Mental Models · Mind Science
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl font-medium tracking-[-2px] text-white sm:text-7xl md:text-8xl"
            style={{ fontFamily: "'Instrument Serif', Georgia, serif", lineHeight: 1.1 }}
          >
            Sharpen Your Mind
            <br />
            <span className="text-white/60" style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontStyle: 'italic' }}>
              in a Distracted World
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-8 max-w-2xl text-lg leading-relaxed text-white/70"
          >
            Daily shots of philosophy, psychology, mental models, and empirical truth.
            <br />
            Built for deep thinkers who refuse to let their minds go soft.
          </motion.p>

          {/* CTA */}
          <motion.a
            href="#daily-shots"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="mt-12 rounded-full bg-white px-10 py-4 text-base font-medium text-black transition-opacity hover:opacity-90"
          >
            Start Learning — It&apos;s Free
          </motion.a>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-16 flex items-center gap-8 text-sm text-white/50"
          >
            <span>35+ Topics</span>
            <span className="h-1 w-1 rounded-full bg-white/20" />
            <span>6 Categories</span>
            <span className="h-1 w-1 rounded-full bg-white/20" />
            <span>Daily Insights</span>
          </motion.div>
        </motion.div>

        {/* Bottom gradient fade */}
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black to-transparent z-20" />
      </section>

      {/* ═══════════════════════════════════════════════════════
          SECTION 2: The Problem — Why This Matters
         ═══════════════════════════════════════════════════════ */}
      <section className="relative z-10 px-6 py-24 md:py-32">
        <div className="mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <p className="mb-6 text-sm uppercase tracking-widest text-saiki-accent">The Problem</p>
            <h2 className="text-3xl font-medium leading-tight text-white md:text-5xl" style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}>
              Your mind is being <span className="italic text-white/60">dismantled</span>
              <br />by the modern world.
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-16 grid gap-6 md:grid-cols-3"
          >
            {[
              { icon: <Zap size={24} />, stat: '8 sec', label: 'Average attention span in 2023', sub: 'Down from 12 seconds in 2000' },
              { icon: <Eye size={24} />, stat: '6 hrs', label: 'Daily screen time', sub: 'Mostly passive consumption' },
              { icon: <Moon size={24} />, stat: '95%', label: 'Of thoughts are repeated daily', sub: 'And most are negative' },
            ].map((item, i) => (
              <div key={i} className="rounded-2xl border border-white/10 bg-white/[0.02] p-8">
                <div className="mb-4 text-saiki-accent">{item.icon}</div>
                <p className="text-4xl font-bold text-white">{item.stat}</p>
                <p className="mt-2 text-sm text-white/70">{item.label}</p>
                <p className="mt-1 text-xs text-white/40">{item.sub}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          SECTION 3: What Saiki Covers — 6 Pillars
         ═══════════════════════════════════════════════════════ */}
      <section className="relative z-10 px-6 py-24 md:py-32">
        <div className="mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="mb-6 text-sm uppercase tracking-widest text-saiki-accent">6 Pillars of Wisdom</p>
            <h2 className="text-3xl font-medium text-white md:text-5xl" style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}>
              Everything your mind <span className="italic text-white/60">needs</span>
            </h2>
          </motion.div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: '📜', title: 'Philosophy', desc: 'Stoicism, Existentialism, Taoism — the operating system of the great thinkers.', color: '#c9a84c' },
              { icon: '🧠', title: 'Psychology', desc: 'How your mind actually works — cognitive biases, conditioning, the unconscious.', color: '#a855f7' },
              { icon: '🗺️', title: 'Mental Models', desc: 'Inversion, First Principles, Bayesian Thinking — frameworks for clear reasoning.', color: '#3b82f6' },
              { icon: '🪞', title: 'Meta Thinking', desc: 'Thinking about thinking. Steel manning, epistemic humility, intellectual honesty.', color: '#06b6d4' },
              { icon: '🧪', title: 'Thought Experiments', desc: 'Trolley Problem, Ship of Theseus, Chinese Room — hypotheticals that reveal truth.', color: '#f59e0b' },
              { icon: '🔬', title: 'Empirical Evidence', desc: 'The experiments that prove ideas true — Milgram, Marshmallow, Dunbar.', color: '#10b981' },
            ].map((pillar, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition-colors hover:border-white/20"
              >
                <span className="text-3xl">{pillar.icon}</span>
                <h3 className="mt-4 text-lg font-medium text-white">{pillar.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/60">{pillar.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          SECTION 4: Daily Shots — Sample Tips
         ═══════════════════════════════════════════════════════ */}
      <section id="daily-shots" className="relative z-10 px-6 py-24 md:py-32">
        <div className="mx-auto max-w-3xl">
          {/* Greeting */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <h2 className="text-3xl font-bold text-white md:text-4xl">
              Today&apos;s <span className="text-gold-gradient">Shots</span>
            </h2>
            <p className="mt-2 text-white/50">
              Sharp, clear insights. No fluff. Just truth.
            </p>
          </motion.div>

          {/* Streak Bar */}
          <div className="mb-8">
            <StreakBar streak={7} xp={285} totalRead={42} />
          </div>

          {/* Quote Hero */}
          <QuoteHero />

          {/* Category Tabs */}
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles size={18} className="text-saiki-accent" />
              <h3 className="text-lg font-semibold text-white">Browse by Category</h3>
            </div>
          </div>

          <CategoryTabs selected={category} onSelect={setCategory} />

          {/* Tips */}
          <div className="space-y-4">
            {tips.map((tip, i) => (
              <TipCard key={tip.id} tip={tip} index={i} />
            ))}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-8 text-center"
          >
            <a
              href="/history"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-medium text-white/70 transition-all hover:border-saiki-accent/50 hover:text-saiki-accent"
            >
              <BookOpen size={16} />
              Browse All Insights
              <ArrowRight size={14} />
            </a>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          SECTION 5: Mind Science — How Your Mind Works
         ═══════════════════════════════════════════════════════ */}
      <section className="relative z-10 px-6 py-24 md:py-32">
        <div className="mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="mb-6 text-sm uppercase tracking-widest text-saiki-accent">Mind Science</p>
            <h2 className="text-3xl font-medium text-white md:text-5xl" style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}>
              Understand the machine <span className="italic text-white/60">between</span> your ears
            </h2>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2">
            {[
              {
                title: 'The Subconscious',
                stat: '95%',
                desc: 'of your decisions are made by your subconscious mind before you\'re even aware of them. It processes 11 million bits of information per second — your conscious mind handles only 50.',
                color: '#a855f7',
              },
              {
                title: 'Neuroplasticity',
                stat: '∞',
                desc: 'Your brain rewires itself based on what you repeatedly think and do. Every habit, every thought pattern physically changes your neural pathways. You can literally reshape your brain at any age.',
                color: '#3b82f6',
              },
              {
                title: 'Cognitive Biases',
                stat: '180+',
                desc: 'Known mental shortcuts that distort your perception of reality. Confirmation bias, anchoring, availability heuristic — they run your life until you learn to see them.',
                color: '#f59e0b',
              },
              {
                title: 'The Default Mode Network',
                stat: '30%',
                desc: 'of your waking hours, your brain is in "default mode" — mind-wandering, daydreaming, replaying the past. This is where creativity lives, but also where anxiety breeds.',
                color: '#10b981',
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="rounded-2xl border border-white/10 bg-white/[0.02] p-8"
              >
                <p className="text-5xl font-bold" style={{ color: item.color }}>{item.stat}</p>
                <h3 className="mt-4 text-xl font-medium text-white">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/60">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          SECTION 6: CTA — Join Saiki
         ═══════════════════════════════════════════════════════ */}
      <section className="relative z-10 px-6 py-24 md:py-32">
        <div className="mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-medium text-white md:text-6xl" style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}>
              Your mind deserves
              <br />
              <span className="italic text-saiki-accent">better fuel.</span>
            </h2>
            <p className="mt-6 text-lg text-white/60">
              One daily shot of wisdom. Philosophy, psychology, mental models, and the science of the mind.
              <br />Sharp. Clear. No fluff.
            </p>
            <motion.a
              href="/"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="mt-10 inline-flex items-center gap-2 rounded-full bg-saiki-accent px-10 py-4 text-base font-medium text-black transition-opacity hover:opacity-90"
            >
              <Brain size={18} />
              Start Your Streak
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 px-6 py-8">
        <div className="mx-auto flex max-w-5xl items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl">🧠</span>
            <span className="text-lg font-semibold text-white">Saiki</span>
          </div>
          <p className="text-xs text-white/30">© 2026 Saiki. Sharpen your mind.</p>
        </div>
      </footer>
    </div>
  );
}

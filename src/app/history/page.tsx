'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Calendar, TrendingUp, Map, Brain, Microscope } from 'lucide-react';
import Header from '@/components/Header';
import TipCard from '@/components/TipCard';
import CategoryTabs from '@/components/CategoryTabs';
import type { ContentCategory } from '@/lib/utils';

const demoFeed = [
  // Empirical
  {
    id: '7',
    title: 'Milgram\'s Obedience Experiment',
    content: 'In 1961, Stanley Milgram tested how far people would go when ordered by an authority figure. Participants were told to administer electric shocks to another person (actually an actor). 65% went all the way to the maximum voltage — even when the "victim" screamed in pain. This proved that ordinary people can commit terrible acts when following authority. The lesson: never blindly obey. Always question the orders you\'re given.',
    summary: '65% of ordinary people delivered maximum "shock" when told to by an authority figure.',
    school: 'milgram',
    thinker: 'Stanley Milgram',
    source: 'Yale University (1961)',
    category: 'empirical',
    likes: 78,
    views: 410,
  },
  // Meta Thinking
  {
    id: '8',
    title: 'Steel Manning',
    content: 'The opposite of straw-manning. Instead of attacking the weakest version of your opponent\'s argument, construct the STRONGEST possible version of their position — then argue against that. If you can\'t defeat the best version of their argument, maybe they have a point. This is intellectual honesty at its finest. It forces you to truly understand opposing views before dismissing them.',
    summary: 'Build the strongest version of your opponent\'s argument, then argue against THAT.',
    school: 'steel-manning',
    thinker: 'Various',
    source: 'Rationalist Community',
    category: 'meta-thinking',
    likes: 61,
    views: 290,
  },
  // Thought Experiment
  {
    id: '9',
    title: 'The Ship of Theseus',
    content: 'If you replace every plank of a ship one by one, is it still the same ship? Now imagine someone reassembles the old planks into a second ship. Which one is the "real" Ship of Theseus? This reveals deep questions about identity. Are you the same person you were 10 years ago? Your cells have all been replaced. Your beliefs have changed. What makes you "you"? Is it your body? Your memories? Your continuity of consciousness?',
    summary: 'If every part is replaced, is it the same thing? What makes you "you"?',
    school: 'ship-theseus',
    thinker: 'Plutarch',
    source: 'Life of Theseus',
    category: 'thought-experiment',
    likes: 52,
    views: 265,
  },
  // Mental Model
  {
    id: '10',
    title: 'Second-Order Thinking',
    content: 'First-order thinking: "If I do X, Y will happen." Second-order thinking: "And then what?" Every action has consequences, and those consequences have consequences. Most people stop at the first consequence. Smart thinkers play it out further. Raising minimum wage → businesses cut hours → workers earn less → inflation rises → real wages fall. The first-order effect is good. The second-order effect is bad.',
    summary: 'Don\'t just ask "and then what?" — ask "and then what happens AFTER that?"',
    school: 'second-order',
    thinker: 'Howard Marks',
    source: 'The Most Important Thing',
    category: 'mental-model',
    likes: 83,
    views: 420,
  },
  // Philosophy
  {
    id: '11',
    title: 'The Absurd Hero',
    content: 'Camus argued that life is inherently meaningless — the universe offers no answers. But instead of despair, he proposed we embrace the absurd. Like Sisyphus rolling his boulder, we can find joy in the struggle itself. "One must imagine Sisyphus happy." The meaning isn\'t out there. It\'s in the act of living fully, despite the void.',
    summary: 'Meaning isn\'t found — it\'s created in the act of living fully.',
    school: 'absurdism',
    thinker: 'Albert Camus',
    source: 'The Myth of Sisyphus',
    category: 'philosophy',
    likes: 55,
    views: 230,
  },
  // Empirical
  {
    id: '12',
    title: 'Dunbar\'s Number: 150',
    content: 'Anthropologist Robin Dunbar found that humans can maintain stable social relationships with approximately 150 people. Beyond that, relationships become superficial. This is why armies keep units under 150, why companies feel "different" after growing past 150, and why social media (with thousands of "friends") feels hollow. We\'re wired for small tribes, not global networks.',
    summary: 'You can only maintain ~150 real relationships. Beyond that, it\'s just noise.',
    school: 'dunbar-number',
    thinker: 'Robin Dunbar',
    source: 'Grooming, Gossip, and the Evolution of Language (1994)',
    category: 'empirical',
    likes: 64,
    views: 330,
  },
  // Meta Thinking
  {
    id: '13',
    title: 'Epistemic Humility',
    content: 'The recognition that your knowledge is limited and your beliefs might be wrong. The smartest people hold their opinions loosely. They update when presented with new evidence. They say "I might be wrong" not as weakness, but as intellectual honesty. Confidence is not the same as certainty. You can be confident in your direction while remaining open to being wrong about the details.',
    summary: 'The smartest people hold opinions loosely. Confidence ≠ certainty.',
    school: 'epistemic-humility',
    thinker: 'Various',
    source: 'Epistemology',
    category: 'meta-thinking',
    likes: 71,
    views: 355,
  },
];

export default function HistoryPage() {
  const [category, setCategory] = useState<ContentCategory | 'all'>('all');

  const filtered = category === 'all' ? demoFeed : demoFeed.filter((t) => t.category === category);

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
            <p className="text-lg font-bold text-saiki-text">35+</p>
            <p className="text-xs text-saiki-muted">Topics</p>
          </div>
          <div className="rounded-lg border border-saiki-border/30 bg-saiki-card/30 p-3 text-center">
            <Map size={16} className="mx-auto mb-1 text-blue-400" />
            <p className="text-lg font-bold text-saiki-text">6</p>
            <p className="text-xs text-saiki-muted">Categories</p>
          </div>
          <div className="rounded-lg border border-saiki-border/30 bg-saiki-card/30 p-3 text-center">
            <Microscope size={16} className="mx-auto mb-1 text-emerald-400" />
            <p className="text-lg font-bold text-saiki-text">365+</p>
            <p className="text-xs text-saiki-muted">Tips/Year</p>
          </div>
        </motion.div>

        {/* Category Filter */}
        <CategoryTabs selected={category} onSelect={setCategory} />

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

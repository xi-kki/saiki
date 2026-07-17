import Groq from 'groq-sdk';

// ─── Server-side only — never expose API key to client ────
if (typeof window !== 'undefined') {
  throw new Error('Groq client should only be used server-side');
}

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

if (!process.env.GROQ_API_KEY) {
  console.warn('⚠️ GROQ_API_KEY not set — using fallback tips');
}

// ─── School Definitions ──────────────────────────────────
export const SCHOOLS = {
  stoicism: {
    name: 'Stoicism',
    icon: '🏛️',
    thinkers: ['Marcus Aurelius', 'Epictetus', 'Seneca', 'Zeno of Citium'],
    focus: 'Control, virtue, resilience, emotional mastery',
  },
  existentialism: {
    name: 'Existentialism',
    icon: '🌑',
    thinkers: ['Jean-Paul Sartre', 'Albert Camus', 'Søren Kierkegaard', 'Simone de Beauvoir'],
    focus: 'Freedom, authenticity, meaning, absurdity',
  },
  buddhism: {
    name: 'Buddhism',
    icon: '🪷',
    thinkers: ['Buddha', 'Thich Nhat Hanh', 'Shunryu Suzuki', 'Dogen'],
    focus: 'Mindfulness, impermanence, suffering, enlightenment',
  },
  jungian: {
    name: 'Jungian Psychology',
    icon: '🔮',
    thinkers: ['Carl Jung', 'Marie-Louise von Franz', 'James Hillman'],
    focus: 'Shadow, archetypes, individuation, collective unconscious',
  },
  taoism: {
    name: 'Taoism',
    icon: '☯️',
    thinkers: ['Lao Tzu', 'Chuang Tzu', 'Liezi'],
    focus: 'Flow, balance, simplicity, wu wei (non-action)',
  },
  nihilism: {
    name: 'Nihilism',
    icon: '🕳️',
    thinkers: ['Friedrich Nietzsche', 'Albert Camus', 'Fyodor Dostoevsky'],
    focus: 'Meaninglessness, rebellion, creating your own values',
  },
  behaviorism: {
    name: 'Behaviorism',
    icon: '🐀',
    thinkers: ['B.F. Skinner', 'John Watson', 'Ivan Pavlov'],
    focus: 'Conditioning, habits, reinforcement, observable behavior',
  },
  logotherapy: {
    name: 'Logotherapy',
    icon: '💡',
    thinkers: ['Viktor Frankl'],
    focus: 'Meaning in suffering, purpose, choice of attitude',
  },
  virtueEthics: {
    name: 'Virtue Ethics',
    icon: '⚖️',
    thinkers: ['Aristotle', 'Plato', 'Confucius'],
    focus: 'Character, excellence, the golden mean, eudaimonia',
  },
  cognitivePsych: {
    name: 'Cognitive Psychology',
    icon: '🧠',
    thinkers: ['Aaron Beck', 'Albert Ellis', 'Daniel Kahneman'],
    focus: 'Mental processes, biases, cognitive distortions, thinking patterns',
  },
  socialPsych: {
    name: 'Social Psychology',
    icon: '👥',
    thinkers: ['Stanley Milgram', 'Solomon Asch', 'Philip Zimbardo'],
    focus: 'Conformity, obedience, group dynamics, social influence',
  },
  absurdism: {
    name: 'Absurdism',
    icon: '🎭',
    thinkers: ['Albert Camus', 'Thomas Nagel'],
    focus: 'Embracing the absurd, living fully without meaning',
  },
} as const;

export type SchoolId = keyof typeof SCHOOLS;

// ─── Tip Generation with Groq ────────────────────────────
export async function generateTip(school: SchoolId): Promise<{
  title: string;
  content: string;
  summary: string;
  thinker: string;
  source: string;
}> {
  const schoolData = SCHOOLS[school];
  const randomThinker = schoolData.thinkers[Math.floor(Math.random() * schoolData.thinkers.length)];

  const prompt = `Generate a single philosophical or psychological insight for the school of ${schoolData.name}.

School focus: ${schoolData.focus}
Thinker to quote or reference: ${randomThinker}

Return ONLY valid JSON with these fields:
{
  "title": "A compelling 5-8 word title for this insight",
  "content": "2-3 paragraphs (100-200 words) explaining the insight with depth and clarity. Include a real or realistic quote from the thinker.",
  "summary": "One sentence (under 100 chars) capturing the core message",
  "thinker": "${randomThinker}",
  "source": "The work or context this comes from (e.g., 'Meditations', 'Thus Spoke Zarathustra', or 'General teaching')"
}

Make it feel like wisdom from a wise friend, not a textbook. Be specific, not generic.`;

  try {
    const completion = await groq.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: 'llama-3.3-70b-versatile',
      temperature: 0.8,
      max_tokens: 500,
      response_format: { type: 'json_object' },
    });

    const response = completion.choices[0]?.message?.content;
    if (!response) throw new Error('No response from Groq');

    return JSON.parse(response);
  } catch (error) {
    console.error('Groq API error:', error);
    // Fallback to seed data
    return getFallbackTip(school);
  }
}

// ─── Generate Multiple Tips ──────────────────────────────
export async function generateDailyTips(count = 5): Promise<
  Array<{
    school: SchoolId;
    title: string;
    content: string;
    summary: string;
    thinker: string;
    source: string;
  }>
> {
  const schools = Object.keys(SCHOOLS) as SchoolId[];
  const selectedSchools = schools
    .sort(() => Math.random() - 0.5)
    .slice(0, count);

  const tips = await Promise.all(
    selectedSchools.map(async (school) => {
      const tip = await generateTip(school);
      return { school, ...tip };
    })
  );

  return tips;
}

// ─── Fallback Tips (when API is down) ────────────────────
function getFallbackTip(school: SchoolId) {
  const fallbacks: Record<SchoolId, { title: string; content: string; summary: string; thinker: string; source: string }> = {
    stoicism: {
      title: 'The Dichotomy of Control',
      content: 'Some things are within our power, while others are not. Within our power are opinion, motivation, desire, aversion, and whatever is of our own doing. Not within our power are our body, our property, reputation, office, and whatever is not of our own doing.\n\nThe Stoics teaches that suffering comes not from events themselves, but from our judgments about them. When you distinguish between what you can and cannot control, you free yourself from unnecessary anguish.',
      summary: 'Focus only on what you can control — your thoughts, actions, and responses.',
      thinker: 'Epictetus',
      source: 'Enchiridion',
    },
    existentialism: {
      title: 'Existence Precedes Essence',
      content: 'Man first of all exists, encounters himself, surges up in the world — and defines himself afterwards. If man as the existentialist sees him is not definable, it is because to begin with he is nothing.',
      summary: 'You are not born with a purpose — you create one through your choices.',
      thinker: 'Jean-Paul Sartre',
      source: 'Existentialism Is a Humanism',
    },
    buddhism: {
      title: 'The Mind Is Everything',
      content: 'The mind is everything. What you think, you become. What you feel, you attract. What you imagine, you create. The Buddha taught that our reality is shaped by the quality of our thoughts.',
      summary: 'Your thoughts shape your reality — guard them carefully.',
      thinker: 'Buddha',
      source: 'Dhammapada',
    },
    jungian: {
      title: 'Meeting Your Shadow',
      content: 'Everyone carries a shadow, and the less it is embodied in the individual\'s conscious life, the blacker and denser it is. The shadow is the unconscious part of the personality that the conscious ego does not identify in itself.',
      summary: 'Your shadow holds the key to wholeness — acknowledge it, don\'t repress it.',
      thinker: 'Carl Jung',
      source: 'Aion',
    },
    taoism: {
      title: 'The Tao That Can Be Told',
      content: 'The Tao that can be told is not the eternal Tao. The name that can be named is not the eternal name. The nameless is the beginning of heaven and earth. The named is the mother of ten thousand things.',
      summary: 'True understanding comes beyond words and concepts.',
      thinker: 'Lao Tzu',
      source: 'Tao Te Ching',
    },
    nihilism: {
      title: 'The Three Metamorphoses',
      content: 'Of three metamorphoses of the spirit I tell you: how the spirit becomes a camel; and the camel, a lion; and the lion, at last, a child. The child is innocence and forgetting, a new beginning, a game, a self-propelled wheel, a first movement, a sacred "Yes."',
      summary: 'To create your own values, you must first destroy the old ones.',
      thinker: 'Friedrich Nietzsche',
      source: 'Thus Spoke Zarathustra',
    },
    behaviorism: {
      title: 'The Habit Loop',
      content: 'We are what we repeatedly do. Excellence, then, is not an act but a habit. Behavior is determined by its consequences — reinforce good habits, extinguish bad ones.',
      summary: 'Your habits shape your character — choose them deliberately.',
      thinker: 'Will Durant (summarizing Aristotle)',
      source: 'The Story of Philosophy',
    },
    logotherapy: {
      title: 'The Last Human Freedom',
      content: 'Everything can be taken from a man but one thing: the last of the human freedoms — to choose one\'s attitude in any given set of circumstances, to choose one\'s own way.',
      summary: 'No matter what happens, you always have the freedom to choose your response.',
      thinker: 'Viktor Frankl',
      source: "Man's Search for Meaning",
    },
    virtueEthics: {
      title: 'The Golden Mean',
      content: 'Excellence is not an act, but a habit. The mean between deficiency and excess is where virtue lies. Courage is the mean between cowardice and recklessness. Generosity is the mean between stinginess and prodigality.',
      summary: 'Virtue lies in the balance — find the mean between two extremes.',
      thinker: 'Aristotle',
      source: 'Nicomachean Ethics',
    },
    cognitivePsych: {
      title: 'Thinking Fast and Slow',
      content: 'Our brain has two systems: System 1 operates automatically and quickly, with little or no effort. System 2 allocates attention to effortful mental activities. Most of our judgments and decisions are made by System 1 — fast, intuitive, and often wrong.',
      summary: 'Your brain takes shortcuts — slow down to think clearly.',
      thinker: 'Daniel Kahneman',
      source: 'Thinking, Fast and Slow',
    },
    socialPsych: {
      title: 'The Power of the Situation',
      content: 'The most important thing you can do to influence behavior is to change the situation. Context matters more than character. Good people can do bad things when the situation demands it.',
      summary: 'Environment shapes behavior more than personality — design yours wisely.',
      thinker: 'Philip Zimbardo',
      source: 'The Lucifer Effect',
    },
    absurdism: {
      title: 'One Must Imagine Sisyphus Happy',
      content: 'The struggle itself toward the heights is enough to fill a man\'s heart. One must imagine Sisyphus happy. The absurd does not liberate; it binds. It does not authorize all actions.',
      summary: 'Embrace the absurd — find meaning in the struggle itself.',
      thinker: 'Albert Camus',
      source: 'The Myth of Sisyphus',
    },
  };

  return fallbacks[school];
}

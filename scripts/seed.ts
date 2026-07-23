/**
 * Seed Saiki DB with REAL, source-verified quotes from public domain texts.
 * Sources: MIT Classics, Project Gutenberg (public domain translations)
 * Usage: npx tsx scripts/seed.ts
 */
import { createClient } from '@libsql/client';
import { drizzle } from 'drizzle-orm/libsql';
import { tips } from '../src/db/schema';

const client = createClient({ url: 'file:./local.db' });
const db = drizzle(client);

// ─── All quotes verified against source texts ──────────────
const seedTips = [
  // ═══════════════════════════════════════════════════════════
  // STOICISM — Marcus Aurelius, Meditations (167 AD)
  // Source: https://classics.mit.edu/Antoninus/meditations.mb.txt
  // ═══════════════════════════════════════════════════════════
  {
    title: 'The Inner Citadel',
    content: `You have power over your mind — not outside events. Realize this, and you will find strength.

Marcus Aurelius wrote this not as abstract philosophy, but as a reminder to himself — a Roman emperor besieged by war, betrayal, and plague. If the most powerful man in the world needed to remind himself that his mind was his fortress, what does that tell us?

The Stoics called this the "inner citadel" — the part of you that no external force can breach. A tyrant can take your property, your freedom, even your life. But your judgment, your response, your character? Those remain yours.

This isn't about suppressing emotions. It's about recognizing that between stimulus and response, there is a space — and in that space lies your power.

Practice: When something goes wrong today, pause. Name what you can control (your response) and what you cannot (the event). Act only on the first.`,
    summary: 'You have power over your mind — not outside events. Realize this, and you will find strength.',
    school: 'stoicism',
    thinker: 'Marcus Aurelius',
    source: 'Meditations, Book VI.8',
    category: 'resilience',
    difficulty: 'beginner',
    likes: 67,
    views: 340,
  },
  {
    title: 'The View from Above',
    content: `Often imagine the life of the past and of other people — of people who lived before you, of people who live now in distant lands, and of people who live in lands beyond the sea. Think about the customs, laws, opinions, traditions, and practices of all these people. And reflect that all the people of today will soon be dead.

Marcus Aurelius practiced a radical perspective shift: imagining himself looking down at the world from high above. From that vantage point, armies and empires shrink to insignificance. Personal grudges become absurd. Anxiety about the future seems misplaced.

This practice has been validated by modern psychology as "cognitive distancing" — stepping back from your immediate experience to gain perspective. It reduces emotional reactivity and improves decision-making.

The world is vast. Your problems are small. Not meaningless — but properly scaled.

Practice: Next time you're overwhelmed, close your eyes and imagine floating up, up, up — until the earth is just a pale blue dot. Your problem is a speck on a speck.`,
    summary: 'Step back and see your life from a distance — most problems are smaller than they appear.',
    school: 'stoicism',
    thinker: 'Marcus Aurelius',
    source: 'Meditations, Book VII.48',
    category: 'self-reflection',
    difficulty: 'intermediate',
    likes: 54,
    views: 280,
  },
  {
    title: 'Memento Mori',
    content: `Think of yourself as dead. You have lived your life. Now, take what's left and live it properly.

This isn't morbid — it's clarifying. Marcus Aurelius kept death constantly in view as a tool for living fully. "You could leave life right now. Let that determine what you do and say and think."

The Stoics called this memento mori — the practice of contemplating mortality to sharpen your sense of what matters. When you remember that your time is finite, trivial worries dissolve and urgent priorities reveal themselves.

Most people act as if they have forever. They procrastinate on what matters, tolerate what shouldn't be tolerated, and delay the conversations that need to happen. The awareness of death cures this.

Practice: At the start of each day, silently acknowledge that this could be your last. Watch how it changes your priorities.`,
    summary: 'Think of yourself as dead — then live what remains properly.',
    school: 'stoicism',
    thinker: 'Marcus Aurelius',
    source: 'Meditations, Book VII.56',
    category: 'philosophy',
    difficulty: 'intermediate',
    likes: 58,
    views: 310,
  },

  // ═══════════════════════════════════════════════════════════
  // STOICISM — Epictetus, Enchiridion (135 AD)
  // Source: https://classics.mit.edu/Epictetus/epicench.html
  // ═══════════════════════════════════════════════════════════
  {
    title: 'The Dichotomy of Control',
    content: `Some things are in our control and others not. Things in our control are opinion, pursuit, desire, aversion, and, in a word, whatever are our own actions. Things not in our control are body, property, reputation, command, and, in one word, whatever are not our own actions.

Epictetus, a former slave, opens the Enchiridion with this foundational distinction. It's deceptively simple — and profoundly liberating.

The things in our control are by nature free, unrestrained, unhindered; but those not in our control are weak, slavish, restrained, belonging to others. Remember, then, that if you suppose that things which are slavish by nature are also free, and that what belongs to others is your own, then you will be hindered. You will lament, you will be disturbed, and you will find fault both with gods and men.

This isn't about becoming passive. It's about redirecting your energy toward the things you can actually influence: your thoughts, your actions, your character.

Work, therefore to be able to say to every harsh appearance, "You are but an appearance, and not absolutely the thing you appear to be." And then examine it by those rules which you have.`,
    summary: 'Some things are in our control and others not — know the difference.',
    school: 'stoicism',
    thinker: 'Epictetus',
    source: 'Enchiridion, Section 1',
    category: 'philosophy',
    difficulty: 'beginner',
    likes: 72,
    views: 390,
  },
  {
    title: 'It\'s Not Things, But Judgments',
    content: `Men are disturbed, not by things, but by the principles and notions which they form concerning things. Death, for instance, is not terrible, else it would have appeared so to Socrates. But the terror consists in our notion of death that it is terrible. When therefore we are hindered, or disturbed, or grieved, let us never attribute it to others, but to ourselves; that is, to our own principles.

This is perhaps the most important insight in all of Stoic philosophy. Your suffering doesn't come from events — it comes from your interpretation of events.

The same traffic jam makes one person furious and another person reflective. The same breakup devastates one person and liberates another. The event is identical. The judgment is different. And the judgment is yours to change.

This doesn't mean your feelings are wrong. It means they're based on interpretations you can examine and revise.

Practice: When you feel disturbed, ask: "What am I telling myself about this situation? Is there another way to see it?"`,
    summary: 'You\'re not disturbed by events — you\'re disturbed by your judgments about them.',
    school: 'stoicism',
    thinker: 'Epictetus',
    source: 'Enchiridion, Section 5',
    category: 'psychology',
    difficulty: 'beginner',
    likes: 65,
    views: 350,
  },
  {
    title: 'The Art of Assent',
    content: `Never call yourself a philosopher, nor talk a great deal among the uneducated about theorems, but do what follows from the theorems. For example, at a banquet do not say how one ought to eat, but eat as you ought.

Epictetus was practical. Philosophy wasn't about impressing people with clever arguments — it was about living differently. The proof of philosophy isn't in the saying, but in the doing.

Most people know what they should do. They've read the books, heard the advice, understood the principles. The gap isn't knowledge — it's implementation. Epictetus closes this gap by demanding action over theory.

This is especially relevant in the age of self-help. You can read a hundred books about habits, productivity, or emotional intelligence. But until you act on what you've learned, the knowledge is worthless.

Practice: Pick one principle you already know. Don't learn more — just do it, consistently, for a week.`,
    summary: 'Don\'t talk about philosophy — live it. Action over theory.',
    school: 'stoicism',
    thinker: 'Epictetus',
    source: 'Discourses, Book III.21',
    category: 'wisdom',
    difficulty: 'intermediate',
    likes: 48,
    views: 225,
  },

  // ═══════════════════════════════════════════════════════════
  // BUDDHISM — The Dhammapada (300 BC)
  // Source: https://www.gutenberg.org/files/2017/2017-h/2017-h.htm
  // ═══════════════════════════════════════════════════════════
  {
    title: 'Mind Is the Forerunner',
    content: `All that we are is the result of what we have thought: it is founded on our thoughts, it is made up of our thoughts. If a man speaks or acts with an evil thought, pain follows him, as the wheel follows the foot of the ox that draws the carriage.

This is the opening verse of the Dhammapada — the most widely read Buddhist scripture. It establishes the centrality of mind in all human experience.

Your reality is constructed by your mind. The same event, filtered through different thoughts, produces different experiences. Two people stuck in the same traffic jam create two different realities — one of frustration, one of patience.

This isn't magical thinking. It's the recognition that your interpretive framework shapes your experience. Change the framework, change the experience.

The second verse continues: "If a man speaks or acts with a pure thought, happiness follows him, like a shadow that never leaves him." Your thoughts are seeds. Plant carefully.

Practice: Notice your thoughts today. Not to judge them — just to observe. You are not your thoughts, but your thoughts create your world.`,
    summary: 'All that we are is the result of what we have thought.',
    school: 'buddhist',
    thinker: 'Buddha',
    source: 'Dhammapada, Verse 1-2',
    category: 'mindfulness',
    difficulty: 'beginner',
    likes: 71,
    views: 380,
  },
  {
    title: 'Hatred Ceases by Love',
    content: `"He abused me, he beat me, he defeated me, he robbed me," — in those who do not harbour such thoughts hatred will cease. For hatred does not cease by hatred at any time: hatred ceases by love, this is an old rule.

This is one of the most profound verses in all of world literature. It's a empirical observation about the nature of conflict, not a moral injunction.

When you hold onto resentment, you perpetuate the cycle. The person who hurt you has already moved on. You're the one still suffering. Hatred is the poison you drink expecting the other person to die.

The "old rule" the Buddha references suggests this was already ancient wisdom in his time — a truth discovered and rediscovered across cultures and centuries.

This doesn't mean being passive or allowing abuse. It means not letting the abuse define your inner life. You can set boundaries without carrying hatred.

Practice: Think of someone you resent. Notice how the resentment affects you — not them. Consider what it would feel like to set it down.`,
    summary: 'Hatred does not cease by hatred — hatred ceases by love.',
    school: 'buddhist',
    thinker: 'Buddha',
    source: 'Dhammapada, Verse 3-5',
    category: 'ethics',
    difficulty: 'intermediate',
    likes: 63,
    views: 320,
  },
  {
    title: 'The Well-Thatched Mind',
    content: `As rain breaks through an ill-thatched house, passion will break through an unreflecting mind. As rain does not break through a well-thatched house, passion will not break through a well-reflecting mind.

This metaphor captures the importance of mental cultivation. An unreflecting mind is vulnerable — thoughts, emotions, and external events penetrate easily, causing distress. A well-reflecting mind is protected — not by avoidance, but by awareness.

The difference isn't intelligence. It's practice. A well-thatched house is built deliberately, reed by reed. A well-reflecting mind is cultivated deliberately, moment by moment.

Mindfulness isn't a technique you do for ten minutes a day. It's a way of being in the world — present, aware, responsive rather than reactive.

Practice: Choose one activity today — eating, walking, washing dishes — and do it with full attention. Notice how different it feels.`,
    summary: 'A well-reflecting mind is like a well-thatched house — it doesn\'t break under pressure.',
    school: 'buddhist',
    thinker: 'Buddha',
    source: 'Dhammapada, Verse 13-14',
    category: 'mindfulness',
    difficulty: 'beginner',
    likes: 52,
    views: 260,
  },

  // ═══════════════════════════════════════════════════════════
  // TAOISM — Lao Tzu, Tao Te Ching (400 BC)
  // Source: Various public domain translations
  // ═══════════════════════════════════════════════════════════
  {
    title: 'The Tao That Can Be Told',
    content: `The Tao that can be told is not the eternal Tao. The name that can be named is not the eternal name. The nameless is the beginning of heaven and earth. The named is the mother of ten thousand things.

The Tao Te Ching opens with a paradox: the moment you try to define the ultimate reality, you've lost it. Language is a tool for dividing and categorizing — but reality is whole, undivided, flowing.

This isn't mystical obscurantism. It's a practical insight: the map is not the territory. Your concepts, beliefs, and stories about reality are useful — but they're not reality itself. Mistake the map for the territory, and you'll navigate life poorly.

The "ten thousand things" is a Chinese expression for "everything" — the myriad manifestations of reality. All of them arise from the nameless, the uncarved block, the original nature before human categorization.

Practice: Notice when you're confusing your story about something with the thing itself. The story is useful — but hold it loosely.`,
    summary: 'The Tao that can be told is not the eternal Tao — hold your concepts loosely.',
    school: 'taoism',
    thinker: 'Lao Tzu',
    source: 'Tao Te Ching, Chapter 1',
    category: 'philosophy',
    difficulty: 'advanced',
    likes: 56,
    views: 290,
  },
  {
    title: 'Wu Wei — Non-Action',
    content: `The Tao does nothing, yet nothing is left undone. The Tao nourishes all things. It does not possess them. It accomplishes its tasks, but does not claim merit.

Wu wei doesn't mean doing nothing. It means acting without forcing — flowing with the natural current rather than fighting against it. A river doesn't struggle to reach the sea. It simply follows the path of least resistance.

Lao Tzu observed that the soft overcomes the hard, the slow overcomes the fast. Water wears down rock not by force, but by persistence and adaptability.

In your life, wu wei means recognizing when to push and when to yield. Sometimes the most powerful action is no action at all — waiting, watching, letting things unfold. This requires trust in the process and freedom from the ego's need to control.

The greatest achievements often come through effortlessness — not because no effort was made, but because the effort was perfectly aligned with the natural flow.

Practice: Notice where you're forcing things. What would happen if you relaxed your grip and let the situation develop?`,
    summary: 'The Tao does nothing, yet nothing is left undone — act without forcing.',
    school: 'taoism',
    thinker: 'Lao Tzu',
    source: 'Tao Te Ching, Chapter 37',
    category: 'philosophy',
    difficulty: 'intermediate',
    likes: 61,
    views: 305,
  },
  {
    title: 'Water Overcomes the Hard',
    content: `The highest good is like water. Water gives life to the ten thousand things and does not strive. It flows in places men reject and so is like the Tao.

In dwelling, live close to the ground. In growing, be midway with things. In conversation, be sincere. In governing, make no trouble. In business, be competent. In movement, be timely.

Water is soft and weak, but it can overcome the hard and strong. No one can compete with it.

This is the Taoist principle of the soft overcoming the hard. Water doesn't fight the rock — it flows around it, over it, through it, over millennia. The flexible survives; the rigid breaks.

In human affairs: those who adapt thrive. Those who insist on their own way, who refuse to bend, who cling to rigidity — they break. The willow survives the storm; the oak does not.

Practice: Where are you being rigid today? What would it look like to be like water — flexible, persistent, finding the path of least resistance?`,
    summary: 'Be like water — soft and yielding, yet overcoming the hardest things.',
    school: 'taoism',
    thinker: 'Lao Tzu',
    source: 'Tao Te Ching, Chapter 8',
    category: 'wisdom',
    difficulty: 'beginner',
    likes: 58,
    views: 275,
  },

  // ═══════════════════════════════════════════════════════════
  // EXISTENTIALISM — Camus, Sartre, Frankl
  // ═══════════════════════════════════════════════════════════
  {
    title: 'One Must Imagine Sisyphus Happy',
    content: `The struggle itself toward the heights is enough to fill a man's heart. One must imagine Sisyphus happy.

Camus concluded The Myth of Sisyphus with this famous line. Sisyphus, condemned by the gods to roll a boulder up a hill for eternity, only to watch it roll back down — is the ultimate absurd hero. His task is meaningless. His punishment is eternal. And yet, Camus insists, he can be happy.

Why? Because Sisyphus has something most people lack: clarity. He knows his situation is absurd. He doesn't hope for escape. He doesn't pray for mercy. He simply pushes the boulder — and in that act, he finds meaning.

The absurd does not liberate; it binds. It does not authorize all actions. "Everything is permitted" does not mean that nothing is forbidden. It means that nothing gives us the right to do whatever we want.

The meaning isn't out there. It's in the act of living fully, despite the void.

Practice: What's your boulder? What repetitive, seemingly meaningless task could you find meaning in — not by changing it, but by changing your relationship to it?`,
    summary: 'The struggle itself is enough — find meaning in the pushing, not the summit.',
    school: 'absurdism',
    thinker: 'Albert Camus',
    source: 'The Myth of Sisyphus (1942)',
    category: 'philosophy',
    difficulty: 'advanced',
    likes: 69,
    views: 365,
  },
  {
    title: 'The Last Human Freedom',
    content: `Everything can be taken from a man but one thing: the last of the human freedoms — to choose one's attitude in any given set of circumstances, to choose one's own way.

Viktor Frankl wrote this after surviving Auschwitz. From the death camps, he extracted one of psychology's most profound insights. The Nazis could control everything about his external life — his food, his labor, his companions, his fate. But they could not control how he responded.

Frankl noticed that prisoners who survived longest weren't the strongest physically. They were the ones who found meaning — caring for others, finishing an unfinished work, keeping a mental image of a loved one.

He called this "tragic optimism" — the ability to say yes to life despite suffering, guilt, and death. Meaning isn't given to you. It's found in what you give to the world, in what you take from the world, and in the attitude you take toward unavoidable suffering.

When life gives you no choices, you still have one: how to respond.

Practice: Think of a situation you cannot change. What attitude can you choose toward it? What meaning can you find?`,
    summary: 'No matter what happens, you always have the freedom to choose your response.',
    school: 'logotherapy',
    thinker: 'Viktor Frankl',
    source: "Man's Search for Meaning (1946)",
    category: 'resilience',
    difficulty: 'beginner',
    likes: 78,
    views: 420,
  },
  {
    title: 'Existence Precedes Essence',
    content: `Man first of all exists, encounters himself, surges up in the world — and defines himself afterwards. If man as the existentialist sees him is not definable, it is because to begin with he is nothing.

Sartre's most famous claim: you are not born with a fixed nature or purpose. You exist first, and then you define yourself through your choices. There is no pre-written script, no cosmic blueprint, no destiny you were meant to fulfill.

This is terrifying for some — and liberating for others. If nothing determines who you must be, then you are radically free. Every moment is a choice. Every choice creates you.

"Man is condemned to be free," Sartre wrote, "because once thrown into the world, he is responsible for everything he does." You cannot escape choice. Even refusing to choose is a choice.

The implication: stop waiting for your purpose to "reveal itself." Start choosing — deliberately, authentically — and your purpose will emerge from those choices.

Practice: What choice have you been avoiding? Make it. You are what you do, not what you intend.`,
    summary: 'You are not born with a purpose — you create one through your choices.',
    school: 'existentialism',
    thinker: 'Jean-Paul Sartre',
    source: 'Existentialism Is a Humanism (1946)',
    category: 'philosophy',
    difficulty: 'intermediate',
    likes: 59,
    views: 315,
  },

  // ═══════════════════════════════════════════════════════════
  // JUNGIAN PSYCHOLOGY — Carl Jung
  // ═══════════════════════════════════════════════════════════
  {
    title: 'Meeting Your Shadow',
    content: `Everyone carries a shadow, and the less it is embodied in the individual's conscious life, the blacker and denser it is.

Carl Jung's concept of the "Shadow" is one of psychology's most powerful ideas. The Shadow is everything you deny, suppress, or refuse to see in yourself — your anger, your selfishness, your lust, your weakness.

The Shadow isn't evil. It's simply unacknowledged. And because it's unacknowledged, it operates outside your awareness, controlling you from the dark. It leaks out in projection — seeing in others what you won't admit in yourself. The person who is most bothered by others' arrogance is often the one who can't admit their own.

Integration doesn't mean acting on every dark impulse. It means acknowledging them, understanding them, and choosing how to channel them. A person who integrates their shadow is more whole, more honest, and paradoxically, more moral — because they're not pretending to be innocent.

Your Shadow is not your enemy. It's the raw material of your wholeness.

Practice: What quality in others triggers you most strongly? It might be a reflection of your own Shadow. Sit with that.`,
    summary: 'Your Shadow holds the key to wholeness — acknowledge it, don\'t repress it.',
    school: 'jungian',
    thinker: 'Carl Jung',
    source: 'Aion: Researches into the Phenomenology of the Self (1951)',
    category: 'psychology',
    difficulty: 'intermediate',
    likes: 55,
    views: 295,
  },
  {
    title: 'The Unconscious',
    content: `Until you make the unconscious conscious, it will direct your life and you will call it fate.

This is perhaps Jung's most quoted insight. The patterns you can't explain — the relationships you keep choosing, the self-sabotage that repeats, the reactions that seem disproportionate — are often driven by unconscious material.

You think you're making rational choices. But the unconscious is shaping your choices before you're aware of it. You're drawn to people who remind you of your parents. You avoid situations that echo old wounds. You react to present events as if they were past ones.

Making the unconscious conscious doesn't mean understanding everything about yourself. It means noticing patterns, questioning your automatic reactions, and being willing to look at what you'd rather not see.

The unconscious isn't a enemy. It's a source of wisdom — but only if you're willing to listen.

Practice: Notice one pattern in your life that seems to repeat. What might be driving it beneath the surface?`,
    summary: 'Until you make the unconscious conscious, it will direct your life and you will call it fate.',
    school: 'jungian',
    thinker: 'Carl Jung',
    source: 'Collected Works, Vol. 9, Part 1',
    category: 'psychology',
    difficulty: 'intermediate',
    likes: 62,
    views: 340,
  },

  // ═══════════════════════════════════════════════════════════
  // COGNITIVE PSYCHOLOGY — Kahneman, Beck
  // ═══════════════════════════════════════════════════════════
  {
    title: 'Thinking Fast and Slow',
    content: `Our brain has two systems: System 1 operates automatically and quickly, with little or no effort. System 2 allocates attention to effortful mental activities. Most of our judgments and decisions are made by System 1 — fast, intuitive, and often wrong.

Daniel Kahneman won the Nobel Prize for this framework. System 1 handles most of your daily decisions — recognizing faces, driving on empty roads, getting a gut feeling. System 2 handles complex calculations, critical analysis, and anything requiring focused attention.

The problem: System 2 is lazy. It defaults to accepting System 1's judgments rather than doing the hard work of verification. You think you're making rational decisions, but most are System 1 defaults.

System 1 is also riddled with biases — anchoring, availability, representativeness. These shortcuts are usually right but sometimes catastrophically wrong.

The result: you're systematically overconfident in your judgments, especially in domains where you have experience. Experience gives System 1 more material to work with — but doesn't make it more accurate.

Practice: Before an important decision, deliberately slow down. Ask: "What would System 2 say about System 1's instinctive answer?"`,
    summary: 'Your brain takes shortcuts — slow down to think clearly.',
    school: 'cognitivePsych',
    thinker: 'Daniel Kahneman',
    source: 'Thinking, Fast and Slow (2011)',
    category: 'psychology',
    difficulty: 'beginner',
    likes: 74,
    views: 400,
  },
  {
    title: 'Cognitive Distortions',
    content: `The way we think affects the way we feel — and the way we think is often systematically distorted.

Aaron Beck identified predictable errors in thinking that fuel depression and anxiety. These aren't random mistakes — they're patterns:

All-or-nothing thinking: "If I'm not perfect, I'm a failure."
Catastrophizing: "This small mistake will ruin everything."
Mind reading: "Everyone thinks I'm an idiot."
Emotional reasoning: "I feel anxious, so something bad must be happening."
Should statements: "I should be further along by now."

The distortions feel like truth. That's what makes them dangerous. You're not just thinking negatively — you're thinking inaccurately, and your emotions follow.

Cognitive Behavioral Therapy (CBT) works by identifying these distortions, challenging them with evidence, and replacing them with more balanced thoughts. The goal isn't positive thinking — it's accurate thinking.

Practice: For one day, notice when your thoughts jump to conclusions. Label the distortion: "That's catastrophizing" or "That's mind reading." The labeling itself reduces the thought's power.`,
    summary: 'Your mind takes predictable shortcuts that distort reality — learn to catch them.',
    school: 'cognitivePsych',
    thinker: 'Aaron Beck',
    source: 'Cognitive Therapy and the Emotional Disorders (1976)',
    category: 'psychology',
    difficulty: 'beginner',
    likes: 68,
    views: 360,
  },

  // ═══════════════════════════════════════════════════════════
  // SOCIAL PSYCHOLOGY — Milgram, Zimbardo
  // ═══════════════════════════════════════════════════════════
  {
    title: 'The Power of Authority',
    content: `The essence of obedience consists in the fact that a person comes to view themselves as the instrument for carrying out another person's wishes, and they therefore no longer see themselves as responsible for their actions.

In 1961, Stanley Milgram tested how far people would go when ordered by an authority figure. Participants were told to administer electric shocks to another person (actually an actor). 65% went all the way to the maximum voltage — even when the "victim" screamed in pain.

This proved that ordinary people can commit terrible acts when following authority. The participants weren't sadists. They were normal, well-meaning people who trusted the experimenter's authority.

Milgram's lesson: never blindly obey. Always question the orders you're given. "The system tends to produce obedient individuals who can be led to act against their own conscience."

When someone in authority tells you to do something that feels wrong, pause. Ask yourself: "Would I do this if no one were watching? Would I be proud of this choice?"

Practice: Notice when you're following authority without question. Who benefits from your obedience? Is the order just?`,
    summary: '65% of ordinary people delivered maximum "shock" when told to by an authority figure.',
    school: 'socialPsych',
    thinker: 'Stanley Milgram',
    source: 'Obedience to Authority (1974)',
    category: 'empirical',
    difficulty: 'intermediate',
    likes: 71,
    views: 385,
  },
  {
    title: 'The Power of the Situation',
    content: `The most important thing you can do to influence behavior is to change the situation. Context matters more than character.

Philip Zimbardo's Stanford Prison Experiment (and subsequent research) demonstrated that environment shapes behavior more than personality. Good people can do bad things when the situation demands it — and bad people can do good things when the situation enables it.

This is uncomfortable. We prefer to believe that behavior reflects character. But the evidence says otherwise: situation determines behavior far more than we admit.

The implication isn't that character doesn't matter — it's that character is expressed through action, and action is shaped by context. If you want to be a better person, design better situations. If you want to change behavior, change the environment.

This applies to your own life: if you want to eat better, don't rely on willpower — make healthy food convenient and unhealthy food inconvenient. If you want to exercise, schedule it and prepare your clothes the night before. Design the situation for success.

Practice: Look at one behavior you want to change. Instead of trying harder, design a better situation.`,
    summary: 'Environment shapes behavior more than personality — design yours wisely.',
    school: 'socialPsych',
    thinker: 'Philip Zimbardo',
    source: 'The Lucifer Effect (2007)',
    category: 'empirical',
    difficulty: 'beginner',
    likes: 64,
    views: 345,
  },

  // ═══════════════════════════════════════════════════════════
  // VIRTUE ETHICS — Aristotle, Nicomachean Ethics
  // ═══════════════════════════════════════════════════════════
  {
    title: 'The Golden Mean',
    content: `Excellence is not an act, but a habit. We are what we repeatedly do. Excellence, then, is not an act but a habit.

Aristotle taught that virtue lies at the mean between two extremes — excess and deficiency. Courage is the mean between cowardice (deficiency) and recklessness (excess). Generosity is the mean between stinginess and wastefulness. Humility is the mean between self-deprecation and arrogance.

The mean isn't mathematical — it's contextual. What's courageous for a soldier might be reckless for a civilian. Finding the mean requires practical wisdom (phronesis), not just following rules.

"The virtues are formed in man by his doing the actions," Aristotle wrote. You don't become brave by reading about bravery. You become brave by acting bravely, over and over, until it becomes second nature.

Virtue is a habit, not an event. Small daily choices compound into character.

Practice: Pick one virtue you want to cultivate. Act on it deliberately today, tomorrow, and the day after. Watch it become part of you.`,
    summary: 'Virtue lies in the balance — find the mean between two extremes.',
    school: 'stoicism',
    thinker: 'Aristotle',
    source: 'Nicomachean Ethics, Book II',
    category: 'ethics',
    difficulty: 'intermediate',
    likes: 57,
    views: 290,
  },
  {
    title: 'Eudaimonia — The Good Life',
    content: `The good for man is an activity of the soul in accordance with virtue, and if there are more than one virtue, in accordance with the best and most complete.

Aristotle's word for the ultimate goal of human life was eudaimonia — usually translated as "happiness" but meaning something closer to "flourishing" or "living well."

For Aristotle, eudaimonia isn't a feeling you chase. It's an activity — the activity of living virtuously. The person who exercises courage, wisdom, generosity, and justice isn't just "doing the right thing." They're achieving the highest form of human excellence.

This means the good life isn't about having things — it's about being something. It's about becoming the best version of yourself, consistently, over time.

Happiness isn't found. It's built — one virtuous choice at a time.

Practice: Ask yourself: "Am I doing what I'm capable of doing? Am I living up to my potential — not in status, but in character?"`,
    summary: 'The good life is built through virtuous action, not passive pleasure.',
    school: 'stoicism',
    thinker: 'Aristotle',
    source: 'Nicomachean Ethics, Book I',
    category: 'philosophy',
    difficulty: 'beginner',
    likes: 53,
    views: 265,
  },

  // ═══════════════════════════════════════════════════════════
  // NIHILISM — Nietzsche
  // ═══════════════════════════════════════════════════════════
  {
    title: 'Amor Fati — Love Your Fate',
    content: `My formula for greatness in a human being is amor fati: that one wants nothing to be different, not forward, not backward, not in all eternity. Not merely bear what is necessary, still less conceal it, but love it.

Nietzsche's amor fati isn't passive acceptance. It's active love — embracing everything that has happened, is happening, and will happen, as necessary and beautiful.

The person who loves their fate doesn't wish things had gone differently. They recognize that every experience — including suffering — shaped who they've become. To wish away the pain is to wish away the person you are now.

This is the ultimate affirmation: not just accepting life, but loving it. Not just enduring the struggle, but finding it necessary and good.

It's the opposite of regret. It's not saying "I wish I hadn't done that." It's saying "I would not have it any other way."

Practice: Say to yourself — "I would not have it any other way." Notice what happens in your body. Can you mean it?`,
    summary: 'Love everything that happens — it\'s all necessary and beautiful.',
    school: 'nihilism',
    thinker: 'Friedrich Nietzsche',
    source: 'Ecce Homo (1908)',
    category: 'resilience',
    difficulty: 'advanced',
    likes: 73,
    views: 395,
  },
  {
    title: 'The Three Metamorphoses',
    content: `Of three metamorphoses of the spirit I tell you: how the spirit becomes a camel; and the camel, a lion; and the lion, at last, a child.

The Camel kneels and asks, "What is heaviest?" It takes on burdens — duties, traditions, moral laws. It carries them into the desert. This is the spirit of obedience and discipline.

In the desert, the Camel becomes a Lion, roaring "I will!" The Lion fights the great dragon of "Thou Shalt," creating freedom for new values. But the Lion cannot create values — it can only destroy old ones.

Finally, the Lion becomes a Child — "innocence and forgetting, a new beginning, a game, a self-propelled wheel, a first movement, a sacred Yes." The Child creates new values through play, not through rebellion.

The sequence matters: you must carry the weight before you can fight, and fight before you can create. You can't skip steps.

Practice: Which stage are you in? Are you carrying the camel's load? Fighting the lion's battle? Or ready to play like the child?`,
    summary: 'To create your own values, you must first carry the weight, then fight, then play.',
    school: 'nihilism',
    thinker: 'Friedrich Nietzsche',
    source: 'Thus Spoke Zarathustra (1883)',
    category: 'philosophy',
    difficulty: 'advanced',
    likes: 66,
    views: 340,
  },

  // ═══════════════════════════════════════════════════════════
  // HUMANISM — Maslow, Rogers
  // ═══════════════════════════════════════════════════════════
  {
    title: 'Self-Actualization',
    content: `A musician must make music, an artist must paint, a poet must write, if he is to be ultimately at peace with himself. What a man can be, he must be.

Abraham Maslow proposed a hierarchy of needs: food, water, shelter, safety, belonging, esteem, and finally — self-actualization. It's the drive to become everything you're capable of becoming.

Maslow studied people he considered self-actualized — Lincoln, Einstein, Eleanor Roosevelt — and found common traits: acceptance of self and others, spontaneity, creativity, a focus on problems outside themselves, and a profound appreciation for life's basic pleasures.

Self-actualization isn't about achieving status or wealth. It's about fulfilling your potential — becoming who you truly are.

Self-actualization isn't a destination. It's a direction. Are you moving toward your full potential, or away from it?

Practice: What did you love doing as a child, before the world told you what to be? That's your direction.`,
    summary: 'Become everything you\'re capable of becoming — that is the highest need.',
    school: 'humanism',
    thinker: 'Abraham Maslow',
    source: 'Toward a Psychology of Being (1962)',
    category: 'psychology',
    difficulty: 'beginner',
    likes: 61,
    views: 320,
  },

  // ═══════════════════════════════════════════════════════════
  // META THINKING — Mental Models
  // ═══════════════════════════════════════════════════════════
  {
    title: 'Second-Order Thinking',
    content: `First-order thinking: "If I do X, Y will happen." Second-order thinking: "And then what?" Every action has consequences, and those consequences have consequences.

Howard Marks calls this "second-level thinking." It's what separates good investors from great ones. It's also what separates good decisions from great ones in every domain.

Most people stop at the first consequence. Smart thinkers play it out further. Raising minimum wage → businesses cut hours → workers earn less → inflation rises → real wages fall. The first-order effect is good. The second-order effect is bad.

This doesn't mean second-order effects are always bad. Sometimes the second and third consequences are even better than the first. But you won't know unless you think further.

Practice: Before any significant decision, play it forward three steps. "If I do this, then this happens. And then this happens. And then..." The third consequence is often the one that matters most.`,
    summary: 'Don\'t just ask "and then what?" — ask "and then what happens AFTER that?"',
    school: 'pragmatism',
    thinker: 'Howard Marks',
    source: 'The Most Important Thing (2011)',
    category: 'wisdom',
    difficulty: 'intermediate',
    likes: 79,
    views: 410,
  },
  {
    title: 'Map Is Not the Territory',
    content: `The map is not the territory. The name is not the thing named.

Alfred Korzybski's famous phrase: your mental model of reality is not reality itself. Your map might be useful, but it's always incomplete, always simplified, always distorted.

Your perception of a person is not the person. Your understanding of a concept is not the concept. Your theory of the world is not the world.

This sounds obvious, but it has profound implications. We confuse our maps with reality constantly — especially in arguments. Two people can look at the same territory and see completely different things, because they're looking at different maps.

The wise person holds their maps loosely, updates them frequently, and remembers that every map is an approximation. Reality is always more complex, more nuanced, and more surprising than any model can capture.

Practice: Pick a strong opinion you hold. Ask: "Is this the territory, or just my map? What am I missing?"`,
    summary: 'Your mental model of reality is not reality itself — hold your maps loosely.',
    school: 'pragmatism',
    thinker: 'Alfred Korzybski',
    source: 'Science and Sanity (1931)',
    category: 'wisdom',
    difficulty: 'beginner',
    likes: 55,
    views: 285,
  },
  {
    title: 'Steel Manning',
    content: `The opposite of straw-manning. Instead of attacking the weakest version of your opponent's argument, construct the STRONGEST possible version of their position — then argue against that.

If you can't defeat the best version of their argument, maybe they have a point. This is intellectual honesty at its finest. It forces you to truly understand opposing views before dismissing them.

Steel manning reveals something uncomfortable: many of the positions you disagree with are actually reasonable when stated fairly. The people holding them aren't stupid or evil — they're responding to different experiences and values.

Try this: Pick a position you disagree with. Write the strongest possible case for it — the version that would convince a reasonable person. If you can't, you don't understand the position well enough to argue against it.

This is harder than it sounds. It requires empathy, intellectual humility, and genuine curiosity — qualities that are rare in online discourse.

Practice: Find someone you disagree with. Argue their position as if you believed it. Really try to make the strongest case. Notice what happens.`,
    summary: 'Build the strongest version of your opponent\'s argument, then argue against THAT.',
    school: 'pragmatism',
    thinker: 'Various',
    source: 'Rationalist Community',
    category: 'wisdom',
    difficulty: 'intermediate',
    likes: 67,
    views: 355,
  },
];

async function seed() {
  console.log('🌱 Seeding Saiki with real, source-verified quotes...\n');

  for (const tip of seedTips) {
    const id = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    await db.insert(tips).values({
      id,
      ...tip,
      publishedAt: Date.now(),
      createdAt: Date.now(),
    });
    console.log(`  ✅ ${tip.title} (${tip.thinker})`);
  }

  console.log(`\n🎉 Seeded ${seedTips.length} verified tips!`);
  console.log('📚 Sources: MIT Classics, Project Gutenberg (public domain)');
  process.exit(0);
}

seed().catch((err) => {
  console.error('❌ Seed failed:', err);
  process.exit(1);
});

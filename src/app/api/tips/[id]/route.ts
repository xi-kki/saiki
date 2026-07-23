import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

// Demo tips data
const demoTips: Record<string, any> = {
  'demo-1': {
    id: 'demo-1',
    title: 'The Dichotomy of Control',
    content: 'Some things are in our control and others not. Things in our control are opinion, pursuit, desire, aversion, and, in a word, whatever are our own actions. Things not in our control are body, property, reputation, command, and, in one word, whatever are not our own actions.\n\nEpictetus, a former slave, opens the Enchiridion with this foundational distinction. It\'s deceptively simple — and profoundly liberating.\n\nThe things in our control are by nature free, unrestrained, unhindered; but those not in our control are weak, slavish, restrained, belonging to others.',
    summary: 'Some things are in our control and others not — know the difference.',
    school: 'stoicism',
    thinker: 'Epictetus',
    source: 'Enchiridion, Section 1',
    category: 'philosophy',
    difficulty: 'beginner',
    likes: 72,
    views: 390,
  },
  'demo-2': {
    id: 'demo-2',
    title: 'Mind Is the Forerunner',
    content: 'All that we are is the result of what we have thought: it is founded on our thoughts, it is made up of our thoughts. If a man speaks or acts with an evil thought, pain follows him, as the wheel follows the foot of the ox that draws the carriage.\n\nThis is the opening verse of the Dhammapada — the most widely read Buddhist scripture.',
    summary: 'All that we are is the result of what we have thought.',
    school: 'buddhist',
    thinker: 'Buddha',
    source: 'Dhammapada, Verse 1-2',
    category: 'mindfulness',
    difficulty: 'beginner',
    likes: 71,
    views: 380,
  },
  'demo-3': {
    id: 'demo-3',
    title: 'The Tao That Can Be Told',
    content: 'The Tao that can be told is not the eternal Tao. The name that can be named is not the eternal name. The nameless is the beginning of heaven and earth. The named is the mother of ten thousand things.\n\nThe Tao Te Ching opens with a paradox: the moment you try to define the ultimate reality, you\'ve lost it.',
    summary: 'Hold your concepts loosely.',
    school: 'taoism',
    thinker: 'Lao Tzu',
    source: 'Tao Te Ching, Chapter 1',
    category: 'philosophy',
    difficulty: 'advanced',
    likes: 56,
    views: 290,
  },
};

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Try to load from database
    const { createClient } = await import('@libsql/client');
    const client = createClient({ url: 'file:./local.db' });

    const result = await client.execute({
      sql: 'SELECT * FROM tips WHERE id = ?',
      args: [params.id],
    });

    if (result.rows.length > 0) {
      const row = result.rows[0];

      // Increment views
      await client.execute({
        sql: 'UPDATE tips SET views = views + 1 WHERE id = ?',
        args: [params.id],
      });

      return NextResponse.json({
        tip: {
          id: row.id,
          title: row.title,
          content: row.content,
          summary: row.summary,
          school: row.school,
          thinker: row.thinker,
          source: row.source,
          category: row.category,
          difficulty: row.difficulty,
          likes: row.likes,
          views: row.views,
        },
      });
    }
  } catch (error) {
    console.log('Database not available, using demo data');
  }

  // Fallback to demo data
  const tip = demoTips[params.id];
  if (tip) {
    return NextResponse.json({ tip });
  }

  return NextResponse.json({ error: 'Tip not found' }, { status: 404 });
}

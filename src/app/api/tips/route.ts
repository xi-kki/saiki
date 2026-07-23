import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

// Demo tips data for when database is not available
const demoTips = [
  {
    id: 'demo-1',
    title: 'The Dichotomy of Control',
    content: 'Some things are in our control and others not. Things in our control are opinion, pursuit, desire, aversion, and, in a word, whatever are our own actions.',
    summary: 'Focus only on what you can control.',
    school: 'stoicism',
    thinker: 'Epictetus',
    source: 'Enchiridion',
    category: 'philosophy',
    difficulty: 'beginner',
    likes: 72,
    views: 390,
  },
  {
    id: 'demo-2',
    title: 'Mind Is the Forerunner',
    content: 'All that we are is the result of what we have thought: it is founded on our thoughts, it is made up of our thoughts.',
    summary: 'All that we are is the result of what we have thought.',
    school: 'buddhist',
    thinker: 'Buddha',
    source: 'Dhammapada',
    category: 'mindfulness',
    difficulty: 'beginner',
    likes: 71,
    views: 380,
  },
  {
    id: 'demo-3',
    title: 'The Tao That Can Be Told',
    content: 'The Tao that can be told is not the eternal Tao. The name that can be named is not the eternal name.',
    summary: 'Hold your concepts loosely.',
    school: 'taoism',
    thinker: 'Lao Tzu',
    source: 'Tao Te Ching',
    category: 'philosophy',
    difficulty: 'advanced',
    likes: 56,
    views: 290,
  },
];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const limit = parseInt(searchParams.get('limit') || '20');
  const school = searchParams.get('school') || undefined;

  try {
    // Try to load from database
    const { createClient } = await import('@libsql/client');
    const client = createClient({ url: 'file:./local.db' });

    let sql = 'SELECT * FROM tips';
    const args: any[] = [];

    if (school) {
      sql += ' WHERE school = ?';
      args.push(school);
    }

    sql += ' ORDER BY published_at DESC LIMIT ?';
    args.push(limit);

    const result = await client.execute({ sql, args });

    if (result.rows.length > 0) {
      const countResult = await client.execute('SELECT COUNT(*) as count FROM tips');
      const total = Number(countResult.rows[0]?.count || 0);

      return NextResponse.json({
        tips: result.rows.map((row) => ({
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
        })),
        total,
        page: 1,
        totalPages: Math.ceil(total / limit),
      });
    }
  } catch (error) {
    console.log('Database not available, using demo data');
  }

  // Fallback to demo data
  return NextResponse.json({
    tips: demoTips.slice(0, limit),
    total: demoTips.length,
    page: 1,
    totalPages: 1,
  });
}

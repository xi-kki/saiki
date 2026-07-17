import { NextResponse } from 'next/server';
import { getTodaysTips, getAllTips } from '@/lib/tips';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get('page') || '1');
  const school = searchParams.get('school') || undefined;
  const today = searchParams.get('today') === 'true';

  try {
    if (today) {
      const tips = await getTodaysTips();
      return NextResponse.json({ tips });
    }

    const tips = await getAllTips(page, 20, school);
    return NextResponse.json({ tips });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch tips' },
      { status: 500 }
    );
  }
}

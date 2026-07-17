import { NextResponse } from 'next/server';
import { toggleFavorite, getUserFavorites } from '@/lib/tips';

export async function POST(request: Request) {
  try {
    const { tipId, note } = await request.json();

    // TODO: Get actual user from session
    const userId = 'demo-user';

    const result = await toggleFavorite(userId, tipId, note);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to toggle favorite' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    // TODO: Get actual user from session
    const userId = 'demo-user';
    const favorites = await getUserFavorites(userId);
    return NextResponse.json({ favorites });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch favorites' },
      { status: 500 }
    );
  }
}

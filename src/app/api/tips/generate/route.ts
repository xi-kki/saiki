import { NextRequest, NextResponse } from 'next/server';
import { generateTip, generateDailyTips, type SchoolId } from '@/lib/groq';
import { checkRateLimit } from '@/lib/rate-limit';
import { sanitize, isValidSchoolId } from '@/lib/sanitize';

export const dynamic = 'force-dynamic';

// ─── POST /api/tips/generate ─────────────────────────────
// Generate a single tip for a school
export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';
    const { allowed, remaining, resetIn } = checkRateLimit(ip);

    if (!allowed) {
      return NextResponse.json(
        { error: 'Rate limit exceeded. Try again in ' + Math.ceil(resetIn / 1000) + 's' },
        { status: 429, headers: { 'Retry-After': String(Math.ceil(resetIn / 1000)) } }
      );
    }

    const body = await request.json();
    const { school } = body;

    // Validate and sanitize
    if (!school || typeof school !== 'string') {
      return NextResponse.json(
        { error: 'School parameter required' },
        { status: 400 }
      );
    }

    const sanitizedSchool = sanitize(school);

    if (!isValidSchoolId(sanitizedSchool)) {
      return NextResponse.json(
        { error: 'Invalid school ID' },
        { status: 400 }
      );
    }

    const tip = await generateTip(sanitizedSchool as SchoolId);

    return NextResponse.json({
      success: true,
      school,
      tip,
      _rateLimit: { remaining, resetIn },
    });
  } catch (error) {
    console.error('Tip generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate tip' },
      { status: 500 }
    );
  }
}

// ─── GET /api/tips/generate ──────────────────────────────
// Generate multiple daily tips
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const count = parseInt(searchParams.get('count') || '5', 10);

    // Limit to max 12 tips (one per school)
    const tipCount = Math.min(Math.max(count, 1), 12);

    const tips = await generateDailyTips(tipCount);

    return NextResponse.json({
      success: true,
      count: tips.length,
      tips,
    });
  } catch (error) {
    console.error('Daily tips generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate daily tips' },
      { status: 500 }
    );
  }
}

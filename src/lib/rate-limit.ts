// ─── Simple In-Memory Rate Limiter ───────────────────────
// For production, use Redis-backed rate limiting

const rateLimit = new Map<string, { count: number; resetTime: number }>();

const WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS = 10; // 10 requests per minute per IP

export function checkRateLimit(ip: string): {
  allowed: boolean;
  remaining: number;
  resetIn: number;
} {
  const now = Date.now();
  const record = rateLimit.get(ip);

  if (!record || now > record.resetTime) {
    // New window
    rateLimit.set(ip, { count: 1, resetTime: now + WINDOW_MS });
    return { allowed: true, remaining: MAX_REQUESTS - 1, resetIn: WINDOW_MS };
  }

  if (record.count >= MAX_REQUESTS) {
    // Rate limited
    return {
      allowed: false,
      remaining: 0,
      resetIn: record.resetTime - now,
    };
  }

  // Increment counter
  record.count++;
  return {
    allowed: true,
    remaining: MAX_REQUESTS - record.count,
    resetIn: record.resetTime - now,
  };
}

// ─── Cleanup old entries every 5 minutes ─────────────────
if (typeof setInterval !== 'undefined') {
  setInterval(() => {
    const now = Date.now();
    for (const [ip, record] of rateLimit.entries()) {
      if (now > record.resetTime) {
        rateLimit.delete(ip);
      }
    }
  }, 5 * 60 * 1000);
}

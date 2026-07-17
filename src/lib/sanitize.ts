// ─── Input Sanitization ──────────────────────────────────
// Prevent XSS and injection attacks

/**
 * Sanitize a string by removing HTML tags and dangerous characters
 */
export function sanitize(input: string): string {
  return input
    .replace(/<[^>]*>/g, '') // Remove HTML tags
    .replace(/[<>"'&]/g, (char) => {
      // Escape special characters
      const entities: Record<string, string> = {
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#x27;',
        '&': '&amp;',
      };
      return entities[char] || char;
    })
    .trim();
}

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate school ID
 */
export function isValidSchoolId(school: string): boolean {
  const validSchools = [
    'stoicism', 'existentialism', 'buddhism', 'jungian',
    'taoism', 'nihilism', 'behaviorism', 'logotherapy',
    'virtueEthics', 'cognitivePsych', 'socialPsych', 'absurdism',
  ];
  return validSchools.includes(school);
}

/**
 * Validate and sanitize user input for tips
 */
export function validateTipInput(input: unknown): {
  valid: boolean;
  error?: string;
  school?: string;
} {
  if (!input || typeof input !== 'object') {
    return { valid: false, error: 'Invalid request body' };
  }

  const { school } = input as Record<string, unknown>;

  if (!school || typeof school !== 'string') {
    return { valid: false, error: 'School parameter required' };
  }

  const sanitized = sanitize(school);

  if (!isValidSchoolId(sanitized)) {
    return { valid: false, error: 'Invalid school ID' };
  }

  return { valid: true, school: sanitized };
}

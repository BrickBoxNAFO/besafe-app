/**
 * In-memory rate limiter using Map
 * Note: This is best-effort on serverless platforms and resets on cold starts.
 * For production, consider using Redis or another persistent store.
 */

const store = new Map();

/**
 * Rate limit a key with the given limit and time window
 * @param {string} key - Unique identifier (e.g., 'register:192.168.1.1')
 * @param {number} limit - Maximum number of requests allowed
 * @param {number} windowMs - Time window in milliseconds
 * @returns {{ success: boolean, remaining: number }}
 */
export function rateLimit(key, limit, windowMs) {
  const now = Date.now();
  const record = store.get(key);

  // Clean up expired entries for this key
  if (record) {
    record.attempts = record.attempts.filter(time => now - time < windowMs);
  }

  if (!record || record.attempts.length === 0) {
    // First request in the window
    store.set(key, {
      attempts: [now],
      expiresAt: now + windowMs,
    });
    return { success: true, remaining: limit - 1 };
  }

  const remaining = limit - record.attempts.length;

  if (record.attempts.length < limit) {
    // Within limit
    record.attempts.push(now);
    return { success: true, remaining: remaining - 1 };
  }

  // Exceeded limit
  return { success: false, remaining: 0 };
}

/**
 * Clean up expired entries from the store
 * Can be called periodically to free memory
 */
export function cleanupStore() {
  const now = Date.now();
  for (const [key, record] of store.entries()) {
    if (record.expiresAt && now > record.expiresAt) {
      store.delete(key);
    }
  }
}

/**
 * Clear the entire store (useful for testing)
 */
export function clearStore() {
  store.clear();
}

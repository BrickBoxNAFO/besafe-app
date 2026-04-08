/**
 * Simple in-memory rate limiter for Next.js API routes.
 *
 * Usage:
 *   const limiter = createRateLimiter({ max: 5, windowMs: 60 * 60 * 1000 })
 *   const { ok, remaining, retryAfterMs } = limiter.check(key)
 *
 * Notes:
 *   - This uses a Map stored in the module scope, so it persists across
 *     requests within the same serverless function instance.
 *   - On Vercel, each cold start resets the map, so this is "best effort"
 *     rather than bullet-proof. For most small-to-medium sites this is
 *     more than enough to stop bots and brute-force attempts.
 *   - Stale entries are cleaned up automatically to prevent memory leaks.
 */

export function createRateLimiter({ max, windowMs }) {
  const hits = new Map() // key → { count, resetAt }

  // Clean up expired entries every 5 minutes
  const CLEANUP_INTERVAL = 5 * 60 * 1000
  let lastCleanup = Date.now()

  function cleanup() {
    const now = Date.now()
    if (now - lastCleanup < CLEANUP_INTERVAL) return
    lastCleanup = now
    for (const [key, entry] of hits) {
      if (now > entry.resetAt) hits.delete(key)
    }
  }

  return {
    check(key) {
      cleanup()
      const now = Date.now()
      const entry = hits.get(key)

      // No existing entry or window expired — allow and start fresh
      if (!entry || now > entry.resetAt) {
        hits.set(key, { count: 1, resetAt: now + windowMs })
        return { ok: true, remaining: max - 1, retryAfterMs: 0 }
      }

      // Within window — increment
      entry.count++

      if (entry.count > max) {
        const retryAfterMs = entry.resetAt - now
        return { ok: false, remaining: 0, retryAfterMs }
      }

      return { ok: true, remaining: max - entry.count, retryAfterMs: 0 }
    },
  }
}

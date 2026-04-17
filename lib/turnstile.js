/**
 * Server-side Cloudflare Turnstile token verification.
 * Used in API routes to validate the cf-turnstile-response token.
 */

const TURNSTILE_VERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify'

/**
 * Verify a Turnstile token server-side.
 * @param {string} token — the cf-turnstile-response token from the client
 * @returns {Promise<{success: boolean, error?: string}>}
 */
export async function verifyTurnstile(token) {
  if (!token) {
    return { success: false, error: 'Missing Turnstile token' }
  }

  const secret = process.env.TURNSTILE_SECRET_KEY
  if (!secret) {
    console.error('TURNSTILE_SECRET_KEY is not set')
    // Fail open in development, fail closed in production
    if (process.env.NODE_ENV === 'development') {
      return { success: true }
    }
    return { success: false, error: 'Turnstile is not configured' }
  }

  try {
    const res = await fetch(TURNSTILE_VERIFY_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ secret, response: token }),
    })

    const data = await res.json()

    if (data.success) {
      return { success: true }
    }

    return {
      success: false,
      error: 'Turnstile verification failed',
    }
  } catch (err) {
    console.error('Turnstile verification error:', err)
    return { success: false, error: 'Turnstile verification request failed' }
  }
}

import { NextResponse } from 'next/server'
import { verifyTurnstile } from '@/lib/turnstile'

/**
 * POST /api/turnstile/verify
 * Verifies a Cloudflare Turnstile token server-side.
 * Used by login and register forms before submitting credentials.
 */
export async function POST(request) {
  try {
    const { turnstileToken } = await request.json()

    const result = await verifyTurnstile(turnstileToken)

    if (!result.success) {
      return NextResponse.json(
        { error: result.error || 'Verification failed' },
        { status: 403 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Turnstile verify error:', error)
    return NextResponse.json(
      { error: 'Verification request failed' },
      { status: 500 }
    )
  }
}

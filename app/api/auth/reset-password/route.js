import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { createRateLimiter } from '@/lib/rate-limit'
import { headers } from 'next/headers'

// 3 reset requests per email per 10 minutes
const emailLimiter = createRateLimiter({ max: 3, windowMs: 10 * 60 * 1000 })
// Also limit by IP to stop bots trying many different emails
const ipLimiter = createRateLimiter({ max: 10, windowMs: 10 * 60 * 1000 })

function getAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY,
    { auth: { autoRefreshToken: false, persistSession: false } }
  )
}

export async function POST(request) {
  try {
    const hdrs = await headers()
    const ip =
      hdrs.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      hdrs.get('x-real-ip') ||
      'unknown'

    // Check IP rate limit first
    const ipCheck = ipLimiter.check(`reset-ip:${ip}`)
    if (!ipCheck.ok) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429, headers: { 'Retry-After': String(Math.ceil(ipCheck.retryAfterMs / 1000)) } }
      )
    }

    const { email } = await request.json()

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 })
    }

    const normalisedEmail = email.toLowerCase().trim()

    // Check per-email rate limit
    const emailCheck = emailLimiter.check(`reset-email:${normalisedEmail}`)
    if (!emailCheck.ok) {
      const mins = Math.ceil(emailCheck.retryAfterMs / 60000)
      return NextResponse.json(
        { error: `Too many reset requests for this email. Please try again in ${mins} minute${mins > 1 ? 's' : ''}.` },
        { status: 429, headers: { 'Retry-After': String(Math.ceil(emailCheck.retryAfterMs / 1000)) } }
      )
    }

    const supabase = getAdminClient()

    // Use the admin API to generate a password reset link
    const { data, error } = await supabase.auth.admin.generateLink({
      type: 'recovery',
      email: normalisedEmail,
      options: {
        redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/update-password`,
      },
    })

    if (error) {
      console.error('Reset password error:', error)
      // Don't reveal whether the email exists or not
    }

    // Always return success to prevent email enumeration
    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Reset password API error:', err)
    return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 })
  }
}

import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { createRateLimiter } from '@/lib/rate-limit'
import { headers } from 'next/headers'

// 5 signups per IP per hour
const limiter = createRateLimiter({ max: 5, windowMs: 60 * 60 * 1000 })

// Admin client for server-side auth operations
function getAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY,
    { auth: { autoRefreshToken: false, persistSession: false } }
  )
}

export async function POST(request) {
  try {
    // Get client IP for rate limiting
    const hdrs = await headers()
    const ip =
      hdrs.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      hdrs.get('x-real-ip') ||
      'unknown'

    const { ok, retryAfterMs } = limiter.check(`register:${ip}`)

    if (!ok) {
      const retryAfterSec = Math.ceil(retryAfterMs / 1000)
      return NextResponse.json(
        { error: `Too many signup attempts. Please try again in ${Math.ceil(retryAfterSec / 60)} minutes.` },
        {
          status: 429,
          headers: { 'Retry-After': String(retryAfterSec) },
        }
      )
    }

    const { name, email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required.' }, { status: 400 })
    }
    if (password.length < 8) {
      return NextResponse.json({ error: 'Password must be at least 8 characters.' }, { status: 400 })
    }

    const supabase = getAdminClient()

    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      user_metadata: { name: name || '' },
      email_confirm: false, // sends confirmation email
    })

    if (error) {
      // Supabase returns 422 for duplicate emails etc
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json({ success: true, userId: data.user?.id })
  } catch (err) {
    console.error('Register API error:', err)
    return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 })
  }
}

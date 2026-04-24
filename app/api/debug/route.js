import { cookies } from 'next/headers'
import { createClient } from '@/utils/supabase/server'

// Diagnostic endpoint — requires authentication.
// Only returns auth status info, no env var details.
export async function GET() {
  const cookieStore = await cookies()

  let userResult = null
  let sessionResult = null
  let errorMsg = null
  try {
    const supabase = createClient(cookieStore)
    const u = await supabase.auth.getUser()

    // Gate: must be logged in
    if (!u?.data?.user) {
      return Response.json({ error: 'Unauthorised' }, { status: 401 })
    }

    userResult = {
      userId: u.data.user.id,
      email: u.data.user.email || null,
      error: u.error?.message || null,
    }
    const s = await supabase.auth.getSession()
    sessionResult = {
      hasSession: !!s?.data?.session,
      expiresAt: s?.data?.session?.expires_at || null,
      error: s?.error?.message || null,
    }
  } catch (e) {
    errorMsg = e?.message || String(e)
  }

  return Response.json({
    timestamp: new Date().toISOString(),
    userResult,
    sessionResult,
    errorMsg,
  }, { status: 200 })
}

export const dynamic = 'force-dynamic'

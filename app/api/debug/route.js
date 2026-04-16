import { cookies } from 'next/headers'
import { createClient } from '@/utils/supabase/server'

// Diagnostic endpoint — visit /api/debug after signing in to see what's
// actually happening. Remove after debugging.
export async function GET() {
  const cookieStore = await cookies()
  const all = cookieStore.getAll()
  const cookieSummary = all.map(c => ({
    name: c.name,
    length: c.value?.length || 0,
    preview: (c.value || '').substring(0, 30),
  }))
  const supabaseCookies = all
    .filter(c => c.name.startsWith('sb-'))
    .map(c => c.name)

  let userResult = null
  let sessionResult = null
  let errorMsg = null
  try {
    const supabase = createClient(cookieStore)
    const u = await supabase.auth.getUser()
    userResult = {
      userId: u?.data?.user?.id || null,
      email: u?.data?.user?.email || null,
      error: u?.error?.message || null,
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
    env: {
      hasUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
      hasPublishableKey: !!process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY,
      hasAnonKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      hasServiceKey: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
      keyPrefix: (process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '').substring(0, 10),
    },
    cookieCount: all.length,
    supabaseCookies,
    cookieSummary,
    userResult,
    sessionResult,
    errorMsg,
  }, { status: 200 })
}

export const dynamic = 'force-dynamic'

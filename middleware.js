import { createClient } from '@/utils/supabase/middleware'
import { NextResponse } from 'next/server'

// Canonical Supabase SSR pattern:
// Middleware's ONLY job is to refresh the session. It does NOT do auth checks
// or redirects — pages handle their own auth via getUser() in server components.
//
// This matters because Next.js server components CANNOT reliably write cookies
// (cookieStore.set() throws, and @supabase/ssr's setAll handler catches silently).
// If server components trigger a token refresh, the new cookies are lost and
// the browser keeps sending now-invalidated old cookies on the next request —
// which is why clicking any link was logging users out.
//
// Middleware, on the other hand, CAN write cookies. So we do the refresh here,
// which updates both the request (for this request's server components) and the
// response (for the browser). Server components' subsequent getUser() calls
// just validate — no refresh, no cookie rotation, no data loss.
export async function middleware(request) {
  try {
    const { supabase, supabaseResponse } = createClient(request)
    // Refresh the session. supabaseResponse gets the new cookies on its way
    // back to the browser, and request.cookies are updated for this request.
    await supabase.auth.getUser()
    return supabaseResponse
  } catch (e) {
    // If Supabase SSR fails for any reason at the Edge runtime, never redirect.
    // Just pass the request through — pages will handle auth themselves.
    return NextResponse.next()
  }
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|api/stripe-webhook).*)'],
}

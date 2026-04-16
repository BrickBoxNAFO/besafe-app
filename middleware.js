import { NextResponse } from 'next/server'

// PASSTHROUGH MIDDLEWARE — intentionally does NOT call Supabase.
//
// Why: @supabase/ssr at the Edge runtime (where Next.js middleware runs)
// has a bug where calling getUser() can rotate / wipe session cookies when
// the library's internal token refresh doesn't round-trip cleanly. That
// causes users to get logged out on navigation.
//
// Pages protect themselves: /dashboard, /course/[id], /lesson/[...], /account,
// /library all call supabase.auth.getUser() server-side and redirect to /login
// if there's no user. Middleware auth checking is redundant, so we skip it.
export function middleware(request) {
  return NextResponse.next()
}

// Matcher kept narrow — middleware only runs where it's needed, which is
// effectively nowhere now. We leave a harmless matcher so the file is valid.
export const config = {
  matcher: ['/__noop__'],
}

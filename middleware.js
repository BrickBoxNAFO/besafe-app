import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/middleware'
import { countryToRegion } from '@/lib/pricing'

export async function middleware(request) {
  const { supabase, supabaseResponse } = createClient(request)

  // Refresh session keeps the user logged in
  const { data: { user } } = await supabase.auth.getUser()

  // ── Geo-detection: resolve visitor country to pricing region ──
  const country = request.headers.get('x-vercel-ip-country') || request.geo?.country || ''
  const region = countryToRegion(country)

  // Set the region cookie using raw Set-Cookie header directly.
  // This bypasses NextResponse.cookies which can be unreliable with
  // Supabase middleware's response reassignment and httpOnly defaults.
  supabaseResponse.headers.append(
    'Set-Cookie',
    `pricing_region=${region}; Path=/; Max-Age=86400; SameSite=Lax`
  )

  // Protect routes
  const protectedPaths = ['/dashboard', '/account', '/library', '/course', '/lesson']
  const isProtected = protectedPaths.some(p => request.nextUrl.pathname.startsWith(p))

  if (isProtected && !user) {
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('redirect', request.nextUrl.pathname)
    return NextResponse.redirect(loginUrl)
  }

  return supabaseResponse
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|api/stripe-webhook).*)'],
}

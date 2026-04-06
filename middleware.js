import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/middleware'
import { countryToRegion } from '@/lib/pricing'

export async function middleware(request) {
  const { supabase, supabaseResponse } = createClient(request)

  // ── Geo-detection: resolve visitor country to pricing region ──
  const country = request.headers.get('x-vercel-ip-country') || request.geo?.country || ''
  const region = countryToRegion(country)

  // Set the region as a cookie so client components can read it
  supabaseResponse.cookies.set('pricing_region', region, {
    path: '/',
    maxAge: 60 * 60 * 24, // 24 hours
    sameSite: 'lax',
  })

  // Refresh session keeps the user logged in
  const { data: { user } } = await supabase.auth.getUser()

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

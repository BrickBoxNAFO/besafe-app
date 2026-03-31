import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/middleware'

export async function middleware(request) {
  const { supabase, supabaseResponse } = createClient(request)

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

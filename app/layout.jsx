import './globals.css'
import { cookies } from 'next/headers'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import { PricingProvider } from '@/components/PricingProvider'

export const metadata = {
  title: 'HomeSafeEducation — Practical Life Skills for Every Age',
  description: 'Practical courses in safety, wellbeing, and life skills designed for real life. Seven packages covering every age group from children aged 4 to older adults, teaching people to live with confidence at every stage.',
  openGraph: {
    title: 'The Be Safe Group',
    description: 'Practical safety education for every member of your family.',
    url: process.env.NEXT_PUBLIC_SITE_URL,
    siteName: 'The Be Safe Group',
    type: 'website',
  },
}

export const dynamic = 'force-dynamic'

export default async function RootLayout({ children }) {
  // CRITICAL: Layout does NOT call Supabase. Calling getUser() here would
  // trigger a token refresh in a server component, and server components
  // cannot persist new cookies — causing the subsequent page's getUser()
  // to fail with stale (now-invalidated) cookies.
  //
  // Instead: just check if an auth cookie is present. Nav will fetch user
  // details client-side via /api/me. Session refresh happens in middleware.
  const cookieStore = await cookies()
  const hasAuthCookie = cookieStore.getAll().some(c =>
    c.name.startsWith('sb-') && c.name.includes('auth-token')
  )

  return (
    <html lang="en">
      <body>
        <PricingProvider>
          <Nav initialLoggedIn={hasAuthCookie} />
          <main>{children}</main>
          <Footer />
        </PricingProvider>
      </body>
    </html>
  )
}

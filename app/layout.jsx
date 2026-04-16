import './globals.css'
import { cookies } from 'next/headers'
import { createClient } from '@/utils/supabase/server'
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

// Force dynamic rendering so auth state is always fresh on every request
export const dynamic = 'force-dynamic'

export default async function RootLayout({ children }) {
  // Server-render the user — uses the same getUser() call the dashboard uses,
  // so if the dashboard sees you, so will the Nav.
  let initialUser = null
  let initialPurchases = []
  try {
    const cookieStore = await cookies()
    const supabase = createClient(cookieStore)
    const { data: { user } } = await supabase.auth.getUser()
    if (user) {
      initialUser = { id: user.id, email: user.email }
      const { data } = await supabase
        .from('purchases')
        .select('package_id')
        .eq('user_id', user.id)
      initialPurchases = (data || []).map(p => p.package_id)
    }
  } catch (e) {
    // fall through — Nav will still render, just as logged-out
  }

  return (
    <html lang="en">
      <body>
        <PricingProvider>
          <Nav initialUser={initialUser} initialPurchases={initialPurchases} />
          <main>{children}</main>
          <Footer />
        </PricingProvider>
      </body>
    </html>
  )
}

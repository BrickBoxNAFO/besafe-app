import './globals.css'
import { Suspense } from 'react'
import { cookies } from 'next/headers'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import { PricingProvider } from '@/components/PricingProvider'
import ScrollToTop from '@/components/ScrollToTop'

export const metadata = {
  title: 'HomeSafeEducation — Practical Life Skills for Every Age',
  description: 'Practical courses in safety, wellbeing, and life skills designed for real life. Seven packages covering every age group from children aged 4 to older adults, teaching people to live with confidence at every stage.',
  openGraph: {
    title: 'HomeSafeEducation — Practical Life Skills for Every Age',
    description: 'Practical courses in safety, wellbeing, and life skills designed for real life. Seven packages covering every age group from children aged 4 to older adults.',
    url: process.env.NEXT_PUBLIC_SITE_URL,
    siteName: 'HomeSafeEducation',
    type: 'website',
  },
}

export const dynamic = 'force-dynamic'

// Site-wide Organization + WebSite JSON-LD. Injected once in the root layout
// so every page carries the publisher identity. This is what lets Google/Bing
// show the sitelinks search box, and gives AI crawlers (GPTBot, ClaudeBot,
// PerplexityBot) a canonical description of who we are.
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://homesafeeducation.com'
const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'HomeSafe Education',
  alternateName: 'The Be Safe Group',
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  description:
    'Practical courses in safety, wellbeing, and life skills for every age. Seven packages covering children, teenagers, young adults, travellers, families, parents, and older adults.',
  sameAs: [
    'https://www.facebook.com/HomeSafeEducation',
    'https://www.instagram.com/homesafeeducation',
    'https://www.linkedin.com/company/homesafeeducation',
  ],
  contactPoint: [{
    '@type': 'ContactPoint',
    contactType: 'customer support',
    email: 'support@homesafeeducation.com',
    availableLanguage: ['English'],
  }],
}
const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'HomeSafe Education',
  url: SITE_URL,
  potentialAction: {
    '@type': 'SearchAction',
    target: `${SITE_URL}/blog?q={search_term_string}`,
    'query-input': 'required name=search_term_string',
  },
}

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
      <head>
        {/* Disable the browser's scroll restoration BEFORE hydration so mobile
            Safari doesn't land users halfway down the page when opening a
            link in a new tab or restoring from bfcache. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{if('scrollRestoration' in history){history.scrollRestoration='manual'}window.scrollTo(0,0)}catch(e){}",
          }}
        />
        {/* Structured data for search engines + AI crawlers */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </head>
      <body>
        <PricingProvider>
          {/* Snap scroll to top on every route change (useSearchParams must be inside Suspense in Next 14). */}
          <Suspense fallback={null}>
            <ScrollToTop />
          </Suspense>
          <Nav initialLoggedIn={hasAuthCookie} />
          <main>{children}</main>
          <Footer />
        </PricingProvider>
      </body>
    </html>
  )
}

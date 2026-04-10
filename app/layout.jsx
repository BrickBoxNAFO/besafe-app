import './globals.css'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import CookieConsent from '@/components/CookieConsent'
import { PricingProvider } from '@/components/PricingProvider'
import { getServerRegion } from '@/lib/get-region'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'

export const metadata = {
  title: {
    default: 'HomeSafeEducation — Practical Life Skills for Every Age',
    template: '%s | HomeSafeEducation',
  },
  description:
    'Practical courses in safety, wellbeing, and life skills designed for real life. Seven packages covering every age group from children aged 4 to older adults, teaching people to live with confidence at every stage.',
  metadataBase: new URL('https://homesafeeducation.com'),
  openGraph: {
    title: 'HomeSafeEducation — Practical Life Skills for Every Age',
    description:
      'Practical courses in safety, wellbeing, and life skills designed for real life. Seven packages covering every age group from children aged 4 to older adults, teaching people to live with confidence at every stage.',
    url: 'https://homesafeeducation.com',
    siteName: 'HomeSafeEducation',
    type: 'website',
    images: [{ url: '/opengraph-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HomeSafeEducation — Practical Life Skills for Every Age',
    description:
      'Practical, evidence-based safety courses designed for real life. Seven specialist packages covering every age group.',
  },
  alternates: {
    canonical: '/',
  },
  verification: {
    google: 'xGTglhMwfarVcfkTIdkesbAsY_qn3fN78ZdpRhXQP2E',
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({ children }) {
  const region = getServerRegion()

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: 'HomeSafeEducation',
    url: 'https://homesafeeducation.com',
    logo: 'https://homesafeeducation.com/opengraph-image.png',
    description:
      'HomeSafeEducation is an online safety education provider offering practical, evidence-based courses designed for real life. Seven specialist packages cover every age group from children aged 4 right through to older adults, teaching real-world personal safety skills.',
    sameAs: [],
    foundingDate: '2024',
    areaServed: 'Worldwide',
    serviceType: 'Online Safety Education',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Safety Education Packages',
      itemListElement: [
        { '@type': 'Course', name: 'Growing Minds', description: 'Safety education for young children' },
        { '@type': 'Course', name: 'Street Smart', description: 'Safety awareness for older children' },
        { '@type': 'Course', name: 'Roaming Free', description: 'Safety skills for teenagers' },
        { '@type': 'Course', name: 'Nest Breaking', description: 'Safety education for young adults' },
        { '@type': 'Course', name: 'Family Anchor', description: 'Safety knowledge for parents and families' },
        { '@type': 'Course', name: 'Aging Wisdom', description: 'Safety awareness for older adults' },
        { '@type': 'Course', name: 'Family Bundle', description: 'Complete family safety education package' },
      ],
    },
  }

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <PricingProvider initialRegion={region}>
          <Nav />
          <main>{children}</main>
          <Footer />
          <CookieConsent />
          <Analytics />
          <SpeedInsights />
        </PricingProvider>
      </body>
    </html>
  )
}

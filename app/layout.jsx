import './globals.css'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import CookieConsent from '@/components/CookieConsent'
import { PricingProvider } from '@/components/PricingProvider'
import { getServerRegion } from '@/lib/get-region'

export const metadata = {
  title: {
    default: 'HomeSafeEducation — Real-World Safety Education',
    template: '%s | HomeSafeEducation',
  },
  description:
    'Practical, evidence-based safety courses designed for real life. Seven specialist packages covering every age group from children aged 4 right through to older adults.',
  metadataBase: new URL('https://www.homesafeeducation.com'),
  openGraph: {
    title: 'HomeSafeEducation — Real-World Safety Education',
    description:
      'Practical, evidence-based safety courses designed for real life. Seven specialist packages covering every age group from children aged 4 right through to older adults.',
    url: 'https://www.homesafeeducation.com',
    siteName: 'HomeSafeEducation',
    type: 'website',
    images: [{ url: '/opengraph-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HomeSafeEducation — Real-World Safety Education',
    description:
      'Practical, evidence-based safety courses designed for real life. Seven specialist packages covering every age group.',
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({ children }) {
  const region = getServerRegion()

  return (
    <html lang="en">
      <body>
        <PricingProvider initialRegion={region}>
          <Nav />
          <main>{children}</main>
          <Footer />
          <CookieConsent />
        </PricingProvider>
      </body>
    </html>
  )
}

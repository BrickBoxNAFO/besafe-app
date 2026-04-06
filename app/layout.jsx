import './globals.css'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import CookieConsent from '@/components/CookieConsent'
import { PricingProvider } from '@/components/PricingProvider'
import { getServerRegion } from '@/lib/get-region'

export const metadata = {
  title: 'HomeSafeEducation  - Real-World Safety Education, Delivered Online',
  description: 'Practical safety education for every member of your family. Seven specialist packages covering every age group from children to older adults.',
  openGraph: {
    title: 'HomeSafeEducation  - Real-World Safety Education, Delivered Online',
    description: 'Practical safety education for every member of your family.',
    url: process.env.NEXT_PUBLIC_SITE_URL,
    siteName: 'HomeSafeEducation',
    type: 'website',
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

import './globals.css'
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

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <PricingProvider>
          <Nav />
          <main>{children}</main>
          <Footer />
        </PricingProvider>
      </body>
    </html>
  )
}

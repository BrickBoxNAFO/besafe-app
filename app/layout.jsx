import './globals.css'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'HomeSafeEducation Online Safety Education',
  description: 'Practical safety education for every member of your family. Five specialist packages covering every age group.',
  openGraph: {
    title: 'HomeSafeEducation',
    description: 'Practical safety education for every member of your family.',
    url: process.env.NEXT_PUBLIC_SITE_URL,
    siteName: 'HomeSafeEducation',
    type: 'website',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}

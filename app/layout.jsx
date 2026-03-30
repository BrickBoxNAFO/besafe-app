import './globals.css'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'The Be Safe Group — Online Safety Education',
  description: 'Practical safety education for every member of your family. Five specialist packages covering every age group.',
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
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}

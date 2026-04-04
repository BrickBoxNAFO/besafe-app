import Link from 'next/link'

export const metadata = {
  title: 'Unsubscribed | HomeSafeEducation',
  description: 'You have been unsubscribed from the HomeSafeEducation newsletter.',
}

export default function UnsubscribePage() {
  return (
    <div className="page-enter">
      <section className="hero-bg noise relative py-24 overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
          <div className="text-5xl mb-6">✅</div>
          <h1 className="font-serif text-4xl lg:text-5xl text-white mb-5">
            You've Been Unsubscribed
          </h1>
          <p className="text-white/70 text-lg max-w-xl mx-auto leading-relaxed mb-8">
            You will no longer receive newsletter emails from HomeSafeEducation. If this was a mistake, you can re-subscribe at any time from our website.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/" className="btn-primary">Back to Home</Link>
            <Link href="/contact" className="btn-ghost">Contact Us</Link>
          </div>
        </div>
      </section>
    </div>
  )
}

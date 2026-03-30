import Link from 'next/link'

export default function AboutPage() {
  return (
    <div className="page-enter">
      <div className="hero-bg noise relative py-24 overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <div className="chip bg-teal/15 text-teal border border-teal/25 mb-5">Who We Are</div>
          <h1 className="font-serif text-5xl lg:text-6xl text-white mb-6">
            The world is more dangerous<br />
            <span className="italic text-teal">than it looks.</span>
          </h1>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            The Be Safe Group was built on a simple belief: that practical safety knowledge, delivered clearly and respectfully, changes outcomes.
          </p>
        </div>
      </div>

      <section className="section-light py-20">
        <div className="max-w-3xl mx-auto px-6">
          <div className="prose prose-lg text-navy/70 leading-relaxed space-y-6">
            <p>
              The Be Safe Group exists because safety knowledge should be accessible to every family — not locked behind expensive consultants or buried in confusing guidance. We build practical, honest courses that give real people the awareness and confidence to protect themselves and the people they love.
            </p>
            <p>
              Every package is built around a specific life stage, because the threats facing a 7-year-old are entirely different from those facing a 72-year-old. Our courses are written by safety professionals and education specialists, and reviewed to ensure they are accurate, current, and genuinely useful.
            </p>
            <p>
              We believe that knowing what to do — before something happens — is one of the most powerful things a person can have. Our mission is to put that knowledge within reach of every family, at a price that reflects its value without being a barrier to access.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="section-slate py-16">
        <div className="max-w-4xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              ['5', 'Specialist Packages'],
              ['25', 'Safety Subjects'],
              ['250', 'In-depth Lessons'],
              ['1,250', 'Quiz Questions'],
            ].map(([n, l]) => (
              <div key={l} className="text-center bg-white rounded-2xl p-6 border border-gray-100">
                <div className="font-serif text-4xl text-navy mb-1">{n}</div>
                <div className="text-navy/50 text-sm">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-light py-20">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="font-serif text-4xl text-navy text-center mb-12">Our Principles</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: '🎯', title: 'Practical above all', body: 'Every lesson is grounded in real situations. We focus on what you can actually do, not abstract theory.' },
              { icon: '🔍', title: 'Evidence-based', body: 'Our content is built on current research and reviewed by specialists. No scare tactics, no misinformation.' },
              { icon: '🤝', title: 'Respectful and honest', body: 'We talk to our learners like intelligent adults. We don\'t sensationalise risk or talk down to anyone.' },
            ].map(v => (
              <div key={v.title} className="text-center">
                <div className="text-4xl mb-4">{v.icon}</div>
                <h3 className="font-serif text-xl text-navy mb-3">{v.title}</h3>
                <p className="text-navy/60 text-sm leading-relaxed">{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="hero-bg noise relative py-20 overflow-hidden">
        <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
          <h2 className="font-serif text-4xl text-white mb-5">Ready to get started?</h2>
          <p className="text-white/60 mb-8">Choose the package that fits your family and start today.</p>
          <Link href="/packages" className="btn-primary text-base px-8 py-4">View All Packages →</Link>
        </div>
      </section>
    </div>
  )
}

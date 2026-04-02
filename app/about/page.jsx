import Link from 'next/link'

export default function AboutPage() {
  return (
    <div className="page-enter">
      <section className="hero-bg noise relative py-24 overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <div className="chip bg-teal/15 text-teal border border-teal/25 mb-5">About Us</div>
          <h1 className="font-serif text-5xl lg:text-6xl text-white mb-5">
            Safety Education<br />
            <span className="italic text-teal">Done Properly.</span>
          </h1>
          <p className="text-white/70 text-lg max-w-2xl leading-relaxed">
            HomeSafeEducation was founded on a simple belief: that practical safety education should be accessible to everyone, regardless of age, background, or technical ability.
          </p>
        </div>
      </section>

      <section className="section-light py-20">
        <div className="max-w-4xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <div className="chip bg-teal/10 text-teal border border-teal/20 mb-5">Our Approach</div>
              <h2 className="font-serif text-4xl text-navy mb-5">Built Around Real Life Stages</h2>
              <p className="text-navy/60 leading-relaxed mb-4">
                Every package is built around a specific life stage, because the threats facing a 7-year-old are entirely different from those facing a 67 year old. Our courses are written by safety professionals and education specialists, and reviewed to ensure they are accurate, current, and genuinely useful.
              </p>
              <p className="text-navy/60 leading-relaxed">
                We focus on practical knowledge you can use immediately not abstract theory. Every lesson is designed to change how you think and behave in real situations.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[['🎯', 'Practical', 'Real skills for real situations'],['📋', 'Expert-Written', 'By safety professionals'],['✅', 'Evidence-Based', 'Grounded in current research'],['⏱️', 'Self-Paced', 'Learn on your own schedule, wherever you are']].map(([icon, title, body]) => (
                <div key={title} className="bg-slate rounded-2xl p-5">
                  <div className="text-2xl mb-2">{icon}</div>
                  <p className="font-semibold text-navy text-sm mb-1">{title}</p>
                  <p className="text-navy/50 text-xs leading-relaxed">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-slate py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="chip bg-teal/10 text-teal border border-teal/20 mb-5">The Packages</div>
          <h2 className="font-serif text-4xl text-navy mb-5">Seven Packages. Every Stage of Life.</h2>
          <p className="text-navy/60 text-lg max-w-2xl mx-auto mb-12">From young children learning about body safety to teenagers navigating social media, young adults living independently, travellers staying safe abroad, older adults avoiding scams, and parents having difficult conversations - we have a package for every stage of life.</p>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {[['🌱','Growing Minds','Children 4-11'],['🛡️','Street Smart','Teenagers'],['🚀','Nest Breaking','Young Adults'],['🌍','Roaming Free','Travellers'],['💐','Aging Wisdom','Seniors'],['❤️','Family Anchor','Parents'],['🛡️','Family Bundle','Best Value']].map(([emoji, name, who]) => (
              <div key={name} className="bg-white rounded-2xl p-5 text-center border border-gray-100">
                <div className="text-3xl mb-2">{emoji}</div>
                <p className="font-semibold text-navy text-sm">{name}</p>
                <p className="text-navy/40 text-xs mt-1">{who}</p>
              </div>
            ))}
          </div>
          <div className="mt-10">
            <Link href="/packages" className="btn-primary">View All Packages</Link>
          </div>
        </div>
      </section>

      <section className="section-light py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="font-serif text-4xl text-navy mb-5">Ready to Start?</h2>
          <p className="text-navy/60 text-lg max-w-xl mx-auto mb-8">One-time payment. No subscription. Safety knowledge that stays with you.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/packages" className="btn-primary">View Packages</Link>
            <Link href="/register" className="btn-ghost">Create Free Account</Link>
          </div>
        </div>
      </section>
    </div>
  )
}

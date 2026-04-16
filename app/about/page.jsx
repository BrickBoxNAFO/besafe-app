import Link from 'next/link'

export default function AboutPage() {
  return (
    <div className="page-enter">
      <style dangerouslySetInnerHTML={{__html: `@import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&display=swap');`}} />

      <div className="hero-bg noise relative py-24 overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <div className="chip bg-teal/15 text-teal border border-teal/25 mb-5">Who We Are</div>
          <h1 className="font-serif text-5xl lg:text-6xl text-white mb-6">
            The right knowledge<br />
            <span className="italic text-teal">changes everything.</span>
          </h1>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            HomeSafeEducation was built on a simple belief: that practical safety education, delivered honestly and without fear, gives every person the confidence to protect themselves and the people they love.
          </p>
        </div>
      </div>

      {/* Founder Letter */}
      <section className="section-light py-20">
        <div className="max-w-3xl mx-auto px-6">

          <div className="relative bg-white rounded-xl px-8 sm:px-14 py-12"
               style={{
                 boxShadow: '0 4px 16px rgba(14,165,160,0.18), 0 12px 40px rgba(14,165,160,0.14), 0 0 0 1.5px rgba(14,165,160,0.12)',
                 transform: 'translateY(-24px)',
               }}>

            <div className="text-center mb-8">
              <div className="chip bg-teal/15 text-teal border border-teal/25 inline-block">A Message From Our Founder</div>
            </div>

            <div className="space-y-5 text-navy/75 text-[1.05rem] leading-[1.85]">
              <p>
                HomeSafeEducation started with a simple question: as a father, I asked myself, why does nobody teach this stuff properly?
              </p>
              <p>
                We teach children to read, to count, to pass exams. But we rarely teach them how to stay safe online, or about body safety, or what to do if something does not feel right. We send teenagers into the world with qualifications but without the practical knowledge to navigate it confidently. We watch our parents age without ever having a conversation about scams, advance planning, or digital confidence.
              </p>
              <p>
                Fear is the most powerful force in selling. I made myself a promise that selling through fear will never be part of what we do at HomeSafeEducation. We will always sell with love, providing people the means to give something special to their families, themselves, and the people they care about: self protection, self confidence, and the knowledge to make informed decisions at every stage of life.
              </p>
              <p>
                I built this platform because I wanted that knowledge to exist in one place, written properly, for every age group. Not watered down or avoiding serious topics, but said in a way that is age-appropriate and relevant so it can be taught to anyone. Not full of fear. Just honest, practical education that treats every person, whether they are five or seventy-five, as someone capable of learning and making good decisions.
              </p>
              <p>
                Every course is written to empower. Every lesson ends with something you can actually use. Every quiz reinforces what you have learned. And every song, for the packages that include them, is written and produced in-house, because I believe learning should be memorable, not miserable.
              </p>
              <p>
                This is the education I now give to my own family. That is the standard I hold it to, and that is the standard it will always be.
              </p>
            </div>

            <div className="mt-10 pt-6 border-t border-gray-100 text-center">
              <p style={{ fontFamily: "'Dancing Script', cursive", color: '#0EA5A0', fontSize: '2rem', lineHeight: 1.2, marginBottom: '0.25rem' }}>Brick</p>
              <p className="text-navy/50 text-sm">Founder, HomeSafeEducation</p>
            </div>
          </div>
        </div>
      </section>

      {/* About body */}
      <section className="section-slate py-20">
        <div className="max-w-3xl mx-auto px-6">
          <div className="prose prose-lg text-navy/70 leading-relaxed space-y-6">
            <p>
              HomeSafeEducation exists because safety knowledge should be accessible to every family, not locked behind expensive consultants or buried in confusing guidance. Our courses are built to give real people the awareness and confidence to protect themselves and the people they love.
            </p>
            <p>
              Every package is built around a specific life stage, because the threats facing a 7-year-old are entirely different from those facing a 72-year-old. Our courses are written by safety professionals and education specialists, and reviewed to ensure they are accurate, current, and genuinely useful.
            </p>
            <p>
              We believe that knowing what to do before something happens is one of the most powerful things a person can have. Our mission is to put that knowledge within reach of every family, at a price that reflects its value without being a barrier to access.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="section-light py-16">
        <div className="max-w-4xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              ['7', 'Packages'],
              ['38', 'Safety Subjects'],
              ['146', 'In-depth Lessons'],
              ['371', 'Quiz Questions'],
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
              { icon: '🤝', title: 'Respectful and honest', body: "We talk to our learners like intelligent adults. We don't sensationalise risk or talk down to anyone." },
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
          <Link href="/packages" className="btn-primary text-base px-8 py-4">View All Packages</Link>
        </div>
      </section>
    </div>
  )
}

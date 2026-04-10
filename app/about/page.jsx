import Link from 'next/link'
import NewsletterBanner from '@/components/NewsletterBanner'

export const metadata = {
  title: 'About Us',
  description: 'Learn about HomeSafeEducation, our mission, and how we deliver practical, evidence-based safety education for every age group.',
}

export default function AboutPage() {
  return (
    <div className="page-enter">
      <section className="hero-bg noise relative py-24 overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <div className="chip bg-teal/15 text-teal border border-teal/25 mb-5">About Us</div>
          <h1 className="font-serif text-5xl lg:text-6xl text-white mb-5">
            Education That Empowers.<br />
            <span className="italic text-teal">Done Properly.</span>
          </h1>
          <p className="text-white/70 text-lg max-w-2xl leading-relaxed">
            HomeSafeEducation was founded on a simple belief: that practical education in safety, wellbeing, and life skills should be accessible to everyone, regardless of age, background, or ability.
          </p>
        </div>
      </section>

      {/* Message From Our Founder */}
      <section className="py-20 bg-gradient-to-b from-white to-slate">
        <div className="max-w-3xl mx-auto px-6">
          <div className="relative" style={{background:'#fdfbf7', borderRadius:'4px', padding:'3rem 2.5rem', boxShadow:'0 2px 15px rgba(0,0,0,0.08), 0 1px 3px rgba(0,0,0,0.06)', border:'1px solid #e8e0d4'}}>
            {/* Paper texture & edges */}
            <div style={{position:'absolute', inset:0, borderRadius:'4px', background:'linear-gradient(135deg, rgba(0,0,0,0.02) 0%, transparent 40%, transparent 60%, rgba(0,0,0,0.015) 100%)', pointerEvents:'none'}} />
            <div style={{position:'absolute', top:0, left:0, right:0, height:'4px', borderRadius:'4px 4px 0 0', background:'linear-gradient(to bottom, rgba(0,0,0,0.04), transparent)', pointerEvents:'none'}} />
            <div style={{position:'absolute', bottom:0, left:0, right:0, height:'6px', borderRadius:'0 0 4px 4px', background:'linear-gradient(to top, rgba(0,0,0,0.03), transparent)', pointerEvents:'none'}} />
            {/* Subtle left rule line like a letter */}
            <div className="hidden md:block" style={{position:'absolute', top:'3rem', bottom:'3rem', left:'2rem', width:'2px', background:'linear-gradient(to bottom, transparent, rgba(43,52,128,0.08) 15%, rgba(43,52,128,0.08) 85%, transparent)', pointerEvents:'none'}} />

            <div className="relative z-10 md:pl-6">
              <h2 className="font-serif text-3xl lg:text-4xl text-navy mb-8 text-center">A Message From Our Founder</h2>
              <div className="text-navy/60 leading-relaxed space-y-4 text-[15px] italic" style={{fontFamily:"'DM Serif Display', Georgia, serif", fontWeight:'normal', lineHeight:'1.85', letterSpacing:'0.01em'}}>
                <p>&ldquo;HomeSafeEducation started with a simple question: As a Father I asked myself, why does nobody teach this stuff properly?</p>
                <p>We teach children to read, to count, to pass exams. But we rarely teach them how to stay safe online, or teach them about body safety, or what to do if something does not feel right. These are some difficult topics when speaking to a child.</p>
                <p>We send teenagers into the world with qualifications but without the practical knowledge to navigate it confidently. We watch our parents age without ever having a conversation about scams, advance planning, or digital confidence.</p>
                <p>Fear is the most powerful force in selling, however, I made myself a promise that selling through fear will never be a part of what we do at HomeSafeEducation, we will always sell to our customers with love, providing people the means to gift something special to their families, themselves and the people they care about, self protection, self confidence and knowledge to make informed decisions at every stage of life.</p>
                <p>I built this platform because I wanted that knowledge to exist in one place, written properly, for every age group. Not watered down avoiding serious topics, but said in a way that&apos;s age appropriate and relevant so it can be taught to anyone. Not full of fear. Just honest, practical education that treats every person, whether they are five or seventy-five, as someone capable of learning and making good decisions.</p>
                <p>Every course is written to empower. Every lesson ends with something you can actually use. Every quiz reinforces what you have learned. And every song for the packages that include them is written and produced in-house because I believe learning should be memorable, not miserable.</p>
                <p>This is the education I now give to my own family. That is the standard I will hold it to, and that is the standard it will always be.&rdquo;</p>
              </div>
              <div className="mt-10 text-right">
                <span style={{fontFamily:"'Great Vibes', cursive", fontSize:'2.5rem', color:'#2B3480'}}>Brick</span>
                <p className="text-navy/40 text-sm mt-1" style={{fontStyle:'normal'}}>Founder, HomeSafeEducation</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-light py-20">
        <div className="max-w-4xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <div className="chip bg-teal/10 text-teal border border-teal/20 mb-5">Our Approach</div>
              <h2 className="font-serif text-4xl text-navy mb-5">Built Around How People Actually Live</h2>
              <p className="text-navy/60 leading-relaxed mb-4">
                Every package is built around a specific stage of life, because what a 7-year-old needs to learn is entirely different from what matters most to someone at 67. Our courses are written by professionals and education specialists, reviewed to ensure they are accurate, current, and genuinely useful.
              </p>
              <p className="text-navy/60 leading-relaxed">
                We focus on practical knowledge you can use immediately, not abstract theory. Every lesson is designed to build confidence and improve how you think, act, and look after yourself and the people around you.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[['🎯', 'Practical', 'Real knowledge for real life'],['📋', 'Expert-Written', 'By safety professionals'],['✅', 'Evidence-Based', 'Grounded in current research'],['⏱️', 'Self-Paced', 'Learn on your own schedule, wherever you are']].map(([icon, title, body]) => (
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
          <p className="text-navy/60 text-lg max-w-2xl mx-auto mb-12">From young children learning about boundaries to teenagers building digital confidence, young adults stepping into independence, travellers exploring the world, older adults staying informed and empowered, and parents having the conversations that matter most. We have a package for every stage of life.</p>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {[['🌱','Growing Minds','Children 4-11'],['🥷','Street Smart','Teenagers'],['🚀','Nest Breaking','Young Adults'],['🌍','Roaming Free','Travellers'],['💐','Aging Wisdom','Seniors'],['❤️','Family Anchor','Parents'],['family_bundle','Family Bundle','Best Value']].map(([emoji, name, who]) => (
              <div key={name} className="bg-white rounded-2xl p-5 text-center border border-gray-100">
                <div className="text-3xl mb-2">{emoji === 'family_bundle' ? <><span className="hidden sm:inline">👨‍👩‍👧‍👦</span><span className="sm:hidden">🏠</span></> : emoji}</div>
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

      {/* Newsletter Banner */}
      <NewsletterBanner />

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

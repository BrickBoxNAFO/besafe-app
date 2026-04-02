import Link from 'next/link'
import PackageCard from '@/components/PackageCard'
import { PACKAGES } from '@/lib/data'

const REVIEWS = [
  { q: '"Got the Family Safety Bundle for the whole family, my son before university, my mum, my wife, and myself. All four of us have now completed our packages. I still have one slot left that I\'m planning to pass to a close friend. It\'s been great value."', name: 'James M.', role: 'Parent, age 48', stars: 5 },
  { q: '"My mum completed Aging Wisdom and now she knows exactly what to do when she gets those scam calls. She feels so much more confident."', name: 'Sarah T.', role: 'Daughter, age 42', stars: 5 },
  { q: '"The Night Out Safety course should be compulsory for every young person. My daughter did it before going to university and I feel so much better about it."', name: 'Mark R.', role: 'Father, age 51', stars: 5 },
]

export default function HomePage() {
  return (
    <div className="page-enter">

      {/* Hero */}
      <section className="hero-bg noise relative overflow-hidden min-h-screen flex items-center">
        <div className="max-w-6xl mx-auto px-6 py-24 w-full">
          <div className="max-w-2xl">
            <div className="chip bg-teal/15 text-teal border border-teal/25 mb-6">Real-World Safety Education, Delivered Online</div>
            <h1 className="font-serif text-5xl lg:text-7xl leading-tight mb-6 text-white">
              Keep Your Family Safe
              <span className="block italic text-teal mt-1">at Every Stage of Life.</span>
            </h1>
            <p className="text-white/70 text-lg leading-relaxed mb-8 max-w-lg">
              In a world full of uncertainties, keeping your family truly safe shouldn&apos;t be complicated or expensive. Whether you&apos;re preparing your daughter for university and the challenges of independent living, teaching your young children about personal boundaries and consent, or protecting your elderly parents from sophisticated scams, HomeSafeEducation has you covered. We deliver practical, evidence-based safety education designed for real life &mdash; empowering children, young adults, travellers, older adults, and the whole family with the knowledge and confidence they need to stay protected at every stage. With expert-curated courses, interactive lessons, and no ongoing subscriptions, we&apos;re making essential safety skills accessible to every home.
              <br /><br />
              Seven packages covering every age group from children aged 4 right through to older adults and the whole family. Practical, evidence-based, and genuinely life-changing.
            </p>
            <div className="flex flex-wrap gap-4 mb-10">
              <Link href="/packages" className="btn-primary">View All Packages &rarr;</Link>
              <Link href="/about" className="btn-secondary">Learn More</Link>
            </div>
            <div className="flex flex-wrap gap-6 text-sm text-white/50">
              {['✓ One-time payment', '✓ 7 Packages, 115 Lessons', '✓ Family progress tracking', '✓ No subscription'].map(t => (
                <span key={t}>{t}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-8 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[['7', 'Packages'], ['33', 'Courses'], ['115', 'Lessons'], ['575', 'Quiz Questions']].map(([n, l]) => (
            <div key={l} className="text-center">
              <div className="stat-num text-navy mb-1">{n}</div>
              <div className="text-sm text-navy/50 font-medium">{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Packages */}
      <section className="section-slate py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <div className="chip bg-teal/10 text-teal border border-teal/20 mb-4">Our Packages</div>
            <h2 className="font-serif text-4xl lg:text-5xl text-navy mb-4">Built for Every Age</h2>
            <p className="text-navy/60 text-lg max-w-2xl mx-auto">
              Seven packages covering every age group from 4 to 60+, plus a family bundle for the best value.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PACKAGES.map(p => <PackageCard key={p.id} pkg={p} />)}
            {/* Bundle */}
            <div className="md:col-span-2 lg:col-span-3 bg-navy rounded-2xl p-8 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative overflow-hidden">
              <div className="noise absolute inset-0" />
              <div className="relative z-10">
                <div className="chip bg-teal/20 text-teal border border-teal/30 mb-3">Best Value</div>
                <h3 className="font-serif text-3xl text-white mb-2">Family Safety Bundle</h3>
                <p className="text-white/60 max-w-lg">Any 5 packages for your whole family. Mix and match across any age group.</p>
              </div>
              <div className="relative z-10 flex flex-col items-start lg:items-end gap-3">
                <div className="flex items-baseline gap-2">
                  <span className="font-serif text-4xl text-white font-bold">$99.99</span>
                  <span className="text-white/40 line-through text-lg">$149.95</span>
                </div>
                <Link href="/packages#bundle" className="btn-primary whitespace-nowrap">Get the Bundle &rarr;</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="section-light py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <div className="chip bg-teal/10 text-teal border border-teal/20 mb-4">How It Works</div>
            <h2 className="font-serif text-4xl lg:text-5xl text-navy mb-4">Buy for Yourself or a Loved One</h2>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { n: '01', icon: '🎁', title: 'Choose a Package', body: 'Pick the right package for you, your child, your parent, or anyone you care about. Each one is tailored to a specific age group and life stage.' },
              { n: '02', icon: '💳', title: 'One-Time Payment', body: 'Pay $29.99 per package or $99.99 for any 5. No subscription, no hidden fees. A small price for safety.' },
              { n: '03', icon: '📧', title: 'Gift or Keep', body: 'Enter the recipient\'s email and they get instant access. Or keep it for yourself. Either way, access is forever.' },
              { n: '04', icon: '📖', title: 'Start Learning', body: 'Work through real-world and online safety lessons at your own pace. Every lesson has a quiz to reinforce what you\'ve learned.' },
            ].map(s => (
              <div key={s.n} className="bg-slate rounded-2xl p-8">
                <div className="text-3xl mb-4">{s.icon}</div>
                <div className="text-teal text-xs font-bold tracking-wider mb-2">{s.n}</div>
                <h3 className="font-serif text-xl text-navy mb-3">{s.title}</h3>
                <p className="text-navy/60 text-sm leading-relaxed">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gift Banner */}
      <section className="py-16 bg-gradient-to-r from-teal/10 to-orange/10">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <span className="text-4xl mb-4 block">🎁</span>
          <h2 className="font-serif text-3xl lg:text-4xl text-navy mb-4">The Gift of Safety</h2>
          <p className="text-navy/60 text-lg leading-relaxed mb-6 max-w-2xl mx-auto">
            Most of our customers purchase for someone they love &mdash; a child heading to university, an elderly parent living alone, a friend travelling abroad. One payment, lifetime access, real peace of mind.
          </p>
          <Link href="/packages" className="btn-primary text-base px-8 py-3">Buy as a Gift &rarr;</Link>
        </div>
      </section>

      {/* Reviews */}
      <section className="section-slate py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <div className="chip bg-teal/10 text-teal border border-teal/20 mb-4">What Families Say</div>
            <h2 className="font-serif text-4xl lg:text-5xl text-navy mb-4">Real Families. Real Results.</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {REVIEWS.map((r, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 border border-gray-100">
                <div className="flex gap-0.5 mb-4">{Array(r.stars).fill(0).map((_, j) => <span key={j} className="text-amber-400">&#9733;</span>)}</div>
                <p className="text-navy/80 text-sm leading-relaxed mb-5 italic">{r.q}</p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-navy flex items-center justify-center text-white text-sm font-bold">{r.name[0]}</div>
                  <div>
                    <p className="font-semibold text-navy text-sm">{r.name}</p>
                    <p className="text-navy/40 text-xs">{r.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="hero-bg noise relative py-24 overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 text-center relative z-10">
          <h2 className="font-serif text-4xl lg:text-5xl text-white mb-5">Start Protecting Your Family Today</h2>
          <p className="text-white/60 text-lg max-w-xl mx-auto mb-8">One-time payment. No subscription. Real knowledge that makes a real difference. Buy for yourself or gift to someone you love.</p>
          <Link href="/packages" className="btn-primary text-base px-8 py-4">View All Packages &rarr;</Link>
        </div>
      </section>

    </div>
  )
}

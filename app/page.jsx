import Link from 'next/link'
import PackageCard from '@/components/PackageCard'
import { PACKAGES } from '@/lib/data'

import NewsletterBanner from '@/components/NewsletterBanner'

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
              In a world full of uncertainties, keeping your family safe shouldn&apos;t be complicated or expensive. Whether you&apos;re giving your daughter the tools to stay safe on nights out and navigate university life, teaching your children about personal boundaries, or protecting your elderly parents from sophisticated scams, HomeSafeEducation has you covered. <br /><br /> Practical, evidence-based safety courses designed for real life. Seven packages covering every age group from children aged 4 right through to older adults. Buy for yourself or gift to someone you love. One payment, no subscription, real peace of mind.
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

      {/* Newsletter Banner */}
      <NewsletterBanner />

      {/* Gift Banner */}
      <section className="py-16 bg-gradient-to-r from-teal/10 to-orange/10">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <span className="text-4xl mb-4 block">🎁</span>
          <h2 className="font-serif text-3xl lg:text-4xl text-navy mb-4">The Gift of Safety</h2>
          <p className="text-navy/60 text-lg leading-relaxed mb-6 max-w-2xl mx-auto">
            A young adult heading to university, an elderly parent living alone, a friend travelling abroad. One payment, lifetime access, real peace of mind.
          </p>
          <Link href="/packages" className="btn-primary text-base px-8 py-3">Buy as a Gift &rarr;</Link>
        </div>
      </section>

      {/* CTA */}
      <section className="hero-bg noise relative py-24 overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 text-center relative z-10">
          <h2 className="font-serif text-4xl lg:text-5xl text-white mb-5">Start Protecting Your Family Today</h2>
          <p className="text-white/60 text-lg max-w-xl mx-auto mb-8">In a world of uncertainty, knowledge is power. One-time payment. No subscription. Buy for yourself or gift to someone you love.</p>
          <Link href="/packages" className="btn-primary text-base px-8 py-4">View All Packages &rarr;</Link>
        </div>
      </section>

    </div>
  )
}

'use client'

import Link from 'next/link'
import NewsletterBanner from '@/components/NewsletterBanner'
import VideoPlayer from '@/components/VideoPlayer'

// ─── Set this to your Cloudflare R2 video URL once uploaded ───
const VIDEO_URL = null  // e.g. 'https://pub-xxxxx.r2.dev/homesafe-intro.mp4'
const VIDEO_POSTER = null // optional thumbnail image URL

export default function HomePage() {
  return (
    <div className="page-enter">

      {/* Hero — split layout: text left, video right */}
      <section className="hero-bg noise relative overflow-hidden min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-6 py-24 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left — text content */}
            <div>
              <div className="chip bg-teal/15 text-teal border border-teal/25 mb-6">Real-World Safety Education, Delivered Online</div>
              <h1 className="font-serif text-5xl lg:text-6xl xl:text-7xl leading-tight mb-6 text-white">
                Keep Your Family Safe
                <span className="block italic text-teal mt-1">at Every Stage of Life.</span>
              </h1>
              <p className="text-white/70 text-lg leading-relaxed mb-6 max-w-lg">
                Practical, evidence-based safety courses designed for real life. Seven packages covering every age group from children aged 4 right through to older adults.
              </p>
              <p className="text-white/70 text-lg leading-relaxed mb-8 max-w-lg">
                Buy for yourself or gift to someone you love. One payment, no subscription, real peace of mind.
              </p>
              <div className="flex flex-wrap gap-4 mb-10">
                <Link href="/packages" className="btn-primary">View All Packages &rarr;</Link>
                <Link href="/about" className="btn-secondary">Learn More</Link>
              </div>
              <div className="flex flex-wrap gap-6 text-sm text-white/50">
                {['✓ One-time payment', '✓ 7 Packages, 120 Lessons', '✓ Family progress tracking', '✓ No subscription'].map(t => (
                  <span key={t}>{t}</span>
                ))}
              </div>
            </div>

            {/* Right — video player */}
            <div className="hidden lg:block">
              <VideoPlayer src={VIDEO_URL} poster={VIDEO_POSTER} />
            </div>
          </div>

          {/* Mobile video — below text on small screens */}
          <div className="lg:hidden mt-12">
            <VideoPlayer src={VIDEO_URL} poster={VIDEO_POSTER} />
          </div>
        </div>
      </section>

      {/* Stats */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-8 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[['7', 'Packages'], ['33', 'Courses'], ['120', 'Lessons'], ['600', 'Quiz Questions']].map(([n, l]) => (
            <div key={l} className="text-center">
              <div className="stat-num text-navy mb-1">{n}</div>
              <div className="text-sm text-navy/50 font-medium">{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Packages — Life Stages Teaser */}
      <section className="section-slate py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <div className="chip bg-teal/10 text-teal border border-teal/20 mb-4">Our Packages</div>
            <h2 className="font-serif text-4xl lg:text-5xl text-navy mb-4">Safety Education for Every Stage of Life</h2>
            <p className="text-navy/60 text-lg max-w-2xl mx-auto">
              Seven packages. 33 courses. 120 lessons. From children to older adults, each package is tailored to the real-world risks that matter most at that stage.
            </p>
          </div>

          {/* Life stages row */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-8">
            {[
              { emoji: '🌱', name: 'Growing Minds', age: 'Ages 4–11', color: '#16A34A' },
              { emoji: '🥷', name: 'Street Smart', age: 'Ages 12–15', color: '#7C3AED' },
              { emoji: '🚀', name: 'Nest Breaking', age: 'Ages 16–18', color: '#2563EB' },
              { emoji: '✈️', name: 'Roaming Free', age: 'All ages', color: '#EA580C' },
              { emoji: '💐', name: 'Aging Wisdom', age: 'Ages 60+', color: '#E11D48' },
              { emoji: '👨‍👩‍👧', name: 'Family Anchor', age: 'Parents', color: '#a21caf' },
            ].map(s => (
              <Link href="/packages" key={s.name} className="group bg-white rounded-xl border border-gray-100 p-4 text-center hover:border-gray-200 hover:shadow-md transition-all cursor-pointer">
                <div className="text-2xl mb-2">{s.emoji}</div>
                <div className="text-sm font-semibold text-navy mb-0.5 group-hover:text-teal transition-colors">{s.name}</div>
                <div className="text-[11px] font-medium" style={{ color: s.color }}>{s.age}</div>
              </Link>
            ))}
          </div>

          {/* Key selling points */}
          <div className="grid sm:grid-cols-3 gap-4 mb-10">
            {[
              ['💳', 'One-Time Payment', 'No subscriptions. Pay once and get lifetime access to your package.'],
              ['🎁', 'Gift to Anyone', 'Buy for yourself or gift to a loved one. Each person gets their own account and dashboard.'],
              ['📊', 'Track Progress', 'Every lesson completed, every quiz passed — all tracked on your personal dashboard.'],
            ].map(([icon, title, body]) => (
              <div key={title} className="bg-white rounded-xl border border-gray-100 p-5 text-center">
                <div className="text-2xl mb-2">{icon}</div>
                <div className="font-semibold text-navy text-sm mb-1">{title}</div>
                <div className="text-navy/50 text-xs leading-relaxed">{body}</div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center">
            <Link href="/packages" className="btn-primary text-base px-10 py-3.5">Explore All Packages &rarr;</Link>
          </div>
        </div>
      </section>

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
              { n: '02', icon: '💳', title: 'One-Time Payment', body: 'Pay once per package and get lifetime access. No subscription, no hidden fees, no recurring charges.' },
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

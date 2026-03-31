'use client'
import Link from 'next/link'
import { PACKAGES, COURSES } from '@/lib/data'

export default function PackagesPage() {
  const growingPkg = PACKAGES.find(p => p.id === 'growing')
  const otherPkgs = PACKAGES.filter(p => p.id !== 'growing')

  return (
    <div className="page-enter">
      {/* Hero */}
      <div className="hero-bg noise relative py-20 overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <div className="chip bg-teal/15 text-teal border border-teal/25 mb-5">Our Packages</div>
          <h1 className="font-serif text-5xl lg:text-6xl text-white mb-5">
            Safety Education<br />
            <span className="italic text-teal">for Every Stage of Life.</span>
          </h1>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Five specialist packages — one for each major life stage. Each contains 5 Subjects, 50 Lessons, and 250 quiz questions.
          </p>
        </div>
      </div>

      {/* Coming soon banner */}
      <div className="bg-amber-50 border-b border-amber-200">
        <div className="max-w-4xl mx-auto px-6 py-4 text-center">
          <p className="text-amber-800 font-medium text-sm">
            🚀 Payments launching very soon — register your interest and we will notify you when purchases go live.
          </p>
        </div>
      </div>

      <section className="section-slate py-16">
        <div className="max-w-5xl mx-auto px-6 space-y-6">

          {/* ── Growing Minds Bundle — special two-column display ── */}
          <div id="growing" className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
            {/* Bundle header */}
            <div className="p-8 pb-0">
              <div className="flex items-start gap-5 mb-2">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0" style={{ background: 'rgba(22,163,74,0.10)' }}>
                  🌱
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h2 className="font-serif text-2xl text-navy">Growing Minds</h2>
                    <span className="text-xs font-bold px-2 py-0.5 rounded-full text-white" style={{background:'#16A34A'}}>Bundle</span>
                  </div>
                  <p className="text-sm font-semibold text-green-600 mb-1">Children Ages 4–11 · Both age groups included</p>
                  <p className="text-navy/60 text-sm leading-relaxed">
                    Two complete course sets — one for young children (4–7) and one for older children (8–11) — covering the same essential safety topics at the right level for each age. One payment unlocks everything.
                  </p>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className="font-serif text-3xl text-navy font-bold mb-1">$29.99</div>
                  <div className="text-navy/40 text-xs">one-time · both age groups</div>
                </div>
              </div>

              {/* What's included label */}
              <div className="mt-4 mb-4">
                <p className="text-xs font-semibold text-navy/40 uppercase tracking-wider">What's included in one payment:</p>
              </div>
            </div>

            {/* Two sub-packages side by side */}
            <div className="px-8 pb-8">
              <div className="grid md:grid-cols-2 gap-4">
                {growingPkg.subPackages.map(sub => {
                  const subCourses = COURSES.filter(c => c.subPkg === sub.id)
                  return (
                    <div key={sub.id} className="rounded-2xl border-2 p-5" style={{borderColor: sub.color+'33', background: sub.pale}}>
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-2xl">{sub.emoji}</span>
                        <div>
                          <h3 className="font-serif text-lg text-navy leading-tight">{sub.name}</h3>
                          <span className="text-xs font-bold px-2 py-0.5 rounded-full text-white" style={{background:sub.color}}>{sub.tag}</span>
                        </div>
                      </div>
                      <p className="text-navy/60 text-xs leading-relaxed mb-4">{sub.desc}</p>
                      <div className="space-y-2">
                        {subCourses.map(c => (
                          <div key={c.id} className="flex items-center gap-2 bg-white/70 rounded-lg px-3 py-2">
                            <span className="text-sm">{c.emoji}</span>
                            <div className="flex-1">
                              <p className="text-xs font-medium text-navy">{c.title}</p>
                              <p className="text-xs text-navy/40">{c.lessons.length} lessons</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* CTA */}
              <div className="flex items-center gap-4 mt-5">
                <div className="flex-1 bg-gray-100 rounded-xl px-6 py-3 text-center">
                  <span className="text-navy/40 font-medium text-sm">🔒 Purchases opening soon</span>
                </div>
                <Link href="/register" className="btn-ghost text-sm whitespace-nowrap">
                  Register interest →
                </Link>
              </div>
            </div>
          </div>

          {/* ── All other packages ── */}
          {otherPkgs.map(pkg => {
            const pkgCourses = COURSES.filter(c => c.pkg === pkg.id)
            return (
              <div key={pkg.id} id={pkg.id} className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                <div className="p-8">
                  <div className="flex items-start gap-5 mb-6">
                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0" style={{ background: pkg.pale }}>
                      {pkg.emoji}
                    </div>
                    <div className="flex-1">
                      <h2 className="font-serif text-2xl text-navy mb-1">{pkg.name}</h2>
                      <p className="text-sm font-semibold mb-2" style={{ color: pkg.color }}>{pkg.tag}</p>
                      <p className="text-navy/60 text-sm leading-relaxed">{pkg.tagline}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className="font-serif text-3xl text-navy font-bold mb-1">$29.99</div>
                      <div className="text-navy/40 text-xs">one-time payment</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-2 mb-6">
                    {pkgCourses.map(c => (
                      <div key={c.id} className="text-center p-3 rounded-xl border border-gray-100 bg-slate">
                        <div className="text-lg mb-1">{c.emoji}</div>
                        <div className="text-xs font-medium text-navy/70 leading-snug">{c.title}</div>
                        <div className="text-xs text-navy/40 mt-1">{c.lessons.length} lessons</div>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex-1 bg-gray-100 rounded-xl px-6 py-3 text-center">
                      <span className="text-navy/40 font-medium text-sm">🔒 Purchases opening soon</span>
                    </div>
                    <Link href="/register" className="btn-ghost text-sm whitespace-nowrap">
                      Register interest →
                    </Link>
                  </div>
                </div>
              </div>
            )
          })}

          {/* Bundle */}
          <div id="bundle" className="bg-navy rounded-2xl overflow-hidden relative">
            <div className="noise absolute inset-0" />
            <div className="relative z-10 p-8">
              <div className="flex items-start gap-5 mb-6">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0 bg-teal/20">🛡️</div>
                <div className="flex-1">
                  <div className="chip bg-teal/20 text-teal border border-teal/30 mb-2 text-xs">Best Value</div>
                  <h2 className="font-serif text-2xl text-white mb-1">Family Safety Bundle</h2>
                  <p className="text-white/60 text-sm leading-relaxed">Any 5 packages for your whole family. Mix and match across any age group.</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className="font-serif text-3xl text-white font-bold mb-1">$99.99</div>
                  <div className="text-teal text-xs font-semibold">Save $49.96</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex-1 bg-white/10 rounded-xl px-6 py-3 text-center">
                  <span className="text-white/50 font-medium text-sm">🔒 Purchases opening soon</span>
                </div>
                <Link href="/register" className="btn-secondary text-sm whitespace-nowrap">Register interest →</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why us */}
      <section className="section-light py-16">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="font-serif text-3xl text-navy mb-10">What you get</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              ['📖', '50 Lessons', 'Per package — work through at your own pace'],
              ['✅', '250 Quiz Questions', 'Reinforce knowledge with every lesson'],
              ['📊', 'Progress Tracking', 'Dashboard tracks every lesson you complete'],
              ['💳', 'One-Time Payment', 'No subscription — pay once, keep forever'],
            ].map(([icon, title, body]) => (
              <div key={title} className="bg-slate rounded-2xl p-6">
                <div className="text-3xl mb-3">{icon}</div>
                <h3 className="font-semibold text-navy mb-1">{title}</h3>
                <p className="text-navy/50 text-sm">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
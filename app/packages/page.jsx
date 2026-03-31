'use client'
import Link from 'next/link'
import { PACKAGES, COURSES } from '@/lib/data'

export default function PackagesPage() {
  const earlyYearsCourses = COURSES.filter(c => c.subPkg === 'growing-early')
  const juniorCourses = COURSES.filter(c => c.subPkg === 'growing-junior')
  const otherPackages = PACKAGES.filter(p => p.id !== 'growing')

  return (
    <div className="page-enter">
      <div className="hero-bg noise relative py-20 overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <div className="chip bg-teal/15 text-teal border border-teal/25 mb-5">Our Packages</div>
          <h1 className="font-serif text-5xl lg:text-6xl text-white mb-5">Safety Education<br /><span className="italic text-teal">for Every Stage of Life.</span></h1>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">Five specialist packages one for each major life stage. Pay once, access forever.</p>
        </div>
      </div>
      <section className="section-slate py-16">
        <div className="max-w-5xl mx-auto px-6 space-y-6">
          {/* Growing Minds Bundle */}
          <div id="growing" className="bg-white rounded-2xl border border-green-100 overflow-hidden">
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-b border-green-100 px-8 py-5">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl" style={{background:'rgba(22,163,74,0.12)'}}>🌱</div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h2 className="font-serif text-2xl text-navy">Growing Minds</h2>
                      <span className="text-xs font-bold px-2 py-0.5 rounded-full text-white" style={{background:'#16A34A'}}>Bundle</span>
                    </div>
                    <p className="text-sm font-semibold text-green-700">Children 4–11 · Both age ranges included</p>
                    <p className="text-navy/60 text-sm mt-0.5">Ten courses across two age groups pay once, unlock everything.</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-serif text-3xl text-navy font-bold">$29.99</div>
                  <div className="text-green-600 text-xs font-semibold">Both age groups included</div>
                  <div className="text-navy/40 text-xs">one-time payment</div>
                </div>
              </div>
            </div>
            <div className="p-6 grid md:grid-cols-2 gap-4">
              <div className="rounded-xl border border-green-100 bg-green-50/40 p-5">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl">🌱</span>
                  <div>
                    <h3 className="font-semibold text-navy text-base">Early Years</h3>
                    <span className="text-xs font-bold px-2 py-0.5 rounded-full text-white inline-block" style={{background:'#16A34A'}}>Ages 4–7</span>
                  </div>
                </div>
                <p className="text-navy/60 text-xs leading-relaxed mb-4">Gentle, age-appropriate courses designed to be read aloud together with a parent or carer. Simple language covering key safety skills for young children.</p>
                <div className="space-y-1.5">
                  {earlyYearsCourses.map(c => (
                    <div key={c.id} className="flex items-center gap-2 text-xs text-navy/70">
                      <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{background:'#16A34A'}} />
                      <span>{c.title}</span>
                      <span className="text-navy/40 ml-auto whitespace-nowrap">{c.lessons.length} lessons</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-xl border border-emerald-100 bg-emerald-50/40 p-5">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl">🌿</span>
                  <div>
                    <h3 className="font-semibold text-navy text-base">Junior</h3>
                    <span className="text-xs font-bold px-2 py-0.5 rounded-full text-white inline-block" style={{background:'#15803D'}}>Ages 8–11</span>
                  </div>
                </div>
                <p className="text-navy/60 text-xs leading-relaxed mb-4">Deeper, more independent learning for school-age children covering road safety, online risks, recognising grooming, body autonomy, and standing up to bullying.</p>
                <div className="space-y-1.5">
                  {juniorCourses.map(c => (
                    <div key={c.id} className="flex items-center gap-2 text-xs text-navy/70">
                      <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{background:'#15803D'}} />
                      <span>{c.title}</span>
                      <span className="text-navy/40 ml-auto whitespace-nowrap">{c.lessons.length} lessons</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="px-6 pb-6">
              <Link href="/checkout/growing" className="btn-primary w-full justify-center py-3 text-center block">Get Growing Minds $29.99 →</Link>
              <p className="text-center text-xs text-navy/40 mt-2">One payment · 10 courses · Both age groups · Access forever</p>
            </div>
          </div>
          {/* Other packages */}
          {otherPackages.map(pkg => {
            const pkgCourses = COURSES.filter(c => c.pkg === pkg.id)
            return (
              <div key={pkg.id} id={pkg.id} className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                <div className="p-8">
                  <div className="flex items-start gap-5 mb-6">
                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0" style={{background:pkg.pale}}>{pkg.emoji}</div>
                    <div className="flex-1">
                      <h2 className="font-serif text-2xl text-navy mb-1">{pkg.name}</h2>
                      <p className="text-sm font-semibold mb-2" style={{color:pkg.color}}>{pkg.tag}</p>
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
                  <Link href={"/checkout/"+pkg.id} className="btn-primary w-full justify-center py-3 text-center block">Get {pkg.name} $29.99 →</Link>
                </div>
              </div>
            )
          })}
          {/* Bundle */}
          <div id="bundle" className="bg-navy rounded-2xl overflow-hidden relative">
            <div className="noise absolute inset-0" />
            <div className="relative z-10 p-8">
              <div className="flex items-start gap-5 mb-6">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl bg-teal/20">🛡️</div>
                <div className="flex-1">
                  <div className="chip bg-teal/20 text-teal border border-teal/30 mb-2 text-xs">Best Value</div>
                  <h2 className="font-serif text-2xl text-white mb-1">Family Safety Bundle</h2>
                  <p className="text-white/60 text-sm">All 5 packages for your whole family. Every age group covered.</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className="font-serif text-3xl text-white font-bold mb-1">$99.99</div>
                  <div className="text-teal text-xs font-semibold">Save $49.96</div>
                </div>
              </div>
              <Link href="/checkout/bundle" className="btn-secondary w-full justify-center py-3 text-center block">Get the Family Bundle $99.99 →</Link>
            </div>
          </div>
        </div>
      </section>
      <section className="section-light py-16">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="font-serif text-3xl text-navy mb-10">What you get</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[['📖','Age-Appropriate Content','Every course written for its specific audience'],['✅','Quiz Questions','Reinforce knowledge after every lesson'],['📊','Progress Tracking','Dashboard tracks every lesson you complete'],['💳','One-Time Payment','No subscription pay once, keep forever']].map(([icon,title,body]) => (
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
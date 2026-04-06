'use client'

import Link from 'next/link'
import { PACKAGES, COURSES } from '@/lib/data'
import NewsletterBanner from '@/components/NewsletterBanner'
import { usePricing } from '@/components/PricingProvider'

const EMOTIONAL_DESCRIPTIONS = {
  street: "The teenage years move fast. New friendships, first freedoms, social media, peer pressure - the world opens up and so do the risks. Street Smart gives young people the tools to navigate it all with confidence, not fear. Because the best protection you can give a teenager is the knowledge to protect themselves.",
  nest: "They’re leaving the nest. First apartment, first nights out, first time truly on their own. Nest Breaking prepares young adults for the independence they crave and the realities that come with it. From personal safety to digital awareness, these courses turn vulnerability into confidence.",
  roaming: "Whether it’s a gap year, a family holiday, or a retirement adventure, the world is full of incredible experiences and hidden risks. Roaming Free equips travellers of all ages with the awareness and know-how to explore safely, so the only surprises are the good ones.",
  aging: "They’ve given us everything. Now the world is changing faster than ever, and the people we love most can become the easiest targets. Aging Wisdom helps older adults stay safe, informed, and independent in a world that doesn’t always look out for them.",
  parents: "The hardest conversations are often the most important ones. Family Anchor gives parents and guardians the language, the tools, and the confidence to talk to their families about safety, boundaries, and the things that really matter. Because keeping your family safe starts with being prepared.",
  growing: "Every child deserves to feel safe, and every parent deserves peace of mind. Growing Minds brings together two carefully tailored packages, one for younger children and one for older children, each designed to teach essential safety lessons in a way that’s age-appropriate, engaging, and empowering. Because when children understand the world around them, they grow up stronger."
}

const PKG_GRADIENTS = {
  street: { gradFrom: '#ede9fe', gradTo: '#ede9fe', borderClr: '#ddd6fe', accent: '#7C3AED', accentBg: 'rgba(124,58,237,0.12)', tagClr: '#7c3aed' },
  nest: { gradFrom: '#dbeafe', gradTo: '#cffafe', borderClr: '#bfdbfe', accent: '#2563EB', accentBg: 'rgba(37,99,235,0.12)', tagClr: '#1d4ed8' },
  roaming: { gradFrom: '#ffedd5', gradTo: '#fef3c7', borderClr: '#fed7aa', accent: '#EA580C', accentBg: 'rgba(234,88,12,0.12)', tagClr: '#c2410c' },
  aging: { gradFrom: '#ffe4e6', gradTo: '#fce7f3', borderClr: '#fecdd3', accent: '#E11D48', accentBg: 'rgba(225,29,72,0.12)', tagClr: '#be123c' },
  parents: { gradFrom: '#fdf4ff', gradTo: '#fae8ff', borderClr: '#e9b4fb', accent: '#a21caf', accentBg: 'rgba(162,28,175,0.12)', tagClr: '#86198f' }
}

export default function PackagesPage() {
  const { packagePrice, format, bundleWas, bundleSavings, completeWas, completeSavings } = usePricing()
  const earlyYearsCourses = COURSES.filter(c => c.subPkg === 'growing-early')
  const juniorCourses    = COURSES.filter(c => c.subPkg === 'growing-junior')
  const otherPackages    = PACKAGES.filter(p => p.id !== 'growing')

  return (
    <div className="page-enter">
      <div className="hero-bg noise relative py-20 overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <div className="chip bg-teal/15 text-teal border border-teal/25 mb-5">Our Packages</div>
          <h1 className="font-serif text-5xl lg:text-6xl text-white mb-5">Safety Education<br /><span className="italic text-teal">for Every Stage of Life.</span></h1>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">In a world of uncertainty, knowledge is power. Seven packages covering every age group from children to older adults. Pay once, learn at your own pace.</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 -mt-10 relative z-10 space-y-8 pb-20">

        {/* Growing Minds Bundle */}
        <div id="growing" className="bg-white rounded-2xl border-2 border-green-200 overflow-hidden">
          <div className="bg-gradient-to-r from-green-100 to-emerald-100 border-b border-green-200 px-8 py-5">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl" style={{background:'rgba(22,163,74,0.12)'}}>🌱</div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h2 className="font-serif text-2xl text-navy">Growing Minds</h2>
                    <span className="text-xs font-bold px-2 py-0.5 rounded-full text-white" style={{background:'#16A34A'}}>2-in-1 Bundle</span>
                  </div>
                  <p className="text-sm font-semibold text-green-700">Children aged 4-7 and 8-11 - Both age ranges included</p>
                </div>
              </div>
              <div className="text-right">
                <div className="font-serif text-3xl text-navy font-bold">{packagePrice('growing')}</div>
                <div className="text-green-600 text-xs font-semibold">Both age groups included</div>
                <div className="text-navy/40 text-xs">one-time payment</div>
              </div>
            </div>
          </div>

          <div className="px-8 pt-5 pb-2">
            <p className="text-navy/60 text-sm leading-relaxed">{EMOTIONAL_DESCRIPTIONS.growing}</p>
          </div>

          <div className="p-6 grid md:grid-cols-2 gap-4">
            <div className="rounded-xl border border-green-100 bg-green-50/40 p-5">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">🌱</span>
                <div>
                  <h3 className="font-semibold text-navy text-base">Early Years</h3>
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full text-white inline-block" style={{background:'#16A34A'}}>Ages 4-7</span>
                </div>
              </div>
              <div className="space-y-1.5">
                {earlyYearsCourses.map(c => (
                  <div key={c.id} className="flex items-center gap-2 text-sm text-navy/70"><span>{c.emoji}</span><span>{c.title}</span><span className="text-navy/30 ml-auto">{c.lessons.length} lessons</span></div>
                ))}
              </div>
            </div>
            <div className="rounded-xl border border-green-100 bg-green-50/40 p-5">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">🌿</span>
                <div>
                  <h3 className="font-semibold text-navy text-base">Junior</h3>
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full text-white inline-block" style={{background:'#16A34A'}}>Ages 8-11</span>
                </div>
              </div>
              <div className="space-y-1.5">
                {juniorCourses.map(c => (
                  <div key={c.id} className="flex items-center gap-2 text-sm text-navy/70"><span>{c.emoji}</span><span>{c.title}</span><span className="text-navy/30 ml-auto">{c.lessons.length} lessons</span></div>
                ))}
              </div>
            </div>
          </div>
          <div className="px-6 pb-6">
            <div className="w-full bg-gray-100 rounded-xl px-6 py-3 text-center"><span className="text-navy/40 font-medium text-sm">🔒 Purchases opening soon</span></div>
            <p className="text-center text-xs text-navy/40 mt-2">One payment - 10 courses - Both age groups - Perfect for growing children</p>
          </div>
        </div>

        {/* Other packages */}
        {otherPackages.map(pkg => {
          const pkgCourses = COURSES.filter(c => c.pkg === pkg.id)
          const gradient   = PKG_GRADIENTS[pkg.id] || PKG_GRADIENTS.parents
          return (
            <div key={pkg.id} id={pkg.id} className="bg-white rounded-2xl border-2 overflow-hidden" style={{borderColor: gradient.borderClr}}>
              <div className="border-b px-8 py-5" style={{background: `linear-gradient(to right, ${gradient.gradFrom}, ${gradient.gradTo})`, borderColor: gradient.borderClr}}>
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl" style={{background: gradient.accentBg}}>{pkg.emoji}</div>
                    <div>
                      <h2 className="font-serif text-2xl text-navy mb-0.5">{pkg.name}</h2>
                      <p className="text-sm font-semibold" style={{color: gradient.tagClr}}>{pkg.tag}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-serif text-3xl text-navy font-bold">{packagePrice(pkg.id)}</div>
                    <div className="text-navy/40 text-xs">one-time payment</div>
                  </div>
                </div>
              </div>
              <div className="p-8">
                <p className="text-navy/60 text-sm leading-relaxed mb-6">{EMOTIONAL_DESCRIPTIONS[pkg.id]}</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 mb-6">
                  {pkgCourses.map(c => (
                    <div key={c.id} className="text-center p-3 rounded-xl border border-gray-100 bg-slate">
                      <div className="text-lg mb-1">{c.emoji}</div>
                      <div className="text-xs font-medium text-navy/70 leading-snug">{c.title}</div>
                      <div className="text-xs text-navy/40 mt-1">{c.lessons.length} lessons</div>
                    </div>
                  ))}
                </div>
                <div className="w-full bg-gray-100 rounded-xl px-6 py-3 text-center"><span className="text-navy/40 font-medium text-sm">🔒 Purchases opening soon</span></div>
              </div>
            </div>
          )
        })}

        {/* Family Safety Bundle */}
        <div id="bundle" className="bg-navy rounded-2xl overflow-hidden relative">
          <div className="noise absolute inset-0" />
          <div className="relative z-10 p-8">
            <div className="flex flex-col sm:flex-row items-start gap-5 mb-6">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl bg-teal/20">👨‍👩‍👧‍👦</div>
              <div className="flex-1">
                <div className="chip bg-teal/20 text-teal border border-teal/30 mb-2 text-xs">Best Value</div>
                <h2 className="font-serif text-2xl text-white mb-1">Family Safety Bundle</h2>
                <p className="text-white/60 text-sm">Choose any 5 packages. Buy for yourself and gift courses to the people you love.</p>
              </div>
              <div className="sm:text-right flex-shrink-0">
                <div className="font-serif text-3xl text-white font-bold mb-1">{packagePrice('bundle')}</div>
                <div className="text-teal text-xs font-semibold">Save {format(bundleSavings)}</div>
                <div className="text-white/40 text-xs">one-time payment</div>
              </div>
            </div>
            <p className="text-white/50 text-sm leading-relaxed mb-6">Safety isn’t just personal, it’s something we give to the people we care about most. The Family Safety Bundle lets you choose any five packages and share them across your family. Assign courses to your children, your parents, your partner, or anyone you want to protect. Each person gets their own dashboard, their own progress tracking, and their own learning journey. One purchase, five lives made safer.</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
              {PACKAGES.filter(p => p.id !== 'growing').map(pkg => (
                <div key={pkg.id} className="text-center p-3 rounded-xl bg-white/5 border border-white/10">
                  <div className="text-lg mb-1">{pkg.emoji}</div>
                  <div className="text-xs font-medium text-white/70">{pkg.name}</div>
                </div>
              ))}
              <div className="text-center p-3 rounded-xl bg-white/5 border border-white/10">
                <div className="text-lg mb-1">🌱</div>
                <div className="text-xs font-medium text-white/70">Growing Minds</div>
              </div>
            </div>
            <div className="w-full bg-white/10 rounded-xl px-6 py-3 text-center"><span className="text-white/50 font-medium text-sm">🔒 Purchases opening soon</span></div>
          </div>
        </div>

        {/* Complete Library */}
        <div id="complete" className="bg-gradient-to-br from-teal/10 to-navy/5 rounded-2xl border-2 border-teal/30 overflow-hidden relative">
          <div className="p-8">
            <div className="flex flex-col sm:flex-row items-start gap-5 mb-6">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl bg-teal/20">📚</div>
              <div className="flex-1">
                <div className="chip bg-navy/10 text-navy border border-navy/20 mb-2 text-xs">Everything Included</div>
                <h2 className="font-serif text-2xl text-navy mb-1">Complete Library</h2>
                <p className="text-navy/60 text-sm">Every single package. All 7 courses. One purchase, total coverage for your whole family.</p>
              </div>
              <div className="sm:text-right flex-shrink-0">
                <div className="font-serif text-3xl text-navy font-bold mb-1">{packagePrice('complete')}</div>
                <div className="text-teal text-xs font-semibold">Save {format(completeSavings)}</div>
                <div className="text-navy/40 text-xs">one-time payment</div>
              </div>
            </div>
            <p className="text-navy/50 text-sm leading-relaxed mb-6">Why choose when you can have it all? The Complete Library gives you every package we offer — from Growing Minds for your little ones, through Street Smart and Nest Breaking for your teens and young adults, Roaming Free for travellers, Aging Wisdom for your parents, and Family Anchor for you. Assign courses to anyone in your family. Everyone gets their own dashboard and progress tracking. One purchase, seven packages, total peace of mind.</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mb-6">
              <div className="text-center p-3 rounded-xl bg-white border border-gray-100">
                <div className="text-lg mb-1">🌱</div>
                <div className="text-xs font-medium text-navy/70">Growing Minds</div>
              </div>
              {PACKAGES.filter(p => p.id !== 'growing').map(pkg => (
                <div key={pkg.id} className="text-center p-3 rounded-xl bg-white border border-gray-100">
                  <div className="text-lg mb-1">{pkg.emoji}</div>
                  <div className="text-xs font-medium text-navy/70">{pkg.name}</div>
                </div>
              ))}
            </div>
            <div className="w-full bg-navy/10 rounded-xl px-6 py-3 text-center"><span className="text-navy/50 font-medium text-sm">🔒 Purchases opening soon</span></div>
          </div>
        </div>

        {/* What you get section */}
        <div className="bg-slate rounded-2xl p-8">
          <h2 className="font-serif text-2xl text-navy text-center mb-6">What Every Package Includes</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[['📖','Age-Appropriate Content','Every course written for its specific audience'],['✅','Quiz Questions','Reinforce knowledge after every lesson'],['📊','Progress Tracking','Dashboard tracks every lesson you complete'],['💳','One-Time Payment','No subscription, no hidden fees, no recurring charges']].map(([icon,title,body]) => (
              <div key={title} className="bg-white rounded-xl p-5 border border-gray-100 text-center">
                <div className="text-2xl mb-2">{icon}</div>
                <div className="font-semibold text-navy text-sm mb-1">{title}</div>
                <div className="text-navy/50 text-xs">{body}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Newsletter Banner */}
        <NewsletterBanner />
      </div>
    </div>
  )
}

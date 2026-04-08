'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { PACKAGES, COURSES } from '@/lib/data'
import NewsletterBanner from '@/components/NewsletterBanner'
import AudioPlayer from '@/components/AudioPlayer'
import { usePricing } from '@/components/PricingProvider'
import PurchaseModal from '@/components/PurchaseModal'

const EXAMPLE_SONGS = {
  early: {
    src: 'https://iixjfonhzcipinnznsot.supabase.co/storage/v1/object/public/Audio/Examples%20Package%20page/Growing%20Minds%20Early%20Years%20Example.mp3',
    title: "Growing Minds: Walk With Your Grown Up",
    subtitle: 'Ages 4–7 · Growing Minds',
    lyrics: "Cars and buses zoom so fast,\nSo take good care when roads you pass.\nHold a hand, don't go alone,\nStay with a grown-up you have known.\n\nStop at the edge, stand nice and still,\nLook left, right, left with care and skill.\nListen close — what do you hear?\nA car might be coming very near!\n\nSome are quiet, soft as a breeze,\nElectric cars can sneak with ease.\nFind the lights with stripes so wide,\nThat's the safest place to stride.\n\nWhen the red light makes cars stay,\nWalk with your grown-up all the way.\nStep straight on, don't run or play,\nKeep looking both ways as you go your way.\n\nNever cross where cars are parked,\nIt's hard to see — it's just too dark!\nDrivers can't see little you,\nAnd you can't see the traffic too.\n\nSo stop, look, listen every time,\nAnd stay safe on roads — that's the rhyme!",
  },
  junior: {
    src: 'https://iixjfonhzcipinnznsot.supabase.co/storage/v1/object/public/Audio/Examples%20Package%20page/Growing%20Minds%20Junior%20Example%20Song.mp3',
    title: "Growing Minds: Private Means Mine",
    subtitle: 'Ages 8–11 · Growing Minds',
    lyrics: "The parts of me that no one sees,\nAre mine alone, they belong to me.\nCovered up, that's how it stays,\nNot for others, not for display.\n\nI know what's right, I know the line,\nIf something feels off, I trust the sign.\n\nPrivate means mine, no one decides,\nI choose my space, I set the lines.\nIf it's not for health or care,\nIt's not okay, it's not fair.\nPrivate means mine, I speak it clear,\nIf something's wrong, I tell, I don't disappear.\n\nSometimes care means help or checks,\nParents or doctors with respect.\nThey explain, they don't hide,\nSomeone I trust is there beside.\n\nBut if someone crosses that line for real,\nOr asks for things that don't feel right or real,\nThat's not care, that's not okay,\nI don't stay quiet, I don't delay.\n\nDoesn't matter who they are,\nIf it feels wrong, it's gone too far.\n\nPrivate means mine, no one decides,\nI choose my space, I set the lines.\nIf it's not for health or care,\nIt's not okay, it's not fair.\nPrivate means mine, I speak it clear,\nIf something's wrong, I tell, I don't disappear.\n\nIt's not just touch, it can be words,\nImages, questions that feel absurd.\nIf they ask for pictures or make it strange,\nThat's not normal — that's not a game.\n\nEven if I feel afraid,\nEven if threats are being made,\nI tell someone, I won't hold it in,\nBecause I know I didn't do anything.\n\nPrivate means mine, I stand my ground,\nMy voice is strong, I won't back down.\nIt's not my fault, I did no wrong,\nI speak it out, I stay strong.\n\nPrivate means mine, I make it known,\nI'm not alone — I'm never alone.",
  },
  streetHeadphones: {
    src: 'https://iixjfonhzcipinnznsot.supabase.co/storage/v1/object/public/Audio/Examples%20Package%20page/Headphones%20Out.mp3',
    title: "Street Smart: Headphones Out",
    subtitle: 'Ages 12–17 · Street Smart',
    lyrics: "Dark streets, lights are low, gotta see it all,\nShortcut looks fast, but I won't fall.\nStick to main roads, lit up and alive,\nPassing cars, open shops — keep the vibe.\n\nPhone in hand, one ear free,\nListen close, stay alert, that's the key.\nHeadphones out, eyes up, know who's near,\nSituational awareness — my weapon here.\n\nNew place, new route, gotta know the map,\nKnow the exits, the shops, where help is at.\nShare my location, don't wander blind,\nOwn my moves, own my time.\n\nLevel up at night, I see it all,\nStay aware, stand tall.\nTrust my gut, don't let it slide,\nI pick the path where I survive.\n\nWell-lit streets, eyes open wide,\nI don't hide, I decide.\nSafety first, every step I take,\nLevel up at night — I own the stakes.\n\nFriends split up, got my plan in hand,\nCharged phone, cash, rides I understand.\nEven if it wakes them up, that's fine,\nBetter safe than sorry, every single time.\n\nNew place feels strange, my chest beats fast,\nNervous or unsafe? My gut knows first.\nIf it feels wrong, I step, I go,\nMove toward people, lights, the flow.\n\nRoute I choose, exits I see,\nEvery step, I move strategically.\nNo guessing, no hoping, just playing it smart,\nI hold the map, I hold the chart.\n\nLevel up at night, I see it all,\nStay aware, stand tall.\nTrust my gut, don't let it slide,\nI pick the path where I survive.\n\nWell-lit streets, eyes open wide,\nI don't hide, I decide.\nSafety first, every step I take,\nLevel up at night — I own the stakes.\n\nEyes up — stay sharp — don't fall!\nMove smart — take charge — own it all!\nCheck exits — keep calm — don't run blind!\nTrust your gut — it's on your side!\n\nLevel up at night, I see it all,\nStay aware, stand tall.\nTrust my gut, don't let it slide,\nI pick the path where I survive.\n\nWell-lit streets, eyes open wide,\nI don't hide, I decide.\nSafety first, every step I take,\nLevel up at night — I own the stakes.",
  },
  streetDontSend: {
    src: "https://iixjfonhzcipinnznsot.supabase.co/storage/v1/object/public/Audio/Examples%20Package%20page/Street%20Smart_%20Don't%20Send%20it.mp3",
    title: "Street Smart: Don't Send It",
    subtitle: 'Ages 12–17 · Street Smart',
    lyrics: "[Intro / Hook]\nDon't send it, don't share it\nIf it's private, beware it\nOnce it's out, it's not your call\nRespect yourself, that's the wall\n\n[Verse 1]\nEven if they ask, even if they plead\nEven if they're your age, it's still a bad deed\nThe law's serious, it's not a game\nOne photo shared could ruin your name\n\nPrivate pics? They don't stay private\nScreenshots, leaks, blackmail, they riot\nFriendships fade, trust can break\nOnce it's gone, you can't take it back\n\n[Pre-Chorus]\nNo one who respects you will push you to this\nIf someone pressures, that's a red flag you can't miss\nYour \"no\" is power, it's your shield\nStand strong, don't let them steal\n\n[Hook / Chorus]\nDon't send it, don't share it\nIf it's private, beware it\nOnce it's out, it's not your call\nRespect yourself, that's the wall\n\n[Verse 2]\nManipulators will lie and pretend\nSay they care, act like a friend\nMake you feel guilty, make you doubt\nIt's not love, it's a trap, check it out\n\nIf you've already sent, don't despair\nStop now, get help, there are people who care\nReport it, tell an adult, stay safe online\nYou're not in trouble, it's not a crime\n\n[Bridge]\nYour respect, your choice, your control\nDon't let anyone play that role\nKeep your images, your body, your space\nYou're the boss, you set the pace\n\n[Hook / Chorus]\nDon't send it, don't share it\nIf it's private, beware it\nOnce it's out, it's not your call\nRespect yourself, that's the wall\n\n[Outro]\nSay no, stand tall, keep your line\nYour safety, your rules, your sign\nTrust yourself, you know what's right\nKeep it safe, day and night",
  },
}

const EMOTIONAL_DESCRIPTIONS = {
  street: "The teenage years move fast. New friendships, first freedoms, social media, peer pressure - the world opens up and so do the risks. Street Smart gives young people the tools to navigate it all with confidence, not fear. Because the best protection you can give a teenager is the knowledge to protect themselves.",
  nest: "They’re leaving the nest. First apartment, first nights out, first time truly on their own. Nest Breaking prepares young adults for the independence they crave and the realities that come with it. From personal safety to digital awareness, these courses turn vulnerability into confidence.",
  roaming: "Whether it’s a gap year, a family holiday, or a retirement adventure, the world is full of incredible experiences and hidden risks. Roaming Free equips travellers of all ages with the awareness and know-how to explore safely \u2014 from pre-trip preparation and packing smart, through scam avoidance and accommodation safety, to digital security, mental wellbeing abroad, and handling high-risk situations. Fifteen practical lessons so the only surprises are the good ones.",
  aging: "They’ve given us everything. Now the world is changing faster than ever, and the people we love most can become the easiest targets. Aging Wisdom helps older adults stay safe, informed, and independent in a world that doesn’t always look out for them.",
  parents: "The hardest conversations are often the most important ones. Family Anchor gives parents and guardians the language, the tools, and the confidence to talk to their families about safety, boundaries, and the things that really matter. Because keeping your family safe starts with being prepared.",
  growing: "Every child deserves to feel safe, and every parent deserves peace of mind. Growing Minds brings together two carefully tailored packages, one for younger children and one for older children, each designed to teach essential safety lessons in a way that’s age-appropriate, engaging, and empowering. Both the Early Years and Junior packages cover the same core safety topics, but each has been carefully adapted to suit its age group \u2014 using age-appropriate language, relatable scenarios, and teaching methods suited to each stage of development, including the sensitive handling of more complex subjects. Because when children understand the world around them, they grow up stronger."
}

const PKG_GRADIENTS = {
  street: { gradFrom: '#ede9fe', gradTo: '#ede9fe', borderClr: '#ddd6fe', accent: '#7C3AED', accentBg: 'rgba(124,58,237,0.12)', tagClr: '#7c3aed' },
  nest: { gradFrom: '#dbeafe', gradTo: '#cffafe', borderClr: '#bfdbfe', accent: '#2563EB', accentBg: 'rgba(37,99,235,0.12)', tagClr: '#1d4ed8' },
  roaming: { gradFrom: '#ffedd5', gradTo: '#fef3c7', borderClr: '#fed7aa', accent: '#EA580C', accentBg: 'rgba(234,88,12,0.12)', tagClr: '#c2410c' },
  aging: { gradFrom: '#ffe4e6', gradTo: '#fce7f3', borderClr: '#fecdd3', accent: '#E11D48', accentBg: 'rgba(225,29,72,0.12)', tagClr: '#be123c' },
  parents: { gradFrom: '#fdf4ff', gradTo: '#fae8ff', borderClr: '#e9b4fb', accent: '#a21caf', accentBg: 'rgba(162,28,175,0.12)', tagClr: '#86198f' }
}

export default function PackagesPage() {
  const { packagePrice, format, bundleWas, bundleSavings, completeWas, completeSavings, regionCode } = usePricing()
  const [expanded, setExpanded] = useState({})
  const [purchasesEnabled, setPurchasesEnabled] = useState(false)
  const [purchaseModal, setPurchaseModal] = useState(null) // { id, name, price }

  useEffect(() => {
    fetch('/api/payments-status').then(r => r.json()).then(d => setPurchasesEnabled(d.purchasesEnabled)).catch(() => {})
  }, [])

  const openPurchaseModal = (packageId, packageName, price) => {
    setPurchaseModal({ id: packageId, name: packageName, price })
  }
  const toggleExpand = (id) => setExpanded(prev => ({ ...prev, [id]: !prev[id] }))
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
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">🌱</span>
                <div>
                  <h3 className="font-semibold text-navy text-base">Early Years</h3>
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full text-white inline-block" style={{background:'#16A34A'}}>Ages 4-7</span>
                </div>
              </div>
              <div className="flex items-start gap-2 bg-amber-50 border border-amber-200/60 rounded-lg px-3 py-2 mb-3">
                <span className="text-amber-500 text-sm mt-0.5">👨‍👧</span>
                <p className="text-xs text-amber-800 leading-relaxed"><strong>Guided learning</strong> — designed to be completed together with a parent or carer. Simple language written to be read aloud.</p>
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
          <div className="px-6 pb-2">
            <button onClick={() => toggleExpand('growing')} className="w-full flex items-center justify-center gap-2 text-sm font-semibold text-green-700 hover:text-green-800 py-3 transition-colors">
              <span>{expanded['growing'] ? 'Show less' : 'See more — courses & lessons included'}</span>
              <svg className={"w-4 h-4 transition-transform duration-300 " + (expanded['growing'] ? 'rotate-180' : '')} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
            </button>
          </div>
          {expanded['growing'] && (
            <div className="px-6 pb-4 animate-fadeIn">
              <div className="grid md:grid-cols-2 gap-4">
                {[{ label: 'Early Years (Ages 4–7)', courses: earlyYearsCourses, emoji: '🌱' }, { label: 'Junior (Ages 8–11)', courses: juniorCourses, emoji: '🌿' }].map(group => (
                  <div key={group.label}>
                    <h4 className="text-sm font-bold text-navy mb-3 flex items-center gap-2"><span>{group.emoji}</span>{group.label}</h4>
                    <div className="space-y-3">
                      {group.courses.map(c => (
                        <div key={c.id} className="bg-white rounded-lg border border-green-100 p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-base">{c.emoji}</span>
                            <span className="text-sm font-semibold text-navy">{c.title}</span>
                            <span className="ml-auto text-xs text-navy/40 flex-shrink-0">{c.lessons.length} lessons</span>
                          </div>
                          <div className="space-y-1 pl-6">
                            {c.lessons.map((lesson, li) => (
                              <div key={li} className="text-xs text-navy/50 flex items-center gap-1.5">
                                <span className="w-1 h-1 rounded-full bg-green-400 flex-shrink-0" />
                                {lesson.title}
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          {/* ── Original Songs — Integrated ── */}
          <div className="mx-6 mb-4 rounded-xl bg-gradient-to-br from-[#0B1F3A] to-[#122a4a] p-4 sm:p-5 relative overflow-hidden">
            <div className="relative z-10">
              {/* Header row */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-lg">🎵</span>
                  <h3 className="text-white font-semibold text-base">72 Original Songs Built Into Every Lesson</h3>
                </div>
                <span className="text-[10px] sm:text-xs px-2.5 py-1 rounded-full bg-teal/15 border border-teal/25 text-teal font-semibold sm:ml-auto">Exclusive to Growing Minds</span>
              </div>

              {/* Description */}
              <p className="text-white/50 text-xs sm:text-sm leading-relaxed mb-4">
                Growing Minds includes <strong className="text-white/80">72 original songs written and produced by HomeSafeEducation</strong> — 37 for Early Years and 35 for Junior. Every lesson features its own song built into the learning material, plus a recap song for each course. Full lyrics are displayed with every song. For Early Years (ages 4–7), songs are designed to be <strong className="text-white/80">listened to and sung together with a parent or carer</strong>. For Junior (ages 8–11), lyrics are there to <strong className="text-white/80">read along and sing independently</strong>.
              </p>

              {/* Audio previews side by side */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm">🌱</span>
                    <span className="text-white/70 font-medium text-xs">Early Years · Ages 4–7</span>
                  </div>
                  <AudioPlayer
                    src={EXAMPLE_SONGS.early.src}
                    title={EXAMPLE_SONGS.early.title}
                    subtitle={EXAMPLE_SONGS.early.subtitle}
                    lyrics={EXAMPLE_SONGS.early.lyrics}
                    variant="lesson"
                    accentColor="#E8703A"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm">🌿</span>
                    <span className="text-white/70 font-medium text-xs">Junior · Ages 8–11</span>
                  </div>
                  <AudioPlayer
                    src={EXAMPLE_SONGS.junior.src}
                    title={EXAMPLE_SONGS.junior.title}
                    subtitle={EXAMPLE_SONGS.junior.subtitle}
                    lyrics={EXAMPLE_SONGS.junior.lyrics}
                    variant="lesson"
                    accentColor="#0EA5A0"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="px-6 pb-6">
            {purchasesEnabled ? (
              <button onClick={() => openPurchaseModal('growing', 'Growing Minds', packagePrice('growing'))} className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl px-6 py-3 text-center transition-colors">
                Buy Growing Minds — {packagePrice('growing')}
              </button>
            ) : (
              <div className="w-full bg-gray-100 rounded-xl px-6 py-3 text-center"><span className="text-navy/40 font-medium text-sm">🔒 Purchases opening soon</span></div>
            )}
            <p className="text-center text-xs text-navy/40 mt-2">One payment · 13 courses · 72 original songs in lessons · Both age groups included</p>
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
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 mb-4">
                  {pkgCourses.map(c => (
                    <div key={c.id} className="text-center p-3 rounded-xl border border-gray-100 bg-slate">
                      <div className="text-lg mb-1">{c.emoji}</div>
                      <div className="text-xs font-medium text-navy/70 leading-snug">{c.title}</div>
                      <div className="text-xs text-navy/40 mt-1">{c.lessons.length} lessons</div>
                    </div>
                  ))}
                </div>
                <button onClick={() => toggleExpand(pkg.id)} className="w-full flex items-center justify-center gap-2 text-sm font-semibold py-3 mb-4 transition-colors hover:opacity-80" style={{ color: gradient.accent }}>
                  <span>{expanded[pkg.id] ? 'Show less' : 'See more — courses & lessons included'}</span>
                  <svg className={"w-4 h-4 transition-transform duration-300 " + (expanded[pkg.id] ? 'rotate-180' : '')} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                </button>
                {expanded[pkg.id] && (
                  <div className="mb-6 space-y-3 animate-fadeIn">
                    {pkgCourses.map(c => (
                      <div key={c.id} className="rounded-lg border p-4" style={{ borderColor: gradient.borderClr, background: gradient.gradFrom + '40' }}>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-base">{c.emoji}</span>
                          <span className="text-sm font-semibold text-navy">{c.title}</span>
                          <span className="ml-auto text-xs text-navy/40 flex-shrink-0">{c.lessons.length} lessons</span>
                        </div>
                        <div className="space-y-1 pl-6">
                          {c.lessons.map((lesson, li) => (
                            <div key={li} className="text-xs text-navy/50 flex items-center gap-1.5">
                              <span className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: gradient.accent }} />
                              {lesson.title}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                {/* ── Street Smart Music Section ── */}
                {pkg.id === 'street' && (
                  <div className="mb-6 rounded-xl bg-gradient-to-br from-[#0B1F3A] to-[#1a1a2e] p-4 sm:p-5 relative overflow-hidden">
                    <div className="relative z-10">
                      {/* Header */}
                      <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-3">
                        <div className="flex items-center gap-2">
                          <span className="text-lg">🎵</span>
                          <h3 className="text-white font-semibold text-base">30 Original Tracks Built Into Every Lesson</h3>
                        </div>
                        <span className="text-[10px] sm:text-xs px-2.5 py-1 rounded-full bg-red-500/15 border border-red-500/25 text-red-400 font-semibold sm:ml-auto">Exclusive to Street Smart</span>
                      </div>

                      {/* Description */}
                      <p className="text-white/50 text-xs sm:text-sm leading-relaxed mb-3">
                        Street Smart includes <strong className="text-white/80">30 original tracks written and produced in-house by HomeSafeEducation</strong>. For the children&apos;s lessons we provide a song and lyrics for each lesson and additional songs to go with the course summaries to reinforce learning. We have produced <strong className="text-white/80">102 age-appropriate tracks</strong> across all packages — from certified nursery rhyme bangers to educational music your teenager will actually want to share with their friends.
                      </p>
                      <p className="text-white/50 text-xs sm:text-sm leading-relaxed mb-4">
                        We don&apos;t teach through fear — we want to <strong className="text-white/80">empower youth with knowledge</strong> so they can decide to make safe choices. We teach with no narratives or agendas, we teach with renowned and tested safety advice.
                      </p>

                      {/* Audio previews */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-sm">🥷</span>
                            <span className="text-white/70 font-medium text-xs">Street Smart · Ages 12–17</span>
                          </div>
                          <AudioPlayer
                            src={EXAMPLE_SONGS.streetHeadphones.src}
                            title={EXAMPLE_SONGS.streetHeadphones.title}
                            subtitle={EXAMPLE_SONGS.streetHeadphones.subtitle}
                            lyrics={EXAMPLE_SONGS.streetHeadphones.lyrics}
                            variant="lesson"
                            accentColor="#DC2626"
                          />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-sm">🥷</span>
                            <span className="text-white/70 font-medium text-xs">Street Smart · Ages 12–17</span>
                          </div>
                          <AudioPlayer
                            src={EXAMPLE_SONGS.streetDontSend.src}
                            title={EXAMPLE_SONGS.streetDontSend.title}
                            subtitle={EXAMPLE_SONGS.streetDontSend.subtitle}
                            lyrics={EXAMPLE_SONGS.streetDontSend.lyrics}
                            variant="lesson"
                            accentColor="#DC2626"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {purchasesEnabled ? (
                  <button onClick={() => openPurchaseModal(pkg.id, pkg.name, packagePrice(pkg.id))} className="w-full font-semibold rounded-xl px-6 py-3 text-center text-white transition-colors" style={{ background: gradient.accent }}>
                    Buy {pkg.name} — {packagePrice(pkg.id)}
                  </button>
                ) : (
                  <div className="w-full bg-gray-100 rounded-xl px-6 py-3 text-center"><span className="text-navy/40 font-medium text-sm">🔒 Purchases opening soon</span></div>
                )}
              </div>
            </div>
          )
        })}

        {/* Family Safety Bundle */}
        <div id="bundle" className="bg-navy rounded-2xl overflow-hidden relative">
          <div className="noise absolute inset-0" />
          <div className="relative z-10 p-8">
            <div className="flex flex-col sm:flex-row items-start gap-5 mb-6">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl bg-teal/20"><span className="hidden sm:inline">👨‍👩‍👧‍👦</span><span className="sm:hidden">🏠</span></div>
              <div className="flex-1">
                <div className="chip bg-teal/20 text-teal border border-teal/30 mb-2 text-xs">Best Value</div>
                <h2 className="font-serif text-2xl text-white mb-1">Family Safety Bundle</h2>
                <p className="text-white/60 text-sm">Pick any 5 packages — keep them for yourself, gift them to loved ones, or mix both. Your choice.</p>
              </div>
              <div className="sm:text-right flex-shrink-0">
                <div className="font-serif text-3xl text-white font-bold mb-1">{packagePrice('bundle')}</div>
                <div className="text-teal text-xs font-semibold">Can save up to {format(bundleSavings)}</div>
                <div className="text-white/40 text-xs">one-time payment</div>
              </div>
            </div>
            <p className="text-white/50 text-sm leading-relaxed mb-6">Safety isn’t just personal — it’s something we give to the people we care about most. Choose any five packages and decide who gets each one. Keep them all for yourself, gift them all to loved ones, or split them however you like. You can even pick the same package twice if two people need it. Each person gets their own account, their own dashboard, and their own learning journey. One purchase, five lives made safer.</p>
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
            {purchasesEnabled ? (
              <button onClick={() => openPurchaseModal('bundle', 'Family Safety Bundle', packagePrice('bundle'))} className="w-full bg-teal hover:bg-teal/90 text-white font-semibold rounded-xl px-6 py-3 text-center transition-colors">
                Buy Family Safety Bundle — {packagePrice('bundle')}
              </button>
            ) : (
              <div className="w-full bg-white/10 rounded-xl px-6 py-3 text-center"><span className="text-white/50 font-medium text-sm">🔒 Purchases opening soon</span></div>
            )}
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
                <p className="text-navy/60 text-sm">7 packages to assign however you choose — keep them or gift them. You're not limited to one of each.</p>
              </div>
              <div className="sm:text-right flex-shrink-0">
                <div className="font-serif text-3xl text-navy font-bold mb-1">{packagePrice('complete')}</div>
                <div className="text-teal text-xs font-semibold">Can save up to {format(completeSavings)}</div>
                <div className="text-navy/40 text-xs">one-time payment</div>
              </div>
            </div>
            <p className="text-navy/50 text-sm leading-relaxed mb-6">The Complete Library gives you seven packages to use however you like. Keep some for yourself and gift the rest, or give them all to different family members. You're not locked into one of each — if two people need the same package, that works too. From Growing Minds for your little ones, through Street Smart and Nest Breaking for teens and young adults, Roaming Free for travellers, Aging Wisdom for your parents, and Family Anchor for you. Each person gets their own account, their own dashboard, and their own progress tracking. One purchase, seven packages, total flexibility.</p>
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
            {purchasesEnabled ? (
              <button onClick={() => openPurchaseModal('complete', 'Complete Library', packagePrice('complete'))} className="w-full bg-navy hover:bg-navy/90 text-white font-semibold rounded-xl px-6 py-3 text-center transition-colors">
                Buy Complete Library — {packagePrice('complete')}
              </button>
            ) : (
              <div className="w-full bg-navy/10 rounded-xl px-6 py-3 text-center"><span className="text-navy/50 font-medium text-sm">🔒 Purchases opening soon</span></div>
            )}
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

      {/* Sticky mobile buy bar */}
      {purchasesEnabled && !purchaseModal && (
        <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-gray-200 px-4 py-3 sm:hidden" style={{ zIndex: 40 }}>
          <button
            onClick={() => openPurchaseModal('growing', 'Growing Minds', packagePrice('growing'))}
            className="w-full bg-teal hover:bg-teal/90 text-white font-semibold rounded-xl py-3 text-sm transition-colors"
          >
            Browse & Buy Packages
          </button>
        </div>
      )}

      {/* Purchase Modal */}
      {purchaseModal && (
        <PurchaseModal
          packageId={purchaseModal.id}
          packageName={purchaseModal.name}
          price={purchaseModal.price}
          regionCode={regionCode}
          onClose={() => setPurchaseModal(null)}
        />
      )}
    </div>
  )
}

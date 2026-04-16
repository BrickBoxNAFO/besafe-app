'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'
import { COURSES, PACKAGES } from '@/lib/data'
import { getMusicPrice, countryToRegion } from '@/lib/pricing'

/* ────────────────────────────────────────────
   Congratulations Page
   - Course complete (mid-package): simple celebration, link to next course
   - Package complete (last course): full celebration with certificate + music upsell

   MOBILE-FIRST: Certificate confirmation AND music upsell are immediately
   visible without scrolling. The user sees "Congratulations + Certificate on
   its way" at the top, then the music offer right below — no content is
   hidden below the fold.
   ──────────────────────────────────────────── */

// Map package IDs to music product info
const MUSIC_PRODUCTS = {
  'growing-early': {
    name: 'Growing Minds: Early Years',
    songs: 31,
    desc: 'Your child already knows these songs from the course — gentle, memorable melodies built into every lesson. Download them to keep playing in the car, at bedtime, or around the house — on any device, anytime.',
    emoji: '🌱',
    color: '#16A34A',
    gradient: 'from-green-500 to-emerald-600',
  },
  'growing-junior': {
    name: 'Growing Minds: Junior',
    songs: 28,
    desc: 'Your child has already been singing along to these throughout the course. Download all the songs so they can keep listening on any device — in the car, on headphones, wherever they go.',
    emoji: '🌿',
    color: '#15803D',
    gradient: 'from-emerald-500 to-green-700',
  },
  'street': {
    name: 'Street Smart',
    songs: 24,
    desc: 'These are the tracks from the course — powerful original songs written for teenagers, in a style they\'ll actually listen to. Download them to play on any device, anytime.',
    emoji: '🥷',
    color: '#DC2626',
    gradient: 'from-red-500 to-rose-700',
  },
  'aging': {
    name: 'Aging Wisdom',
    songs: 20,
    desc: 'These are the songs from the course — warm, memorable melodies written to reinforce every lesson. Download them all to keep listening on any device, anytime.',
    emoji: '💐',
    color: '#E11D48',
    gradient: 'from-rose-500 to-pink-700',
  },
  'nest': {
    name: 'Nest Breaking',
    songs: 20,
    desc: 'The songs that carried you through the course — written for young adults stepping into life on their own. Download them all to keep listening on any device, anytime.',
    emoji: '🦅',
    color: '#7C3AED',
    gradient: 'from-violet-500 to-purple-700',
  },
  'roaming': {
    name: 'Roaming Free',
    songs: 24,
    desc: 'Travel-ready tracks from every Roaming Free lesson — made for long journeys, airport lounges, and everywhere in between. Download them all and play them on any device, anywhere.',
    emoji: '✈️',
    color: '#0EA5E9',
    gradient: 'from-sky-500 to-blue-700',
  },
  'parents': {
    name: 'Family Anchor',
    songs: 24,
    desc: 'The songs from the Family Anchor course — memorable, family-friendly tracks that reinforce every lesson across every age group. Download them all to play on any device at home, in the car, wherever you are.',
    emoji: '⚓',
    color: '#E8703A',
    gradient: 'from-orange-500 to-amber-700',
  },
}

// Last course ID for each package/sub-package — triggers certificate + music upsell.
const LAST_COURSE_IN_PACKAGE = {
  'c35':  'growing-early',
  'c39':  'growing-junior',
  'c38':  'street',
  'c9':   'nest',
  'c15':  'roaming',
  'c20':  'aging',
  'c25':  'parents',
}

function getMusicProduct(course) {
  if (!course) return null
  const musicKey = LAST_COURSE_IN_PACKAGE[course.id]
  if (!musicKey) return null
  return MUSIC_PRODUCTS[musicKey] || null
}

function getNextCourse(course) {
  if (!course) return null
  const samePkgCourses = COURSES.filter(c => {
    if (course.subPkg) return c.subPkg === course.subPkg
    return c.pkg === course.pkg
  })
  const idx = samePkgCourses.findIndex(c => c.id === course.id)
  if (idx < 0 || idx >= samePkgCourses.length - 1) return null
  return samePkgCourses[idx + 1]
}

export default function CongratulationsPage() {
  const params = useParams()
  const router = useRouter()
  const supabase = createClient()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(false)
  const [showConfetti, setShowConfetti] = useState(true)
  const [region, setRegion] = useState('US')
  const [verified, setVerified] = useState(false)
  const [checkoutError, setCheckoutError] = useState(null)

  const course = COURSES.find(c => c.id === params.courseId)
  const pkg = course ? PACKAGES.find(p => p.id === course.pkg) : null
  const musicProduct = getMusicProduct(course)
  const courseColor = course?.color || '#0EA5A0'
  const isPackageComplete = course ? (course.id in LAST_COURSE_IN_PACKAGE) : false
  const musicProductId = isPackageComplete ? LAST_COURSE_IN_PACKAGE[course.id] : null
  const musicPriceDisplay = musicProduct && musicProductId ? (getMusicPrice(musicProductId, region) || getMusicPrice(musicProductId, 'US')) : null
  const nextCourse = !isPackageComplete ? getNextCourse(course) : null
  const subPkg = course?.subPkg ? pkg?.subPackages?.find(s => s.id === course.subPkg) : null
  const packageLabel = subPkg?.name || pkg?.name || 'HomeSafeEducation'

  useEffect(() => {
    const checkAccess = async () => {
      const { data: { user: u } } = await supabase.auth.getUser()
      if (!u) { router.push('/login'); return }
      setUser(u)

      if (course) {
        const { data: progress } = await supabase
          .from('progress')
          .select('lesson_index, passed')
          .eq('user_id', u.id)
          .eq('course_id', params.courseId)
        const passedSet = new Set((progress || []).filter(r => r.passed).map(r => r.lesson_index))
        const allPassed = course.lessons.every((_, i) => passedSet.has(i))
        if (!allPassed) { router.push('/course/' + params.courseId); return }
      }
      setVerified(true)

      // Fire course completion email (best-effort, don't block the page)
      fetch('/api/course-complete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ courseId: params.courseId }),
      }).catch(() => {}) // silent — email is a bonus, not critical
    }
    checkAccess()
    const t = setTimeout(() => setShowConfetti(false), 5000)
    // Detect region
    const cookie = document.cookie.split(';').find(c => c.trim().startsWith('pricing_region='))
    if (cookie) {
      const val = cookie.split('=')[1]?.trim()
      if (val && val !== 'US') { setRegion(val); return () => clearTimeout(t) }
    }
    try {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || ''
      const lang = navigator.language || ''
      if (tz === 'Europe/London') setRegion('GB')
      else if (tz.startsWith('Europe/')) setRegion('EU')
      else if (tz.startsWith('Australia/')) setRegion('AU')
      else if (tz.startsWith('Pacific/Auckland')) setRegion('NZ')
      else if (tz.startsWith('America/') && (lang.startsWith('en-CA') || lang.startsWith('fr-CA'))) setRegion('CA')
      else if (lang.startsWith('en-GB')) setRegion('GB')
      else if (lang.match(/^(de|fr|es|it|nl|pt|pl|sv|da|fi|no|cs|el|hu|ro|bg|hr|sk|sl|et|lv|lt)/)) setRegion('EU')
    } catch (_) {}
    return () => clearTimeout(t)
  }, [])

  const handleBuyMusic = async () => {
    if (!user || !musicProduct) return
    setLoading(true)
    setCheckoutError(null)
    try {
      const res = await fetch('/api/checkout-music', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.id,
          email: user.email,
          productId: musicProductId,
          productName: musicProduct.name + ' — Complete Song Collection',
          region,
          ...(window.numok ? window.numok.getStripeMetadata() : {}),
        }),
      })
      const data = await res.json()
      if (data.url) {
        window.location.href = data.url
      } else {
        setCheckoutError(data.error || 'Something went wrong. Please try again.')
      }
    } catch (err) {
      console.error('Checkout error:', err)
      setCheckoutError('Unable to connect to checkout. Please try again.')
    }
    setLoading(false)
  }

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-navy/50 mb-4">Course not found.</p>
          <Link href="/library" className="btn-primary">Back to Library</Link>
        </div>
      </div>
    )
  }

  if (!verified) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-teal border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
          <p className="text-navy/50 text-sm">Loading...</p>
        </div>
      </div>
    )
  }

  /* ──────────────────────────────────────────────────────────────
     PACKAGE COMPLETE — certificate + music upsell
     MOBILE-FIRST: Everything important visible without scrolling.
     Top section = Congratulations + certificate confirmation (compact).
     Immediately below = music upsell with prominent purchase button.
     ────────────────────────────────────────────────────────────── */
  if (isPackageComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50">
        {/* Confetti */}
        {showConfetti && (
          <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden" aria-hidden="true">
            {Array.from({ length: 60 }).map((_, i) => (
              <div
                key={i}
                className="absolute animate-confetti"
                style={{
                  left: Math.random() * 100 + '%',
                  top: -20,
                  width: Math.random() * 8 + 6,
                  height: Math.random() * 8 + 6,
                  borderRadius: Math.random() > 0.5 ? '50%' : '2px',
                  background: ['#16A34A', '#DC2626', '#0EA5A0', '#E8703A', '#2B3480', '#7C3AED', '#F59E0B', '#EC4899'][Math.floor(Math.random() * 8)],
                  animationDelay: Math.random() * 3 + 's',
                  animationDuration: Math.random() * 2 + 3 + 's',
                }}
              />
            ))}
          </div>
        )}

        <div className="max-w-2xl mx-auto px-4 pt-8 pb-12 md:px-6 md:pt-12 md:pb-16">

          {/* ── COMPACT HEADER: Trophy + Congratulations + Certificate ── */}
          <div className="text-center mb-6 md:mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 md:w-28 md:h-28 rounded-full mb-4 shadow-lg" style={{ background: `linear-gradient(135deg, ${courseColor}, ${courseColor}CC)` }}>
              <span className="text-4xl md:text-6xl">🏆</span>
            </div>

            <h1 className="font-serif text-3xl md:text-5xl text-navy mb-2">
              Congratulations!
            </h1>
            <p className="text-lg md:text-xl text-navy/60 mb-3">
              You completed every course in <strong className="text-navy">{packageLabel}</strong>
            </p>

            {/* Certificate confirmation — inline, not a separate card */}
            <div className="inline-flex items-center gap-2 bg-teal/10 text-teal rounded-full px-5 py-2.5 text-sm font-medium">
              <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Your certificate is on its way to your email
            </div>
          </div>

          {/* ── MUSIC UPSELL — immediately visible, no scrolling needed ── */}
          {musicProduct && (
            <div className="relative bg-white rounded-2xl border border-gray-100 shadow-lg overflow-hidden mb-6">
              {/* Accent bar */}
              <div className="h-1.5" style={{ background: `linear-gradient(to right, ${musicProduct.color}, ${courseColor})` }} />

              <div className="p-5 md:p-8">
                {/* Header row */}
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl flex items-center justify-center text-2xl md:text-3xl flex-shrink-0" style={{ background: `linear-gradient(135deg, ${musicProduct.color}20, ${musicProduct.color}40)` }}>
                    🎵
                  </div>
                  <div className="flex-1 min-w-0">
                    <h2 className="font-serif text-xl md:text-2xl text-navy leading-tight">
                      Take the Songs With You
                    </h2>
                    <p className="text-navy/50 text-sm mt-0.5">
                      Keep them on your devices forever
                    </p>
                  </div>
                  {/* Badge */}
                  <span className="hidden sm:inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-700 flex-shrink-0">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                    EXCLUSIVE
                  </span>
                </div>

                {/* Description — shorter on mobile */}
                <p className="text-navy/70 text-[15px] leading-relaxed mb-4 md:mb-5">
                  {musicProduct.desc}
                </p>

                {/* What you get — compact */}
                <div className="bg-slate-50 rounded-xl p-4 mb-5">
                  <p className="text-navy/70 text-sm leading-relaxed">
                    <strong className="text-navy">All {musicProduct.songs} songs</strong> as MP3 files — play on any device, anywhere. Yours to keep forever.
                  </p>
                </div>

                {/* Price + CTA */}
                <div className="text-center">
                  <div className="mb-3">
                    <span className="text-3xl md:text-4xl font-bold text-navy">{musicPriceDisplay}</span>
                    <span className="text-navy/40 text-sm ml-2">/ one-time</span>
                  </div>

                  <button
                    onClick={handleBuyMusic}
                    disabled={loading}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl text-white font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
                    style={{ background: `linear-gradient(135deg, ${musicProduct.color}, ${musicProduct.color}DD)` }}
                  >
                    {loading ? (
                      <span className="animate-spin w-5 h-5 border-2 border-white/30 border-t-white rounded-full" />
                    ) : (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                    )}
                    {loading ? 'Preparing Checkout...' : `Download the Songs — ${musicPriceDisplay}`}
                  </button>

                  {checkoutError && (
                    <div className="mt-3 bg-red-50 border border-red-100 rounded-xl px-4 py-3">
                      <p className="text-red-600 text-sm">{checkoutError}</p>
                    </div>
                  )}

                  <p className="text-navy/30 text-xs mt-3 flex items-center justify-center gap-1">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                    Secure checkout via Stripe
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Navigation buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/library" className="btn-ghost text-center">
              My Courses
            </Link>
            <Link href="/packages" className="btn-primary text-center">
              Explore More Packages
            </Link>
          </div>
        </div>
      </div>
    )
  }

  /* ──────────────────────────────────────────────────────────────
     COURSE COMPLETE (mid-package) — lighter celebration, next course CTA
     ────────────────────────────────────────────────────────────── */
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50">
      <div className="max-w-2xl mx-auto px-4 py-10 md:px-6 md:py-16">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-5" style={{ background: `linear-gradient(135deg, ${courseColor}20, ${courseColor}40)` }}>
            <span className="text-4xl">🎉</span>
          </div>

          <h1 className="font-serif text-3xl md:text-4xl text-navy mb-3">
            Course Complete!
          </h1>
          <p className="text-lg text-navy/60 mb-2">
            You finished <strong className="text-navy">{course.title}</strong>
          </p>
          <p className="text-navy/40 text-sm">
            Great progress — keep going through <strong>{packageLabel}</strong> to earn your certificate.
          </p>
        </div>

        {/* Progress encouragement */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-8 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-teal/10 mb-3">
            <svg className="w-6 h-6 text-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p className="text-navy/60 text-sm">
            Complete every course in <strong className="text-navy">{packageLabel}</strong> to receive your personalised certificate of completion.
          </p>
        </div>

        {/* Continue buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          {nextCourse && (
            <Link href={'/course/' + nextCourse.id} className="btn-primary text-center">
              Next Course: {nextCourse.title}
            </Link>
          )}
          <Link href={'/course/' + course.id} className="btn-ghost text-center">
            Review {course.title}
          </Link>
          <Link href="/library" className="btn-ghost text-center">
            My Courses
          </Link>
        </div>
      </div>
    </div>
  )
}

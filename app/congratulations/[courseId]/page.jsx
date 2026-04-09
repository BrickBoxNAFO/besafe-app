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
   ──────────────────────────────────────────── */

// Map package IDs to music product info
const MUSIC_PRODUCTS = {
  'growing-early': {
    name: 'Growing Minds: Early Years',
    songs: 31,
    desc: 'Children learn best when they\'re having fun. These are the songs your child already knows and loves from the course — gentle, memorable melodies written to help little ones remember what they\'ve learned.',
    emoji: '🌱',
    color: '#16A34A',
    gradient: 'from-green-500 to-emerald-600',
  },
  'growing-junior': {
    name: 'Growing Minds: Junior',
    songs: 28,
    desc: 'The lessons don\'t have to end when the screen closes. Upbeat, catchy tracks that reinforce everything your child learned — let them keep listening, keep singing, and keep learning.',
    emoji: '🌿',
    color: '#15803D',
    gradient: 'from-emerald-500 to-green-700',
  },
  'street': {
    name: 'Street Smart',
    songs: 24,
    desc: 'Safety messages hit differently when they come through music. Powerful original tracks written for teenagers, in a style they\'ll actually listen to.',
    emoji: '🥷',
    color: '#DC2626',
    gradient: 'from-red-500 to-rose-700',
  },
}

// Last course ID for each package/sub-package — triggers certificate + music upsell
const LAST_COURSE_IN_PACKAGE = {
  'c35':  'growing-early',   // last Early Years course
  'c39':  'growing-junior',  // last Junior course
  'c38':  'street',          // last Street Smart course
  'c9':   null,              // last Nest Breaking course (no music)
  'c15':  null,              // last Roaming Free course (no music)
  'c20':  null,              // last Aging Wisdom course (no music)
  'c25':  null,              // last Family Anchor course (no music)
}

// Resolve which music product a course belongs to — only for the last course in each package
function getMusicProduct(course) {
  if (!course) return null
  const musicKey = LAST_COURSE_IN_PACKAGE[course.id]
  if (!musicKey) return null
  return MUSIC_PRODUCTS[musicKey] || null
}

// Find the next course in this package/sub-package after the current one
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
    supabase.auth.getUser().then(({ data }) => setUser(data?.user))
    // Stop confetti after 5 seconds
    const t = setTimeout(() => setShowConfetti(false), 5000)
    // Detect region from cookie or geo
    const cookie = document.cookie.split(';').find(c => c.trim().startsWith('pricing_region='))
    if (cookie) {
      setRegion(cookie.split('=')[1]?.trim() || 'US')
    }
    return () => clearTimeout(t)
  }, [])

  const handleBuyMusic = async () => {
    if (!user || !musicProduct) return
    setLoading(true)
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
        }),
      })
      const data = await res.json()
      if (data.url) {
        window.location.href = data.url
      }
    } catch (err) {
      console.error('Checkout error:', err)
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

  /* ──────────────────────────────────────────────────────────────
     PACKAGE COMPLETE — full celebration with certificate + music
     ────────────────────────────────────────────────────────────── */
  if (isPackageComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50">
        {/* Confetti animation */}
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

        <div className="max-w-3xl mx-auto px-6 py-16">
          {/* Trophy / celebration header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-28 h-28 rounded-full mb-6 shadow-lg" style={{ background: `linear-gradient(135deg, ${courseColor}, ${courseColor}CC)` }}>
              <span className="text-6xl">🏆</span>
            </div>

            <h1 className="font-serif text-4xl md:text-5xl text-navy mb-4">
              Congratulations!
            </h1>
            <p className="text-xl text-navy/60 mb-2">
              You have completed every course in <strong className="text-navy">{packageLabel}</strong>
            </p>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold text-white" style={{ background: courseColor }}>
              <span>{course.emoji || pkg?.emoji}</span>
              <span>{packageLabel}</span>
            </div>
          </div>

          {/* Certificate card */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-8">
            <div className="h-1.5" style={{ background: `linear-gradient(to right, ${courseColor}, ${courseColor}80)` }} />
            <div className="p-8 text-center">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-teal/10 mb-4">
                <svg className="w-7 h-7 text-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="font-serif text-2xl text-navy mb-2">Your Certificate Is On Its Way</h2>
              <p className="text-navy/50 max-w-md mx-auto">
                A personalised certificate of completion will be delivered to your email shortly.
              </p>
            </div>
          </div>

          {/* Music upsell — only for packages with music */}
          {musicProduct && (
            <div className="relative bg-white rounded-2xl border border-gray-100 shadow-lg overflow-hidden mb-8">
              {/* Accent top bar */}
              <div className="h-2" style={{ background: `linear-gradient(to right, ${musicProduct.color}, ${courseColor})` }} />

              {/* Badge */}
              <div className="absolute top-5 right-5">
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-700">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                  EXCLUSIVE OFFER
                </span>
              </div>

              <div className="p-8 md:p-10">
                {/* Music icon */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl shadow-md" style={{ background: `linear-gradient(135deg, ${musicProduct.color}20, ${musicProduct.color}40)` }}>
                    🎵
                  </div>
                  <div>
                    <h2 className="font-serif text-2xl text-navy">Did You Enjoy the Music?</h2>
                    <p className="text-navy/50 text-sm">Keep the songs. Listen anytime.</p>
                  </div>
                </div>

                {/* Description */}
                <p className="text-navy/70 text-lg leading-relaxed mb-6">
                  {musicProduct.desc}
                </p>

                {/* What you get */}
                <div className="bg-slate-50 rounded-xl p-5 mb-8">
                  <p className="text-navy/60 text-[15px] leading-relaxed">
                    <strong className="text-navy">{musicProduct.songs} educational songs</strong> packed with important safety knowledge — designed to help children feel confident, stay safe, and remember what matters most.
                  </p>
                </div>

                {/* Price and CTA */}
                <div className="text-center">
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-navy">{musicPriceDisplay}</span>
                    <span className="text-navy/40 text-sm ml-2">/ one-time</span>
                  </div>

                  <button
                    onClick={handleBuyMusic}
                    disabled={loading}
                    className="inline-flex items-center gap-3 px-10 py-4 rounded-xl text-white font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
                    style={{ background: `linear-gradient(135deg, ${musicProduct.color}, ${musicProduct.color}DD)` }}
                  >
                    {loading ? (
                      <span className="animate-spin w-5 h-5 border-2 border-white/30 border-t-white rounded-full" />
                    ) : (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                    )}
                    {loading ? 'Preparing Checkout...' : `Get the Music — ${musicPriceDisplay}`}
                  </button>

                  <p className="text-navy/30 text-xs mt-4 flex items-center justify-center gap-1">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                    Secure checkout via Stripe
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Continue buttons */}
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
      <div className="max-w-2xl mx-auto px-6 py-16">
        <div className="text-center mb-10">
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

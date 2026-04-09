'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'
import { getMusicPrice } from '@/lib/pricing'
import SONGS, { getAudioUrl } from '@/lib/songs'
import AudioPlayer from '@/components/AudioPlayer'

/* ────────────────────────────────────────────
   Buy Music — Standalone purchase page
   Linked from certificate completion emails.
   ──────────────────────────────────────────── */

const PRODUCTS = {
  'growing-early': {
    name: 'Growing Minds: Early Years',
    subtitle: 'Complete Song Collection',
    songs: 31,
    desc: 'Children learn best when they\'re having fun. Every lesson in the Early Years package was paired with an original song written to help little ones remember what they\'ve learned — in the car, at bedtime, or just singing around the house. These are the songs your child already knows and loves from the course.',
    color: '#16A34A',
    gradFrom: '#dcfce7',
    gradTo: '#f0fdf4',
    border: '#bbf7d0',
    emoji: '🌱',
    tag: 'Ages 4–7',
    topics: 'Road and outdoor safety, anti-bullying, online safety, stranger danger, body safety and saying no, fire safety and home emergencies',
    cta: 'Perfect for the car, the kitchen, bedtime — learning never stops.',
    sampleSong: null,
    courseIds: ['c26', 'c27', 'c28', 'c29', 'c30', 'c35'],
  },
  'growing-junior': {
    name: 'Growing Minds: Junior',
    subtitle: 'Complete Song Collection',
    songs: 28,
    desc: 'The lessons don\'t have to end when the screen closes. Every course in the Junior package came with its own original songs — upbeat, catchy tracks that reinforce everything your child learned. Let them keep listening, keep singing, and keep learning.',
    color: '#15803D',
    gradFrom: '#d1fae5',
    gradTo: '#ecfdf5',
    border: '#a7f3d0',
    emoji: '🌿',
    tag: 'Ages 8–11',
    topics: 'Anti-bullying, online safety and screen time, stranger danger, body safety and saying no, emotional wellbeing and mental health, fire safety, and personal safety and awareness',
    cta: 'Upbeat enough they\'ll choose to listen — meaningful enough to matter.',
    sampleSong: null,
    courseIds: ['c1', 'c2', 'c3', 'c4', 'c5', 'c36', 'c39'],
  },
  'street': {
    name: 'Street Smart',
    subtitle: 'Complete Song Collection',
    songs: 24,
    desc: 'Safety messages hit differently when they come through music. Every lesson in Street Smart was paired with a powerful original track — written for teenagers, in a style they\'ll actually listen to. Keep the songs, keep the lessons close.',
    color: '#DC2626',
    gradFrom: '#fee2e2',
    gradTo: '#fff1f2',
    border: '#fecaca',
    emoji: '🥷',
    tag: 'Ages 12–17',
    topics: 'Personal safety and awareness, online safety and social media, healthy relationships and boundaries, peer pressure and substance awareness, mental health and emotional wellbeing, and weapons awareness',
    cta: 'Real music with real messages — not patronising, not preachy.',
    sampleSong: null,
    courseIds: ['c31', 'c32', 'c33', 'c34', 'c37', 'c38'],
  },
}

export default function BuyMusicPage() {
  const params = useParams()
  const supabase = createClient()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(false)
  const [region, setRegion] = useState('US')
  const [authChecked, setAuthChecked] = useState(false)

  const product = PRODUCTS[params.productId]
  const priceDisplay = product ? (getMusicPrice(params.productId, region) || getMusicPrice(params.productId, 'US')) : null

  // Count available sample songs for this product
  const sampleSongs = product ? product.courseIds.flatMap(cid => {
    const courseSongs = SONGS[cid]
    return courseSongs ? Object.entries(courseSongs).slice(0, 1).map(([key, song]) => ({
      src: getAudioUrl(cid, key),
      title: song.title,
      subtitle: product.name,
    })) : []
  }).slice(0, 1) : []

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data?.user || null)
      setAuthChecked(true)
    })
    // 1. Try the pricing_region cookie (set by middleware via Vercel geo headers)
    const cookie = document.cookie.split(';').find(c => c.trim().startsWith('pricing_region='))
    if (cookie) {
      const val = cookie.split('=')[1]?.trim()
      if (val && val !== 'US') { setRegion(val); return }
      // If cookie says US, double-check with browser locale in case geo failed
    }
    // 2. Fallback: infer region from browser locale / timezone
    try {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || ''
      const lang = navigator.language || ''
      if (tz.startsWith('Europe/London') || lang.startsWith('en-GB')) setRegion('GB')
      else if (tz.startsWith('Europe/') || lang.match(/^(de|fr|es|it|nl|pt|pl|sv|da|fi|no|cs|el|hu|ro|bg|hr|sk|sl|et|lv|lt)/)) setRegion('EU')
      else if (tz.startsWith('Australia/') || lang.startsWith('en-AU')) setRegion('AU')
      else if (tz.startsWith('Pacific/Auckland') || lang.startsWith('en-NZ')) setRegion('NZ')
      else if (tz.startsWith('America/') && (lang.startsWith('en-CA') || lang.startsWith('fr-CA'))) setRegion('CA')
      // else stays US (default)
    } catch (_) { /* Intl not available, keep US default */ }
  }, [])

  const handleBuy = async () => {
    if (!user) return
    setLoading(true)
    try {
      const res = await fetch('/api/checkout-music', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.id,
          email: user.email,
          productId: params.productId,
          productName: product.name + ' — ' + product.subtitle,
          region,
        }),
      })
      const data = await res.json()
      if (data.url) window.location.href = data.url
    } catch (err) {
      console.error('Checkout error:', err)
    }
    setLoading(false)
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-navy/50 mb-4">Product not found.</p>
          <Link href="/library" className="btn-primary">Back to My Courses</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="page-enter min-h-screen" style={{ background: `linear-gradient(180deg, ${product.gradFrom} 0%, #ffffff 40%, #F0F4F8 100%)` }}>
      <div className="max-w-2xl mx-auto px-6 py-16">

        {/* Header */}
        <div className="text-center mb-12">
          <div className="chip mb-4" style={{ background: product.color + '14', color: product.color, border: `1px solid ${product.color}30` }}>
            🎵 {product.tag} · {product.songs} Songs
          </div>
          <h1 className="font-serif text-4xl md:text-5xl text-navy mb-3">
            {product.name}
          </h1>
          <p className="text-navy/50 text-lg max-w-md mx-auto">
            {product.subtitle}
          </p>
        </div>

        {/* Main purchase card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-6" style={{ border: `1px solid ${product.border}` }}>

          {/* Gradient accent bar */}
          <div className="h-1.5" style={{ background: `linear-gradient(to right, ${product.color}, ${product.color}60)` }} />

          <div className="p-8 md:p-10">

            {/* Description */}
            <p className="text-navy/65 text-[17px] leading-relaxed mb-8">
              {product.desc}
            </p>

            {/* What's included */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="text-center p-4 rounded-xl" style={{ background: product.color + '08' }}>
                <p className="font-serif text-3xl text-navy mb-1">{product.songs}</p>
                <p className="text-navy/40 text-xs font-medium">Original Songs</p>
              </div>
              <div className="text-center p-4 rounded-xl" style={{ background: product.color + '08' }}>
                <p className="font-serif text-3xl text-navy mb-1">🎧</p>
                <p className="text-navy/40 text-xs font-medium">Play Anywhere</p>
              </div>
              <div className="text-center p-4 rounded-xl" style={{ background: product.color + '08' }}>
                <p className="font-serif text-3xl text-navy mb-1">∞</p>
                <p className="text-navy/40 text-xs font-medium">Keep Forever</p>
              </div>
            </div>

            {/* What these songs are */}
            <div className="rounded-xl p-5 mb-8" style={{ background: product.color + '08', border: `1px solid ${product.color}15` }}>
              <p className="text-navy/70 text-[15px] leading-relaxed">{product.songs} educational songs packed with important safety knowledge — designed to help children feel confident, stay safe, and remember what matters most.</p>
            </div>

            <p className="text-navy/50 text-sm text-center italic mb-8">{product.cta}</p>

            {/* Divider */}
            <div className="border-t border-gray-100 my-8" />

            {/* Price + Buy */}
            <div className="text-center">
              <p className="text-navy/40 text-sm font-medium mb-2">One-time purchase</p>
              <p className="font-serif text-5xl text-navy mb-1">{priceDisplay}</p>
              <p className="text-navy/30 text-xs mb-6">Instant download after payment</p>

              {authChecked && !user && (
                <div className="mb-5 p-4 rounded-xl border border-amber-200 bg-amber-50/60">
                  <p className="text-amber-800 text-sm">
                    Please <Link href="/login" className="font-semibold underline hover:text-amber-900 transition">log in</Link> to your account to purchase.
                  </p>
                </div>
              )}

              <button
                onClick={handleBuy}
                disabled={loading || !user}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-12 py-4 rounded-xl text-white font-bold text-lg shadow-lg transition-all duration-200 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100"
                style={{ background: `linear-gradient(135deg, ${product.color}, ${product.color}CC)` }}
              >
                {loading ? (
                  <span className="animate-spin w-5 h-5 border-2 border-white/30 border-t-white rounded-full" />
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                )}
                {loading ? 'Preparing Checkout...' : 'Get the Music'}
              </button>

              <p className="text-navy/25 text-xs mt-4 flex items-center justify-center gap-1.5">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                Secure payment via Stripe · Card &amp; PayPal accepted
              </p>
            </div>
          </div>
        </div>

        {/* Sample song player */}
        {sampleSongs.length > 0 && (
          <div className="bg-white/80 backdrop-blur rounded-2xl border border-gray-100 p-5 mb-6">
            <p className="text-navy/40 text-xs font-semibold uppercase tracking-wider mb-3">Preview a Song</p>
            <AudioPlayer
              src={sampleSongs[0].src}
              title={sampleSongs[0].title}
              subtitle={sampleSongs[0].subtitle}
            />
          </div>
        )}

        {/* Back */}
        <div className="text-center mt-8">
          <Link href="/library" className="text-navy/40 hover:text-navy/60 text-sm font-medium transition-colors">
            ← Back to My Courses
          </Link>
        </div>
      </div>
    </div>
  )
}

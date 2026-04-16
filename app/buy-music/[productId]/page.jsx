'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'
import { getMusicPrice } from '@/lib/pricing'

const PRODUCTS = {
  'growing-early': {
    name: 'Growing Minds: Early Years',
    songs: 31,
    lessons: 6,
    color: '#16A34A',
    emoji: '🌱',
    desc: 'Complete song collection from Growing Minds: Early Years (ages 4-7). Includes all lesson songs and remember-this songs from every course.',
    features: [
      '6 courses worth of original songs',
      'All lesson songs included',
      'Remember This songs for each course',
      'Download once, keep forever',
      'Play on any device',
    ],
  },
  'growing-junior': {
    name: 'Growing Minds: Junior',
    songs: 28,
    lessons: 7,
    color: '#15803D',
    emoji: '🌿',
    desc: 'Complete song collection from Growing Minds: Junior (ages 8-11). All songs your child already knows from the course, now yours to keep.',
    features: [
      '7 courses worth of original songs',
      'All lesson songs included',
      'Remember This songs for each course',
      'Download once, keep forever',
      'Play on any device',
    ],
  },
  'street': {
    name: 'Street Smart',
    songs: 24,
    lessons: 6,
    color: '#DC2626',
    emoji: '🥷',
    desc: 'Complete song collection from Street Smart (ages 12-17). Powerful, memorable melodies written specifically for teenagers.',
    features: [
      '6 courses worth of original songs',
      'All lesson songs included',
      'Remember This songs for each course',
      'Download once, keep forever',
      'Play on any device',
    ],
  },
  'aging': {
    name: 'Aging Wisdom',
    songs: 20,
    lessons: 5,
    color: '#E11D48',
    emoji: '💐',
    desc: 'Complete song collection from Aging Wisdom (60+). Warm, thoughtful melodies that reinforce every lesson learned.',
    features: [
      '5 courses worth of original songs',
      'All lesson songs included',
      'Remember This songs for each course',
      'Download once, keep forever',
      'Play on any device',
    ],
  },
}

export default function BuyMusicPage() {
  const params = useParams()
  const router = useRouter()
  const supabase = createClient()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [region, setRegion] = useState('US')

  const productId = params.productId
  const product = PRODUCTS[productId]

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user: u } } = await supabase.auth.getUser()
      setUser(u)
      if (!u) router.push('/login')
    }
    checkAuth()

    // Detect region
    try {
      const cookie = document.cookie.split(';').find(c => c.trim().startsWith('pricing_region='))
      if (cookie) {
        const val = cookie.split('=')[1]?.trim()
        if (val && val !== 'US') { setRegion(val); return }
      }
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
  }, [])

  const handleBuyNow = async () => {
    if (!user || !product) return
    setLoading(true)
    setError(null)

    try {
      const res = await fetch('/api/checkout-music', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.id,
          email: user.email,
          productId,
          productName: product.name + ' — Complete Song Collection',
          region,
        }),
      })
      const data = await res.json()
      if (data.url) {
        window.location.href = data.url
      } else {
        setError(data.error || 'Something went wrong. Please try again.')
      }
    } catch (err) {
      console.error('Checkout error:', err)
      setError('Unable to connect to checkout. Please try again.')
    }
    setLoading(false)
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-navy/50 mb-4">Product not found.</p>
          <Link href="/packages" className="btn-primary">Back to Packages</Link>
        </div>
      </div>
    )
  }

  const price = getMusicPrice(productId, region) || getMusicPrice(productId, 'US')

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50">
      <div className="max-w-4xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <Link href="/packages" className="text-navy/50 hover:text-navy text-sm mb-4 inline-block">
            Back to Packages
          </Link>
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-6 shadow-lg" style={{ background: `linear-gradient(135deg, ${product.color}20, ${product.color}40)` }}>
            <span className="text-4xl">{product.emoji}</span>
          </div>
          <h1 className="font-serif text-4xl md:text-5xl text-navy mb-4">
            {product.name}
          </h1>
          <p className="text-xl text-navy/60 max-w-2xl mx-auto">
            {product.desc}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 mb-16">
          {/* Details */}
          <div>
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 mb-6">
              <div className="mb-8">
                <div className="flex items-baseline gap-1 mb-2">
                  <span className="text-5xl font-bold text-navy">{price}</span>
                  <span className="text-navy/40">/ one-time</span>
                </div>
                <p className="text-navy/50 text-sm">Download immediately after purchase. Keep forever.</p>
              </div>

              <button
                onClick={handleBuyNow}
                disabled={loading || !user}
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl text-white font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
                style={{ background: `linear-gradient(135deg, ${product.color}, ${product.color}DD)` }}
              >
                {loading ? (
                  <>
                    <span className="animate-spin w-5 h-5 border-2 border-white/30 border-t-white rounded-full" />
                    Preparing Checkout...
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    Buy Now
                  </>
                )}
              </button>

              {error && (
                <div className="mt-4 bg-red-50 border border-red-100 rounded-lg px-4 py-3">
                  <p className="text-red-600 text-sm">{error}</p>
                </div>
              )}

              <p className="text-navy/30 text-xs mt-4 flex items-center gap-1 justify-center">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                Secure checkout via Stripe
              </p>
            </div>
          </div>

          {/* What you get */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
            <h2 className="font-serif text-2xl text-navy mb-6">What You Get</h2>

            <div className="space-y-4 mb-8">
              <div className="flex gap-3">
                <div className="text-2xl font-bold text-navy w-8 flex-shrink-0">{product.songs}</div>
                <div>
                  <p className="font-semibold text-navy">Original Songs</p>
                  <p className="text-navy/60 text-sm">From {product.lessons} complete courses</p>
                </div>
              </div>
              <div className="h-px bg-gray-100" />
            </div>

            <h3 className="font-semibold text-navy mb-4">Features</h3>
            <ul className="space-y-3">
              {product.features.map((feature, i) => (
                <li key={i} className="flex gap-3">
                  <svg className="w-5 h-5 text-teal flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-navy/70">{feature}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-100">
              <p className="text-blue-900 text-sm">
                <strong>All in MP3 format</strong> — compatible with phones, tablets, computers, and car audio systems.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center">
          <p className="text-navy/50">
            Have questions? <Link href="/contact" className="text-teal hover:underline">Contact us</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

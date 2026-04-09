'use client'

import { Suspense, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'

const PRODUCT_NAMES = {
  'growing-early': 'Growing Minds: Early Years Songs',
  'growing-junior': 'Growing Minds: Junior Songs',
  'street': 'Street Smart Songs',
}

const PRODUCT_TRACK_COUNTS = {
  'growing-early': 31,
  'growing-junior': 28,
  'street': 24,
}

function MusicSuccessContent() {
  const searchParams = useSearchParams()
  const productId = searchParams.get('product')
  const [downloading, setDownloading] = useState(false)
  const [error, setError] = useState(null)

  const productName = PRODUCT_NAMES[productId] || 'Your Music Collection'
  const trackCount = PRODUCT_TRACK_COUNTS[productId] || 0

  async function handleDownload() {
    setDownloading(true)
    setError(null)
    try {
      // The API verifies the purchase then redirects to the file
      window.location.href = `/api/music-download?product=${encodeURIComponent(productId)}`
      // Give it a moment before re-enabling the button
      setTimeout(() => setDownloading(false), 3000)
    } catch (err) {
      setError('Download failed — please try again.')
      setDownloading(false)
    }
  }

  if (!productId || !PRODUCT_NAMES[productId]) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-amber-50 to-white px-4">
        <div className="text-center max-w-md">
          <h1 className="text-2xl font-serif text-navy mb-2">Something went wrong</h1>
          <p className="text-navy/60 mb-6">We couldn't identify which music collection to download.</p>
          <Link href="/library" className="inline-block bg-navy text-white px-6 py-3 rounded-xl font-semibold hover:bg-navy/90 transition">
            Back to Library
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-white to-white">
      <div className="max-w-lg mx-auto px-4 py-16 text-center">
        {/* Music icon */}
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-amber-100 mb-6">
          <svg className="w-10 h-10 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
          </svg>
        </div>

        <h1 className="font-serif text-3xl text-navy mb-2">Thank You for Your Purchase!</h1>
        <p className="text-navy/60 text-lg mb-1">{productName}</p>
        <p className="text-navy/40 mb-8">{trackCount} songs included</p>

        {/* Single download button */}
        <button
          onClick={handleDownload}
          disabled={downloading}
          className="inline-flex items-center gap-3 bg-amber-500 hover:bg-amber-600 disabled:bg-amber-400 text-white px-10 py-4 rounded-2xl font-semibold text-lg transition shadow-lg shadow-amber-500/20"
        >
          {downloading ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-white" />
              Starting download...
            </>
          ) : (
            <>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Download Your Songs
            </>
          )}
        </button>

        {error && (
          <div className="mt-4 bg-red-50 border border-red-100 rounded-xl px-4 py-3">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

        {/* Helpful info */}
        <div className="mt-10 space-y-4 text-left max-w-sm mx-auto">
          <div className="bg-white rounded-xl border border-gray-100 p-4 flex gap-3">
            <div className="text-amber-500 mt-0.5 flex-shrink-0">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
            <p className="text-navy/60 text-sm">Songs you can play on any device — phone, tablet, computer, or in the car.</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-100 p-4 flex gap-3">
            <div className="text-amber-500 mt-0.5 flex-shrink-0">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </div>
            <p className="text-navy/60 text-sm">You can come back to this page anytime from your library to download again.</p>
          </div>
        </div>

        <div className="mt-8">
          <Link href="/library" className="text-amber-600 hover:text-amber-700 font-semibold transition">
            ← Back to Library
          </Link>
        </div>
      </div>
    </div>
  )
}

export default function MusicSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-amber-50 to-white">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-amber-500" />
      </div>
    }>
      <MusicSuccessContent />
    </Suspense>
  )
}

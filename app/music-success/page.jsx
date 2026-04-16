'use client'

import { Suspense } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

const PRODUCT_NAMES = {
  'growing-early': 'Growing Minds: Early Years',
  'growing-junior': 'Growing Minds: Junior',
  'street': 'Street Smart',
  'nest': 'Nest Breaking',
  'roaming': 'Roaming Free',
  'aging': 'Aging Wisdom',
  'parents': 'Family Anchor',
}

function MusicSuccessContent() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get('session_id')
  const productId = searchParams.get('product')
  const productName = PRODUCT_NAMES[productId] || 'Song Collection'

  // Build download URL with both product and session_id for verification
  const downloadHref = productId && sessionId
    ? `/api/music-download?product=${encodeURIComponent(productId)}&session_id=${encodeURIComponent(sessionId)}`
    : null

  return (
    <main className="min-h-screen bg-slate flex items-center justify-center px-4">
      <div className="max-w-lg w-full text-center">
        {/* Success Icon */}
        <div className="mb-8">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="font-serif text-4xl text-navy mb-2">Purchase Successful!</h1>
          <p className="text-lg text-navy/60">
            Your <strong className="text-navy">{productName}</strong> songs are ready to download.
          </p>
        </div>

        {/* Download Card */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 mb-8">
          <div className="text-4xl mb-4">🎵</div>
          <p className="text-navy/70 mb-6">
            Click the button below to download your song files. You can play them on any device — phone, tablet, computer, or in the car.
          </p>

          <div className="space-y-3">
            {downloadHref && (
              <a
                href={downloadHref}
                className="btn-primary justify-center w-full text-center"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Download Music Files
              </a>
            )}
            <Link href="/library" className="btn-ghost justify-center w-full text-center">
              Back to My Courses
            </Link>
          </div>
        </div>

        {/* Help + email note */}
        <div className="space-y-2">
          <p className="text-navy/50 text-sm">
            We have also sent a confirmation email with your download link, so you can re-download any time.
          </p>
          <p className="text-navy/40 text-sm">
            Having trouble? <Link href="/contact" className="text-teal hover:underline">Contact support</Link>
          </p>
        </div>
      </div>
    </main>
  )
}

export default function MusicSuccessPage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen bg-slate flex items-center justify-center px-4">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-teal border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
          <p className="text-navy/50 text-sm">Loading...</p>
        </div>
      </main>
    }>
      <MusicSuccessContent />
    </Suspense>
  )
}

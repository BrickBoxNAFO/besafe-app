'use client'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'

const PRODUCT_NAMES = {
  'growing-early': 'Growing Minds: Early Years',
  'growing-junior': 'Growing Minds: Junior',
  'street': 'Street Smart',
  'nest': 'Nest Breaking',
  'roaming': 'Roaming Free',
  'aging': 'Aging Wisdom',
  'parents': 'Family Anchor',
}

function MusicCancelContent() {
  const searchParams = useSearchParams()
  const productId = searchParams.get('product')
  const productName = PRODUCT_NAMES[productId] || 'Song Collection'

  return (
    <div className="min-h-screen bg-slate flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="bg-white rounded-2xl border border-gray-100 p-10">
          <div className="text-5xl mb-6">🎵</div>
          <h1 className="font-serif text-3xl text-navy mb-3">Purchase Cancelled</h1>
          <p className="text-navy/60 leading-relaxed mb-2">
            No charge was made for <strong className="text-navy">{productName}</strong>.
          </p>
          <p className="text-navy/40 text-sm leading-relaxed mb-8">
            The songs will still be available if you change your mind — you can find them
            in your course library after completing the final course in the package.
          </p>
          <div className="flex flex-col gap-3">
            <Link href="/library" className="btn-primary justify-center">
              Back to My Courses
            </Link>
            <Link href="/packages" className="btn-ghost justify-center">
              Browse Packages
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function MusicCancelPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-slate flex items-center justify-center">
        <p className="text-navy/50">Loading...</p>
      </div>
    }>
      <MusicCancelContent />
    </Suspense>
  )
}

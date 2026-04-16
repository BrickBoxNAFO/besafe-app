'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function PurchaseModal({ packageId, packageName, price, regionCode, onClose }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handlePurchase = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/create-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ packageId, regionCode }),
      })
      const data = await res.json()
      if (data.url) {
        window.location.href = data.url
      } else {
        alert(data.error || 'Something went wrong. Please try again.')
        setLoading(false)
      }
    } catch {
      alert('Network error. Please try again.')
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div
        className="relative bg-[#1a1a2e] border border-white/10 rounded-2xl p-6 max-w-sm w-full shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-white/40 hover:text-white/70 transition-colors">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor"><path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" /></svg>
        </button>

        <h3 className="text-white text-lg font-semibold mb-1">Purchase {packageName}</h3>
        <p className="text-white/50 text-sm mb-6">One-time payment — lifetime access to all courses and songs in this package.</p>

        <div className="flex items-center justify-between mb-6 p-3 rounded-xl bg-white/5 border border-white/10">
          <span className="text-white/70 text-sm">Total</span>
          <span className="text-white text-xl font-bold">{typeof price === 'number' ? `$${price.toFixed(2)}` : price}</span>
        </div>

        <button
          onClick={handlePurchase}
          disabled={loading}
          className="w-full bg-teal hover:bg-teal/90 disabled:opacity-50 text-white font-semibold rounded-xl px-6 py-3 transition-colors"
        >
          {loading ? 'Redirecting to checkout...' : 'Proceed to Checkout'}
        </button>

        <p className="text-white/30 text-xs text-center mt-3">Secure payment via Stripe</p>
      </div>
    </div>
  )
}

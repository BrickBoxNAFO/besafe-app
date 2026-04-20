'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

/**
 * Purchase modal.
 *
 * For the Family Safety Bundle and Complete Library (packageId === 'bundle' |
 * 'complete') we skip the assign-mode chooser and go straight to Stripe —
 * those packages are always multi-seat via the Family Dashboard.
 *
 * For any other single package, we first ask whether the buyer wants to:
 *   - Assign to myself (default)
 *   - Gift it now (enter recipient email)
 *   - Assign later (buy the seat and manage from the dashboard)
 *
 * The chosen mode is passed to /api/create-checkout as `assignMode`.
 */
export default function PurchaseModal({ packageId, packageName, price, regionCode, onClose }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [mode, setMode] = useState('self')
  const [recipientEmail, setRecipientEmail] = useState('')
  const [recipientName, setRecipientName] = useState('')
  const [error, setError] = useState(null)

  const isAggregate = packageId === 'bundle' || packageId === 'complete'

  const handlePurchase = async () => {
    setError(null)
    if (!isAggregate && mode === 'gift' && !recipientEmail) {
      setError('Please enter the recipient\'s email address.')
      return
    }
    setLoading(true)
    try {
      const res = await fetch('/api/create-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          packageId,
          regionCode,
          assignMode: isAggregate ? 'self' : mode,
          recipientEmail: (!isAggregate && mode === 'gift') ? recipientEmail : '',
          recipientName: (!isAggregate && mode === 'gift') ? recipientName : '',
        }),
      })
      const data = await res.json()
      if (data.url) {
        window.location.href = data.url
      } else if (res.status === 401 || data.error === 'Unauthorised') {
        onClose()
        router.push('/login?redirect=/packages&message=Please sign in to complete your purchase')
      } else {
        setError(data.error || 'Something went wrong. Please try again.')
        setLoading(false)
      }
    } catch {
      setError('Network error. Please try again.')
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div
        className="relative bg-[#1a1a2e] border border-white/10 rounded-2xl p-6 max-w-md w-full shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-white/40 hover:text-white/70 transition-colors">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor"><path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" /></svg>
        </button>

        <h3 className="text-white text-lg font-semibold mb-1">Purchase {packageName}</h3>
        <p className="text-white/50 text-sm mb-5">One-time payment. Lifetime access to all courses and songs in this package.</p>

        {!isAggregate && (
          <div className="mb-5">
            <p className="text-white/80 text-sm font-semibold mb-3">Who is this package for?</p>
            <div className="space-y-2">
              {[
                { id: 'self',  label: 'Assign to myself',       desc: 'Instant access on your dashboard' },
                { id: 'gift',  label: 'Gift to someone else',   desc: 'They receive an email invite to claim it' },
                { id: 'later', label: 'Assign later',           desc: 'Seat appears on your dashboard, assign whenever you are ready' },
              ].map(opt => (
                <label
                  key={opt.id}
                  className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-colors ${
                    mode === opt.id
                      ? 'bg-teal/15 border-teal/50'
                      : 'bg-white/5 border-white/10 hover:bg-white/10'
                  }`}
                >
                  <input
                    type="radio"
                    name="assign-mode"
                    value={opt.id}
                    checked={mode === opt.id}
                    onChange={() => setMode(opt.id)}
                    className="mt-1 accent-teal"
                  />
                  <div className="flex-1">
                    <p className="text-white text-sm font-medium">{opt.label}</p>
                    <p className="text-white/50 text-xs">{opt.desc}</p>
                  </div>
                </label>
              ))}
            </div>
          </div>
        )}

        {!isAggregate && mode === 'gift' && (
          <div className="mb-5 space-y-2">
            <input
              type="email"
              placeholder="Recipient email"
              value={recipientEmail}
              onChange={e => setRecipientEmail(e.target.value)}
              className="w-full text-sm px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:border-teal/50 focus:outline-none"
            />
            <input
              type="text"
              placeholder="Recipient name (optional)"
              value={recipientName}
              onChange={e => setRecipientName(e.target.value)}
              className="w-full text-sm px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:border-teal/50 focus:outline-none"
            />
            <p className="text-white/40 text-xs">
              We will email them a personal invitation once payment is confirmed. You will also receive their certificate when they complete the package.
            </p>
          </div>
        )}

        <div className="flex items-center justify-between mb-5 p-3 rounded-xl bg-white/5 border border-white/10">
          <span className="text-white/70 text-sm">Total</span>
          <span className="text-white text-xl font-bold">{typeof price === 'number' ? `$${price.toFixed(2)}` : price}</span>
        </div>

        {error && <p className="text-red-400 text-xs mb-3">{error}</p>}

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

'use client'

import { useState, useEffect } from 'react'

export default function PurchaseModal({ packageId, packageName, price, onClose, regionCode }) {
  const [step, setStep] = useState('choice')  // 'choice' | 'gift'

  // Lock body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])
  const [giftName, setGiftName] = useState('')
  const [giftEmail, setGiftEmail] = useState('')
  const [giftEmailConfirm, setGiftEmailConfirm] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSelfPurchase = async () => {
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/create-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ packageId, region: regionCode, purchaseType: 'self' }),
      })
      const data = await res.json()
      if (data.url) {
        window.location.href = data.url
      } else {
        setError(data.error || 'Something went wrong')
        setLoading(false)
      }
    } catch {
      setError('Something went wrong. Please try again.')
      setLoading(false)
    }
  }

  const handleGiftPurchase = async () => {
    if (!giftEmail) { setError('Please enter the recipient\'s email address.'); return }
    if (giftEmail !== giftEmailConfirm) { setError('Email addresses do not match.'); return }
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/create-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          packageId,
          region: regionCode,
          purchaseType: 'gift',
          giftRecipientName: giftName || '',
          giftRecipientEmail: giftEmail,
        }),
      })
      const data = await res.json()
      if (data.url) {
        window.location.href = data.url
      } else {
        setError(data.error || 'Something went wrong')
        setLoading(false)
      }
    } catch {
      setError('Something went wrong. Please try again.')
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0" style={{ zIndex: 9999 }}>
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      {/* Centering wrapper */}
      <div className="absolute inset-0 flex items-center justify-center p-4 pointer-events-none">
        <div className="relative bg-white rounded-2xl max-w-md w-full shadow-2xl overflow-hidden pointer-events-auto max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className="bg-gradient-to-r from-navy to-navy/90 px-6 py-5">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-serif text-xl text-white">Purchase {packageName}</h2>
              <p className="text-white/50 text-sm mt-0.5">{price} · one-time payment</p>
            </div>
            <button onClick={onClose} className="text-white/50 hover:text-white transition-colors" aria-label="Close">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>
        </div>

        <div className="p-6">
          {/* Step 1: Choice */}
          {step === 'choice' && (
            <div className="space-y-3">
              <p className="text-navy/70 text-sm mb-4">Who is this package for?</p>

              <button
                onClick={handleSelfPurchase}
                disabled={loading}
                className="w-full flex items-center gap-4 p-4 rounded-xl border-2 border-gray-200 hover:border-teal hover:bg-teal/5 transition-all text-left disabled:opacity-60"
              >
                <div className="w-12 h-12 rounded-xl bg-teal/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl">👤</span>
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-navy text-sm">For myself</div>
                  <div className="text-navy/50 text-xs mt-0.5">Unlock the course on my account immediately after payment</div>
                </div>
                {loading && step === 'choice' && (
                  <div className="w-5 h-5 border-2 border-teal border-t-transparent rounded-full animate-spin flex-shrink-0" />
                )}
              </button>

              <button
                onClick={() => setStep('gift')}
                disabled={loading}
                className="w-full flex items-center gap-4 p-4 rounded-xl border-2 border-gray-200 hover:border-orange hover:bg-orange/5 transition-all text-left disabled:opacity-60"
              >
                <div className="w-12 h-12 rounded-xl bg-orange/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl">🎁</span>
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-navy text-sm">As a gift for someone else</div>
                  <div className="text-navy/50 text-xs mt-0.5">We'll send them an invite email after your payment</div>
                </div>
              </button>
            </div>
          )}

          {/* Step 2: Gift details */}
          {step === 'gift' && (
            <div>
              <button onClick={() => { setStep('choice'); setError('') }} className="flex items-center gap-1 text-sm text-navy/50 hover:text-navy mb-4 transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                Back
              </button>

              <div className="flex items-center gap-3 mb-5">
                <span className="text-2xl">🎁</span>
                <div>
                  <h3 className="font-semibold text-navy text-sm">Gift this package</h3>
                  <p className="text-navy/50 text-xs">Enter the details of the person you'd like to gift this to</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-navy/70 mb-1">Recipient's name <span className="text-navy/30">(optional)</span></label>
                  <input
                    type="text"
                    value={giftName}
                    onChange={e => setGiftName(e.target.value)}
                    placeholder="e.g. Sarah"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-navy focus:outline-none focus:border-teal focus:ring-1 focus:ring-teal/30"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-navy/70 mb-1">Recipient's email address <span className="text-red-400">*</span></label>
                  <input
                    type="email"
                    value={giftEmail}
                    onChange={e => setGiftEmail(e.target.value)}
                    placeholder="e.g. sarah@example.com"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-navy focus:outline-none focus:border-teal focus:ring-1 focus:ring-teal/30"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-navy/70 mb-1">Confirm email address <span className="text-red-400">*</span></label>
                  <input
                    type="email"
                    value={giftEmailConfirm}
                    onChange={e => setGiftEmailConfirm(e.target.value)}
                    placeholder="Re-enter their email"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-navy focus:outline-none focus:border-teal focus:ring-1 focus:ring-teal/30"
                    required
                  />
                </div>

                <div className="bg-amber-50 border border-amber-200/60 rounded-xl p-3">
                  <p className="text-xs text-amber-800 leading-relaxed">
                    <strong>How it works:</strong> After payment, we'll email the recipient an invite link. They'll create a free account (or log into their existing one) and the course unlocks instantly. It's completely free for them. Please ask them to check their spam folder if the email doesn't arrive.
                  </p>
                </div>

                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-2.5">
                    <p className="text-red-700 text-sm">{error}</p>
                  </div>
                )}

                <button
                  onClick={handleGiftPurchase}
                  disabled={loading}
                  className="w-full bg-teal hover:bg-teal/90 text-white font-semibold rounded-xl px-6 py-3 text-center transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Redirecting to checkout…
                    </>
                  ) : (
                    `Continue to Payment — ${price}`
                  )}
                </button>
              </div>
            </div>
          )}

          {/* Error for self-purchase */}
          {step === 'choice' && error && (
            <div className="mt-3 bg-red-50 border border-red-200 rounded-xl px-4 py-2.5">
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}
        </div>
      </div>
      </div>
    </div>
  )
}

'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'

export default function AssignSeatPage() {
  const router = useRouter()
  const params = useParams()
  const seatId = params.seatId

  const [step, setStep] = useState('choice') // 'choice' | 'invite' | 'done_self' | 'done_invite'
  const [email, setEmail] = useState('')
  const [emailConfirm, setEmailConfirm] = useState('')
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [seatInfo, setSeatInfo] = useState(null)
  const [loadingSeat, setLoadingSeat] = useState(true)

  useEffect(() => {
    fetch('/api/seat-info?seatId=' + seatId)
      .then(r => r.json())
      .then(data => { setSeatInfo(data); setLoadingSeat(false) })
      .catch(() => setLoadingSeat(false))
  }, [seatId])

  const handleSelfAssign = async () => {
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/assign-seat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ seatId, assignType: 'self' }),
      })
      const data = await res.json()
      if (!res.ok) { setError(data.error || 'Failed to assign'); setLoading(false) }
      else setStep('done_self')
    } catch { setError('Something went wrong. Please try again.'); setLoading(false) }
  }

  const handleInvite = async () => {
    if (!email) { setError('Please enter the recipient\'s email address.'); return }
    if (email !== emailConfirm) { setError('Email addresses do not match.'); return }
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/assign-seat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ seatId, assignType: 'invite', inviteEmail: email, memberName: name }),
      })
      const data = await res.json()
      if (!res.ok) { setError(data.error || 'Failed to send invite'); setLoading(false) }
      else setStep('done_invite')
    } catch { setError('Something went wrong. Please try again.'); setLoading(false) }
  }

  if (loadingSeat) return (
    <div className="page-enter min-h-screen bg-slate flex items-center justify-center">
      <div className="w-8 h-8 border-3 border-teal border-t-transparent rounded-full animate-spin" />
    </div>
  )

  if (!seatInfo || seatInfo.error) return (
    <div className="page-enter min-h-screen bg-slate">
      <div className="max-w-lg mx-auto px-6 py-20 text-center">
        <div className="text-5xl mb-4">😕</div>
        <h1 className="font-serif text-3xl text-navy mb-3">Seat Not Found</h1>
        <p className="text-navy/50 mb-6">This seat may have already been assigned or doesn't belong to your account.</p>
        <Link href="/dashboard" className="btn-primary">Back to Dashboard</Link>
      </div>
    </div>
  )

  const packageName = seatInfo.packageName || 'Package'
  const packageEmoji = seatInfo.packageEmoji || '📦'

  // Done states
  if (step === 'done_self') return (
    <div className="page-enter min-h-screen bg-slate">
      <div className="hero-bg noise relative py-14 overflow-hidden">
        <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
          <div className="text-6xl mb-4">🎉</div>
          <h1 className="font-serif text-4xl text-white mb-3">Course Unlocked!</h1>
          <p className="text-white/60 text-lg">{packageName} is now available on your dashboard.</p>
        </div>
      </div>
      <div className="max-w-lg mx-auto px-6 -mt-4 relative z-10 pb-20">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-lg p-8 text-center">
          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
          </div>
          <p className="text-navy/60 text-sm mb-6">Head to your dashboard to start learning at your own pace.</p>
          <Link href="/dashboard" className="btn-primary w-full justify-center block text-center py-3">Go to My Dashboard</Link>
        </div>
      </div>
    </div>
  )

  if (step === 'done_invite') return (
    <div className="page-enter min-h-screen bg-slate">
      <div className="hero-bg noise relative py-14 overflow-hidden">
        <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
          <div className="text-6xl mb-4">🎁</div>
          <h1 className="font-serif text-4xl text-white mb-3">Invite Sent!</h1>
          <p className="text-white/60 text-lg">We've emailed {email} with their invite link.</p>
        </div>
      </div>
      <div className="max-w-lg mx-auto px-6 -mt-4 relative z-10 pb-20">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-lg p-8 text-center">
          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
          </div>
          <p className="text-navy/60 text-sm mb-2">They'll create a free account and get instant access to {packageName}.</p>
          <p className="text-navy/40 text-xs mb-6">Ask them to check their spam folder if the email doesn't arrive.</p>
          <Link href="/dashboard" className="btn-primary w-full justify-center block text-center py-3">Back to Dashboard</Link>
        </div>
      </div>
    </div>
  )

  return (
    <div className="page-enter min-h-screen bg-slate">
      <div className="hero-bg noise relative py-14 overflow-hidden">
        <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
          <div className="text-6xl mb-4">{packageEmoji}</div>
          <h1 className="font-serif text-4xl text-white mb-3">Assign {packageName}</h1>
          <p className="text-white/60 text-lg">Who would you like to give this course to?</p>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-6 -mt-4 relative z-10 pb-20">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-lg overflow-hidden">
          <div className="p-6">
            {step === 'choice' && (
              <div className="space-y-3">
                <button
                  onClick={handleSelfAssign}
                  disabled={loading}
                  className="w-full flex items-center gap-4 p-4 rounded-xl border-2 border-gray-200 hover:border-teal hover:bg-teal/5 transition-all text-left disabled:opacity-60"
                >
                  <div className="w-12 h-12 rounded-xl bg-teal/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">👤</span>
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-navy text-sm">Assign to myself</div>
                    <div className="text-navy/50 text-xs mt-0.5">Unlock {packageName} on my account right now</div>
                  </div>
                  {loading && (
                    <div className="w-5 h-5 border-2 border-teal border-t-transparent rounded-full animate-spin flex-shrink-0" />
                  )}
                </button>

                <button
                  onClick={() => setStep('invite')}
                  disabled={loading}
                  className="w-full flex items-center gap-4 p-4 rounded-xl border-2 border-gray-200 hover:border-orange hover:bg-orange/5 transition-all text-left disabled:opacity-60"
                >
                  <div className="w-12 h-12 rounded-xl bg-orange/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">🎁</span>
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-navy text-sm">Send to someone else</div>
                    <div className="text-navy/50 text-xs mt-0.5">Email them an invite to create their free account</div>
                  </div>
                </button>

                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-2.5">
                    <p className="text-red-700 text-sm">{error}</p>
                  </div>
                )}
              </div>
            )}

            {step === 'invite' && (
              <div>
                <button onClick={() => { setStep('choice'); setError('') }} className="flex items-center gap-1 text-sm text-navy/50 hover:text-navy mb-4 transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                  Back
                </button>

                <div className="flex items-center gap-3 mb-5">
                  <span className="text-2xl">🎁</span>
                  <div>
                    <h3 className="font-semibold text-navy text-sm">Send {packageName} to someone</h3>
                    <p className="text-navy/50 text-xs">Enter the details of the person you'd like to invite</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-navy/70 mb-1">Their name <span className="text-navy/30">(optional)</span></label>
                    <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="e.g. Sarah"
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-navy focus:outline-none focus:border-teal focus:ring-1 focus:ring-teal/30" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-navy/70 mb-1">Their email address <span className="text-red-400">*</span></label>
                    <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="e.g. sarah@example.com"
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-navy focus:outline-none focus:border-teal focus:ring-1 focus:ring-teal/30" required />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-navy/70 mb-1">Confirm email address <span className="text-red-400">*</span></label>
                    <input type="email" value={emailConfirm} onChange={e => setEmailConfirm(e.target.value)} placeholder="Re-enter their email"
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-navy focus:outline-none focus:border-teal focus:ring-1 focus:ring-teal/30" required />
                  </div>

                  <div className="bg-amber-50 border border-amber-200/60 rounded-xl p-3">
                    <p className="text-xs text-amber-800 leading-relaxed">
                      <strong>How it works:</strong> We'll email the recipient an invite link. They'll create a free account (or log into their existing one) and the course unlocks instantly. It's completely free for them. Please ask them to check their spam folder if the email doesn't arrive.
                    </p>
                  </div>

                  {error && (
                    <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-2.5">
                      <p className="text-red-700 text-sm">{error}</p>
                    </div>
                  )}

                  <button
                    onClick={handleInvite}
                    disabled={loading}
                    className="w-full bg-teal hover:bg-teal/90 text-white font-semibold rounded-xl px-6 py-3 text-center transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Sending invite…
                      </>
                    ) : (
                      'Send Invite'
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="text-center mt-6">
          <Link href="/dashboard" className="text-sm text-navy/40 hover:text-navy transition-colors">
            Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  )
}

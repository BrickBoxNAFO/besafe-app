'use client'
import { Suspense, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { PACKAGES } from '@/lib/data'

function RegisterForm() {
  const searchParams = useSearchParams()
  const giftToken = searchParams.get('gift_token')
  const giftPackageId = searchParams.get('package')
  const giftPkg = giftPackageId ? PACKAGES.find(p => p.id === giftPackageId) : null

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [giftRedeemed, setGiftRedeemed] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleRegister = async (e) => {
    e.preventDefault()
    setError('')

    if (password !== confirm) { setError('Passwords do not match.'); return }
    if (password.length < 8) { setError('Password must be at least 8 characters.'); return }

    setLoading(true)
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      })
      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Something went wrong. Please try again.')
        setLoading(false)
      } else {
        // If this is a gift redemption, redeem the token now
        if (giftToken && data.userId) {
          try {
            const giftRes = await fetch('/api/redeem-gift', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ token: giftToken, userId: data.userId }),
            })
            if (giftRes.ok) setGiftRedeemed(true)
          } catch {
            // Gift redemption failed silently — user can still confirm email and contact support
          }
        }
        setLoading(false)
        setSuccess(true)
      }
    } catch {
      setError('Unable to connect. Please check your internet and try again.')
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen bg-slate flex items-center justify-center px-4">
        <div className="w-full max-w-md text-center">
          <div className="text-5xl mb-6">{giftRedeemed ? '🎁' : '📧'}</div>
          <h1 className="font-serif text-3xl text-navy mb-3">
            {giftRedeemed ? 'Gift redeemed!' : 'Check your email'}
          </h1>
          <p className="text-navy/60 mb-6">
            {giftRedeemed && giftPkg && (
              <><strong>{giftPkg.name}</strong> has been added to your account.<br /><br /></>
            )}
            We have sent a confirmation link to <strong>{email}</strong>.
            Click the link to activate your account, then sign in.
          </p>
          <Link href="/login" className="btn-primary inline-flex">Go to Sign In →</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <span style={{fontFamily:'Georgia,"Times New Roman",serif',fontWeight:'bold',fontSize:'1.55rem',letterSpacing:'-0.01em',lineHeight:1,display:'inline-block'}}><span style={{color:'#2B3480'}}>HomeSafe</span><span style={{color:'#E8703A'}}>Education</span></span>
          <h1 className="font-serif text-3xl text-navy mb-2">Create your account</h1>
          <p className="text-navy/50 text-sm">{giftToken ? 'Create an account to claim your gift.' : 'Free to create. Purchase packages when you\'re ready.'}</p>
        </div>

        {giftToken && giftPkg && (
          <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-5 mb-4 text-center">
            <div className="text-3xl mb-2">🎁</div>
            <p className="text-green-800 font-semibold text-sm">You have been gifted <strong>{giftPkg.name}</strong>!</p>
            <p className="text-green-700/70 text-xs mt-1">Create an account below to claim your gift.</p>
          </div>
        )}

        <div className="bg-white rounded-2xl border border-gray-100 p-8">
          {error && (
            <div className="bg-red-50 border border-red-100 text-red-700 text-sm rounded-xl p-4 mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-navy mb-1.5">Your name</label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                required
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-navy focus:outline-none focus:border-teal transition-colors"
                placeholder="Jane Smith"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-navy mb-1.5">Email address</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-navy focus:outline-none focus:border-teal transition-colors"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-navy mb-1.5">Password</label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-navy focus:outline-none focus:border-teal transition-colors"
                placeholder="Minimum 8 characters"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-navy mb-1.5">Confirm password</label>
              <input
                type="password"
                value={confirm}
                onChange={e => setConfirm(e.target.value)}
                required
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-navy focus:outline-none focus:border-teal transition-colors"
                placeholder="Repeat your password"
              />
            </div>
            <p className="text-xs text-navy/40 leading-relaxed">
              By creating an account you agree to our{' '}
              <Link href="/terms" className="text-teal hover:underline">Terms & Conditions</Link>
              {' '}and{' '}
              <Link href="/privacy" className="text-teal hover:underline">Privacy Policy</Link>.
            </p>
            <button type="submit" disabled={loading} className="btn-primary w-full justify-center py-3 disabled:opacity-60">
              {loading ? 'Creating account...' : 'Create Account →'}
            </button>
          </form>

          <p className="text-center text-sm text-navy/50 mt-6">
            Already have an account?{' '}
            <Link href="/login" className="text-teal font-medium hover:underline">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default function RegisterPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-slate flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-teal border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <RegisterForm />
    </Suspense>
  )
}

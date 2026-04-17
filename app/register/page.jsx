'use client'
import { useState, useCallback } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'
import TurnstileWidget from '@/components/TurnstileWidget'

export default function RegisterPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const [turnstileToken, setTurnstileToken] = useState(null)
  const router = useRouter()
  const supabase = createClient()

  const handleTurnstileVerify = useCallback((token) => setTurnstileToken(token), [])
  const handleTurnstileExpire = useCallback(() => setTurnstileToken(null), [])

  const handleRegister = async (e) => {
    e.preventDefault()
    setError('')

    if (password !== confirm) { setError('Passwords do not match.'); return }
    if (password.length < 8) { setError('Password must be at least 8 characters.'); return }
    if (!turnstileToken) { setError('Please complete the security check.'); return }

    setLoading(true)

    // Verify Turnstile token server-side before registration
    try {
      const verifyRes = await fetch('/api/turnstile/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ turnstileToken }),
      })
      if (!verifyRes.ok) {
        setError('Security check failed. Please try again.')
        setLoading(false)
        return
      }
    } catch {
      setError('Security check failed. Please try again.')
      setLoading(false)
      return
    }

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name },
        emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/dashboard`,
      },
    })

    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      setSuccess(true)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen bg-slate flex items-center justify-center px-4">
        <div className="w-full max-w-md text-center">
          <div className="text-5xl mb-6">📧</div>
          <h1 className="font-serif text-3xl text-navy mb-3">Check your email</h1>
          <p className="text-navy/60 mb-6">
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
          <div className="flex justify-center mb-6"><span style={{fontFamily:'Georgia,"Times New Roman",serif',fontWeight:'bold',fontSize:'1.7rem',letterSpacing:'-0.01em',lineHeight:1}}><span style={{color:'#2B3480'}}>HomeSafe</span><span style={{color:'#E8703A'}}>Education</span></span></div>
          <h1 className="font-serif text-3xl text-navy mb-2">Create your account</h1>
          <p className="text-navy/50 text-sm">Free to create. Purchase packages when you're ready.</p>
        </div>

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

            <TurnstileWidget
              onVerify={handleTurnstileVerify}
              onExpire={handleTurnstileExpire}
            />

            <button type="submit" disabled={loading || !turnstileToken} className="btn-primary w-full justify-center py-3 disabled:opacity-60">
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

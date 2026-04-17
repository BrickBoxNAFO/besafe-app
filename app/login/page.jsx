'use client'
import { useState, useCallback, Suspense } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'
import TurnstileWidget from '@/components/TurnstileWidget'

function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [turnstileToken, setTurnstileToken] = useState(null)
  const searchParams = useSearchParams()
  const redirect = searchParams.get('redirect') || '/dashboard'
  const supabase = createClient()

  const handleTurnstileVerify = useCallback((token) => setTurnstileToken(token), [])
  const handleTurnstileExpire = useCallback(() => setTurnstileToken(null), [])

  const handleLogin = async (e) => {
    e.preventDefault()
    setError('')
    if (!turnstileToken) {
      setError('Please complete the security check.')
      return
    }
    setLoading(true)

    // Verify Turnstile token server-side before auth
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

    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      window.location.href = redirect
    }
  }

  return (
    <div className="min-h-screen bg-slate flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-block mb-6">
            <span style={{fontFamily:'Georgia,"Times New Roman",serif',fontWeight:'bold',fontSize:'1.55rem',letterSpacing:'-0.01em',lineHeight:1}}>
              <span style={{color:'#2B3480'}}>HomeSafe</span>
              <span style={{color:'#E8703A'}}>Education</span>
            </span>
          </Link>
          <h1 className="font-serif text-3xl text-navy mb-2">Welcome back</h1>
          <p className="text-navy/50 text-sm">Sign in to access your courses</p>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-8">
          {error && (
            <div className="bg-red-50 border border-red-100 text-red-700 text-sm rounded-xl p-4 mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
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
                placeholder="••••••••"
              />
            </div>
            <div className="flex justify-end">
              <Link href="/reset-password" className="text-xs text-teal hover:underline">
                Forgot password?
              </Link>
            </div>

            <TurnstileWidget
              onVerify={handleTurnstileVerify}
              onExpire={handleTurnstileExpire}
            />

            <button type="submit" disabled={loading || !turnstileToken} className="btn-primary w-full justify-center py-3 disabled:opacity-60">
              {loading ? 'Signing in...' : 'Sign In \u2192'}
            </button>
          </form>

          <p className="text-center text-sm text-navy/50 mt-6">
            Don't have an account?{' '}
            <Link href="/register" className="text-teal font-medium hover:underline">Create one free</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate flex items-center justify-center"><p className="text-navy/50">Loading...</p></div>}>
      <LoginForm />
    </Suspense>
  )
}

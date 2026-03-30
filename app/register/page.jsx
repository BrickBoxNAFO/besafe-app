'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'
import { LOGO_SRC } from '@/lib/data'

export default function RegisterPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const handleRegister = async (e) => {
    e.preventDefault()
    setError('')

    if (password !== confirm) { setError('Passwords do not match.'); return }
    if (password.length < 8) { setError('Password must be at least 8 characters.'); return }

    setLoading(true)
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
          <img src={LOGO_SRC} alt="The Be Safe Group" className="h-12 mx-auto mb-6 object-contain rounded-lg" />
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

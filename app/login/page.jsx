'use client'
import { Suspense } from 'react'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'
import { LOGO_SRC } from '@/lib/data'

function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirect = searchParams.get('redirect') || '/dashboard'
  const supabase = createClient()

  const handleLogin = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      router.push(redirect)
      router.refresh()
    }
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-8">
      {error && (
        <div className="bg-red-50 border border-red-100 text-red-700 text-sm rounded-xl p-4 mb-6">
          {error}
        </div>
      )}
      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-navy mb-1.5">Email address</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} required
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-navy focus:outline-none focus:border-teal transition-colors"
            placeholder="you@example.com" />
        </div>
        <div>
          <label className="block text-sm font-medium text-navy mb-1.5">Password</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} required
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-navy focus:outline-none focus:border-teal transition-colors"
            placeholder="••••••••" />
        </div>
        <div className="flex justify-end">
          <Link href="/reset-password" className="text-xs text-teal hover:underline">Forgot password?</Link>
        </div>
        <button type="submit" disabled={loading} className="btn-primary w-full justify-center py-3 disabled:opacity-60">
          {loading ? 'Signing in...' : 'Sign In →'}
        </button>
      </form>
      <p className="text-center text-sm text-navy/50 mt-6">
        Don't have an account?{' '}
        <Link href="/register" className="text-teal font-medium hover:underline">Create one free</Link>
      </p>
    </div>
  )
}

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-slate flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <img src={LOGO_SRC} alt="The Be Safe Group" className="h-12 mx-auto mb-6 object-contain rounded-lg" />
          <h1 className="font-serif text-3xl text-navy mb-2">Welcome back</h1>
          <p className="text-navy/50 text-sm">Sign in to access your courses</p>
        </div>
        <Suspense fallback={<div className="bg-white rounded-2xl border border-gray-100 p-8 text-center text-navy/50">Loading...</div>}>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  )
}

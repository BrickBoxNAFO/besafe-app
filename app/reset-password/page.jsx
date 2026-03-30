'use client'
import { useState } from 'react'
import Link from 'next/link'
import { createClient } from '@/utils/supabase/client'

export default function ResetPasswordPage() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const supabase = createClient()

  const handleReset = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/update-password`,
    })
    if (error) { setError(error.message); setLoading(false) }
    else setSent(true)
  }

  return (
    <div className="min-h-screen bg-slate flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <span style={{fontFamily:'Georgia,"Times New Roman",serif',fontWeight:'bold',fontSize:'1.55rem',letterSpacing:'-0.01em',lineHeight:1,display:'inline-block'}}><span style={{color:'#2B3480'}}>HomeSafe</span><span style={{color:'#E8703A'}}>Education</span></span>
          <h1 className="font-serif text-3xl text-navy mb-2 mt-2">Reset your password</h1>
          <p className="text-navy/50 text-sm">We'll send a reset link to your email address.</p>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 p-8">
          {sent ? (
            <div className="text-center">
              <div className="text-4xl mb-4">📧</div>
              <p className="text-navy font-medium mb-2">Check your inbox</p>
              <p className="text-navy/60 text-sm mb-6">A password reset link has been sent to {email}. Click the link in the email to set your new password.</p>
              <Link href="/login" className="btn-ghost text-sm inline-flex">Back to Sign In</Link>
            </div>
          ) : (
            <form onSubmit={handleReset} className="space-y-4">
              {error && <div className="bg-red-50 border border-red-100 text-red-700 text-sm rounded-xl p-4">{error}</div>}
              <div>
                <label className="block text-sm font-medium text-navy mb-1.5">Email address</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} required
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-teal transition-colors"
                  placeholder="you@example.com" />
              </div>
              <button type="submit" disabled={loading} className="btn-primary w-full justify-center py-3 disabled:opacity-60">
                {loading ? 'Sending...' : 'Send Reset Link →'}
              </button>
              <p className="text-center text-sm text-navy/50 mt-4">
                <Link href="/login" className="text-teal hover:underline">Back to Sign In</Link>
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
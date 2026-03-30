'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'

export default function UpdatePasswordPage() {
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [ready, setReady] = useState(false)
  const [done, setDone] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    // Supabase sends recovery tokens as hash fragments: #access_token=...&type=recovery
    const hash = window.location.hash.substring(1)
    const params = new URLSearchParams(hash)
    const access_token = params.get('access_token')
    const refresh_token = params.get('refresh_token')
    const type = params.get('type')

    if (access_token && type === 'recovery') {
      supabase.auth.setSession({ access_token, refresh_token: refresh_token || '' })
        .then(({ error }) => {
          if (error) setError('Invalid or expired reset link. Please request a new one.')
          else setReady(true)
        })
    } else {
      // Maybe already have a session
      supabase.auth.getSession().then(({ data: { session } }) => {
        if (session) setReady(true)
        else router.push('/reset-password')
      })
    }
  }, [])

  const handleUpdate = async (e) => {
    e.preventDefault()
    setError('')
    if (password !== confirm) { setError('Passwords do not match'); return }
    if (password.length < 8) { setError('Password must be at least 8 characters'); return }
    setLoading(true)
    const { error } = await supabase.auth.updateUser({ password })
    if (error) { setError(error.message); setLoading(false) }
    else { setDone(true); setTimeout(() => router.push('/dashboard'), 2000) }
  }

  if (!ready && !error) return (
    <div className="min-h-screen bg-slate flex items-center justify-center">
      <p className="text-navy/50 text-sm">Verifying your reset link...</p>
    </div>
  )

  return (
    <div className="min-h-screen bg-slate flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <span style={{fontFamily:'Georgia,"Times New Roman",serif',fontWeight:'bold',fontSize:'1.55rem',letterSpacing:'-0.01em',lineHeight:1,display:'inline-block'}}>
            <span style={{color:'#2B3480'}}>HomeSafe</span><span style={{color:'#E8703A'}}>Education</span>
          </span>
          <h1 className="font-serif text-3xl text-navy mb-2 mt-2">Set new password</h1>
          <p className="text-navy/50 text-sm">Choose a strong password for your account.</p>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 p-8">
          {done ? (
            <div className="text-center">
              <div className="text-4xl mb-4">✅</div>
              <p className="text-navy font-medium mb-2">Password updated!</p>
              <p className="text-navy/60 text-sm">Taking you to your dashboard...</p>
            </div>
          ) : error && !ready ? (
            <div className="text-center">
              <div className="text-4xl mb-4">⚠️</div>
              <p className="text-red-600 text-sm mb-4">{error}</p>
              <a href="/reset-password" className="btn-primary text-sm inline-flex">Request New Link</a>
            </div>
          ) : (
            <form onSubmit={handleUpdate} className="space-y-4">
              {error && <div className="bg-red-50 border border-red-100 text-red-700 text-sm rounded-xl p-4">{error}</div>}
              <div>
                <label className="block text-sm font-medium text-navy mb-1.5">New password</label>
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} required minLength={8}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-teal transition-colors"
                  placeholder="Minimum 8 characters" />
              </div>
              <div>
                <label className="block text-sm font-medium text-navy mb-1.5">Confirm new password</label>
                <input type="password" value={confirm} onChange={e => setConfirm(e.target.value)} required
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-teal transition-colors"
                  placeholder="Repeat your password" />
              </div>
              <button type="submit" disabled={loading} className="btn-primary w-full justify-center py-3 disabled:opacity-60">
                {loading ? 'Updating...' : 'Update Password →'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
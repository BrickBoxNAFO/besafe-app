'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/utils/supabase/client'
import { LOGO_SRC, PACKAGES } from '@/lib/data'

export default function JoinPage({ params }) {
  const { token } = params
  const supabase = createClient()
  const [user, setUser] = useState(null)
  const [status, setStatus] = useState('loading')
  const [message, setMessage] = useState('')
  const [packageId, setPackageId] = useState(null)

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user)
      setStatus(user ? 'ready' : 'login_required')
    })
  }, [])

  const handleAccept = async () => {
    setStatus('accepting')
    try {
      const res = await fetch('/api/accept-invite', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ token }) })
      const data = await res.json()
      if (!res.ok) { setStatus('error'); setMessage(data.error || 'Something went wrong') }
      else { setStatus('success'); setPackageId(data.packageId) }
    } catch (err) { setStatus('error'); setMessage('Network error. Please try again.') }
  }

  const pkg = PACKAGES.find(p => p.id === packageId)

  return (
    <div className="min-h-screen bg-slate flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md">
        <div className="text-center mb-8"><img src={LOGO_SRC} alt="HomeSafeEducation" className="h-12 mx-auto mb-6 object-contain rounded-lg" /></div>
        <div className="bg-white rounded-2xl border border-gray-100 p-8 text-center">
          {status === 'loading' && <div className="text-navy/50">Checking your invite...</div>}
          {status === 'login_required' && (<><div className="text-4xl mb-4">🔐</div><h1 className="font-serif text-2xl text-navy mb-3">Sign in to accept your invite</h1><p className="text-navy/60 text-sm mb-6">You need an account to accept this invitation.</p><div className="flex flex-col gap-3"><Link href={"/register?redirect=/join/" + token} className="btn-primary justify-center">Create Free Account →</Link><Link href={"/login?redirect=/join/" + token} className="btn-ghost justify-center">Sign In</Link></div></>)}
          {status === 'ready' && (<><div className="text-4xl mb-4">🎉</div><h1 className="font-serif text-2xl text-navy mb-3">You have been invited!</h1><p className="text-navy/60 text-sm mb-6">Someone has purchased a safety course package for you. Click below to accept and unlock your course immediately.</p><button onClick={handleAccept} className="btn-primary w-full justify-center">Accept Invitation →</button></>)}
          {status === 'accepting' && (<><div className="text-4xl mb-4">⏳</div><h1 className="font-serif text-2xl text-navy mb-3">Activating your course...</h1></>)}
          {status === 'success' && (<><div className="text-4xl mb-4">{pkg?.emoji || '✅'}</div><h1 className="font-serif text-2xl text-navy mb-3">You are all set!</h1><p className="text-navy/60 text-sm mb-6"><strong>{pkg?.name || 'Your package'}</strong> is now unlocked on your account.</p><Link href="/library" className="btn-primary justify-center">Start Learning →</Link></>)}
          {status === 'error' && (<><div className="text-4xl mb-4">⚠️</div><h1 className="font-serif text-2xl text-navy mb-3">Something went wrong</h1><p className="text-navy/60 text-sm mb-6">{message}</p><Link href="/" className="btn-ghost justify-center">Go to Homepage</Link></>)}
        </div>
      </div>
    </div>
  )
}

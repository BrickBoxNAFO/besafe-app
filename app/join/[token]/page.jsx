'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/utils/supabase/client'
import { PACKAGES } from '@/lib/data'

export default function JoinPage({ params }) {
  const { token } = params
  const supabase = createClient()
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [status, setStatus] = useState('loading')
  const [message, setMessage] = useState('')
  const [seatInfo, setSeatInfo] = useState(null)
  const [packageId, setPackageId] = useState(null)

  // Load seat preview info
  useEffect(() => {
    const init = async () => {
      // Fetch seat info for display (public preview)
      try {
        const res = await fetch('/api/invite-preview?token=' + token)
        if (res.ok) {
          const data = await res.json()
          setSeatInfo(data)
        }
      } catch {}

      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
      setStatus(user ? 'ready' : 'login_required')
    }
    init()
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

  const pkg = PACKAGES.find(p => p.id === (packageId || seatInfo?.packageId))

  return (
    <div className="min-h-screen bg-slate flex items-center justify-center px-4 py-16 page-enter">
      <div className="w-full max-w-lg">

        {/* Header branding */}
        <div className="text-center mb-8">
          <Link href="/">
            <span style={{fontFamily:'Georgia,"Times New Roman",serif',fontWeight:'bold',fontSize:'1.55rem',letterSpacing:'-0.01em',lineHeight:1}}>
              <span style={{color:'#2B3480'}}>HomeSafe</span><span style={{color:'#E8703A'}}>Education</span>
            </span>
          </Link>
        </div>

        {/* Main card */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-lg overflow-hidden">

          {/* Loading */}
          {status === 'loading' && (
            <div className="p-12 text-center">
              <div className="w-10 h-10 border-3 border-teal/30 border-t-teal rounded-full animate-spin mx-auto mb-4" />
              <p className="text-navy/50 text-sm">Checking your invite...</p>
            </div>
          )}

          {/* Login required */}
          {status === 'login_required' && (
            <>
              {/* Invite banner */}
              <div className="bg-gradient-to-r from-teal/10 to-navy/5 px-8 py-6 border-b border-gray-100">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl bg-teal/15 flex-shrink-0">
                    {pkg?.emoji || '🎁'}
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-teal uppercase tracking-wider mb-1">You have been invited</p>
                    <h1 className="font-serif text-xl text-navy">
                      {seatInfo?.ownerName
                        ? <>{seatInfo.ownerName} sent you <strong>{pkg?.name || 'a safety course'}</strong></>
                        : <>Someone purchased <strong>{pkg?.name || 'a safety course'}</strong> for you</>
                      }
                    </h1>
                  </div>
                </div>
              </div>

              <div className="px-8 py-6">
                {/* Package preview */}
                {pkg && (
                  <div className="rounded-xl border border-gray-100 bg-slate p-4 mb-6">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-xl">{pkg.emoji}</span>
                      <div>
                        <div className="font-semibold text-navy text-sm">{pkg.name}</div>
                        <div className="text-xs text-navy/50">{pkg.tag}</div>
                      </div>
                    </div>
                    <p className="text-xs text-navy/50 leading-relaxed">{pkg.desc}</p>
                  </div>
                )}

                {/* Steps */}
                <div className="mb-6">
                  <p className="text-xs font-semibold text-navy/40 uppercase tracking-wider mb-3">Getting started is easy</p>
                  <div className="space-y-2.5">
                    {[
                      { num: '1', text: 'Create your free account or sign in', active: true },
                      { num: '2', text: 'Accept the invitation', active: false },
                      { num: '3', text: 'Start learning immediately', active: false },
                    ].map(step => (
                      <div key={step.num} className={"flex items-center gap-3 px-3 py-2.5 rounded-lg " + (step.active ? 'bg-teal/5 border border-teal/15' : '')}>
                        <div className={"w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 " + (step.active ? 'bg-teal text-white' : 'bg-gray-100 text-navy/30')}>
                          {step.num}
                        </div>
                        <span className={"text-sm " + (step.active ? 'text-navy font-medium' : 'text-navy/40')}>{step.text}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action buttons */}
                <div className="flex flex-col gap-3">
                  <Link href={"/register?redirect=/join/" + token} className="btn-primary justify-center text-center">
                    Create Free Account
                  </Link>
                  <Link href={"/login?redirect=/join/" + token} className="btn-ghost justify-center text-center text-sm">
                    Already have an account? Sign In
                  </Link>
                </div>
              </div>
            </>
          )}

          {/* Ready to accept */}
          {status === 'ready' && (
            <>
              <div className="bg-gradient-to-r from-teal/10 to-navy/5 px-8 py-6 border-b border-gray-100">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl bg-teal/15 flex-shrink-0">
                    {pkg?.emoji || '🎉'}
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-teal uppercase tracking-wider mb-1">You have been invited</p>
                    <h1 className="font-serif text-xl text-navy">
                      {seatInfo?.ownerName
                        ? <>{seatInfo.ownerName} sent you <strong>{pkg?.name || 'a safety course'}</strong></>
                        : <>Someone purchased <strong>{pkg?.name || 'a safety course'}</strong> for you</>
                      }
                    </h1>
                  </div>
                </div>
              </div>

              <div className="px-8 py-6">
                {pkg && (
                  <div className="rounded-xl border border-gray-100 bg-slate p-4 mb-6">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-xl">{pkg.emoji}</span>
                      <div>
                        <div className="font-semibold text-navy text-sm">{pkg.name}</div>
                        <div className="text-xs text-navy/50">{pkg.tag}</div>
                      </div>
                    </div>
                    <p className="text-xs text-navy/50 leading-relaxed">{pkg.desc}</p>
                  </div>
                )}

                {/* Signed in as */}
                <div className="flex items-center gap-3 bg-green-50 border border-green-100 rounded-lg px-4 py-3 mb-6">
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600 text-sm font-bold flex-shrink-0">
                    {user?.user_metadata?.name?.[0]?.toUpperCase() || user?.email?.[0]?.toUpperCase() || '?'}
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm font-medium text-navy truncate">{user?.user_metadata?.name || 'Welcome'}</div>
                    <div className="text-xs text-navy/50 truncate">{user?.email}</div>
                  </div>
                  <span className="ml-auto text-xs text-green-600 font-semibold flex-shrink-0">Signed in</span>
                </div>

                <button onClick={handleAccept} className="btn-primary w-full justify-center text-center">
                  Accept Invitation & Unlock Course
                </button>
                <p className="text-center text-xs text-navy/40 mt-3">Your course will be available immediately after accepting</p>
              </div>
            </>
          )}

          {/* Accepting */}
          {status === 'accepting' && (
            <div className="p-12 text-center">
              <div className="w-10 h-10 border-3 border-teal/30 border-t-teal rounded-full animate-spin mx-auto mb-4" />
              <h1 className="font-serif text-xl text-navy mb-2">Activating your course...</h1>
              <p className="text-navy/50 text-sm">This will only take a moment</p>
            </div>
          )}

          {/* Success */}
          {status === 'success' && (
            <>
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 px-8 py-6 border-b border-green-100 text-center">
                <div className="text-5xl mb-3">{pkg?.emoji || '🎉'}</div>
                <h1 className="font-serif text-2xl text-navy mb-2">You are all set!</h1>
                <p className="text-navy/60 text-sm">
                  <strong>{pkg?.name || 'Your course'}</strong> has been unlocked on your account
                </p>
              </div>
              <div className="px-8 py-6">
                <div className="bg-slate rounded-xl p-4 mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl" style={{ background: pkg?.pale || '#f0f4f8' }}>
                      {pkg?.emoji || '📖'}
                    </div>
                    <div>
                      <div className="font-semibold text-navy text-sm">{pkg?.name || 'Safety Course'}</div>
                      <div className="text-xs text-green-600 font-semibold">Unlocked and ready to go</div>
                    </div>
                  </div>
                </div>
                <Link href="/library" className="btn-primary w-full justify-center text-center mb-3">
                  Start Learning
                </Link>
                <Link href="/dashboard" className="btn-ghost w-full justify-center text-center text-sm">
                  Go to Dashboard
                </Link>
              </div>
            </>
          )}

          {/* Error */}
          {status === 'error' && (
            <div className="p-8 text-center">
              <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-4">
                <svg className="w-7 h-7 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" /></svg>
              </div>
              <h1 className="font-serif text-xl text-navy mb-2">Something went wrong</h1>
              <p className="text-navy/60 text-sm mb-6">{message}</p>
              <div className="flex flex-col gap-3">
                <button onClick={() => window.location.reload()} className="btn-primary justify-center text-center">
                  Try Again
                </button>
                <Link href="/" className="btn-ghost justify-center text-center text-sm">
                  Go to Homepage
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-navy/30 mt-6">
          HomeSafeEducation — Safety education for every stage of life
        </p>
      </div>
    </div>
  )
}

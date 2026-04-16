'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function JoinPage({ params }) {
  const router = useRouter()
  const [inviteData, setInviteData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isAccepting, setIsAccepting] = useState(false)

  const token = params.token

  useEffect(() => {
    // Fetch invite preview
    fetchInviteData()
    checkAuth()
  }, [token])

  const fetchInviteData = async () => {
    try {
      const res = await fetch(`/api/invite-preview?token=${token}`)
      if (!res.ok) {
        setError('Invalid or expired invite')
        return
      }
      const data = await res.json()
      setInviteData(data)
    } catch (err) {
      setError('Failed to load invite details')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const checkAuth = async () => {
    try {
      const res = await fetch('/api/auth/check', { method: 'POST' })
      const data = await res.json()
      setIsLoggedIn(data.authenticated)
    } catch (err) {
      setIsLoggedIn(false)
    }
  }

  const handleAcceptInvite = async () => {
    setIsAccepting(true)
    try {
      const res = await fetch('/api/accept-invite', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token }),
      })

      if (!res.ok) {
        setError('Failed to accept invite')
        setIsAccepting(false)
        return
      }

      const data = await res.json()
      router.push(data.redirectUrl || '/dashboard')
    } catch (err) {
      setError('Error accepting invite')
      setIsAccepting(false)
      console.error(err)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate flex items-center justify-center">
        <p className="text-navy">Loading invite details...</p>
      </div>
    )
  }

  if (error || !inviteData) {
    return (
      <div className="min-h-screen bg-slate flex items-center justify-center">
        <div className="max-w-md bg-white rounded-2xl p-8 text-center">
          <p className="text-red-600 mb-4">{error || 'Invalid invite'}</p>
          <Link href="/login" className="text-teal hover:text-teal/80 font-semibold">
            Back to Login
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate flex items-center justify-center p-4">
      <div className="max-w-md bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <div className="bg-gradient-to-r from-navy to-teal p-8 text-center text-white">
          <div className="text-5xl mb-4">{inviteData.packageEmoji}</div>
          <h1 className="font-serif text-2xl mb-2">You're Invited!</h1>
          <p className="text-sm opacity-90">{inviteData.packageName}</p>
        </div>

        <div className="p-8">
          <div className="mb-6">
            <p className="text-navy/60 text-sm mb-2">Invited by</p>
            <p className="font-semibold text-navy text-lg">{inviteData.ownerName}</p>
          </div>

          <div className="mb-6">
            <p className="text-navy/60 text-sm mb-2">Package</p>
            <p className="font-semibold text-navy text-lg flex items-center gap-2">
              <span>{inviteData.packageEmoji}</span>
              {inviteData.packageName}
            </p>
          </div>

          {isLoggedIn ? (
            <button
              onClick={handleAcceptInvite}
              disabled={isAccepting}
              className="w-full px-6 py-3 bg-teal text-white rounded-lg hover:bg-teal/80 disabled:opacity-50 font-semibold transition"
            >
              {isAccepting ? 'Accepting...' : 'Accept Invite'}
            </button>
          ) : (
            <>
              <p className="text-sm text-navy/60 mb-4 text-center">
                Sign in to accept this invite and start learning.
              </p>
              <Link
                href={`/login?redirect=/join/${token}`}
                className="block w-full px-6 py-3 bg-navy text-white rounded-lg hover:bg-navy/80 font-semibold transition text-center"
              >
                Sign in to Accept
              </Link>
            </>
          )}

          <div className="mt-6 pt-6 border-t border-gray-100">
            <p className="text-xs text-navy/50 text-center">
              New to HomeSafeEducation?{' '}
              <Link href="/signup" className="text-teal hover:text-teal/80 font-semibold">
                Create an account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

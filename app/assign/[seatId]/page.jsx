'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { PACKAGES } from '@/lib/data'

export default function AssignPage({ params }) {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [mode, setMode] = useState('choose') // 'choose', 'self', 'invite'
  const [selectedPackage, setSelectedPackage] = useState('')
  const [inviteEmail, setInviteEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const seatId = params.seatId

  useEffect(() => {
    setLoading(false)
  }, [seatId])

  const handleAssignToMe = async () => {
    if (!selectedPackage) return
    setIsSubmitting(true)

    try {
      const res = await fetch('/api/self-assign', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ seatId, packageId: selectedPackage }),
      })

      if (!res.ok) {
        setError('Failed to assign seat')
        setIsSubmitting(false)
        return
      }

      router.push('/family')
    } catch (err) {
      setError('Error assigning seat')
      setIsSubmitting(false)
      console.error(err)
    }
  }

  const handleSendInvite = async (e) => {
    e.preventDefault()
    if (!inviteEmail || !selectedPackage) return
    setIsSubmitting(true)

    try {
      const res = await fetch('/api/assign-seat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          seatId,
          action: 'invite',
          packageId: selectedPackage,
          email: inviteEmail,
        }),
      })

      if (!res.ok) {
        setError('Failed to send invite')
        setIsSubmitting(false)
        return
      }

      router.push('/family')
    } catch (err) {
      setError('Error sending invite')
      setIsSubmitting(false)
      console.error(err)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate flex items-center justify-center">
        <p className="text-navy">Loading...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate flex items-center justify-center">
        <div className="max-w-md bg-white rounded-2xl p-8 text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <Link href="/family" className="text-teal hover:text-teal/80 font-semibold">
            Back to Family Dashboard
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate p-4">
      <div className="max-w-md mx-auto">
        <Link href="/family" className="text-teal hover:text-teal/80 mb-6 inline-block">
          ← Back to Family
        </Link>

        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <div className="bg-gradient-to-r from-navy to-teal p-8 text-center text-white">
            <h1 className="font-serif text-2xl">Assign This Seat</h1>
          </div>

          <div className="p-8">
            {mode === 'choose' && (
              <div className="space-y-4">
                <button
                  onClick={() => setMode('self')}
                  className="w-full px-6 py-3 bg-navy text-white rounded-lg hover:bg-navy/80 font-semibold transition"
                >
                  Assign to Me
                </button>
                <button
                  onClick={() => setMode('invite')}
                  className="w-full px-6 py-3 bg-teal text-white rounded-lg hover:bg-teal/80 font-semibold transition"
                >
                  Invite Family Member
                </button>
              </div>
            )}

            {mode === 'self' && (
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  handleAssignToMe()
                }}
                className="space-y-6"
              >
                <div>
                  <label className="block text-sm font-medium text-navy mb-2">
                    Select Package
                  </label>
                  <select
                    value={selectedPackage}
                    onChange={(e) => setSelectedPackage(e.target.value)}
                    className="w-full px-4 py-2 border border-navy/20 rounded-lg text-navy"
                    required
                  >
                    <option value="">Choose a package...</option>
                    {PACKAGES.map(pkg => (
                      <option key={pkg.id} value={pkg.id}>
                        {pkg.emoji} {pkg.name}
                      </option>
                    ))}
                  </select>
                </div>

                {error && <p className="text-red-600 text-sm">{error}</p>}

                <div className="flex gap-3">
                  <button
                    type="submit"
                    disabled={!selectedPackage || isSubmitting}
                    className="flex-1 px-6 py-2 bg-navy text-white rounded-lg hover:bg-navy/80 disabled:opacity-50 font-semibold transition"
                  >
                    {isSubmitting ? 'Assigning...' : 'Assign'}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setMode('choose')
                      setSelectedPackage('')
                    }}
                    className="flex-1 px-6 py-2 bg-gray-200 text-navy rounded-lg hover:bg-gray-300 font-semibold transition"
                  >
                    Back
                  </button>
                </div>
              </form>
            )}

            {mode === 'invite' && (
              <form onSubmit={handleSendInvite} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-navy mb-2">
                    Family Member Email
                  </label>
                  <input
                    type="email"
                    value={inviteEmail}
                    onChange={(e) => setInviteEmail(e.target.value)}
                    placeholder="family@example.com"
                    className="w-full px-4 py-2 border border-navy/20 rounded-lg text-navy"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-navy mb-2">
                    Select Package
                  </label>
                  <select
                    value={selectedPackage}
                    onChange={(e) => setSelectedPackage(e.target.value)}
                    className="w-full px-4 py-2 border border-navy/20 rounded-lg text-navy"
                    required
                  >
                    <option value="">Choose a package...</option>
                    {PACKAGES.map(pkg => (
                      <option key={pkg.id} value={pkg.id}>
                        {pkg.emoji} {pkg.name}
                      </option>
                    ))}
                  </select>
                </div>

                {error && <p className="text-red-600 text-sm">{error}</p>}

                <div className="flex gap-3">
                  <button
                    type="submit"
                    disabled={!inviteEmail || !selectedPackage || isSubmitting}
                    className="flex-1 px-6 py-2 bg-teal text-white rounded-lg hover:bg-teal/80 disabled:opacity-50 font-semibold transition"
                  >
                    {isSubmitting ? 'Sending...' : 'Send Invite'}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setMode('choose')
                      setSelectedPackage('')
                      setInviteEmail('')
                    }}
                    className="flex-1 px-6 py-2 bg-gray-200 text-navy rounded-lg hover:bg-gray-300 font-semibold transition"
                  >
                    Back
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

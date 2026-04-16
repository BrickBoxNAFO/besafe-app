'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

/**
 * Dashboard seat actions.
 *
 * Shows:
 *   - Pending seats (unassigned) — each with "Assign to me" / "Send to someone"
 *     buttons.
 *   - Gifted seats (already claimed by a recipient) — status display only.
 */
export default function DashboardSeatActions({ pendingSeats, giftedSeats, packages, userEmail }) {
  const router = useRouter()
  const [activeInvite, setActiveInvite] = useState(null) // seatId currently in invite form
  const [formState, setFormState] = useState({ email: '', name: '' })
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState(null)

  const pkgFor = (id) => packages.find(p => p.id === id)

  const handleAssignSelf = async (seatId) => {
    setBusy(true)
    setError(null)
    try {
      const res = await fetch('/api/self-assign', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ seatId }),
      })
      if (!res.ok) {
        const j = await res.json().catch(() => ({}))
        throw new Error(j.error || 'Failed to assign')
      }
      router.refresh()
    } catch (e) {
      setError(e.message)
    } finally {
      setBusy(false)
    }
  }

  const handleInvite = async (seat) => {
    if (!formState.email) {
      setError('Please enter a recipient email address')
      return
    }
    if (formState.email.toLowerCase() === (userEmail || '').toLowerCase()) {
      setError('You cannot gift to yourself. Use "Assign to me" instead.')
      return
    }
    setBusy(true)
    setError(null)
    try {
      const res = await fetch('/api/invite-member', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          seatId: seat.id,
          inviteEmail: formState.email,
          memberName: formState.name,
        }),
      })
      if (!res.ok) {
        const j = await res.json().catch(() => ({}))
        throw new Error(j.error || 'Failed to send invite')
      }
      setActiveInvite(null)
      setFormState({ email: '', name: '' })
      router.refresh()
    } catch (e) {
      setError(e.message)
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="space-y-3">
      {pendingSeats.map(seat => {
        const pkg = pkgFor(seat.package_id)
        if (!pkg) return null
        const isInviteSent = !!seat.invite_token && !!seat.invite_email
        const isActive = activeInvite === seat.id

        return (
          <div key={seat.id} className="bg-white rounded-2xl border border-amber-200 p-5">
            <div className="flex items-center gap-4 mb-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl" style={{ background: pkg.pale }}>
                {pkg.emoji}
              </div>
              <div className="flex-1">
                <p className="font-semibold text-navy text-sm">{pkg.name}</p>
                <p className="text-xs text-navy/50">
                  {isInviteSent
                    ? `Invite sent to ${seat.invite_email} - awaiting acceptance`
                    : 'Unassigned - ready to assign or gift'}
                </p>
              </div>
            </div>

            {!isActive && (
              <div className="flex flex-wrap gap-2">
                {!isInviteSent && (
                  <button
                    onClick={() => handleAssignSelf(seat.id)}
                    disabled={busy}
                    className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-teal text-white hover:bg-teal/80 disabled:opacity-50"
                  >
                    Assign to me
                  </button>
                )}
                <button
                  onClick={() => { setActiveInvite(seat.id); setError(null) }}
                  disabled={busy}
                  className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-white border border-teal text-teal hover:bg-teal/5 disabled:opacity-50"
                >
                  {isInviteSent ? 'Resend invite' : 'Send to someone'}
                </button>
              </div>
            )}

            {isActive && (
              <div className="mt-3 space-y-2">
                <input
                  type="email"
                  placeholder="Recipient email"
                  value={formState.email}
                  onChange={e => setFormState(s => ({ ...s, email: e.target.value }))}
                  className="w-full text-sm px-3 py-2 rounded-lg border border-gray-200"
                />
                <input
                  type="text"
                  placeholder="Recipient name (optional)"
                  value={formState.name}
                  onChange={e => setFormState(s => ({ ...s, name: e.target.value }))}
                  className="w-full text-sm px-3 py-2 rounded-lg border border-gray-200"
                />
                <div className="flex gap-2">
                  <button
                    onClick={() => handleInvite(seat)}
                    disabled={busy}
                    className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-teal text-white hover:bg-teal/80 disabled:opacity-50"
                  >
                    {busy ? 'Sending...' : 'Send invite'}
                  </button>
                  <button
                    onClick={() => { setActiveInvite(null); setError(null) }}
                    disabled={busy}
                    className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-white border border-gray-200 text-navy/70"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {error && isActive && <p className="text-xs text-red-600 mt-2">{error}</p>}
          </div>
        )
      })}

      {giftedSeats.map(seat => {
        const pkg = pkgFor(seat.package_id)
        if (!pkg) return null
        return (
          <div key={seat.id} className="bg-slate rounded-2xl border border-gray-100 p-5 flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl" style={{ background: pkg.pale }}>
              {pkg.emoji}
            </div>
            <div className="flex-1">
              <p className="font-semibold text-navy text-sm">{pkg.name}</p>
              <p className="text-xs text-navy/50">
                Gifted to {seat.member_name || 'recipient'} - you will also receive their certificate when they complete the package
              </p>
            </div>
            <span className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-teal/10 text-teal">Claimed</span>
          </div>
        )
      })}
    </div>
  )
}

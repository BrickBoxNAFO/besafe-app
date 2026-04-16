'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function FamilyDashboardClient({
  user,
  name,
  seats,
  seatLimit,
  packages,
  courses,
  memberProgress,
}) {
  const [isAssigning, setIsAssigning] = useState(false)
  const [selectedSeat, setSelectedSeat] = useState(null)
  const [inviteForm, setInviteForm] = useState({ email: '', packageId: '' })

  const usedSeats = seats.length
  const emptySeats = Math.max(0, seatLimit - usedSeats)

  // Calculate stats
  const activeMembers = seats.filter(s => s.member_user_id).length
  const courseCompletedByMember = {}
  Object.entries(memberProgress).forEach(([memberId, courses]) => {
    courseCompletedByMember[memberId] = courses.length
  })
  const avgProgress = activeMembers > 0
    ? Math.round(Object.values(courseCompletedByMember).reduce((a, b) => a + b, 0) / activeMembers)
    : 0

  const handleAssignToMe = async (seatId, packageId) => {
    try {
      const res = await fetch('/api/self-assign', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ seatId, packageId }),
      })
      if (res.ok) {
        window.location.reload()
      } else {
        alert('Failed to assign seat')
      }
    } catch (err) {
      console.error(err)
      alert('Error assigning seat')
    }
  }

  const handleInviteSubmit = async (e, seatId) => {
    e.preventDefault()
    if (!inviteForm.email || !inviteForm.packageId) return

    try {
      const res = await fetch('/api/assign-seat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          seatId,
          action: 'invite',
          email: inviteForm.email,
          packageId: inviteForm.packageId,
        }),
      })
      if (res.ok) {
        alert('Invite sent!')
        setInviteForm({ email: '', packageId: '' })
        setSelectedSeat(null)
        window.location.reload()
      }
    } catch (err) {
      console.error(err)
      alert('Error sending invite')
    }
  }

  const handleResendInvite = async (seatId) => {
    try {
      const res = await fetch('/api/assign-seat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ seatId, action: 'resend' }),
      })
      if (res.ok) {
        alert('Invite resent!')
      }
    } catch (err) {
      console.error(err)
      alert('Error resending invite')
    }
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="mb-10">
        <h1 className="font-serif text-4xl text-navy mb-1">Family Dashboard</h1>
        <p className="text-navy/50">Manage your family members and shared seats</p>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        <div className="bg-white rounded-2xl border border-gray-100 p-5 text-center">
          <div className="font-serif text-3xl text-navy mb-1">{seatLimit}</div>
          <div className="text-sm text-navy/60">Total Seats</div>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 p-5 text-center">
          <div className="font-serif text-3xl text-navy mb-1">{usedSeats}</div>
          <div className="text-sm text-navy/60">Seats Used</div>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 p-5 text-center">
          <div className="font-serif text-3xl text-navy mb-1">{activeMembers}</div>
          <div className="text-sm text-navy/60">Active Members</div>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 p-5 text-center">
          <div className="font-serif text-3xl text-navy mb-1">{avgProgress}</div>
          <div className="text-sm text-navy/60">Avg. Courses Started</div>
        </div>
      </div>

      {/* Seat Grid */}
      <div className="bg-white rounded-2xl border border-gray-100 p-8">
        <h2 className="font-serif text-2xl text-navy mb-6">Your Family Seats</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Filled Seats */}
          {seats.map(seat => (
            <SeatCard
              key={seat.id}
              seat={seat}
              packages={packages}
              memberProgress={memberProgress}
              onResendInvite={handleResendInvite}
            />
          ))}

          {/* Empty Slots */}
          {Array.from({ length: emptySeats }).map((_, idx) => (
            <EmptySeatSlot
              key={`empty-${idx}`}
              seatIndex={usedSeats + idx}
              packages={packages}
              selectedSeat={selectedSeat}
              setSelectedSeat={setSelectedSeat}
              inviteForm={inviteForm}
              setInviteForm={setInviteForm}
              onAssignToMe={handleAssignToMe}
              onInviteSubmit={handleInviteSubmit}
            />
          ))}
        </div>

        {emptySeats === 0 && usedSeats > 0 && (
          <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-blue-900 text-sm">
              All seats are in use! You can upgrade your plan to get more seats.
            </p>
          </div>
        )}
      </div>

      <div className="mt-10 text-center">
        <Link href="/dashboard" className="text-teal hover:text-teal/80">
          Back to Dashboard
        </Link>
      </div>
    </div>
  )
}

function SeatCard({ seat, packages, memberProgress, onResendInvite }) {
  const pkg = packages.find(p => p.id === seat.package_id)

  if (seat.invite_email && !seat.member_user_id) {
    // Pending invite
    return (
      <div className="bg-slate rounded-xl border-2 border-dashed border-navy/20 p-6 flex flex-col">
        <div className="flex items-center gap-3 mb-4">
          <div className="text-3xl">{pkg?.emoji || '📦'}</div>
          <div>
            <h3 className="font-semibold text-navy">{pkg?.name || seat.package_id}</h3>
            <p className="text-sm text-navy/60">Invite pending</p>
          </div>
        </div>
        <p className="text-sm text-navy/50 mb-4">Invited: {seat.invite_email}</p>
        <button
          onClick={() => onResendInvite(seat.id)}
          className="mt-auto px-4 py-2 bg-teal text-white rounded-lg hover:bg-teal/80 transition text-sm font-semibold"
        >
          Resend Invite
        </button>
      </div>
    )
  }

  if (!seat.member_user_id) return null

  const memberCourses = memberProgress[seat.member_user_id] || []
  const progressPct = Math.round((memberCourses.length / 5) * 100)

  return (
    <div className="bg-gradient-to-br from-white to-slate rounded-xl border-2 border-navy/10 p-6 flex flex-col">
      <div className="flex items-center gap-3 mb-4">
        <div className="text-3xl">{pkg?.emoji || '📦'}</div>
        <div>
          <h3 className="font-semibold text-navy">{seat.member_name || 'Family Member'}</h3>
          <p className="text-sm text-navy/60">{pkg?.name || seat.package_id}</p>
        </div>
      </div>

      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-navy">Progress</span>
          <span className="text-sm font-semibold text-teal">{progressPct}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-teal rounded-full h-2 transition-all"
            style={{ width: `${progressPct}%` }}
          />
        </div>
      </div>

      <p className="text-sm text-navy/60 mb-4">
        {memberCourses.length} of 5 courses started
      </p>

      <Link
        href={`/dashboard`}
        className="mt-auto px-4 py-2 bg-navy/5 text-navy rounded-lg hover:bg-navy/10 transition text-sm font-semibold text-center"
      >
        View Profile
      </Link>
    </div>
  )
}

function EmptySeatSlot({
  seatIndex,
  packages,
  selectedSeat,
  setSelectedSeat,
  inviteForm,
  setInviteForm,
  onAssignToMe,
  onInviteSubmit,
}) {
  const isOpen = selectedSeat === seatIndex
  const [mode, setMode] = useState(null) // 'self' or 'invite'

  return (
    <div className="bg-slate rounded-xl border-2 border-dashed border-navy/20 p-6 flex flex-col">
      {!isOpen ? (
        <div className="flex flex-col gap-3">
          <p className="text-sm text-navy/60 mb-2">Empty Seat {seatIndex + 1}</p>
          <button
            onClick={() => {
              setSelectedSeat(seatIndex)
              setMode('self')
            }}
            className="px-4 py-2 bg-navy text-white rounded-lg hover:bg-navy/80 transition text-sm font-semibold"
          >
            Assign to Me
          </button>
          <button
            onClick={() => {
              setSelectedSeat(seatIndex)
              setMode('invite')
            }}
            className="px-4 py-2 bg-teal text-white rounded-lg hover:bg-teal/80 transition text-sm font-semibold"
          >
            Invite Family Member
          </button>
        </div>
      ) : mode === 'self' ? (
        <div className="space-y-4">
          <h3 className="font-semibold text-navy">Pick a Package</h3>
          <select
            value={inviteForm.packageId}
            onChange={(e) => setInviteForm({ ...inviteForm, packageId: e.target.value })}
            className="w-full px-3 py-2 border border-navy/20 rounded-lg text-navy"
          >
            <option value="">Select a package...</option>
            {packages.map(pkg => (
              <option key={pkg.id} value={pkg.id}>
                {pkg.emoji} {pkg.name}
              </option>
            ))}
          </select>
          <div className="flex gap-2">
            <button
              onClick={() => {
                if (inviteForm.packageId) {
                  onAssignToMe(seatIndex, inviteForm.packageId)
                }
              }}
              className="flex-1 px-4 py-2 bg-navy text-white rounded-lg hover:bg-navy/80 text-sm font-semibold"
            >
              Confirm
            </button>
            <button
              onClick={() => {
                setSelectedSeat(null)
                setMode(null)
                setInviteForm({ email: '', packageId: '' })
              }}
              className="flex-1 px-4 py-2 bg-gray-200 text-navy rounded-lg hover:bg-gray-300 text-sm font-semibold"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={(e) => onInviteSubmit(e, seatIndex)} className="space-y-4">
          <h3 className="font-semibold text-navy">Invite Family Member</h3>

          <div>
            <label className="block text-sm font-medium text-navy mb-1">
              Email Address
            </label>
            <input
              type="email"
              value={inviteForm.email}
              onChange={(e) => setInviteForm({ ...inviteForm, email: e.target.value })}
              placeholder="family@example.com"
              className="w-full px-3 py-2 border border-navy/20 rounded-lg text-navy"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-navy mb-1">
              Package
            </label>
            <select
              value={inviteForm.packageId}
              onChange={(e) => setInviteForm({ ...inviteForm, packageId: e.target.value })}
              className="w-full px-3 py-2 border border-navy/20 rounded-lg text-navy"
              required
            >
              <option value="">Select a package...</option>
              {packages.map(pkg => (
                <option key={pkg.id} value={pkg.id}>
                  {pkg.emoji} {pkg.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex gap-2">
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-teal text-white rounded-lg hover:bg-teal/80 text-sm font-semibold"
            >
              Send Invite
            </button>
            <button
              type="button"
              onClick={() => {
                setSelectedSeat(null)
                setMode(null)
                setInviteForm({ email: '', packageId: '' })
              }}
              className="flex-1 px-4 py-2 bg-gray-200 text-navy rounded-lg hover:bg-gray-300 text-sm font-semibold"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  )
}

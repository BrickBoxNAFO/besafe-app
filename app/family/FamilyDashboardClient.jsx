'use client'
import { useState } from 'react'
import Link from 'next/link'

function ProgressBar({ pct, color }) {
  return (
    <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
      <div className="h-2 rounded-full transition-all duration-500" style={{ width: pct + '%', background: color || '#0EA5A0' }} />
    </div>
  )
}

function SeatCard({ seat, onInviteSent }) {
  const [showInvite, setShowInvite] = useState(false)
  const [email, setEmail] = useState(seat.inviteEmail || '')
  const [name, setName] = useState(seat.memberName && !seat.isOwner ? seat.memberName : '')
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  const sendInvite = async () => {
    if (!email) return
    setSending(true); setError('')
    try {
      const res = await fetch('/api/invite-member', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ seatId: seat.seatId, inviteEmail: email, memberName: name }) })
      const data = await res.json()
      if (!res.ok) { setError(data.error || 'Failed to send invite'); setSending(false) }
      else { setSent(true); setSending(false); setShowInvite(false); onInviteSent?.() }
    } catch (err) { setError('Network error. Please try again.'); setSending(false) }
  }

  const getStatus = () => {
    if (seat.isOwner) return { text: 'You', cls: 'bg-teal/10 text-teal border-teal/20' }
    if (seat.accepted) return { text: 'Active', cls: 'bg-green-50 text-green-700 border-green-200' }
    if (sent || seat.inviteSent) return { text: 'Invite sent', cls: 'bg-amber-50 text-amber-700 border-amber-200' }
    return { text: 'Unassigned', cls: 'bg-gray-100 text-gray-500 border-gray-200' }
  }
  const status = getStatus()

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0" style={{ background: seat.packagePale }}>{seat.packageEmoji}</div>
          <div>
            <h3 className="font-semibold text-navy">{seat.packageName}</h3>
            <p className="text-sm text-navy/50">{seat.memberName && !seat.isOwner ? seat.memberName : seat.isOwner ? 'Your package' : 'Not yet assigned'}</p>
          </div>
        </div>
        <span className={"chip text-xs border " + status.cls}>{status.text}</span>
      </div>
      <div className="mb-4">
        <div className="flex justify-between text-xs text-navy/50 mb-1"><span>Progress</span><span>{seat.progressPct}% complete</span></div>
        <ProgressBar pct={seat.progressPct} color={seat.packageColor} />
      </div>
      {!seat.isOwner && !seat.accepted && (
        <div>
          {!showInvite ? (
            <button onClick={() => setShowInvite(true)} className="text-sm font-medium text-teal hover:underline">
              {sent || seat.inviteSent ? '✉️ Resend invite' : '+ Invite family member'}
            </button>
          ) : (
            <div className="mt-3 space-y-2">
              <input type="text" placeholder="Their name (optional)" value={name} onChange={e => setName(e.target.value)} className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-teal" />
              <div className="flex gap-2">
                <input type="email" placeholder="Their email address" value={email} onChange={e => setEmail(e.target.value)} className="flex-1 border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-teal" />
                <button onClick={sendInvite} disabled={sending || !email} className="btn-primary text-sm py-2 px-4 disabled:opacity-60">{sending ? '...' : 'Send'}</button>
              </div>
              {error && <p className="text-red-500 text-xs">{error}</p>}
              <button onClick={() => setShowInvite(false)} className="text-xs text-navy/40 hover:text-navy">Cancel</button>
            </div>
          )}
        </div>
      )}
      {seat.accepted && <div className="flex items-center justify-between mt-1"><span className="text-xs text-navy/40">{seat.memberEmail}</span><Link href="/library" className="text-xs font-medium text-teal hover:underline">View library →</Link></div>}
      {(sent || (seat.inviteSent && !seat.accepted)) && !showInvite && <p className="text-xs text-amber-600 mt-1">Invite sent to {email || seat.inviteEmail}</p>}
    </div>
  )
}

export default function FamilyDashboardClient({ seatData, userName }) {
  const [, setRefresh] = useState(0)
  const activeSeats = seatData.filter(s => s.accepted || s.isOwner).length
  const avgProgress = seatData.length > 0 ? Math.round(seatData.reduce((acc, s) => acc + s.progressPct, 0) / seatData.length) : 0

  return (
    <div className="page-enter min-h-screen bg-slate">
      <div className="hero-bg noise relative py-14 overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <div className="chip bg-teal/15 text-teal border border-teal/25 mb-4">Family Dashboard</div>
          <h1 className="font-serif text-4xl text-white mb-2">{userName ? userName + "'s Family" : 'Family Overview'}</h1>
          <p className="text-white/60">Track progress for every member of your family</p>
        </div>
      </div>
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-6 py-6 grid grid-cols-3 gap-6">
          {[['Packages', seatData.length], ['Members Active', activeSeats + ' / ' + seatData.length], ['Avg Progress', avgProgress + '%']].map(([label, value]) => (
            <div key={label} className="text-center">
              <div className="font-serif text-3xl text-navy font-bold">{value}</div>
              <div className="text-sm text-navy/50 mt-1">{label}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="max-w-4xl mx-auto px-6 py-10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-serif text-2xl text-navy">Your Packages</h2>
          <p className="text-sm text-navy/50">Invite family members to their package</p>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {seatData.map(seat => <SeatCard key={seat.packageId} seat={seat} onInviteSent={() => setRefresh(k => k + 1)} />)}
        </div>
        <div className="mt-10 bg-white rounded-2xl border border-gray-100 p-6">
          <h3 className="font-semibold text-navy mb-4">How it works</h3>
          <div className="grid md:grid-cols-3 gap-4 text-sm text-navy/60">
            <div className="flex gap-3"><span className="text-lg">1️⃣</span><p>Click <strong>Invite family member</strong> on any package and enter their email address</p></div>
            <div className="flex gap-3"><span className="text-lg">2️⃣</span><p>They receive a personal invite link by email and create their own free account</p></div>
            <div className="flex gap-3"><span className="text-lg">3️⃣</span><p>Their course unlocks immediately and their progress appears here on your dashboard</p></div>
          </div>
        </div>
      </div>
    </div>
  )
}

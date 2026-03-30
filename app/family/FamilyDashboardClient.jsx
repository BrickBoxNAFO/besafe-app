'use client'
import { useState } from 'react'

function ProgressBar({ pct, color }) {
  return (
    <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
      <div className="h-2 rounded-full transition-all duration-500" style={{ width: pct + '%', background: color || '#0EA5A0' }} />
    </div>
  )
}

function EmptySeatCard({ slotNumber, packageOptions, onInviteSent }) {
  const [step, setStep] = useState('idle')
  const [selectedPkg, setSelectedPkg] = useState(null)
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [error, setError] = useState('')
  const pkg = packageOptions.find(p => p.id === selectedPkg)

  const handleSend = async () => {
    if (!selectedPkg || !email) return
    setStep('sending'); setError('')
    try {
      const res = await fetch('/api/invite-member', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ packageId: selectedPkg, inviteEmail: email, memberName: name }),
      })
      const data = await res.json()
      if (!res.ok) { setError(data.error || 'Failed to send invite'); setStep('filling'); }
      else { setStep('done'); onInviteSent?.(); }
    } catch (e) { setError('Network error. Please try again.'); setStep('filling'); }
  }

  if (step === 'done') return (
    <div className="bg-green-50 border border-green-200 rounded-2xl p-6 text-center">
      <div className="text-3xl mb-2">✅</div>
      <p className="font-semibold text-green-800">Invite sent to {email}!</p>
      <p className="text-green-700 text-sm mt-1">{name || 'They'} will receive their {pkg?.name} invite shortly. The page will refresh.</p>
    </div>
  )

  if (step === 'idle') return (
    <div className="bg-white border-2 border-dashed border-gray-200 rounded-2xl p-6 flex flex-col items-center justify-center text-center min-h-44 hover:border-teal/40 transition-colors group cursor-pointer" onClick={() => setStep('picking')}>
      <div className="w-12 h-12 rounded-full bg-gray-100 group-hover:bg-teal/10 flex items-center justify-center text-xl mb-3 transition-colors font-bold text-gray-400">+</div>
      <p className="font-semibold text-navy text-sm">Seat {slotNumber} — Available</p>
      <p className="text-navy/50 text-xs mt-1 mb-4">Invite a family member to any package</p>
      <span className="btn-primary text-sm py-2 px-5">Send Invite</span>
    </div>
  )

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-5">
        <p className="font-semibold text-navy">Seat {slotNumber} — New Invite</p>
        <button onClick={() => { setStep('idle'); setSelectedPkg(null); setEmail(''); setName(''); setError(''); }} className="text-xs text-navy/40 hover:text-navy">Cancel</button>
      </div>
      <div className="mb-5">
        <label className="block text-sm font-semibold text-navy mb-3">1. Which package are you giving them?</label>
        <div className="space-y-2">
          {packageOptions.map(p => (
            <button key={p.id} onClick={() => { setSelectedPkg(p.id); setStep('filling'); }}
              className={"flex items-center gap-3 w-full p-3 rounded-xl border text-left transition-all " + (selectedPkg === p.id ? 'border-teal bg-teal/5' : 'border-gray-100 hover:border-gray-200')}>
              <div className="w-9 h-9 rounded-xl flex items-center justify-center text-xl flex-shrink-0" style={{ background: p.pale }}>{p.emoji}</div>
              <div className="flex-1"><p className="font-medium text-navy text-sm">{p.name}</p><p className="text-navy/50 text-xs">{p.tag}</p></div>
              {selectedPkg === p.id && <span className="text-teal font-bold">✓</span>}
            </button>
          ))}
        </div>
      </div>
      {(step === 'filling' || step === 'sending') && selectedPkg && (
        <div className="border-t border-gray-100 pt-5">
          <label className="block text-sm font-semibold text-navy mb-3">2. Who are you inviting?</label>
          {pkg && <div className="flex items-center gap-2 bg-slate rounded-xl px-3 py-2 mb-3"><span>{pkg.emoji}</span><span className="text-sm font-medium text-navy">{pkg.name}</span><button onClick={() => setStep('picking')} className="ml-auto text-xs text-teal hover:underline">Change</button></div>}
          <div className="space-y-3">
            <input type="text" placeholder="Their name (e.g. Mum, Tom, Sarah)" value={name} onChange={e => setName(e.target.value)} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-teal" />
            <input type="email" placeholder="Their email address" value={email} onChange={e => setEmail(e.target.value)} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-teal" />
            {error && <p className="text-red-500 text-xs">{error}</p>}
            <button onClick={handleSend} disabled={!email || step === 'sending'} className="btn-primary w-full justify-center disabled:opacity-60">{step === 'sending' ? 'Sending...' : 'Send ' + (pkg?.name || '') + ' Invite →'}</button>
          </div>
        </div>
      )}
    </div>
  )
}

function FilledSeatCard({ slot }) {
  const [showResend, setShowResend] = useState(false)
  const [resendEmail, setResendEmail] = useState(slot.memberEmail || '')
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const handleResend = async () => {
    setSending(true)
    try {
      await fetch('/api/invite-member', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ seatId: slot.seatId, inviteEmail: resendEmail, packageId: slot.packageId }) })
      setSent(true); setSending(false); setShowResend(false)
    } catch (e) { setSending(false) }
  }
  const badge = slot.accepted ? { text: 'Active', cls: 'bg-green-50 text-green-700 border-green-200' } : (sent || slot.inviteSent) ? { text: 'Invite sent', cls: 'bg-amber-50 text-amber-700 border-amber-200' } : { text: 'Pending', cls: 'bg-gray-100 text-gray-500 border-gray-200' }
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0" style={{ background: slot.packagePale || '#E6F7F7' }}>{slot.packageEmoji || '📦'}</div>
          <div><h3 className="font-semibold text-navy">{slot.packageName}</h3><p className="text-sm text-navy/50">{slot.memberName || slot.memberEmail || 'Invited'}</p></div>
        </div>
        <span className={"chip text-xs border " + badge.cls}>{badge.text}</span>
      </div>
      {slot.accepted && <div className="mb-3"><div className="flex justify-between text-xs text-navy/50 mb-1"><span>Progress</span><span>{slot.progressPct}%</span></div><ProgressBar pct={slot.progressPct} color={slot.packageColor} /></div>}
      {!slot.accepted && !showResend && <div className="flex items-center justify-between mt-2"><p className="text-xs text-navy/40 truncate">{slot.memberEmail}</p><button onClick={() => setShowResend(true)} className="text-xs text-teal hover:underline ml-2 flex-shrink-0">{sent ? 'Sent ✓' : 'Resend invite'}</button></div>}
      {showResend && <div className="flex gap-2 mt-2"><input type="email" value={resendEmail} onChange={e => setResendEmail(e.target.value)} className="flex-1 border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-teal" /><button onClick={handleResend} disabled={sending} className="btn-primary text-sm py-2 px-4 disabled:opacity-60">{sending ? '...' : 'Send'}</button><button onClick={() => setShowResend(false)} className="text-navy/40 hover:text-navy text-sm px-1">×</button></div>}
    </div>
  )
}

export default function FamilyDashboardClient({ slots, seatLimit, usedSeats, acceptedCount, avgProgress, userName, packageOptions }) {
  const [, setRefresh] = useState(0)
  return (
    <div className="page-enter min-h-screen bg-slate">
      <div className="hero-bg noise relative py-14 overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <div className="chip bg-teal/15 text-teal border border-teal/25 mb-4">Family Dashboard</div>
          <h1 className="font-serif text-4xl text-white mb-2">{userName ? userName + "'s Family" : 'Family Overview'}</h1>
          <p className="text-white/60">5 flexible seats — assign any package to any family member, including duplicates</p>
        </div>
      </div>
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-6 py-6 grid grid-cols-4 gap-4">
          {[['Total Seats', seatLimit], ['Used', usedSeats + ' / ' + seatLimit], ['Active Members', acceptedCount], ['Avg Progress', acceptedCount > 0 ? avgProgress + '%' : '0%']].map(([l,v]) => (
            <div key={l} className="text-center"><div className="font-serif text-3xl text-navy font-bold">{v}</div><div className="text-sm text-navy/50 mt-1">{l}</div></div>
          ))}
        </div>
      </div>
      <div className="max-w-4xl mx-auto px-6 py-10">
        <div className="bg-teal/5 border border-teal/20 rounded-2xl p-5 mb-8">
          <p className="font-semibold text-navy mb-3 text-sm">How to invite a family member</p>
          <div className="grid md:grid-cols-4 gap-3 text-xs text-navy/70">
            <div className="flex gap-2"><span className="text-teal font-bold flex-shrink-0">1.</span><span>Click an available seat</span></div>
            <div className="flex gap-2"><span className="text-teal font-bold flex-shrink-0">2.</span><span>Choose which package to give them — any of the 5, including duplicates</span></div>
            <div className="flex gap-2"><span className="text-teal font-bold flex-shrink-0">3.</span><span>Enter their name and email, click Send</span></div>
            <div className="flex gap-2"><span className="text-teal font-bold flex-shrink-0">4.</span><span>They click their personal link, create a free account, and their course unlocks instantly</span></div>
          </div>
        </div>
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-serif text-2xl text-navy">Your 5 Seats</h2>
          {usedSeats < seatLimit && <p className="text-sm text-navy/50">{seatLimit - usedSeats} seat{seatLimit - usedSeats !== 1 ? 's' : ''} remaining</p>}
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {slots.map((slot, i) => slot.isEmpty
            ? <EmptySeatCard key={'e' + i} slotNumber={slot.slotNumber} packageOptions={packageOptions} onInviteSent={() => { setRefresh(k => k + 1); setTimeout(() => window.location.reload(), 1500); }} />
            : <FilledSeatCard key={slot.seatId} slot={slot} />
          )}
        </div>
        <div className="mt-8 bg-white rounded-2xl border border-gray-100 p-5">
          <p className="text-sm text-navy/60 leading-relaxed"><strong className="text-navy">Good to know:</strong> You can keep seats for yourself, send the same package to multiple people, and resend any invite that hasn’t been accepted yet.</p>
        </div>
      </div>
    </div>
  )
}

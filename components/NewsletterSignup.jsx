'use client'

import { useState } from 'react'

export default function NewsletterSignup() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle') // idle | loading | success | error
  const [message, setMessage] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    if (!email) return

    setStatus('loading')
    try {
      const res = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      const data = await res.json()
      if (res.ok) {
        setStatus('success')
        setMessage('You\'re subscribed! Check your inbox for a welcome email.')
        setEmail('')
      } else {
        setStatus('error')
        setMessage(data.error || 'Something went wrong. Please try again.')
      }
    } catch {
      setStatus('error')
      setMessage('Something went wrong. Please try again.')
    }
  }

  if (status === 'success') {
    return (
      <div className="mt-2">
        <p className="text-teal text-xs font-medium">{message}</p>
      </div>
    )
  }

  return (
    <div className="mt-2">
      <p className="text-white/30 text-xs font-semibold uppercase tracking-wider mb-3">Newsletter</p>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email"
          required
          className="bg-white/10 border border-white/10 rounded-lg px-3 py-2 text-xs text-white placeholder:text-white/30 focus:outline-none focus:border-teal/50 w-full"
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className="bg-teal text-white text-xs font-semibold px-4 py-2 rounded-lg hover:bg-teal/90 transition-colors whitespace-nowrap disabled:opacity-50"
        >
          {status === 'loading' ? '...' : 'Subscribe'}
        </button>
      </form>
      {status === 'error' && (
        <p className="text-red-400 text-xs mt-2">{message}</p>
      )}
      <p className="text-white/20 text-[10px] mt-2">Safety tips and updates. Unsubscribe anytime.</p>
    </div>
  )
}

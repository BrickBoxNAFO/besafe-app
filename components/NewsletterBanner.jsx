'use client'

import { useState } from 'react'

export default function NewsletterBanner() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState(null) // 'success' | 'error'

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email) return

    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      if (res.ok) {
        setStatus('success')
        setEmail('')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className="rounded-2xl p-6 md:p-8 text-center" style={{ background: 'linear-gradient(135deg, rgba(20,184,166,0.15), rgba(6,78,59,0.15))', border: '1px solid rgba(20,184,166,0.2)' }}>
      <h3 className="text-white text-lg font-semibold mb-2">Stay Updated</h3>
      <p className="text-white/60 text-sm mb-4 max-w-md mx-auto">
        Get notified about new courses, safety tips, and special offers.
      </p>

      {status === 'success' ? (
        <p className="text-teal text-sm font-medium">Thanks for subscribing!</p>
      ) : (
        <form onSubmit={handleSubmit} className="flex gap-2 max-w-sm mx-auto">
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Your email address"
            className="flex-1 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-teal/50"
            required
          />
          <button
            type="submit"
            className="px-5 py-2.5 rounded-xl bg-teal hover:bg-teal/90 text-white text-sm font-medium transition-colors shrink-0"
          >
            Subscribe
          </button>
        </form>
      )}
      {status === 'error' && <p className="text-red-400 text-xs mt-2">Something went wrong. Please try again.</p>}
    </div>
  )
}

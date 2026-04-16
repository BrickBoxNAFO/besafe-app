'use client'
import { useState } from 'react'

export default function NewsletterSignup() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email) return
    setStatus('sending')
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

  if (status === 'success') {
    return <p className="text-teal text-sm">Thanks for subscribing!</p>
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Your email"
        className="bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-sm text-white placeholder:text-white/30 flex-1 min-w-0 focus:outline-none focus:border-teal/50"
        required
      />
      <button
        type="submit"
        disabled={status === 'sending'}
        className="bg-teal text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-teal2 transition-colors disabled:opacity-50 flex-shrink-0"
      >
        {status === 'sending' ? '...' : 'Subscribe'}
      </button>
    </form>
  )
}

'use client'

import { useState } from 'react'

export default function NewsletterBanner() {
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
      if (!res.ok) throw new Error(data.error || 'Something went wrong.')
      setStatus('success')
      setMessage("You're subscribed! Check your inbox for a welcome email.")
      setEmail('')
    } catch (err) {
      setStatus('error')
      setMessage(err.message || 'Something went wrong. Please try again.')
    }
  }

  return (
    <section className="relative py-20 overflow-hidden px-4 sm:px-6 lg:px-8">
      <div className="absolute inset-x-4 sm:inset-x-6 lg:inset-x-8 inset-y-0 bg-navy rounded-2xl"></div>
      {/* Noise texture overlay */}
      <div className="noise" />

      <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
        <span className="chip mb-4">Free Advice & Resources</span>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Stay Safe, Stay Informed
        </h2>
        <p className="text-lg text-white/70 mb-8 max-w-xl mx-auto">
          Practical advice on safety, wellbeing, and life skills for families, delivered straight to your inbox. Tips you can use today to help your family live with more confidence. You will also be the first to hear about new packages, course updates, and any future offers. No spam, just content that matters.
        </p>

        {status === 'success' ? (
          <div className="inline-flex items-center gap-2 bg-teal/20 text-teal px-6 py-3 rounded-full text-sm font-medium">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            {message}
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              required
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-teal focus:border-transparent"
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="btn-primary whitespace-nowrap disabled:opacity-50"
            >
              {status === 'loading' ? 'Subscribing…' : 'Subscribe'}
            </button>
          </form>
        )}

        {status === 'error' && (
          <p className="mt-3 text-sm text-red-400">{message}</p>
        )}
      </div>
    </section>
  )
}

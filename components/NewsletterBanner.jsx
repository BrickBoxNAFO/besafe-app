'use client'

import { useState, useCallback } from 'react'
import TurnstileWidget from '@/components/TurnstileWidget'

export default function NewsletterBanner() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState(null) // 'success' | 'error'
  const [turnstileToken, setTurnstileToken] = useState(null)

  const handleTurnstileVerify = useCallback((token) => setTurnstileToken(token), [])
  const handleTurnstileExpire = useCallback(() => setTurnstileToken(null), [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email) return
    if (!turnstileToken) return

    try {
      const res = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, turnstileToken }),
      })
      if (res.ok) {
        setStatus('success')
        setEmail('')
        setTurnstileToken(null)
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className="rounded-2xl p-8 border border-teal/20 bg-white">
      <div className="max-w-2xl mx-auto">
        <h3 className="text-navy text-2xl font-serif font-bold mb-3">Free Advice & Resources</h3>
        <p className="text-navy/60 text-base leading-relaxed mb-6">
          Practical advice on safety, wellbeing, and life skills for families, delivered straight to your inbox. Tips you can use today to help your family live with more confidence. You will also be the first to hear about new packages, course updates, and any future offers. No spam, just content that matters.
        </p>

        {status === 'success' ? (
          <div className="bg-green-50 border border-green-200 rounded-xl p-4">
            <p className="text-green-800 font-medium">Thanks for subscribing! Check your email to confirm.</p>
          </div>
        ) : (
          <div>
            <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-3">
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="flex-1 px-4 py-3 rounded-xl border border-gray-200 bg-white text-navy text-base placeholder:text-navy/40 focus:outline-none focus:ring-2 focus:ring-teal/50 focus:border-transparent"
                required
              />
              <button
                type="submit"
                disabled={!turnstileToken}
                className="px-8 py-3 rounded-xl bg-teal hover:bg-teal/90 text-white font-semibold transition-colors whitespace-nowrap disabled:opacity-60"
              >
                Subscribe
              </button>
            </form>
            <TurnstileWidget
              onVerify={handleTurnstileVerify}
              onExpire={handleTurnstileExpire}
              className="mt-3"
            />
          </div>
        )}
        {status === 'error' && <p className="text-red-600 text-sm mt-3">Something went wrong. Please try again.</p>}
      </div>
    </div>
  )
}

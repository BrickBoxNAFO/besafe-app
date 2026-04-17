'use client'
import { useState, useCallback } from 'react'
import Link from 'next/link'
import NewsletterBanner from '@/components/NewsletterBanner'
import TurnstileWidget from '@/components/TurnstileWidget'

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', orderRef: '', message: '' })
  const [status, setStatus] = useState(null) // null | 'sending' | 'sent' | 'error'
  const [ticketRef, setTicketRef] = useState(null)
  const [turnstileToken, setTurnstileToken] = useState(null)

  const handleTurnstileVerify = useCallback((token) => setTurnstileToken(token), [])
  const handleTurnstileExpire = useCallback(() => setTurnstileToken(null), [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.email || !form.message) return
    if (!turnstileToken) return
    setStatus('sending')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, turnstileToken }),
      })
      const data = await res.json()
      if (data.success) {
        setStatus('sent')
        setTicketRef(data.ticketRef)
        setForm({ name: '', email: '', orderRef: '', message: '' })
        setTurnstileToken(null)
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className="page-enter">
      <section className="hero-bg noise relative py-24 overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <div className="chip bg-teal/15 text-teal border border-teal/25 mb-5">Contact Us</div>
          <h1 className="font-serif text-5xl lg:text-6xl text-white mb-5">
            We're Here<br />
            <span className="italic text-teal">to Help.</span>
          </h1>
          <p className="text-white/70 text-lg max-w-2xl leading-relaxed">
            Whether you have a question about our courses, need help with your account, or just want to say hello, our team is ready to assist you.
          </p>
        </div>
      </section>

      <section className="section-light py-20">
        <div className="max-w-4xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div>
              <div className="chip bg-teal/10 text-teal border border-teal/20 mb-5">Get in Touch</div>
              <h2 className="font-serif text-4xl text-navy mb-5">Send Us a Message</h2>

              {status === 'sent' ? (
                <div className="bg-teal/5 border border-teal/20 rounded-2xl p-8 text-center">
                  <div className="text-4xl mb-4">✅</div>
                  <h3 className="font-serif text-2xl text-navy mb-2">Message Sent</h3>
                  <p className="text-navy/60 mb-2">
                    We've sent a confirmation to your email with reference <strong className="text-navy">{ticketRef}</strong>.
                  </p>
                  <p className="text-navy/50 text-sm">
                    Our team typically responds within 1 to 2 business days, Monday to Friday.
                  </p>
                  <button
                    onClick={() => { setStatus(null); setTicketRef(null); setTurnstileToken(null) }}
                    className="btn-ghost mt-6"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-navy text-sm font-medium mb-1">Your Name</label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                      className="w-full rounded-xl border border-gray-200 px-4 py-3 text-navy focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal"
                      placeholder="Optional"
                    />
                  </div>
                  <div>
                    <label className="block text-navy text-sm font-medium mb-1">Email Address <span className="text-red-400">*</span></label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                      className="w-full rounded-xl border border-gray-200 px-4 py-3 text-navy focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal"
                      placeholder="your@email.com"
                    />
                  </div>
                  <div>
                    <label className="block text-navy text-sm font-medium mb-1">Order Number</label>
                    <input
                      type="text"
                      value={form.orderRef}
                      onChange={e => setForm(f => ({ ...f, orderRef: e.target.value }))}
                      className="w-full rounded-xl border border-gray-200 px-4 py-3 text-navy focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal"
                      placeholder="Optional — helps us find your account faster"
                    />
                  </div>
                  <div>
                    <label className="block text-navy text-sm font-medium mb-1">Message <span className="text-red-400">*</span></label>
                    <textarea
                      required
                      rows={5}
                      value={form.message}
                      onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                      className="w-full rounded-xl border border-gray-200 px-4 py-3 text-navy focus:outline-none focus:ring-2 focus:ring-teal/30 focus:border-teal resize-none"
                      placeholder="How can we help?"
                    />
                  </div>

                  <TurnstileWidget
                    onVerify={handleTurnstileVerify}
                    onExpire={handleTurnstileExpire}
                  />

                  {status === 'error' && (
                    <div className="bg-red-50 border border-red-100 rounded-xl px-4 py-3">
                      <p className="text-red-600 text-sm">Something went wrong. You can also email us directly at <a href="mailto:Support@HomeSafeEducation.com" className="underline">Support@HomeSafeEducation.com</a></p>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'sending' || !turnstileToken}
                    className="btn-primary w-full justify-center disabled:opacity-60"
                  >
                    {status === 'sending' ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              )}

              <p className="text-navy/40 text-xs mt-4">
                Or email us directly at <a href="mailto:Support@HomeSafeEducation.com" className="text-teal">Support@HomeSafeEducation.com</a>
              </p>
            </div>

            {/* Info cards */}
            <div className="space-y-6">
              <div className="bg-slate rounded-2xl p-6">
                <div className="text-2xl mb-3">📧</div>
                <p className="font-semibold text-navy text-sm mb-1">Email Support</p>
                <p className="text-navy/50 text-xs leading-relaxed">For all enquiries including account issues, course access, refund requests, and general questions. We aim to respond within 1 to 2 business days.</p>
              </div>
              <div className="bg-slate rounded-2xl p-6">
                <div className="text-2xl mb-3">💳</div>
                <p className="font-semibold text-navy text-sm mb-1">Billing and Refunds</p>
                <p className="text-navy/50 text-xs leading-relaxed">If you need help with a payment or would like to request a refund, include your order number in your message.</p>
              </div>
              <div className="bg-slate rounded-2xl p-6">
                <div className="text-2xl mb-3">👨‍👩‍👧‍👦</div>
                <p className="font-semibold text-navy text-sm mb-1">Family Bundle Help</p>
                <p className="text-navy/50 text-xs leading-relaxed">Need help inviting family members, managing seats, or understanding how the bundle works? We are happy to walk you through it.</p>
              </div>
              <div className="bg-slate rounded-2xl p-6">
                <div className="text-2xl mb-3">🔒</div>
                <p className="font-semibold text-navy text-sm mb-1">Privacy and Data Requests</p>
                <p className="text-navy/50 text-xs leading-relaxed">To exercise your rights under GDPR, including data access, correction, or deletion, please email us. We will respond within 30 days.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <NewsletterBanner />

      <section className="section-light py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="font-serif text-4xl text-navy mb-5">Still Have Questions?</h2>
          <p className="text-navy/60 text-lg max-w-xl mx-auto mb-8">We are always happy to hear from you. No question is too small.</p>
          <a href="mailto:Support@HomeSafeEducation.com" className="btn-primary">
            Email Us Now
          </a>
        </div>
      </section>
    </div>
  )
}

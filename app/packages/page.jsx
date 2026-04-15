'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { PACKAGES, COURSES } from '@/lib/data'

const FAQS = [
  { q: 'What if I want a refund?', a: 'We offer a full refund within 7 days of purchase, provided that less than 20% of any course has been completed. Once you have progressed beyond 20% of a course, the purchase is considered fulfilled and a refund is no longer available. To request a refund within this window, simply contact us.' },
  { q: 'Can I share access with family members?', a: 'Each purchase covers one person. For multiple family members, the Family Safety Bundle gives you 5 packages — one per person — at a significantly reduced price.' },
  { q: 'How long do I have access?', a: 'Lifetime access. Once you purchase a package, it is yours forever. Come back to any lesson at any time.' },
  { q: 'Is there a subscription?', a: 'No. Every package is a one-time payment. There are no recurring charges, hidden fees, or subscriptions.' },
  { q: 'What age is the Growing Minds package suitable for?', a: 'Growing Minds is designed for children aged 3 to 12. The content is written and structured to be age-appropriate and engaging for this age group.' },
]

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border border-gray-100 rounded-xl overflow-hidden">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between p-5 text-left bg-white hover:bg-slate transition-colors">
        <span className="font-semibold text-navy text-sm">{q}</span>
        <span className="text-teal text-lg ml-4 flex-shrink-0">{open ? '×' : '+'}</span>
      </button>
      {open && <div className="bg-white px-5 pb-5 text-navy/70 text-sm leading-relaxed border-t border-gray-50">{a}</div>}
    </div>
  )
}

function BuyButton({ packageId, label, className }) {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleBuy = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/create-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ packageId }),
      })
      const data = await res.json()
      if (data.url) {
        window.location.href = data.url
      } else if (data.error === 'Unauthorised') {
        router.push('/login?redirect=/packages')
      } else {
        alert(data.error || 'Something went wrong. Please try again.')
      }
    } catch (e) {
      alert('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <button onClick={handleBuy} disabled={loading} className={className}>
      {loading ? 'Loading...' : label}
    </button>
  )
}

export default function PackagesPage() {
  return (
    <div className="page-enter">
      {/* Header */}
      <div className="hero-bg noise relative py-20 overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 text-center relative z-10">
          <div className="chip bg-teal/15 text-teal border border-teal/25 mb-5">Choose Your Package</div>
          <h1 className="font-serif text-5xl text-white mb-4">Complete Package Access</h1>
          <p className="text-white/60 text-lg max-w-xl mx-auto">
            $29.99 per package — 5 Subjects per course, 50 Lessons per package, 250 quiz questions total.
            <br /><span className="text-teal font-medium">Or any 5 Packages for $99.99.</span>
          </p>
        </div>
      </div>

      {/* Package cards */}
      <section className="section-slate py-16">
        <div className="max-w-6xl mx-auto px-6 space-y-8">
          {PACKAGES.map(pkg => {
            const courses = COURSES.filter(c => c.pkg === pkg.id)
            return (
              <div key={pkg.id} id={pkg.id} className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                <div className="p-8 flex flex-col lg:flex-row items-start gap-8">
                  {/* Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl" style={{ background: pkg.pale }}>
                        {pkg.emoji}
                      </div>
                      <div>
                        <h2 className="font-serif text-2xl text-navy">{pkg.name}</h2>
                        <p className="text-sm font-medium" style={{ color: pkg.color }}>{pkg.tag}</p>
                      </div>
                    </div>
                    <p className="text-navy/60 text-sm leading-relaxed mb-5">{pkg.desc}</p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
                      {[['5', 'Subjects'], ['50', 'Lessons'], ['250', 'Quiz Qs'], ['$29.99', 'One-time']].map(([n, l]) => (
                        <div key={l} className="text-center bg-slate rounded-xl p-3">
                          <div className="font-bold text-navy text-lg">{n}</div>
                          <div className="text-navy/50 text-xs">{l}</div>
                        </div>
                      ))}
                    </div>
                    <div className="grid md:grid-cols-2 gap-2">
                      {courses.map(c => (
                        <div key={c.id} className="flex items-center gap-2 text-sm text-navy/60">
                          <span style={{ color: pkg.color }}>✓</span>
                          <span>{c.title}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Buy */}
                  <div className="lg:w-56 flex flex-col items-start lg:items-center gap-4">
                    <div className="text-center">
                      <div className="font-serif text-4xl font-bold text-navy">$29.99</div>
                      <div className="text-navy/40 text-xs mt-1">one-time payment</div>
                    </div>
                    <BuyButton
                      packageId={pkg.id}
                      label={`Get ${pkg.name} →`}
                      className="w-full text-center text-white font-semibold py-3 px-5 rounded-xl transition-all hover:opacity-90"
                      style={{ background: pkg.color }}
                    />
                    <p className="text-navy/40 text-xs text-center">Instant access. No subscription.</p>
                  </div>
                </div>
              </div>
            )
          })}

          {/* Bundle */}
          <div id="bundle" className="bg-navy rounded-2xl p-8 text-white">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
              <div>
                <div className="chip bg-teal/20 text-teal border border-teal/30 mb-3">Best Value</div>
                <h2 className="font-serif text-3xl mb-2">Family Safety Bundle</h2>
                <p className="text-white/60 mb-4">Any 5 packages for your whole family. Mix and match across Growing Minds, Nest Breaking, Roaming Free, Aging Wisdom, and Family Anchor.</p>
                <div className="flex flex-wrap gap-3">
                  {PACKAGES.map(p => (
                    <span key={p.id} className="text-sm bg-white/10 rounded-lg px-3 py-1">{p.emoji} {p.name}</span>
                  ))}
                </div>
              </div>
              <div className="flex flex-col items-start lg:items-end gap-3">
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="font-serif text-4xl font-bold">$99.99</span>
                    <span className="text-white/40 line-through">$149.95</span>
                  </div>
                  <div className="text-teal text-sm font-medium">Save $49.96</div>
                </div>
                <BuyButton
                  packageId="bundle"
                  label="Get the Bundle →"
                  className="bg-teal text-white font-semibold py-3 px-7 rounded-xl hover:bg-teal2 transition-colors whitespace-nowrap"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-light py-16">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="font-serif text-3xl text-navy text-center mb-10">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {FAQS.map((f, i) => <FAQItem key={i} q={f.q} a={f.a} />)}
          </div>
        </div>
      </section>
    </div>
  )
}

import Link from 'next/link'

// Numok (Railway) runs the affiliate dashboard. Keep these URLs in one place
// so we can flip them if/when we move behind the homesafeeducation.com custom
// domain or add a Next.js rewrite layer.
const NUMOK_BASE = 'https://numok-production.up.railway.app'
const AFFILIATE_LOGIN_URL = `${NUMOK_BASE}/login`
const AFFILIATE_REGISTER_URL = `${NUMOK_BASE}/register`

export const metadata = {
  title: 'Affiliate Programme | HomeSafeEducation',
  description:
    'Earn a commission by sharing HomeSafeEducation\u2019s safety and life-skills courses with your audience. Transparent tracking, monthly payouts, family-friendly brand.',
  alternates: { canonical: '/affiliates' },
  openGraph: {
    title: 'HomeSafeEducation Affiliate Programme',
    description:
      'Earn commission sharing safety and life-skills courses for every generation.',
    type: 'website',
    url: 'https://homesafeeducation.com/affiliates',
  },
}

export default function AffiliatesPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0B1F3A] via-[#122a4d] to-[#0B1F3A] text-white">
        <div className="absolute inset-0 opacity-20" aria-hidden="true">
          <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-[#0EA5A0] blur-3xl" />
          <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-[#E8703A] blur-3xl" />
        </div>
        <div className="relative max-w-5xl mx-auto px-6 py-20 md:py-28">
          <div className="inline-block bg-teal-500/15 text-[#0EA5A0] border border-[#0EA5A0]/30 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wider mb-6">
            Affiliate Programme
          </div>
          <h1 className="font-serif text-4xl md:text-6xl font-bold leading-[1.08] mb-6 tracking-tight">
            Earn by sharing education
            <span className="block italic text-[#0EA5A0] mt-1">families actually want.</span>
          </h1>
          <p className="text-white/70 text-lg md:text-xl leading-relaxed max-w-2xl mb-10">
            HomeSafeEducation produces expert-led safety and life-skills courses for
            every age group &mdash; children, teenagers, young adults, travellers,
            parents, and older adults. Join the affiliate programme and earn a
            commission on every course package a visitor from your audience buys.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href={AFFILIATE_REGISTER_URL}
              className="inline-flex items-center gap-2 bg-[#0EA5A0] hover:bg-[#0d8f8a] text-white font-semibold text-[15px] px-7 py-3.5 rounded-xl transition-colors shadow-lg shadow-[#0EA5A0]/20"
            >
              Become an Affiliate
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </a>
            <a
              href={AFFILIATE_LOGIN_URL}
              className="inline-flex items-center gap-2 bg-white/5 hover:bg-white/10 text-white font-semibold text-[15px] px-7 py-3.5 rounded-xl transition-colors ring-1 ring-white/20"
            >
              Affiliate Sign In
            </a>
          </div>
        </div>
      </section>

      {/* Value props */}
      <section className="max-w-5xl mx-auto px-6 py-16 md:py-20">
        <h2 className="font-serif text-3xl md:text-4xl text-[#0B1F3A] mb-4 text-center">
          Why partner with HomeSafeEducation
        </h2>
        <p className="text-slate-600 text-center max-w-2xl mx-auto mb-12">
          A family-friendly product with broad appeal, transparent reporting, and
          real commission on every package sold.
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl ring-1 ring-slate-200 p-7 shadow-sm">
            <div className="w-12 h-12 rounded-xl bg-teal-50 flex items-center justify-center mb-5 ring-1 ring-teal-100">
              <svg className="w-6 h-6 text-[#0EA5A0]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            </div>
            <h3 className="font-serif text-xl text-[#0B1F3A] mb-2">Generous commissions</h3>
            <p className="text-slate-600 leading-relaxed">
              Earn a share of every course package purchased through your unique
              referral link. Payouts are monthly, tracked transparently in your
              affiliate dashboard.
            </p>
          </div>

          <div className="bg-white rounded-2xl ring-1 ring-slate-200 p-7 shadow-sm">
            <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center mb-5 ring-1 ring-orange-100">
              <svg className="w-6 h-6 text-[#E8703A]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="font-serif text-xl text-[#0B1F3A] mb-2">Broad audience</h3>
            <p className="text-slate-600 leading-relaxed">
              Seven packages spanning children aged four through older adults &mdash;
              something to recommend to any family, educator, carer, or community
              you work with.
            </p>
          </div>

          <div className="bg-white rounded-2xl ring-1 ring-slate-200 p-7 shadow-sm">
            <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center mb-5 ring-1 ring-indigo-100">
              <svg className="w-6 h-6 text-[#2B3480]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="font-serif text-xl text-[#0B1F3A] mb-2">Real-time tracking</h3>
            <p className="text-slate-600 leading-relaxed">
              Your affiliate dashboard shows clicks, conversions, and earnings in
              real time. Duplicate-conversion and self-referral protection are
              built in &mdash; you only see legitimate activity.
            </p>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-white border-y border-slate-200">
        <div className="max-w-5xl mx-auto px-6 py-16 md:py-20">
          <h2 className="font-serif text-3xl md:text-4xl text-[#0B1F3A] mb-4 text-center">
            How it works
          </h2>
          <p className="text-slate-600 text-center max-w-2xl mx-auto mb-12">
            Three simple steps &mdash; sign up, share your link, get paid.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                n: '1',
                title: 'Register',
                body:
                  'Create your affiliate account in the partner portal. Approval usually takes 1\u20132 business days.',
              },
              {
                n: '2',
                title: 'Share your link',
                body:
                  'Share your unique referral link on your blog, social, newsletter, or directly with families.',
              },
              {
                n: '3',
                title: 'Earn commission',
                body:
                  'Every time a referral leads to a course-package purchase, you earn a commission. Payouts monthly.',
              },
            ].map(step => (
              <div key={step.n} className="relative">
                <div className="absolute -top-4 -left-2 w-12 h-12 rounded-full bg-gradient-to-br from-[#0EA5A0] to-[#0B1F3A] text-white font-bold text-xl flex items-center justify-center shadow-lg ring-4 ring-white">
                  {step.n}
                </div>
                <div className="bg-slate-50 ring-1 ring-slate-200 rounded-2xl pt-10 pb-6 px-6 h-full">
                  <h3 className="font-serif text-xl text-[#0B1F3A] mb-3">{step.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{step.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-4xl mx-auto px-6 py-16 md:py-20">
        <div className="bg-gradient-to-br from-[#0B1F3A] via-[#122a4d] to-[#0B1F3A] rounded-3xl overflow-hidden shadow-xl">
          <div className="px-8 py-12 md:px-12 md:py-16 text-center">
            <h2 className="font-serif text-3xl md:text-4xl text-white mb-4 leading-tight">
              Ready to start earning?
            </h2>
            <p className="text-white/70 text-lg max-w-xl mx-auto mb-8">
              Sign up takes a minute. You can start sharing your referral link
              the moment your account is approved.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a
                href={AFFILIATE_REGISTER_URL}
                className="inline-flex items-center gap-2 bg-[#0EA5A0] hover:bg-[#0d8f8a] text-white font-semibold text-[15px] px-7 py-3.5 rounded-xl transition-colors shadow-lg shadow-[#0EA5A0]/20"
              >
                Create my affiliate account
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </a>
              <a
                href={AFFILIATE_LOGIN_URL}
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/15 text-white font-semibold text-[15px] px-7 py-3.5 rounded-xl transition-colors ring-1 ring-white/20"
              >
                Already a partner &mdash; sign in
              </a>
            </div>
            <p className="text-white/40 text-xs mt-6">
              Questions? Email <Link href="/contact" className="text-white/60 underline hover:text-white">the HomeSafeEducation team</Link>.
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}

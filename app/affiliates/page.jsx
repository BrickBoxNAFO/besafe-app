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
    'Earn 20% commission on every sale by sharing HomeSafeEducation\u2019s safety and life-skills courses. Transparent tracking, monthly payouts, family-friendly brand.',
  alternates: { canonical: '/affiliates' },
  openGraph: {
    title: 'HomeSafeEducation Affiliate Programme',
    description:
      'Earn 20% commission sharing safety and life-skills courses for every generation.',
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
            20% Commission Per Sale
          </div>
          <h1 className="font-serif text-4xl md:text-6xl font-bold leading-[1.08] mb-6 tracking-tight">
            Earn 20% on every sale
            <span className="block italic text-[#0EA5A0] mt-1">you send our way.</span>
          </h1>
          <p className="text-white/70 text-lg md:text-xl leading-relaxed max-w-2xl mb-10">
            HomeSafeEducation produces expert-led safety and life-skills courses for
            every age group: children, teenagers, young adults, travellers, parents,
            and older adults. Join the affiliate programme and earn 20% of the sale
            amount on every course package a visitor from your audience buys.
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

      {/* Commission Examples */}
      <section className="max-w-5xl mx-auto px-6 py-16 md:py-20">
        <h2 className="font-serif text-3xl md:text-4xl text-[#0B1F3A] mb-4 text-center">
          What you can earn per sale
        </h2>
        <p className="text-slate-600 text-center max-w-2xl mx-auto mb-12">
          Commission is 20% of the sale amount on every successful referral. The
          more someone buys, the more you earn. Wherever in the world your referral
          is, whatever currency they pay in, your 20% is paid out to you.
        </p>

        <div className="max-w-2xl mx-auto bg-white rounded-3xl ring-1 ring-slate-200 p-8 md:p-10 shadow-sm">
          <div className="text-center mb-8">
            <div className="text-xs font-semibold uppercase tracking-wider text-[#0EA5A0] mb-3">Earnings range per sale</div>
            <div className="text-5xl md:text-6xl font-bold text-[#0B1F3A] leading-none">
              $7 <span className="text-slate-400 font-medium text-3xl md:text-4xl">to</span> $44
            </div>
            <div className="text-sm text-slate-500 mt-3">per successful referral</div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 pt-6 border-t border-slate-100">
            <div className="bg-slate-50 rounded-xl p-5">
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">Smallest package</div>
              <div className="text-2xl font-bold text-[#0B1F3A]">$34.99 sale</div>
              <div className="text-sm text-slate-600 mt-2">You earn <span className="font-semibold text-[#0EA5A0]">$7.00</span></div>
            </div>
            <div className="bg-slate-50 rounded-xl p-5">
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">Complete Library</div>
              <div className="text-2xl font-bold text-[#0B1F3A]">$219.99 sale</div>
              <div className="text-sm text-slate-600 mt-2">You earn <span className="font-semibold text-[#0EA5A0]">$44.00</span></div>
            </div>
          </div>
        </div>

        <div className="max-w-3xl mx-auto mt-10 bg-gradient-to-br from-[#0EA5A0]/10 to-[#0B1F3A]/5 rounded-2xl ring-1 ring-[#0EA5A0]/20 p-6 md:p-7 text-center">
          <div className="text-[#0B1F3A] font-semibold text-lg mb-2">
            Anyone, anywhere in the world counts.
          </div>
          <p className="text-slate-600 leading-relaxed">
            HomeSafeEducation sells worldwide. If someone clicks your link and buys
            a plan, whether they are in New York, London, Sydney, Berlin, or
            anywhere else, you earn your 20% commission on that sale.
          </p>
        </div>
      </section>

      {/* Value props */}
      <section className="bg-white border-y border-slate-200">
        <div className="max-w-5xl mx-auto px-6 py-16 md:py-20">
          <h2 className="font-serif text-3xl md:text-4xl text-[#0B1F3A] mb-4 text-center">
            Why partner with HomeSafeEducation
          </h2>
          <p className="text-slate-600 text-center max-w-2xl mx-auto mb-12">
            A family-friendly product with broad appeal, transparent reporting, and a
            flat 20% commission on every package sold.
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-slate-50 rounded-2xl ring-1 ring-slate-200 p-7 shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-teal-50 flex items-center justify-center mb-5 ring-1 ring-teal-100">
                <svg className="w-6 h-6 text-[#0EA5A0]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <h3 className="font-serif text-xl text-[#0B1F3A] mb-2">Flat 20% commission</h3>
              <p className="text-slate-600 leading-relaxed">
                Earn 20% of the sale amount on every course package purchased through
                your unique referral link. Payouts go out monthly, tracked
                transparently in your affiliate dashboard.
              </p>
            </div>

            <div className="bg-slate-50 rounded-2xl ring-1 ring-slate-200 p-7 shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center mb-5 ring-1 ring-orange-100">
                <svg className="w-6 h-6 text-[#E8703A]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="font-serif text-xl text-[#0B1F3A] mb-2">Broad audience</h3>
              <p className="text-slate-600 leading-relaxed">
                Seven packages spanning children aged four through older adults. There
                is something to recommend to any family, educator, carer, or community
                you know.
              </p>
            </div>

            <div className="bg-slate-50 rounded-2xl ring-1 ring-slate-200 p-7 shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center mb-5 ring-1 ring-indigo-100">
                <svg className="w-6 h-6 text-[#2B3480]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="font-serif text-xl text-[#0B1F3A] mb-2">Real-time tracking</h3>
              <p className="text-slate-600 leading-relaxed">
                Your affiliate dashboard shows clicks, conversions, and earnings in
                real time. Duplicate-conversion and self-referral protection are
                built in, so you only see legitimate activity.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="max-w-5xl mx-auto px-6 py-16 md:py-20">
        <h2 className="font-serif text-3xl md:text-4xl text-[#0B1F3A] mb-4 text-center">
          How it works
        </h2>
        <p className="text-slate-600 text-center max-w-2xl mx-auto mb-12">
          Someone clicks your link and purchases, you get paid. It really is that simple.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              n: '1',
              title: 'Sign up',
              body:
                'Register with your name and email. Anyone 18 or over can apply. You will also need a free Stripe account (takes a few minutes) so we can send your payouts.',
            },
            {
              n: '2',
              title: 'Share your link anywhere',
              body:
                'Share your unique referral link anywhere online, whether that is WhatsApp, Facebook, Instagram, TikTok, email, Reddit, a newsletter, or just messaging a friend. No website or following required.',
            },
            {
              n: '3',
              title: 'Get paid',
              body:
                'Someone clicks your link and purchases, 14 day passes with no refund, you get paid. You earn 20% of the sale amount on every successful referral, paid out monthly.',
            },
          ].map(step => (
            <div key={step.n} className="relative">
              <div className="absolute -top-4 -left-2 w-12 h-12 rounded-full bg-gradient-to-br from-[#0EA5A0] to-[#0B1F3A] text-white font-bold text-xl flex items-center justify-center shadow-lg ring-4 ring-white">
                {step.n}
              </div>
              <div className="bg-white ring-1 ring-slate-200 rounded-2xl pt-10 pb-6 px-6 h-full shadow-sm">
                <h3 className="font-serif text-xl text-[#0B1F3A] mb-3">{step.title}</h3>
                <p className="text-slate-600 leading-relaxed">{step.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Who can apply */}
      <section className="bg-white border-y border-slate-200">
        <div className="max-w-4xl mx-auto px-6 py-16 md:py-20">
          <h2 className="font-serif text-3xl md:text-4xl text-[#0B1F3A] mb-4 text-center">
            Who can join
          </h2>
          <p className="text-slate-600 text-center max-w-2xl mx-auto mb-10">
            The programme is open to anyone who wants to recommend safety and
            life-skills education to the people around them.
          </p>

          <div className="bg-slate-50 rounded-2xl ring-1 ring-slate-200 p-7">
            <ul className="space-y-4 text-slate-700">
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#0EA5A0]/10 text-[#0EA5A0] flex items-center justify-center text-sm font-bold mt-0.5">&#10003;</span>
                <span><strong className="text-[#0B1F3A]">Anyone 18 or over.</strong> You must be 18+ to join because payouts run through Stripe, which requires you to be of legal age in your country.</span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#0EA5A0]/10 text-[#0EA5A0] flex items-center justify-center text-sm font-bold mt-0.5">&#10003;</span>
                <span><strong className="text-[#0B1F3A]">No audience size required.</strong> You do not need a blog, a newsletter, or thousands of followers. If you know families, carers, teachers, or anyone who wants safer kids, teens, travellers, or parents, you can share your link.</span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#0EA5A0]/10 text-[#0EA5A0] flex items-center justify-center text-sm font-bold mt-0.5">&#10003;</span>
                <span><strong className="text-[#0B1F3A]">A free Stripe account for payouts.</strong> We pay through Stripe, so you will need to sign up with Stripe (it is free) so we can send your commission. Creating it takes a few minutes.</span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#0EA5A0]/10 text-[#0EA5A0] flex items-center justify-center text-sm font-bold mt-0.5">&#10003;</span>
                <span><strong className="text-[#0B1F3A]">Just a name and email to sign up.</strong> No long application and no approval queue. Register, grab your link, start sharing.</span>
              </li>
            </ul>
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
              Sign up with your name and email. Connect a free Stripe account for
              payouts. Start sharing your link and earning 20% on every sale.
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
                Already a partner? Sign in
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

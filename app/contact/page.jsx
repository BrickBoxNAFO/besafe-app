import Link from 'next/link'
import NewsletterBanner from '@/components/NewsletterBanner'

export const metadata = {
  title: 'Contact Us | HomeSafeEducation',
  description: 'Get in touch with the HomeSafeEducation support team. We are here to help with any questions about our safety courses, your account, or anything else.',
}

export default function ContactPage() {
  return (
    <div className="page-enter">
      <section className="hero-bg noise relative py-24 overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <div className="chip bg-teal/15 text-teal border border-teal/25 mb-5">Contact Us</div>
          <h1 className="font-serif text-5xl lg:text-6xl text-white mb-5">
            We’re Here<br />
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
            <div>
              <div className="chip bg-teal/10 text-teal border border-teal/20 mb-5">Get in Touch</div>
              <h2 className="font-serif text-4xl text-navy mb-5">Send Us a Message</h2>
              <p className="text-navy/60 leading-relaxed mb-6">
                The quickest way to reach us is by email. Our support team typically responds within 1 to 2 business days, Monday to Friday.
              </p>
              <a href="mailto:Support@HomeSafeEducation.com" className="btn-primary inline-block">
                Email Support
              </a>
              <div className="mt-8 bg-slate rounded-2xl p-6">
                <p className="font-semibold text-navy text-sm mb-2">Support Email</p>
                <a href="mailto:Support@HomeSafeEducation.com" className="text-teal font-medium">
                  Support@HomeSafeEducation.com
                </a>
                <p className="text-navy/50 text-sm mt-4 leading-relaxed">
                  Please include as much detail as possible in your message so we can help you as quickly as we can. If your query relates to a specific order, including your order number is always helpful.
                </p>
              </div>
            </div>
            <div className="space-y-6">
              <div className="bg-slate rounded-2xl p-6">
                <div className="text-2xl mb-3">📧</div>
                <p className="font-semibold text-navy text-sm mb-1">Email Support</p>
                <p className="text-navy/50 text-xs leading-relaxed">For all enquiries including account issues, course access, refund requests, and general questions. We aim to respond within 1 to 2 business days.</p>
              </div>
              <div className="bg-slate rounded-2xl p-6">
                <div className="text-2xl mb-3">💳</div>
                <p className="font-semibold text-navy text-sm mb-1">Billing and Refunds</p>
                <p className="text-navy/50 text-xs leading-relaxed">If you need help with a payment or would like to request a refund, email us with your order number.</p>
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


      {/* Newsletter Banner */}
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

export const metadata = { title: 'Terms & Conditions — The Be Safe Group' }

export default function TermsPage() {
  return (
    <div className="page-enter max-w-3xl mx-auto px-6 py-16">
      <h1 className="font-serif text-4xl text-navy mb-2">Terms & Conditions</h1>
      <p className="text-navy/40 text-sm mb-10">Last updated: {new Date().getFullYear()}</p>

      <div className="prose text-navy/70 leading-relaxed space-y-8">
        {[
          { h: '1. Acceptance of Terms', p: 'By creating an account or purchasing a package from The Be Safe Group, you agree to be bound by these Terms & Conditions. If you do not agree, please do not use our services.' },
          { h: '2. Products and Access', p: 'Each package purchase grants you lifetime access to the course content within that package for personal use only. Access is tied to your individual account and may not be shared, transferred, or resold.' },
          { h: '3. Payment', p: 'All payments are processed securely through Stripe. Prices are displayed in US Dollars (USD). By completing a purchase, you authorise the charge to your payment method.' },
          { h: '4. Refund Policy', p: 'We offer a full refund within 7 days of purchase, provided that less than 20% of any course within the package has been completed. Once you have progressed beyond 20% of any course, the purchase is considered fulfilled and a refund is no longer available. To request a refund within the eligibility window, contact us at support@thebesafegroup.com.' },
          { h: '5. Intellectual Property', p: 'All course content, materials, and resources provided by The Be Safe Group are protected by copyright. You may not copy, reproduce, distribute, or create derivative works from our content without prior written permission.' },
          { h: '6. Acceptable Use', p: 'You agree to use our services for lawful personal purposes only. You must not attempt to gain unauthorised access to any part of our systems, share your account credentials, or use our content for commercial purposes without a licence.' },
          { h: '7. Disclaimer', p: 'Our courses provide general safety education and awareness. The content is not a substitute for professional legal, medical, or emergency advice. In any emergency, contact the relevant emergency services in your country immediately.' },
          { h: '8. Limitation of Liability', p: 'To the maximum extent permitted by law, The Be Safe Group shall not be liable for any indirect, incidental, or consequential damages arising from your use of our services or reliance on our content.' },
          { h: '9. Changes to Terms', p: 'We reserve the right to update these Terms & Conditions at any time. Continued use of our services following notification of changes constitutes your acceptance of the updated terms.' },
          { h: '10. Contact', p: 'For any questions regarding these terms, contact us at support@thebesafegroup.com.' },
        ].map(s => (
          <div key={s.h}>
            <h2 className="font-semibold text-navy text-lg mb-2">{s.h}</h2>
            <p>{s.p}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export const metadata = { title: 'Privacy Policy — The Be Safe Group' }

export default function PrivacyPage() {
  return (
    <div className="page-enter max-w-3xl mx-auto px-6 py-16">
      <h1 className="font-serif text-4xl text-navy mb-2">Privacy Policy</h1>
      <p className="text-navy/40 text-sm mb-10">Last updated: {new Date().getFullYear()}</p>

      <div className="prose text-navy/70 leading-relaxed space-y-8">
        {[
          { h: '1. Information We Collect', p: 'We collect information you provide directly: your name, email address, and password when you register. We collect payment information through Stripe (we do not store card details ourselves). We collect usage data including which lessons you have completed and your quiz scores, in order to track and display your progress.' },
          { h: '2. How We Use Your Information', p: 'We use your information to: provide and maintain your account; process payments and send purchase confirmations; track your learning progress; send transactional emails (purchase receipts, password resets, course completions); and improve our courses and services. We do not sell your personal data to third parties.' },
          { h: '3. Data Storage', p: 'Your data is stored securely using Supabase, a cloud database provider. Data is encrypted at rest and in transit. We retain your data for as long as your account is active. You may request deletion of your account and data at any time.' },
          { h: '4. Third-Party Services', p: 'We use the following third-party services: Stripe for payment processing (subject to Stripe\'s Privacy Policy); Supabase for data storage and authentication; Resend for transactional email delivery; Vercel for website hosting. Each of these providers has their own privacy policies governing their handling of data.' },
          { h: '5. Cookies', p: 'We use essential cookies to maintain your login session. We do not use advertising cookies or third-party tracking cookies. You can control cookie settings through your browser, though disabling essential cookies may prevent you from staying logged in.' },
          { h: '6. Children\'s Privacy', p: 'Our Growing Minds package is designed for use by children under parental supervision. We do not knowingly collect personal data directly from children under 13. Accounts must be created by parents or guardians on behalf of children. If you believe we have inadvertently collected data from a child, please contact us immediately.' },
          { h: '7. Your Rights', p: 'Depending on your location, you may have rights including: access to your personal data; correction of inaccurate data; deletion of your data; objection to processing; and data portability. To exercise any of these rights, contact us at support@thebesafegroup.com.' },
          { h: '8. Data Breach', p: 'In the event of a data breach that poses a risk to your rights, we will notify affected users and relevant authorities as required by applicable law.' },
          { h: '9. Contact', p: 'For privacy-related questions or to exercise your rights, contact us at support@thebesafegroup.com.' },
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

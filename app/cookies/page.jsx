export const metadata = { title: 'Cookie Policy — The Be Safe Group' }

export default function CookiesPage() {
  return (
    <div className="page-enter max-w-3xl mx-auto px-6 py-16">
      <h1 className="font-serif text-4xl text-navy mb-2">Cookie Policy</h1>
      <p className="text-navy/40 text-sm mb-10">Last updated: {new Date().getFullYear()}</p>
      <div className="prose text-navy/70 leading-relaxed space-y-8">
        {[
          { h: 'What are cookies?', p: 'Cookies are small text files stored on your device when you visit a website. They are widely used to make websites work, remember your preferences, and provide information to site owners.' },
          { h: 'Cookies we use', p: 'We use only essential cookies required for the website to function. These include session cookies to keep you logged in while you navigate between pages, and security cookies to protect your account. We do not use advertising cookies, analytics tracking cookies, or any cookies that share your data with third parties for marketing purposes.' },
          { h: 'Essential cookies', p: 'Essential cookies cannot be disabled as they are required for the site to work. They are set only in response to your actions, such as logging in or making a purchase. They do not store any personally identifiable information beyond what is necessary for the session.' },
          { h: 'Managing cookies', p: 'You can control and delete cookies through your browser settings. Please note that disabling essential cookies will prevent you from staying logged in to your account. Instructions for managing cookies vary by browser — consult your browser\'s help documentation for details.' },
          { h: 'Contact', p: 'If you have questions about our use of cookies, contact us at support@thebesafegroup.com.' },
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

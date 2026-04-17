export const metadata = {
  title: 'Work From Home - No Experience Needed | HomeSafeEducation',
  description: 'Earn 20% commission sharing family safety courses. Fully remote, flexible hours, completely free to join. No experience required.',
  canonical: '/careers/work-from-home',
  openGraph: {
    title: 'Work From Home - No Experience Needed | HomeSafeEducation',
    description: 'Earn 20% commission sharing family safety courses. Fully remote, no experience required.',
    url: '/careers/work-from-home',
    type: 'website',
  },
};

export default function WorkFromHome() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'JobPosting',
    title: 'Work From Home - Online Education Affiliate (Remote, No Experience Required)',
    identifier: {
      '@type': 'PropertyValue',
      name: 'HomeSafeEducation',
      value: 'HSE-AFFILIATE-WFH-2026',
    },
    description: 'Earn 20% commission sharing family safety courses. Work from home, no experience required, fully remote affiliate opportunity.',
    datePosted: '2026-04-17',
    validThrough: '2026-10-17',
    employmentType: 'CONTRACTOR',
    jobLocationType: 'TELECOMMUTE',
    applicantLocationRequirements: {
      '@type': 'Country',
      name: 'US',
    },
    baseSalary: {
      '@type': 'PriceSpecification',
      priceCurrency: 'USD',
      priceComponentType: 'CommissionRate',
      price: {
        '@type': 'QuantitativeValue',
        minValue: '0',
        maxValue: '44',
        unitText: 'UNIT',
      },
    },
    directApply: true,
    hiringOrganization: {
      '@type': 'Organization',
      name: 'HomeSafeEducation',
      logo: 'https://homesafeeducation.com/logo.png',
    },
  };

  const earnings = [
    {
      label: '20% commission',
      description: 'On every sale',
      icon: 'percent',
    },
    {
      label: 'Packages $34.99 - $219.99',
      description: 'You earn $7 - $44 per sale',
      icon: 'dollar',
    },
    {
      label: 'No earning cap',
      description: 'Unlimited potential',
      icon: 'unlimited',
    },
    {
      label: 'Instant tracking',
      description: 'See earnings in real time',
      icon: 'chart',
    },
  ];

  const requirements = [
    {
      title: 'A phone, tablet or computer with internet access',
      icon: 'device',
    },
    {
      title: 'That is it. No qualifications, no CV, no interview.',
      icon: 'check',
    },
  ];

  const steps = [
    {
      number: '01',
      title: 'Sign up free',
      description: 'Takes just two minutes, completely free',
    },
    {
      number: '02',
      title: 'Get your unique referral link',
      description: 'Your personal link is ready to use',
    },
    {
      number: '03',
      title: 'Share it however you like',
      description: 'Social media, messaging apps, emails, in person',
    },
    {
      number: '04',
      title: 'When someone buys through your link you get paid',
      description: 'Commission goes straight to your account',
    },
    {
      number: '05',
      title: 'Track everything through your affiliate dashboard',
      description: 'See your referrals, sales, and earnings anytime',
    },
  ];

  const whyPeopleChoose = [
    {
      title: 'Completely free to join',
      description: 'No fees, no catches, no hidden costs',
      icon: 'wallet',
    },
    {
      title: 'No stock, no deliveries, no customer service',
      description: 'Pure affiliate model - you just share',
      icon: 'package',
    },
    {
      title: 'Work on your own schedule',
      description: 'Mornings, evenings, weekends - whenever suits you',
      icon: 'clock',
    },
    {
      title: 'Sharing something genuinely valuable',
      description: 'Courses that help families stay safe',
      icon: 'heart',
    },
    {
      title: 'No restrictions on where or how you promote',
      description: 'Full creative freedom',
      icon: 'lightbulb',
    },
    {
      title: 'Independent contractor arrangement',
      description: 'Be your own boss',
      icon: 'briefcase',
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="min-h-screen bg-slate-50">
        {/* Hero Section */}
        <div className="relative overflow-hidden bg-gradient-to-br from-[#0B1F3A] via-[#122a4d] to-[#0B1F3A] px-4 py-10 sm:px-6 lg:px-8">
          {/* Decorative blur orbs */}
          <div className="absolute top-0 -right-20 w-96 h-96 bg-teal-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
          <div className="absolute -bottom-10 left-0 w-80 h-80 bg-orange-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
          <div className="absolute top-1/2 right-1/4 w-72 h-72 bg-teal-400 rounded-full mix-blend-multiply filter blur-3xl opacity-5 animate-blob animation-delay-4000"></div>

          <div className="relative z-10 max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 mb-4">
              <span className="w-2 h-2 bg-teal-400 rounded-full"></span>
              <span className="text-sm font-medium text-white">Work From Home - No Experience Required</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl font-bold text-white mb-6 leading-tight">
              Work From Home - No Experience Needed
            </h1>

            <p className="text-xl text-white mb-6 max-w-2xl mx-auto">
              Earn 20% commission sharing online family safety courses. Fully remote, flexible hours, free to join.
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          {/* The Opportunity Section */}
          <div className="mb-10">
            <h2 className="font-serif text-4xl font-bold text-slate-900 mb-6">The Opportunity</h2>
            <div className="bg-white rounded-2xl ring-1 ring-slate-300 p-8 shadow">
              <p className="text-lg text-slate-700 leading-relaxed mb-4">
                HomeSafeEducation is looking for people to help spread the word about our online family safety and life-skills courses. You do not need any experience, qualifications, or special skills.
              </p>
              <p className="text-lg text-slate-700 leading-relaxed mb-4">
                If you can share a link, you can do this. You get your own referral link and earn 20% commission every time someone purchases a course through it. You work when you want, from wherever you want.
              </p>
            </div>
          </div>

          {/* What You Earn Section */}
          <div className="mb-10">
            <h2 className="font-serif text-4xl font-bold text-slate-900 mb-8">What You Earn</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {earnings.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-2xl ring-1 ring-slate-300 p-7 shadow hover:shadow-md transition-shadow duration-200"
                >
                  <div className="mb-4">
                    <IconSVG name={item.icon} />
                  </div>
                  <p className="font-serif font-bold text-slate-900 text-lg mb-1">{item.label}</p>
                  <p className="text-slate-600 text-sm">{item.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* What You Need Section */}
          <div className="mb-10">
            <h2 className="font-serif text-4xl font-bold text-slate-900 mb-8">What You Need</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {requirements.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-gradient-to-br from-teal-50 to-slate-50 rounded-2xl ring-1 ring-teal-400 p-8 shadow-sm hover:shadow-md transition-shadow duration-200"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 mt-1">
                      <IconSVG name={item.icon} />
                    </div>
                    <p className="font-serif text-xl font-bold text-slate-900">{item.title}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* How It Works Section */}
          <div className="mb-10">
            <h2 className="font-serif text-4xl font-bold text-slate-900 mb-8">How It Works</h2>
            <div className="space-y-4">
              {steps.map((step, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-2xl ring-1 ring-slate-300 p-8 shadow hover:shadow-md transition-shadow duration-200"
                >
                  <div className="flex items-start gap-6">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-teal-500 to-teal-600">
                        <span className="font-serif font-bold text-white text-lg">{step.number}</span>
                      </div>
                    </div>
                    <div className="flex-grow">
                      <h3 className="font-serif text-xl font-bold text-slate-900 mb-2">{step.title}</h3>
                      <p className="text-slate-600">{step.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Why People Choose This Section */}
          <div className="mb-10">
            <h2 className="font-serif text-4xl font-bold text-slate-900 mb-8">Why People Choose This</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {whyPeopleChoose.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-2xl ring-1 ring-slate-300 p-7 shadow hover:shadow-md transition-shadow duration-200"
                >
                  <div className="mb-4">
                    <IconSVG name={item.icon} />
                  </div>
                  <h3 className="font-serif text-lg font-bold text-slate-900 mb-2">{item.title}</h3>
                  <p className="text-slate-600 text-sm">{item.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* The Details Section */}
          <div className="mb-10">
            <h2 className="font-serif text-4xl font-bold text-slate-900 mb-6">The Details</h2>
            <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl ring-1 ring-slate-300 p-8 shadow">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <p className="text-sm font-medium text-slate-500 uppercase tracking-wide mb-2">Compensation Model</p>
                  <p className="text-xl font-semibold text-slate-900">Commission-based</p>
                  <p className="text-sm text-slate-600 mt-2">No salary or hourly rate, you earn when you make a sale</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-500 uppercase tracking-wide mb-2">Minimum Commitment</p>
                  <p className="text-xl font-semibold text-slate-900">None</p>
                  <p className="text-sm text-slate-600 mt-2">You can stop at any time, work at your own pace</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-500 uppercase tracking-wide mb-2">Contract Status</p>
                  <p className="text-xl font-semibold text-slate-900">Independent Contractor</p>
                  <p className="text-sm text-slate-600 mt-2">Be your own boss, flexible arrangement</p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-teal-50 to-slate-50 rounded-2xl ring-1 ring-teal-400 p-12 text-center">
            <h2 className="font-serif text-3xl font-bold text-slate-900 mb-4">Ready to Start Working From Home?</h2>
            <p className="text-lg text-slate-700 mb-8 max-w-2xl mx-auto">
              Sign up at <a href="https://homesafeeducation.com/affiliates" className="text-teal-600 font-semibold underline hover:text-teal-800">homesafeeducation.com/affiliates</a> - it takes less than two minutes and costs nothing.
            </p>
            <a
              href="https://numok-production.up.railway.app/register"
              className="inline-block px-10 py-5 bg-[#0B1F3A] hover:bg-[#162d52] text-white font-bold text-lg rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              Get Started Now
            </a>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes blob {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </>
  );
}

function IconSVG({ name }) {
  const icons = {
    percent: (
      <svg className="w-6 h-6 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A2 2 0 013 12V7a4 4 0 014-4z" />
      </svg>
    ),
    dollar: (
      <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    unlimited: (
      <svg className="w-6 h-6 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    chart: (
      <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    device: (
      <svg className="w-6 h-6 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
    check: (
      <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    wallet: (
      <svg className="w-6 h-6 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
      </svg>
    ),
    package: (
      <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
      </svg>
    ),
    clock: (
      <svg className="w-6 h-6 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    heart: (
      <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
    lightbulb: (
      <svg className="w-6 h-6 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12a9 9 0 11-18 0 9 9 0 0118 0m-9 5h.01" />
      </svg>
    ),
    briefcase: (
      <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m0 0h14a2 2 0 012 2v3.09c0 .713-.264 1.39-.729 1.91a23.931 23.931 0 01-9 1.745c-3.142 0-6.147-.655-8.834-1.82A2.016 2.016 0 002 20v-2a2 2 0 012-2h16z" />
      </svg>
    ),
  };

  return icons[name] || icons.device;
}

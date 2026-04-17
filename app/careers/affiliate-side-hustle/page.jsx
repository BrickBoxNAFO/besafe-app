export const metadata = {
  title: 'Earn Extra Income Sharing Family Safety Courses | HomeSafeEducation',
  description: 'Join our affiliate programme and earn 20% commission sharing family safety courses. Flexible side hustle, no experience required. Work from anywhere.',
  canonical: '/careers/affiliate-side-hustle',
  openGraph: {
    title: 'Earn Extra Income Sharing Family Safety Courses | HomeSafeEducation',
    description: 'Join our affiliate programme and earn 20% commission sharing family safety courses.',
    url: '/careers/affiliate-side-hustle',
    type: 'website',
  },
};

export default function AffiliateSideHustle() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'JobPosting',
    title: 'Affiliate Marketing Partner - Flexible Side Hustle (Remote)',
    identifier: {
      '@type': 'PropertyValue',
      name: 'HomeSafeEducation',
      value: 'HSE-AFFILIATE-SIDEHUSTLE-2026',
    },
    description: 'Earn 20% commission sharing family safety courses. Flexible side hustle with no experience required.',
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

  const features = [
    {
      title: 'Course packages',
      description: '$34.99-$219.99',
      icon: 'bookmark',
    },
    {
      title: 'You earn',
      description: '$7-$44 per sale',
      icon: 'trending',
    },
    {
      title: 'No cap on earnings',
      description: 'The more you refer the more you earn',
      icon: 'rocket',
    },
    {
      title: 'Automatic payments',
      description: 'Get paid for every completed sale through your unique link',
      icon: 'credit',
    },
  ];

  const steps = [
    {
      number: '01',
      title: 'Sign up free',
      description: 'Join the programme in less than two minutes',
    },
    {
      number: '02',
      title: 'Get your unique referral link',
      description: 'Your personal link that tracks every sale',
    },
    {
      number: '03',
      title: 'Share it wherever makes sense',
      description: 'Social media, community groups, conversations with friends, emails',
    },
    {
      number: '04',
      title: 'Track your referrals and earnings',
      description: 'Monitor everything through your affiliate dashboard',
    },
  ];

  const goodFor = [
    {
      title: 'Anyone looking for flexible extra income',
      icon: 'user',
    },
    {
      title: 'People with social media presence (even small)',
      icon: 'share',
    },
    {
      title: 'Anyone active in online communities - parenting groups, Facebook groups, forums',
      icon: 'users',
    },
    {
      title: 'People who want simple income without inventory, customer service, or upfront costs',
      icon: 'check',
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
          <div className="absolute top-10 right-0 w-96 h-96 bg-teal-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
          <div className="absolute bottom-0 left-20 w-72 h-72 bg-orange-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>

          <div className="relative z-10 max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 mb-4">
              <span className="w-2 h-2 bg-teal-400 rounded-full"></span>
              <span className="text-sm font-medium text-white">Flexible Side Hustle</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl font-bold text-white mb-6 leading-tight">
              Earn Extra Income Sharing Family Safety Courses
            </h1>

            <p className="text-xl text-white mb-6 max-w-2xl mx-auto">
              A simple, flexible side hustle - fully remote, no experience required
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          {/* What Is This Section */}
          <div className="mb-10">
            <h2 className="font-serif text-4xl font-bold text-slate-900 mb-6">What Is This?</h2>
            <div className="bg-white rounded-2xl ring-1 ring-slate-300 p-8 shadow">
              <p className="text-lg text-slate-700 leading-relaxed">
                We sell online courses about family safety and life skills, covering everything from child safety to teen preparedness to travel safety. Our affiliate programme pays you 20% commission on every sale you refer. It is free to join and you work entirely on your own schedule.
              </p>
            </div>
          </div>

          {/* What Does That Look Like Section */}
          <div className="mb-10">
            <h2 className="font-serif text-4xl font-bold text-slate-900 mb-8">What Does That Look Like?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {features.map((feature, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-2xl ring-1 ring-slate-300 p-7 shadow hover:shadow-md transition-shadow duration-200"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <IconSVG name={feature.icon} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-500 uppercase tracking-wide mb-1">
                        {feature.title}
                      </p>
                      <p className="text-2xl font-bold text-slate-900">{feature.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* What Do You Actually Have to Do Section */}
          <div className="mb-10">
            <h2 className="font-serif text-4xl font-bold text-slate-900 mb-8">What Do You Actually Have to Do?</h2>
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

          {/* Who Is This Good For Section */}
          <div className="mb-10">
            <h2 className="font-serif text-4xl font-bold text-slate-900 mb-8">Who Is This Good For?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {goodFor.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-2xl ring-1 ring-slate-300 p-7 shadow hover:shadow-md transition-shadow duration-200 flex items-start gap-4"
                >
                  <div className="flex-shrink-0 mt-1">
                    <IconSVG name={item.icon} />
                  </div>
                  <p className="text-slate-700 font-medium">{item.title}</p>
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
                  <p className="text-sm font-medium text-slate-500 uppercase tracking-wide mb-2">Commission Structure</p>
                  <p className="text-xl font-semibold text-slate-900">Commission-only</p>
                  <p className="text-sm text-slate-600 mt-2">No base salary - you earn when you refer a sale</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-500 uppercase tracking-wide mb-2">Cost to Join</p>
                  <p className="text-xl font-semibold text-slate-900">Completely Free</p>
                  <p className="text-sm text-slate-600 mt-2">No cost to join, no obligation</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-500 uppercase tracking-wide mb-2">Minimum Commitment</p>
                  <p className="text-xl font-semibold text-slate-900">None</p>
                  <p className="text-sm text-slate-600 mt-2">Work at your own pace</p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-teal-50 to-slate-50 rounded-2xl ring-1 ring-teal-400 p-12 text-center">
            <h2 className="font-serif text-3xl font-bold text-slate-900 mb-4">Ready to Get Started?</h2>
            <p className="text-lg text-slate-700 mb-8 max-w-2xl mx-auto">
              Sign up at <a href="https://homesafeeducation.com/affiliates" className="text-teal-600 font-semibold underline hover:text-teal-800">homesafeeducation.com/affiliates</a> - it is free and takes less than two minutes.
            </p>
            <a
              href="https://numok-production.up.railway.app/register"
              className="inline-block px-8 py-4 bg-teal-500 hover:bg-teal-600 text-white font-semibold rounded-lg transition-colors duration-200"
            >
              Get Started
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
      `}</style>
    </>
  );
}

function IconSVG({ name }) {
  const icons = {
    bookmark: (
      <svg className="w-6 h-6 text-teal-500" fill="currentColor" viewBox="0 0 24 24">
        <path d="M5 2h14a1 1 0 011 1v19l-8-4-8 4V3a1 1 0 011-1z" />
      </svg>
    ),
    trending: (
      <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
    rocket: (
      <svg className="w-6 h-6 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    credit: (
      <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V5a3 3 0 00-3-3H5a3 3 0 00-3 3v11a3 3 0 003 3z" />
      </svg>
    ),
    user: (
      <svg className="w-6 h-6 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
    share: (
      <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 11.5H2v7a3 3 0 003 3h14a3 3 0 003-3v-7h-6.684m0 0a6 6 0 10-6.348 0m13.032-3.968a6 6 0 11-12.064 0" />
      </svg>
    ),
    users: (
      <svg className="w-6 h-6 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.856-1.487M15 10a3 3 0 11-6 0 3 3 0 016 0zM9 20H4v-2a6 6 0 0112 0v2H9z" />
      </svg>
    ),
    check: (
      <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  };

  return icons[name] || icons.bookmark;
}

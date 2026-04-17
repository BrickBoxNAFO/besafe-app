export const metadata = {
  title: 'Earn Extra Income Sharing Something That Actually Matters | HomeSafeEducation',
  description: 'For parents and caregivers - earn 20% commission sharing family safety courses. A flexible opportunity to earn while sharing something genuinely valuable.',
  canonical: '/careers/affiliate-parent',
  openGraph: {
    title: 'Earn Extra Income Sharing Something That Actually Matters | HomeSafeEducation',
    description: 'For parents and caregivers - earn 20% commission sharing family safety courses.',
    url: '/careers/affiliate-parent',
    type: 'website',
  },
};

export default function AffiliateParent() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'JobPosting',
    title: 'Family Safety Affiliate - Flexible Income for Parents (Remote)',
    identifier: {
      '@type': 'PropertyValue',
      name: 'HomeSafeEducation',
      value: 'HSE-AFFILIATE-PARENT-2026',
    },
    description: 'Earn 20% commission sharing family safety courses. Flexible opportunity for parents and caregivers.',
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

  const steps = [
    {
      number: '01',
      title: 'Sign up free',
      description: 'Join in less than two minutes with no cost',
    },
    {
      number: '02',
      title: 'Get your unique referral link',
      description: 'Your personal link ready to share',
    },
    {
      number: '03',
      title: 'Share it in your own time',
      description: 'Facebook groups, personal page, WhatsApp chats, conversations with other parents',
    },
    {
      number: '04',
      title: 'Earn 20% of every sale',
      description: 'Made through your link, automatically',
    },
  ];

  const earnings = [
    {
      metric: 'Package pricing',
      value: '$34.99 - $219.99',
      icon: 'tag',
    },
    {
      metric: 'Commission per sale',
      value: '$7 - $44',
      icon: 'trending',
    },
    {
      metric: 'Earning potential',
      value: 'Unlimited',
      icon: 'unlimited',
    },
  ];

  const whyParentsLove = [
    {
      title: 'Fits around your schedule',
      description: 'No fixed hours, no deadlines',
      icon: 'clock',
    },
    {
      title: 'You are recommending something genuinely useful',
      description: 'For families and their safety',
      icon: 'heart',
    },
    {
      title: 'No cost, no complexity',
      description: 'No inventory to manage, no customer service',
      icon: 'box',
    },
    {
      title: 'Works from anywhere',
      description: 'Your phone while the kids nap',
      icon: 'phone',
    },
    {
      title: 'Feel good about what you share',
      description: 'Genuinely helping families stay safe',
      icon: 'smile',
    },
    {
      title: 'Community-focused',
      description: 'Share in spaces where parents already gather',
      icon: 'users',
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
        <div className="relative overflow-hidden bg-gradient-to-br from-[#0B1F3A] via-[#122a4d] to-[#0B1F3A] px-4 py-20 sm:px-6 lg:px-8">
          {/* Decorative blur orbs */}
          <div className="absolute top-0 right-20 w-96 h-96 bg-teal-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
          <div className="absolute bottom-10 left-0 w-80 h-80 bg-orange-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>

          <div className="relative z-10 max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 mb-8">
              <span className="w-2 h-2 bg-orange-400 rounded-full"></span>
              <span className="text-sm font-medium text-white">For Parents and Caregivers</span>
            </div>

            <h1 className="font-serif text-5xl sm:text-6xl font-bold text-white mb-6 leading-tight">
              Earn Extra Income Sharing Something That Actually Matters
            </h1>

            <p className="text-xl text-slate-200 mb-12 max-w-2xl mx-auto">
              A flexible opportunity for parents - share family safety courses and earn 20% commission
            </p>

            <a
              href="https://numok-production.up.railway.app/register"
              className="inline-block px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg transition-colors duration-200"
            >
              Join Now
            </a>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          {/* Why This Is Different Section */}
          <div className="mb-20">
            <h2 className="font-serif text-4xl font-bold text-slate-900 mb-6">Why This Is Different</h2>
            <div className="bg-white rounded-2xl ring-1 ring-slate-200 p-8 shadow-sm">
              <p className="text-lg text-slate-700 leading-relaxed mb-4">
                You are already talking about parenting, safety, and raising kids in your daily life. We make online courses that teach families practical safety and life skills - from child safety and teen preparedness to travel safety and skills for older adults.
              </p>
              <p className="text-lg text-slate-700 leading-relaxed mb-4">
                It is the kind of content you would want to share anyway. Our affiliate programme lets you earn 20% commission just by sharing your referral link. If someone in your network signs up for a course package through your link, you get paid.
              </p>
            </div>
          </div>

          {/* How It Works Section */}
          <div className="mb-20">
            <h2 className="font-serif text-4xl font-bold text-slate-900 mb-8">How It Works</h2>
            <div className="space-y-4">
              {steps.map((step, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-2xl ring-1 ring-slate-200 p-8 shadow-sm hover:shadow-md transition-shadow duration-200"
                >
                  <div className="flex items-start gap-6">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-orange-500 to-orange-600">
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

          {/* What You Can Earn Section */}
          <div className="mb-20">
            <h2 className="font-serif text-4xl font-bold text-slate-900 mb-8">What You Can Earn</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {earnings.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-2xl ring-1 ring-slate-200 p-7 shadow-sm hover:shadow-md transition-shadow duration-200"
                >
                  <div className="mb-4">
                    <IconSVG name={item.icon} />
                  </div>
                  <p className="text-sm font-medium text-slate-500 uppercase tracking-wide mb-2">
                    {item.metric}
                  </p>
                  <p className="text-3xl font-bold text-slate-900">{item.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Why Parents Love This Section */}
          <div className="mb-20">
            <h2 className="font-serif text-4xl font-bold text-slate-900 mb-8">Why Parents Love This</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {whyParentsLove.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-2xl ring-1 ring-slate-200 p-7 shadow-sm hover:shadow-md transition-shadow duration-200"
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

          {/* Who This Is For Section */}
          <div className="mb-20">
            <h2 className="font-serif text-4xl font-bold text-slate-900 mb-6">Who This Is For</h2>
            <div className="bg-gradient-to-br from-orange-50 to-slate-50 rounded-2xl ring-1 ring-orange-200 p-8 shadow-sm">
              <p className="text-lg text-slate-700 leading-relaxed">
                Stay-at-home mums and dads, caregivers, homeschooling parents, or anyone in the parenting space who wants a simple, flexible way to earn a little extra. No experience needed - if you can share a link, you can do this.
              </p>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-orange-50 to-slate-50 rounded-2xl ring-1 ring-orange-200 p-12 text-center">
            <h2 className="font-serif text-3xl font-bold text-slate-900 mb-4">Ready to Get Started?</h2>
            <p className="text-lg text-slate-700 mb-8 max-w-2xl mx-auto">
              Join at homesafeeducation.com/affiliates - it takes less than two minutes and it is completely free.
            </p>
            <a
              href="https://numok-production.up.railway.app/register"
              className="inline-block px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg transition-colors duration-200"
            >
              Join Now
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
    tag: (
      <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A2 2 0 013 12V7a4 4 0 014-4z" />
      </svg>
    ),
    trending: (
      <svg className="w-6 h-6 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
    unlimited: (
      <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
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
    box: (
      <svg className="w-6 h-6 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
      </svg>
    ),
    phone: (
      <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
    smile: (
      <svg className="w-6 h-6 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    users: (
      <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.856-1.487M15 10a3 3 0 11-6 0 3 3 0 016 0zM9 20H4v-2a6 6 0 0112 0v2H9z" />
      </svg>
    ),
  };

  return icons[name] || icons.tag;
}

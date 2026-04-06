'use client'
import { useState } from 'react'
import Link from 'next/link'
import NewsletterBanner from '@/components/NewsletterBanner'

function FAQItem({ question, answer }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border border-gray-100 rounded-2xl bg-white overflow-hidden transition-all duration-200">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-slate/50 transition-colors"
      >
        <span className="font-semibold text-navy text-[15px] pr-4">{question}</span>
        <span className={`text-teal text-xl flex-shrink-0 transition-transform duration-200 ${open ? 'rotate-45' : ''}`}>+</span>
      </button>
      {open && (
        <div className="px-6 pb-5 -mt-1">
          <p className="text-navy/60 text-sm leading-relaxed">{answer}</p>
        </div>
      )}
    </div>
  )
}

const faqSections = [
  {
    title: 'Purchases & Payments',
    emoji: '💳',
    items: [
      {
        q: 'How do I purchase a package?',
        a: 'Choose your package on the Packages page and proceed to our secure checkout powered by Stripe. All packages are a one-time payment with no subscriptions or recurring charges.'
      },
      {
        q: 'Can I purchase a package as a gift for someone else?',
        a: 'Yes. During checkout, select the gift option and enter the recipient\'s email address. They will receive a personal invitation with a unique link to create their free account and access the course immediately.'
      },
      {
        q: 'What is the Family Safety Bundle?',
        a: 'The Family Safety Bundle lets you choose any 5 packages for up to 5 family members. Each member gets their own account with individual progress tracking. Visit our Packages page for current pricing.'
      },
      {
        q: 'How do I assign packages to family members after buying the bundle?',
        a: 'Go to your Family Dashboard, click on an available seat, choose which package to assign, and enter the family member\'s name and email. They will receive an email invitation with a link to create their account and start learning.'
      },
      {
        q: 'Can I assign the same package to more than one family member?',
        a: 'Yes. Each of the 5 seats in the bundle can be assigned any package, including the same one. For example, you could assign Street Smart to two different teenagers.'
      },
      {
        q: 'What payment methods do you accept?',
        a: 'We accept all major credit and debit cards through Stripe, including Visa, Mastercard, and American Express. All payments are processed securely.'
      },
    ]
  },
  {
    title: 'Course Access & Progress',
    emoji: '📚',
    items: [
      {
        q: 'How do I access my courses after purchasing?',
        a: 'Log in to your account and go to your Dashboard. Your purchased courses will appear in your Course Library, ready to start.'
      },
      {
        q: 'Can I retake a course after completing it?',
        a: 'Yes. Your courses remain available to you after completion. You can revisit any lesson or retake the full course at any time from your Dashboard.'
      },
      {
        q: 'How does progress tracking work?',
        a: 'The system tracks which lessons you have completed and your quiz results. You can see your overall completion percentage on your Dashboard. For Family Bundle owners, you can also view the progress of each family member.'
      },
      {
        q: 'Do the courses have tests or quizzes?',
        a: 'Yes. Each lesson includes quiz questions to check your understanding of the material. These are designed to reinforce what you have learned, not to catch you out.'
      },
      {
        q: 'Can I complete courses at my own pace?',
        a: 'Absolutely. There are no time limits or deadlines. You can work through the lessons whenever it suits you and pick up where you left off.'
      },
    ]
  },
  {
    title: 'Family Bundle & Sharing',
    emoji: '👨‍👩‍👧‍👦',
    items: [
      {
        q: 'How does the Family Bundle work?',
        a: 'After purchasing, you get access to a Family Dashboard where you can manage 5 seats. For each seat, you choose a package and invite a family member by email. Each person gets their own login, their own dashboard, and their own progress tracking.'
      },
      {
        q: 'What happens when I send a family member an invite?',
        a: 'They receive an email with a personal invitation link. When they click it, they are taken to a page where they create their free account. Once registered, the assigned package appears on their dashboard immediately.'
      },
      {
        q: 'Can I change which package is assigned to a family member?',
        a: 'Seat assignments are made when you invite a family member. If you need to make changes, contact our support team at Support@HomeSafeEducation.com and we will help you.'
      },
      {
        q: 'Does each family member need their own email address?',
        a: 'Yes. Each family member needs a unique email address to create their account and receive their invitation.'
      },
    ]
  },
  {
    title: 'Refunds & Billing',
    emoji: '🧾',
    items: [
      {
        q: 'Can I get a refund?',
        a: 'Yes. We offer refunds within 7 days of purchase, provided less than 20 percent of the course content has been accessed. To request a refund, email Support@HomeSafeEducation.com with your order number.'
      },
      {
        q: 'Will I be charged again after purchasing?',
        a: 'No. All purchases are one-time payments. There are no subscriptions, hidden fees, or recurring charges.'
      },
    ]
  },
  {
    title: 'Account & Technical',
    emoji: '⚙️',
    items: [
      {
        q: 'How do I reset my password?',
        a: 'On the login page, click "Forgot your password?" and enter your email address. You will receive a link to create a new password.'
      },
      {
        q: 'I did not receive my confirmation email. What should I do?',
        a: 'Check your spam or junk folder first. If it is not there, email Support@HomeSafeEducation.com and we will resend it.'
      },
      {
        q: 'What devices can I use to access the courses?',
        a: 'The courses work on any device with a web browser, including phones, tablets, laptops, and desktop computers.'
      },
      {
        q: 'How do I contact support?',
        a: 'Email us at Support@HomeSafeEducation.com. We respond within 1 to 2 business days, Monday to Friday.'
      },
    ]
  },
]

export default function FAQPage() {
  return (
    <div className="page-enter">
      {/* Hero */}
      <section className="hero-bg noise relative py-24 overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <div className="chip bg-teal/15 text-teal border border-teal/25 mb-5">FAQ</div>
          <h1 className="font-serif text-5xl lg:text-6xl text-white mb-5">
            Frequently Asked<br />
            <span className="italic text-teal">Questions.</span>
          </h1>
          <p className="text-white/70 text-lg max-w-2xl leading-relaxed">
            Everything you need to know about our courses, packages, family sharing, and more.
          </p>
        </div>
      </section>

      {/* FAQ Sections */}
      {faqSections.map((section) => (
        <section key={section.title} className="py-16 odd:bg-white even:bg-slate/30">
          <div className="max-w-3xl mx-auto px-6">
            <div className="flex items-center gap-3 mb-8">
              <span className="text-2xl">{section.emoji}</span>
              <h2 className="font-serif text-3xl text-navy">{section.title}</h2>
            </div>
            <div className="space-y-3">
              {section.items.map((item) => (
                <FAQItem key={item.q} question={item.q} answer={item.a} />
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* Newsletter */}
      <NewsletterBanner />

      {/* Bottom Navigation Cards */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="font-serif text-4xl text-navy mb-4">Explore More</h2>
            <p className="text-navy/60 text-lg">Find what you need across our site.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <Link href="/packages" className="group block bg-slate rounded-2xl p-6 text-center border border-transparent hover:border-teal/20 hover:shadow-lg transition-all duration-200">
              <div className="text-3xl mb-3">📦</div>
              <p className="font-semibold text-navy text-sm mb-1 group-hover:text-teal transition-colors">Our Packages</p>
              <p className="text-navy/40 text-xs leading-relaxed">Browse all 7 packages and find the right course for you or your family.</p>
            </Link>
            <Link href="/about" className="group block bg-slate rounded-2xl p-6 text-center border border-transparent hover:border-teal/20 hover:shadow-lg transition-all duration-200">
              <div className="text-3xl mb-3">🏠</div>
              <p className="font-semibold text-navy text-sm mb-1 group-hover:text-teal transition-colors">About Us</p>
              <p className="text-navy/40 text-xs leading-relaxed">Learn about our mission and the team behind HomeSafeEducation.</p>
            </Link>
            <Link href="/contact" className="group block bg-slate rounded-2xl p-6 text-center border border-transparent hover:border-teal/20 hover:shadow-lg transition-all duration-200">
              <div className="text-3xl mb-3">💬</div>
              <p className="font-semibold text-navy text-sm mb-1 group-hover:text-teal transition-colors">Contact Us</p>
              <p className="text-navy/40 text-xs leading-relaxed">Have a question we have not covered? Our support team is here to help.</p>
            </Link>
            <Link href="/refunds" className="group block bg-slate rounded-2xl p-6 text-center border border-transparent hover:border-teal/20 hover:shadow-lg transition-all duration-200">
              <div className="text-3xl mb-3">📋</div>
              <p className="font-semibold text-navy text-sm mb-1 group-hover:text-teal transition-colors">Refund Policy</p>
              <p className="text-navy/40 text-xs leading-relaxed">Read the full details of our 7-day refund policy.</p>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

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
        a: 'Choose your package on the Packages page and proceed to our secure checkout powered by Stripe. All packages are a one-time payment with no subscriptions or recurring charges. When purchasing, you have three options: assign it to yourself for instant access, gift it now by entering the recipient\'s email address, or buy it now and assign it later from your dashboard when you are ready.'
      },
      {
        q: 'Can I purchase a package as a gift for someone else?',
        a: 'Yes. You have two options. You can gift it now by entering the recipient\'s email address during checkout — they will receive a personal invitation with a unique link to create their free account and access the course immediately. Or you can choose "Assign Later" to purchase now and send the invite whenever you are ready from your dashboard.'
      },
      {
        q: 'What is the Family Safety Bundle?',
        a: 'The Family Safety Bundle gives you 5 flexible seats to share with family members. Each seat can be assigned to yourself (to unlock a package instantly) or to a friend or family member via email invite. You can assign the same package to multiple seats if you want all your family members to take the same course. Each person gets their own account, login, and individual progress tracking. Visit our Packages page for current pricing.'
      },
      {
        q: 'How do I assign packages to family members after buying the bundle?',
        a: 'After purchase, go to your Family Dashboard where you\'ll see your 5 seats. For each seat, you can either assign it to yourself (pick a package and get instant access) or assign it to a family member. To invite a family member, click on an empty seat, choose which package to assign, enter their name and email address, and send the invite. They\'ll receive a personal email invitation with a unique link.'
      },
      {
        q: 'Can I assign the same package to more than one family member?',
        a: 'Yes. Each of the 5 seats in the bundle can be assigned any package, including the same one. For example, you could assign Street Smart to two different teenagers.'
      },
      {
        q: 'What happens after I purchase a package or bundle?',
        a: 'If you purchased for yourself, the course unlocks on your dashboard immediately. If you gifted it, the recipient receives an email invite. If you chose "Assign Later", a seat is created on your dashboard that you can assign to yourself or send to someone else whenever you are ready. If you purchased the Family Safety Bundle, you\'ll be redirected to your Family Dashboard where you can assign your 5 seats. You can return to your dashboard anytime from your account menu.'
      },
      {
        q: 'What is the "Assign Later" option?',
        a: 'When you purchase a package, you can choose "Assign Later" instead of assigning it to yourself or gifting it straight away. This creates a seat on your dashboard that you can assign whenever you are ready — either to yourself or to someone else via email invite. There is no time limit. The seat is yours until you assign it.'
      },
      {
        q: 'What is the Complete Library?',
        a: 'The Complete Library gives you access to all 7 packages at a significantly reduced price compared to buying them individually. It works the same way as the Family Safety Bundle but gives you 7 flexible seats to share — one for each package. Visit our Packages page for current pricing.'
      },
      {
        q: 'What payment methods do you accept?',
        a: 'We accept all major credit and debit cards (Visa, Mastercard, American Express), as well as Apple Pay, Google Pay, and PayPal. Apple Pay and Google Pay are available when you check out on a supported device. All payments are processed securely through Stripe.'
      },
    ]
  },
  {
    title: 'Course Access & Progress',
    emoji: '📚',
    items: [
      {
        q: 'How do the lessons actually work?',
        a: <span>Each lesson includes written content tailored to the age group, key takeaways, quiz questions to reinforce learning, and for selected packages, original music with full lyrics. You can <Link href="/example" className="text-teal font-semibold hover:underline">try a lesson for free</Link> to see exactly how it works before you buy.</span>
      },
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
    emoji: 'family_bundle',
    items: [
      {
        q: 'How does the Family Bundle work?',
        a: 'After purchasing the Family Safety Bundle, you get access to your Family Dashboard where you manage 5 flexible seats. For each seat, you can assign yourself a package (and unlock it instantly) or assign a family member a package via email invite. When you invite someone, they create a free account and get instant access to their assigned package. Each person gets their own login, their own dashboard, and their own progress tracking. You can see all seats and everyone\'s progress on the Family Dashboard.'
      },
      {
        q: 'What happens when I send a family member an invite?',
        a: 'They receive an email with a personal invitation link. This link is unique and single-use. When they click it, they\'re taken to a page where they create their free account using their email address. Once they complete registration, the package you assigned to that seat appears on their dashboard immediately with full access. They don\'t need to pay anything — everything is covered by your original Family Bundle purchase.'
      },
      {
        q: 'Can I change which package is assigned to a family member?',
        a: 'Seat assignments are made when you invite a family member. If you need to make changes, contact our support team at Support@HomeSafeEducation.com and we will help you.'
      },
      {
        q: 'Does each family member need their own email address?',
        a: 'Yes. Each family member needs a unique email address to create their account and receive their invitation.'
      },
      {
        q: 'Do family members get their own dashboard and progress tracking?',
        a: 'Yes. Each family member has their own personal dashboard where they can see their assigned course(s) and track their own progress independently. As the bundle owner, you can see everyone\'s progress from your Family Dashboard. Each person\'s progress is kept separate and private to their account.'
      },
      {
        q: 'Do family members have to pay anything?',
        a: 'No. All family members invited through the Family Safety Bundle get free access to their assigned course(s). There are no additional charges. Everything is covered by your original bundle purchase.'
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
        a: 'On the login page, click "Forgot password?" and enter your email address. You will receive a link to create a new password.'
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
              <span className="text-2xl">{section.emoji === 'family_bundle' ? <><span className="hidden sm:inline">👨‍👩‍👧‍👦</span><span className="sm:hidden">🏠</span></> : section.emoji}</span>
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

      {/* Try a lesson CTA */}
      <section className="py-16 bg-gradient-to-r from-teal/10 to-teal2/10">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <span className="text-4xl mb-4 block">📖</span>
          <h2 className="font-serif text-3xl text-navy mb-3">Still not sure? See it for yourself.</h2>
          <p className="text-navy/60 text-base leading-relaxed mb-6 max-w-xl mx-auto">
            The best way to understand what we offer is to experience it. Try a complete lesson for free - no account needed.
          </p>
          <Link href="/example" className="btn-primary text-base px-8 py-3">Try a Free Lesson</Link>
        </div>
      </section>

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

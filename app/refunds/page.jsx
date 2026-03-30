export default function RefundsPage() {
  return (
    <div className="page-enter min-h-screen bg-slate">
      <div className="hero-bg noise relative py-16 overflow-hidden">
        <div className="max-w-3xl mx-auto px-6 relative z-10">
          <h1 className="font-serif text-5xl text-white mb-3">Refund Policy</h1>
          <p className="text-white/60">Last updated: March 2026</p>
        </div>
      </div>
      <div className="max-w-3xl mx-auto px-6 py-14">
        <div className="bg-white rounded-2xl border border-gray-100 p-10 space-y-6">
          <p className="text-navy/70 leading-relaxed">At HomeSafeEducation, we are committed to providing high-quality safety courses that deliver real value to our customers. We understand that sometimes circumstances change, and we aim to make our refund process as fair and transparent as possible.</p>

          <h2 className="font-serif text-2xl text-navy pt-4">Our Refund Policy</h2>
          <p className="text-navy/70 leading-relaxed">We offer a straightforward refund window to ensure you can purchase with confidence.</p>

          <div className="bg-teal/5 border border-teal/20 rounded-xl p-6 space-y-5">
            <div>
              <p className="font-semibold text-navy">Full Refund Within 7 Days</p>
              <p className="text-navy/70 text-sm mt-1">If you request a refund within 7 days of your purchase date, you are eligible for a 100% refund of the amount paid for the course.</p>
            </div>
            <div>
              <p className="font-semibold text-navy">Completion-Based Restriction</p>
              <p className="text-navy/70 text-sm mt-1">No refund will be available once any purchased course has been completed to more than 20% of the course content. Course progress is accurately tracked through our learning platform, including metrics such as video watch time, lesson completion percentage, quiz attempts, and any downloaded materials.</p>
            </div>
            <div>
              <p className="font-semibold text-navy">Processing Time</p>
              <p className="text-navy/70 text-sm mt-1">Approved refunds will be returned to your original payment method within 10 business days.</p>
            </div>
          </div>

          <p className="text-navy/70 leading-relaxed">This policy balances your right to try our courses with the nature of digital products, where access to valuable content begins immediately upon purchase.</p>

          <h2 className="font-serif text-2xl text-navy pt-4">Important Information for EU / EEA / UK Customers</h2>
          <p className="text-navy/70 leading-relaxed">As a customer based in the European Union, European Economic Area, or the United Kingdom, you may benefit from additional statutory rights under the Consumer Rights Directive. This generally includes a 14-day cooling-off period for distance contracts.</p>
          <p className="text-navy/70 leading-relaxed">However, for digital content and online courses, your right of withdrawal may expire once you give your express consent to the immediate supply of the digital content and begin accessing or using the course material. We clearly present this consent requirement at the checkout stage. In all cases, your statutory consumer rights take priority over our standard policy where they provide greater protection.</p>

          <h2 className="font-serif text-2xl text-navy pt-4">How to Request a Refund</h2>
          <p className="text-navy/70 leading-relaxed">To request a refund, please contact our support team within the eligible timeframe:</p>
          <div className="bg-slate rounded-xl p-5">
            <p className="text-navy font-medium">Email: <a href="mailto:Support@HomeSafeEducation.com" className="text-teal hover:underline">Support@HomeSafeEducation.com</a></p>
            <p className="text-navy/60 text-sm mt-1">Subject line: <em>Refund Request &ndash; [Your Order Number or Course Name]</em></p>
          </div>
          <p className="text-navy/70 leading-relaxed">Please include your order details and a brief reason for the request (optional). Our team will review your request, verify the course progress, and process eligible refunds promptly.</p>

          <h2 className="font-serif text-2xl text-navy pt-4">What Happens After a Refund?</h2>
          <ul className="text-navy/70 space-y-2 list-disc list-inside">
            <li>Your access to the course will be revoked shortly after the refund is processed.</li>
            <li>You will no longer be able to view or download any course materials.</li>
          </ul>

          <h2 className="font-serif text-2xl text-navy pt-4">Non-Refundable Situations</h2>
          <p className="text-navy/70 leading-relaxed">Refunds are not available in the following cases:</p>
          <ul className="text-navy/70 space-y-2 list-disc list-inside">
            <li>Courses purchased during promotional or discounted periods (unless otherwise stated).</li>
            <li>Requests made after the 7-day window.</li>
            <li>Any breach of our Terms and Conditions.</li>
          </ul>

          <h2 className="font-serif text-2xl text-navy pt-4">Our Commitment to You</h2>
          <p className="text-navy/70 leading-relaxed">We take pride in the quality and practicality of our safety courses. Our goal is to equip you with essential knowledge that helps create safer environments. If you have any questions about this policy, our support team is always here to help.</p>
          <p className="text-navy/70 leading-relaxed">For any refund-related inquiries, feel free to reach out to us at <a href="mailto:Support@HomeSafeEducation.com" className="text-teal hover:underline">Support@HomeSafeEducation.com</a>.</p>

          <div className="pt-8 border-t border-gray-100 text-center">
            <p className="text-navy font-semibold">HomeSafeEducation</p>
            <a href="https://homesafeeducation.com" className="text-teal text-sm hover:underline">homesafeeducation.com</a>
          </div>
        </div>
      </div>
    </div>
  )
}

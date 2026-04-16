export const metadata = { title: 'Refund Policy — HomeSafeEducation' }

export default function RefundsPage() {
  return (
    <div className="page-enter max-w-3xl mx-auto px-6 py-16">
      <h1 className="font-serif text-4xl text-navy mb-2">Refund Policy</h1>
      <p className="text-navy/40 text-sm mb-10">Last updated: {new Date().getFullYear()}</p>

      <div className="bg-teal/5 border border-teal/20 rounded-2xl p-6 mb-8">
        <p className="font-semibold text-navy mb-1">Summary</p>
        <p className="text-navy/70 text-sm leading-relaxed">
          Full refund within 7 days of purchase, provided less than 20% of the overall package has been completed.
          Approved refunds are returned to the original payment method within 10 business days.
        </p>
      </div>

      <div className="prose text-navy/70 leading-relaxed space-y-8">
        <div>
          <p>
            At HomeSafeEducation, we are committed to providing high-quality safety courses that deliver real value.
            We understand circumstances change, and we aim to make our refund process as fair and transparent as possible.
          </p>
        </div>

        <div>
          <h2 className="font-semibold text-navy text-lg mb-2">Our Refund Policy</h2>
          <p>We offer a straightforward refund window so you can purchase with confidence:</p>
          <ul className="list-disc pl-5 mt-2 space-y-2 text-sm">
            <li>
              <strong>Full refund within 7 days:</strong> If you request a refund within 7 days of your purchase date, you are eligible for a 100% refund of the amount paid for the package.
            </li>
            <li>
              <strong>Completion-based restriction:</strong> No refund is available once the overall package has been completed to more than 20%. Package progress is tracked through our learning platform using metrics such as lessons passed across the whole package, quiz attempts, and any downloaded materials.
            </li>
            <li>
              <strong>Processing time:</strong> Approved refunds are returned to your original payment method within 10 business days. Depending on your bank or card provider, funds may take longer to appear, which can vary by payment method and financial institution.
            </li>
          </ul>
          <p className="mt-3 text-sm">
            This policy balances your right to try our courses with the nature of digital products, where access to valuable content begins immediately upon purchase.
          </p>
        </div>

        <div>
          <h2 className="font-semibold text-navy text-lg mb-2">Information for EU / EEA / UK customers</h2>
          <p>
            As a customer based in the European Union, European Economic Area, or the United Kingdom, you may benefit from additional statutory rights under the Consumer Rights Directive, which generally includes a 14-day cooling-off period for distance contracts.
          </p>
          <p className="mt-2">
            For digital content and online courses, your right of withdrawal may expire once you:
          </p>
          <ul className="list-disc pl-5 mt-2 space-y-1 text-sm">
            <li>Give your express consent to the immediate supply of the digital content, and</li>
            <li>Begin accessing or using the course material.</li>
          </ul>
          <p className="mt-2 text-sm">
            We clearly present this consent requirement at the checkout stage. In all cases, your statutory consumer rights take priority over our standard policy where they provide greater protection.
          </p>
        </div>

        <div>
          <h2 className="font-semibold text-navy text-lg mb-2">How to request a refund</h2>
          <p>To request a refund, please contact our support team within the eligible timeframe:</p>
          <ul className="list-disc pl-5 mt-2 space-y-1 text-sm">
            <li>Email: <a href="mailto:Support@HomeSafeEducation.com" className="text-teal underline">Support@HomeSafeEducation.com</a></li>
            <li>Subject line: &quot;Refund Request - [Your Order Number or Package Name]&quot;</li>
          </ul>
          <p className="mt-2 text-sm">
            Please include your order details and a brief reason for the request (optional). Our team will review your request, verify package progress, and process eligible refunds promptly.
          </p>
        </div>

        <div>
          <h2 className="font-semibold text-navy text-lg mb-2">What happens after a refund?</h2>
          <ul className="list-disc pl-5 mt-2 space-y-1 text-sm">
            <li>Your access to the package will be revoked shortly after the refund is processed.</li>
            <li>You will no longer be able to view or download any course materials from that package.</li>
            <li>Any bonus downloads already delivered (such as ZIP song packs) must be deleted and may not be kept or shared.</li>
          </ul>
        </div>

        <div>
          <h2 className="font-semibold text-navy text-lg mb-2">Non-refundable situations</h2>
          <p>Refunds are not available in the following cases (in addition to exceeding the 20% package completion threshold):</p>
          <ul className="list-disc pl-5 mt-2 space-y-1 text-sm">
            <li>Requests made after the 7-day window.</li>
            <li>Packages purchased during promotional or discounted periods (unless otherwise stated at checkout).</li>
            <li>Any breach of our Terms and Conditions.</li>
          </ul>
        </div>

        <div>
          <h2 className="font-semibold text-navy text-lg mb-2">Our commitment to you</h2>
          <p>
            We take pride in the quality and practicality of our safety courses at HomeSafeEducation. Our goal is to equip you with essential knowledge that helps create safer environments. If you have any questions about this policy or need assistance with your purchase, our support team is here to help.
          </p>
          <p className="mt-2 text-sm">
            For any refund-related inquiries or to discuss your specific situation, feel free to reach out to us at <a href="mailto:Support@HomeSafeEducation.com" className="text-teal underline">Support@HomeSafeEducation.com</a>.
          </p>
          <p className="mt-2 text-sm">
            Thank you for choosing HomeSafeEducation.
          </p>
        </div>
      </div>
    </div>
  )
}

export const metadata = { title: 'Refund Policy — HomeSafeEducation' }

export default function RefundsPage() {
  return (
    <div className="page-enter max-w-3xl mx-auto px-6 py-16">
      <h1 className="font-serif text-4xl text-navy mb-2">Refund Policy</h1>
      <p className="text-navy/40 text-sm mb-10">Last updated: {new Date().getFullYear()}</p>
      <div className="bg-teal/5 border border-teal/20 rounded-2xl p-6 mb-8">
        <p className="font-semibold text-navy mb-1">Summary</p>
        <p className="text-navy/70 text-sm leading-relaxed">
          Full refund within 7 days of purchase, provided you have completed less than 20% of any course in the package.
        </p>
      </div>
      <div className="prose text-navy/70 leading-relaxed space-y-6">
        <div>
          <h2 className="font-semibold text-navy text-lg mb-2">Eligibility</h2>
          <p>You are eligible for a full refund if both of the following conditions are met:</p>
          <ul className="list-disc pl-5 mt-2 space-y-1 text-sm">
            <li>Your refund request is made within 7 days of the original purchase date.</li>
            <li>You have completed less than 20% of any individual course within the package.</li>
          </ul>
        </div>
        <div>
          <h2 className="font-semibold text-navy text-lg mb-2">Non-Eligibility</h2>
          <p>Refunds are not available if:</p>
          <ul className="list-disc pl-5 mt-2 space-y-1 text-sm">
            <li>More than 7 days have passed since your purchase.</li>
            <li>You have completed 20% or more of any course within the package. Completion of 20% or more is considered fulfilment of the purchase.</li>
          </ul>
        </div>
        <div>
          <h2 className="font-semibold text-navy text-lg mb-2">How to Request a Refund</h2>
          <p>Email <a href="mailto:support@thebesafegroup.com" className="text-teal underline">support@thebesafegroup.com</a> with your order details and reason for the request. We will review and process eligible refunds within 5 business days. Refunds are returned to the original payment method.</p>
        </div>
      </div>
    </div>
  )
}

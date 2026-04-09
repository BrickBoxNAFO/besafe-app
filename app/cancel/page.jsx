import Link from 'next/link'

export const metadata = {
  title: 'Payment Cancelled',
  description: 'Your payment was cancelled. You can return to browse our safety education packages.',
}

export default function CancelPage() {
  return (
    <div className="min-h-screen bg-slate flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="bg-white rounded-2xl border border-gray-100 p-10">
          <div className="text-5xl mb-6">↩️</div>
          <h1 className="font-serif text-3xl text-navy mb-3">Payment Cancelled</h1>
          <p className="text-navy/60 leading-relaxed mb-6">
            No charge was made. You can return to the packages page whenever you are ready.
          </p>
          <div className="flex flex-col gap-3">
            <Link href="/packages" className="btn-primary justify-center">
              Back to Packages →
            </Link>
            <Link href="/" className="btn-ghost justify-center">
              Return Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

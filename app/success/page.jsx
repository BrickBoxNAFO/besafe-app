import Link from 'next/link'

export const metadata = {
  title: 'Success',
  description: 'Your action was completed successfully.',
}

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-slate flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="bg-white rounded-2xl border border-gray-100 p-10">
          <div className="text-5xl mb-6">🎉</div>
          <h1 className="font-serif text-3xl text-navy mb-3">Payment Successful!</h1>
          <p className="text-navy/60 leading-relaxed mb-6">
            Your package is now active. Check your email for a confirmation receipt.
            Your courses are ready to start immediately.
          </p>
          <div className="flex flex-col gap-3">
            <Link href="/library" className="btn-primary justify-center">
              Start Learning →
            </Link>
            <Link href="/dashboard" className="btn-ghost justify-center">
              Go to Dashboard
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

'use client';

import Link from 'next/link';

export default function PurchaseSuccessPage() {
  return (
    <main className="bg-slate-light min-h-screen flex items-center justify-center px-4">
      <div className="max-w-lg w-full text-center">
        {/* Success Icon */}
        <div className="mb-8">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg
              className="w-10 h-10 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-navy-dark font-serif mb-2">Purchase Successful!</h1>
          <p className="text-lg text-gray-600">Your purchase has been completed.</p>
        </div>

        {/* Confirmation Card */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <p className="text-gray-700 mb-6">
            Thank you for your purchase! You now have access to all course materials and resources. Get started learning today.
          </p>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Link
              href="/dashboard"
              className="block bg-teal-accent hover:bg-teal-accent/90 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
            >
              Go to Dashboard
            </Link>
            <Link
              href="/library"
              className="block bg-navy-dark hover:bg-navy-dark/90 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
            >
              Access Your Library
            </Link>
          </div>
        </div>

        {/* Footer Links */}
        <div className="space-y-2 text-sm text-gray-600">
          <p>
            <Link href="/contact" className="text-teal-accent hover:underline">
              Need help?
            </Link>
          </p>
          <p>
            Check your email for your purchase receipt and course access details.
          </p>
        </div>
      </div>
    </main>
  );
}

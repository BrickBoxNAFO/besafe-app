import Link from 'next/link';

export default function UnsubscribePage() {
  return (
    <main className="bg-slate-light min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        {/* Icon */}
        <div className="mb-8">
          <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg
              className="w-8 h-8 text-navy-dark"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-navy-dark font-serif mb-2">Unsubscribed</h1>
        </div>

        {/* Message Card */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <p className="text-gray-700 mb-6">
            You've been successfully unsubscribed from our newsletter. You won't receive any more emails from us.
          </p>

          <p className="text-sm text-gray-600">
            If you change your mind, you can resubscribe anytime from our website.
          </p>
        </div>

        {/* Return Link */}
        <Link
          href="/"
          className="inline-block bg-teal-accent hover:bg-teal-accent/90 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
        >
          Back to Home
        </Link>
      </div>
    </main>
  );
}

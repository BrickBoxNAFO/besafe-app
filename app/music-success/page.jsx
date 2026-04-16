'use client';

import { Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

function MusicSuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');

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
          <p className="text-lg text-gray-600">Your music purchase is ready to download.</p>
        </div>

        {/* Confirmation Card */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <p className="text-gray-700 mb-6">
            Thank you for purchasing our music resource. Click the button below to download your files.
          </p>

          {/* Download Button */}
          <div className="space-y-3">
            {sessionId && (
              <a
                href={`/api/music-download?session_id=${encodeURIComponent(sessionId)}`}
                className="block bg-teal-accent hover:bg-teal-accent/90 text-white font-semibold py-3 px-4 rounded-lg transition-colors text-center"
              >
                Download Music Files
              </a>
            )}
            <Link
              href="/"
              className="block bg-navy-dark hover:bg-navy-dark/90 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
            >
              Back to Home
            </Link>
          </div>
        </div>

        {/* Footer Help */}
        <div className="space-y-2 text-sm text-gray-600">
          <p>
            <Link href="/contact" className="text-teal-accent hover:underline">
              Having trouble downloading?
            </Link>
          </p>
          <p>Check your email for a download link sent to your inbox.</p>
        </div>
      </div>
    </main>
  );
}

export default function MusicSuccessPage() {
  return (
    <Suspense fallback={
      <main className="bg-slate-light min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <p className="text-gray-600">Loading...</p>
        </div>
      </main>
    }>
      <MusicSuccessContent />
    </Suspense>
  );
}

import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="bg-slate-light min-h-screen flex items-center justify-center px-4">
      <div className="max-w-lg w-full text-center">
        {/* Logo/Branding */}
        <div className="mb-8">
          <h1 className="text-7xl font-bold text-navy-dark font-serif mb-2">404</h1>
          <p className="text-xl text-gray-600">Page Not Found</p>
        </div>

        {/* Message */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <p className="text-gray-700 mb-6">
            Sorry, we couldn't find the page you're looking for. It may have been moved, deleted, or never existed.
          </p>

          {/* HomeSafe Branding */}
          <div className="inline-block bg-gradient-to-r from-navy-dark to-navy-dark/80 text-white px-6 py-3 rounded-lg mb-8">
            <p className="font-semibold">HomeSafe Education</p>
            <p className="text-sm text-slate-200">Your safety resource center</p>
          </div>

          {/* Links */}
          <div className="space-y-3">
            <Link
              href="/"
              className="block bg-teal-accent hover:bg-teal-accent/90 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
            >
              Back to Home
            </Link>
            <Link
              href="/blog"
              className="block bg-navy-dark hover:bg-navy-dark/90 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
            >
              Explore Blog
            </Link>
          </div>
        </div>

        {/* Footer Help */}
        <p className="text-sm text-gray-500">
          Need help? <Link href="/contact" className="text-teal-accent hover:underline">Contact us</Link>
        </p>
      </div>
    </main>
  );
}

import Link from 'next/link'

export const metadata = {
  title: 'Page Not Found',
  description: 'The page you are looking for does not exist.',
}

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center">
      <h1 className="text-6xl font-bold text-[#0B1F3A] mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-gray-700 mb-3">Page not found</h2>
      <p className="text-gray-500 mb-8 max-w-md">
        Sorry, we couldn't find the page you're looking for. It may have been moved or no longer exists.
      </p>
      <div className="flex gap-4">
        <Link
          href="/"
          className="px-6 py-3 bg-[#0B1F3A] text-white rounded-lg font-medium hover:bg-[#0B1F3A]/90 transition-colors"
        >
          Go home
        </Link>
        <Link
          href="/packages"
          className="px-6 py-3 border border-[#0B1F3A] text-[#0B1F3A] rounded-lg font-medium hover:bg-gray-50 transition-colors"
        >
          View packages
        </Link>
      </div>
    </div>
  )
}

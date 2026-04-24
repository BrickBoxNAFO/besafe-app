'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { getAllPosts } from '@/lib/posts-all';

const POSTS_PER_PAGE = 30;

const categoryLabels = {
  'child-safety': 'Child Safety',
  'teen-safety': 'Teen Safety',
  'elder-safety': 'Elder Safety',
  'travel-safety': 'Travel Safety',
  'family-safety': 'Family Safety',
};

const categoryColors = {
  'child-safety': 'bg-blue-50 text-blue-700',
  'teen-safety': 'bg-purple-50 text-purple-700',
  'elder-safety': 'bg-amber-50 text-amber-700',
  'travel-safety': 'bg-green-50 text-green-700',
  'family-safety': 'bg-rose-50 text-rose-700',
};

export default function BlogContent() {
  const searchParams = useSearchParams();
  const page = Math.max(1, parseInt(searchParams.get('page') || '1', 10));

  const allPosts = getAllPosts();
  const totalPages = Math.ceil(allPosts.length / POSTS_PER_PAGE);
  const currentPage = Math.min(page, totalPages);
  const start = (currentPage - 1) * POSTS_PER_PAGE;
  const posts = allPosts.slice(start, start + POSTS_PER_PAGE);

  // Build page numbers to show (max 7 around current)
  const pageNumbers = [];
  const maxVisible = 7;
  let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
  let endPage = Math.min(totalPages, startPage + maxVisible - 1);
  if (endPage - startPage < maxVisible - 1) {
    startPage = Math.max(1, endPage - maxVisible + 1);
  }
  for (let i = startPage; i <= endPage; i++) pageNumbers.push(i);

  return (
    <main className="bg-slate min-h-screen">
      {/* Header */}
      <section className="bg-gradient-to-br from-[#0B1F3A] to-[#122544] text-white py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold mb-4 font-serif">Safety Education Blog</h1>
          <p className="text-xl text-slate-200">
            Expert resources and practical tips on safety for families, teens, children, elders, and travelers.
          </p>
          <p className="text-sm text-slate-400 mt-2">
            {allPosts.length.toLocaleString()} articles &middot; Page {currentPage} of {totalPages}
          </p>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <article
                key={post.slug}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden flex flex-col"
              >
                {/* Thumbnail */}
                {post.image && (
                  <Link href={`/blog/${post.slug}`}>
                    <img
                      src={post.image}
                      alt={post.imageAlt || post.title}
                      width={640}
                      height={360}
                      className="w-full h-48 object-cover"
                      loading="lazy"
                    />
                  </Link>
                )}

                {/* Category Badge */}
                <div className="px-6 pt-4 pb-2">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${categoryColors[post.category] || 'bg-gray-100 text-gray-700'}`}
                  >
                    {categoryLabels[post.category] || post.category}
                  </span>
                </div>

                {/* Content */}
                <div className="px-6 pb-6 flex-1 flex flex-col">
                  <Link href={`/blog/${post.slug}`} className="group">
                    <h2 className="text-lg font-bold font-serif text-[#0B1F3A] mb-2 group-hover:text-[#0EA5A0] transition-colors line-clamp-2">
                      {post.title}
                    </h2>
                  </Link>

                  <p className="text-gray-600 text-sm mb-4 flex-1 line-clamp-3">{post.excerpt}</p>

                  <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                    <time dateTime={post.date}>
                      {new Date(post.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </time>
                    <span>{post.readTime}</span>
                  </div>

                  <Link
                    href={`/blog/${post.slug}`}
                    className="text-[#0EA5A0] font-semibold text-sm hover:text-[#0EA5A0]/80 transition-colors inline-flex items-center gap-2"
                  >
                    Read Article <span>&rarr;</span>
                  </Link>
                </div>
              </article>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <nav className="mt-16 flex justify-center items-center gap-2 flex-wrap" aria-label="Blog pagination">
              {/* Previous */}
              {currentPage > 1 ? (
                <Link
                  href={`/blog?page=${currentPage - 1}`}
                  className="px-4 py-2 rounded-lg bg-white shadow text-sm font-medium text-[#0B1F3A] hover:bg-[#0EA5A0] hover:text-white transition-colors"
                >
                  &larr; Previous
                </Link>
              ) : (
                <span className="px-4 py-2 rounded-lg bg-gray-100 text-sm font-medium text-gray-400 cursor-not-allowed">
                  &larr; Previous
                </span>
              )}

              {/* Page 1 + ellipsis */}
              {startPage > 1 && (
                <>
                  <Link href="/blog?page=1" className="px-3 py-2 rounded-lg bg-white shadow text-sm font-medium text-[#0B1F3A] hover:bg-[#0EA5A0] hover:text-white transition-colors">1</Link>
                  {startPage > 2 && <span className="px-2 text-gray-400">...</span>}
                </>
              )}

              {/* Page numbers */}
              {pageNumbers.map((p) => (
                <Link
                  key={p}
                  href={`/blog?page=${p}`}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    p === currentPage
                      ? 'bg-[#0EA5A0] text-white shadow'
                      : 'bg-white shadow text-[#0B1F3A] hover:bg-[#0EA5A0] hover:text-white'
                  }`}
                >
                  {p}
                </Link>
              ))}

              {/* Ellipsis + last page */}
              {endPage < totalPages && (
                <>
                  {endPage < totalPages - 1 && <span className="px-2 text-gray-400">...</span>}
                  <Link href={`/blog?page=${totalPages}`} className="px-3 py-2 rounded-lg bg-white shadow text-sm font-medium text-[#0B1F3A] hover:bg-[#0EA5A0] hover:text-white transition-colors">{totalPages}</Link>
                </>
              )}

              {/* Next */}
              {currentPage < totalPages ? (
                <Link
                  href={`/blog?page=${currentPage + 1}`}
                  className="px-4 py-2 rounded-lg bg-white shadow text-sm font-medium text-[#0B1F3A] hover:bg-[#0EA5A0] hover:text-white transition-colors"
                >
                  Next &rarr;
                </Link>
              ) : (
                <span className="px-4 py-2 rounded-lg bg-gray-100 text-sm font-medium text-gray-400 cursor-not-allowed">
                  Next &rarr;
                </span>
              )}
            </nav>
          )}

          {posts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No posts available yet. Check back soon!</p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

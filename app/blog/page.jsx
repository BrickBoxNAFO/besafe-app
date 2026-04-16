import Link from 'next/link';
import { getAllPosts } from '@/lib/posts-all';

export const metadata = {
  title: 'Blog | HomeSafe Education',
  description:
    'Expert resources on safety education for children, teens, families, elders, and travelers. Learn practical tips to keep loved ones safe.',
  openGraph: {
    title: 'Blog | HomeSafe Education',
    description:
      'Expert resources on safety education for children, teens, families, elders, and travelers.',
    url: 'https://homesafeeducation.com/blog',
    type: 'website',
  },
};

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

export default function BlogPage() {
  const allPosts = getAllPosts();

  return (
    <main className="bg-slate-light min-h-screen">
      {/* Header */}
      <section className="bg-gradient-to-br from-navy-dark to-navy-dark/80 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold mb-4 font-serif">Safety Education Blog</h1>
          <p className="text-xl text-slate-200">
            Expert resources and practical tips on safety for families, teens, children, elders, and travelers.
          </p>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {allPosts.map((post) => (
              <article
                key={post.slug}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden flex flex-col"
              >
                {/* Category Badge */}
                <div className="px-6 pt-6 pb-2">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${categoryColors[post.category] || 'bg-gray-100 text-gray-700'}`}
                  >
                    {categoryLabels[post.category] || post.category}
                  </span>
                </div>

                {/* Content */}
                <div className="px-6 pb-6 flex-1 flex flex-col">
                  {/* Title */}
                  <Link
                    href={`/blog/${post.slug}`}
                    className="group"
                  >
                    <h2 className="text-xl font-bold font-serif text-navy-dark mb-3 group-hover:text-teal-accent transition-colors line-clamp-2">
                      {post.title}
                    </h2>
                  </Link>

                  {/* Excerpt */}
                  <p className="text-gray-600 text-sm mb-4 flex-1 line-clamp-3">{post.excerpt}</p>

                  {/* Meta */}
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                    <time dateTime={post.date}>
                      {new Date(post.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </time>
                    <span>{post.readTime}</span>
                  </div>

                  {/* Read More Link */}
                  <Link
                    href={`/blog/${post.slug}`}
                    className="text-teal-accent font-semibold text-sm hover:text-teal-accent/80 transition-colors inline-flex items-center gap-2"
                  >
                    Read Article
                    <span>→</span>
                  </Link>
                </div>
              </article>
            ))}
          </div>

          {/* No posts message */}
          {allPosts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No posts available yet. Check back soon!</p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

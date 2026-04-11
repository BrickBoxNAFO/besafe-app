import { getPostBySlug, getAllPosts } from '@/lib/posts-all'
import { notFound } from 'next/navigation'
import Link from 'next/link'
export async function generateStaticParams() {
  return getAllPosts().map(post => ({ slug: post.slug }))
}
export async function generateMetadata({ params }) {
  const post = getPostBySlug(params.slug)
  if (!post) return {}
  return {
    title: post.title + ' | HomeSafeEducation',
    description: post.metaDescription,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.metaDescription,
      type: 'article',
      url: `https://homesafeeducation.com/blog/${post.slug}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.metaDescription,
    },
  }
}
export default function BlogPost({ params }) {
  const post = getPostBySlug(params.slug)
  if (!post) notFound()
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 py-16">
        <div className="flex items-center gap-3 mb-5">
          <span className="text-xs font-semibold uppercase tracking-wide text-[#0EA5A0] bg-teal-50 px-3 py-1 rounded-full">{post.category}</span>
          <span className="text-sm text-gray-400">{post.readTime} min read &middot; {post.date}</span>
        </div>
        <h1 className="text-4xl font-bold text-[#0B1F3A] mb-10 leading-tight">{post.title}</h1>
        <div className="prose prose-lg max-w-none prose-headings:text-[#0B1F3A] prose-headings:font-bold prose-a:text-[#0EA5A0] prose-p:text-gray-700" dangerouslySetInnerHTML={{ __html: post.content }} />

        {/* Free lesson CTA */}
        <div className="mt-12 bg-gradient-to-r from-[#0B1F3A] to-[#1B3358] rounded-2xl p-8 text-center">
          <p className="text-white font-serif text-xl mb-2">Want to see our lessons in action?</p>
          <p className="text-white/60 text-sm mb-5">Try a complete lesson for free - no account needed.</p>
          <Link href="/example" className="inline-flex items-center gap-2 bg-[#0EA5A0] text-white font-semibold px-6 py-3 rounded-xl hover:opacity-90 transition-opacity text-sm">
            Try a Free Lesson
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          </Link>
        </div>
      </div>
    </main>
  )
}

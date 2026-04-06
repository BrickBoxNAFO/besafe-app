import { getPostBySlug, getAllPosts } from '@/lib/posts-all'
import { notFound } from 'next/navigation'
export async function generateStaticParams() {
  return getAllPosts().map(post => ({ slug: post.slug }))
}
export async function generateMetadata({ params }) {
  const post = getPostBySlug(params.slug)
  if (!post) return {}
  return { title: post.title + ' | HomeSafeEducation', description: post.metaDescription }
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
      </div>
    </main>
  )
}

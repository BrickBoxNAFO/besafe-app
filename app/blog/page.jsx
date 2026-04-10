import Link from 'next/link'
import { getAllPosts } from '@/lib/posts-all'
export const metadata = {
  title: 'Family Safety Blog | HomeSafeEducation',
  description: 'Practical safety guidance for every stage of family life — from protecting children online and offline, to supporting teenagers, caring for elderly parents, and keeping every generation safe.',
  alternates: { canonical: '/blog' },
}
export default function BlogPage() {
  const posts = getAllPosts()
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-[#0B1F3A] mb-4">Family Safety Blog</h1>
          <p className="text-gray-600 text-lg">Real guidance for keeping every generation of your family safe — online, offline, and everything in between.</p>
        </div>
        <div className="grid gap-8">
          {posts.map(post => (
            <article key={post.slug} className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow border border-gray-100">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-xs font-semibold uppercase tracking-wide text-[#0EA5A0] bg-teal-50 px-3 py-1 rounded-full">{post.category}</span>
                <span className="text-sm text-gray-400">{post.readTime} min read</span>
              </div>
              <h2 className="text-2xl font-bold text-[#0B1F3A] mb-3 leading-tight">
                <Link href={'/blog/' + post.slug} className="hover:text-[#0EA5A0] transition-colors">{post.title}</Link>
              </h2>
              <p className="text-gray-600 leading-relaxed mb-5">{post.excerpt}</p>
              <Link href={'/blog/' + post.slug} className="inline-flex items-center gap-2 text-[#0EA5A0] font-semibold hover:gap-3 transition-all text-sm">Read article &rarr;</Link>
            </article>
          ))}
        </div>
      </div>
    </main>
  )
}

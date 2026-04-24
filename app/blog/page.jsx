import { Suspense } from 'react';
import BlogContent from './BlogContent';

export const metadata = {
  title: 'Safety Education Blog | HomeSafe Education',
  description:
    'Expert resources on safety education for children, teens, families, elders, and travelers. Nearly 3,000 articles with practical tips to keep loved ones safe.',
  openGraph: {
    title: 'Safety Education Blog | HomeSafe Education',
    description:
      'Expert resources on safety education for children, teens, families, elders, and travelers. Nearly 3,000 articles with practical tips.',
    url: 'https://homesafeeducation.com/blog',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Safety Education Blog | HomeSafe Education',
    description:
      'Expert resources on safety education for children, teens, families, elders, and travelers.',
  },
  alternates: {
    canonical: '/blog',
  },
  robots: {
    index: true,
    follow: true,
    'max-image-preview': 'large',
    'max-snippet': -1,
  },
};

export default function BlogPage() {
  return (
    <Suspense fallback={
      <main className="bg-slate min-h-screen">
        <section className="bg-gradient-to-br from-[#0B1F3A] to-[#122544] text-white py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl font-bold mb-4 font-serif">Safety Education Blog</h1>
            <p className="text-xl text-slate-200">Loading articles...</p>
          </div>
        </section>
      </main>
    }>
      <BlogContent />
    </Suspense>
  );
}

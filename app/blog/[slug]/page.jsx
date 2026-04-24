import { getPostBySlug, getAllPosts } from '@/lib/posts-all';
import { notFound } from 'next/navigation';
import Link from 'next/link';

/* ---------- Package catalogue (mirrors lib/data.js) ---------- */
const PACKAGES = {
  growing: {
    name: 'Growing Minds',
    tag: 'Children 4\u201311',
    tagline: 'Life skills and safety from an early age',
    blurb:
      'Our Growing Minds courses help parents and carers give their children essential safety and life skills \u2014 in language that is age-appropriate, engaging, and empowering.',
  },
  street: {
    name: 'Street Smart',
    tag: 'Teenagers 12\u201317',
    tagline: 'Real-world confidence for teenagers',
    blurb:
      'Our Street Smart course gives teenagers the knowledge and confidence to handle real-world risks \u2014 online, socially, and on the streets.',
  },
  nest: {
    name: 'Nest Breaking',
    tag: 'Young Adults 16\u201325',
    tagline: 'Safety skills for life on your own',
    blurb:
      'Our Nest Breaking course gives young adults the practical skills for living independently \u2014 from personal safety to digital identity to real-world situations.',
  },
  roaming: {
    name: 'Roaming Free',
    tag: 'Travellers',
    tagline: 'Stay safe anywhere in the world',
    blurb:
      'Our Roaming Free course gives travellers the knowledge and confidence to stay safe anywhere in the world \u2014 from pre-trip planning to scams, emergencies, and high-risk situations.',
  },
  aging: {
    name: 'Aging Wisdom',
    tag: 'Older Adults 60+',
    tagline: 'Confidence, independence, and wellbeing at every age',
    blurb:
      'Our Aging Wisdom course helps older adults stay safe, confident, and independent \u2014 covering scams, digital life, home safety, financial protection, and staying well.',
  },
  parents: {
    name: 'Family Anchor',
    tag: 'Whole Family',
    tagline: 'The essential guide for parents, carers, and the whole family',
    blurb:
      'Our Family Anchor course gives parents and carers the knowledge and confidence to keep their families safe \u2014 across every age group and every risk.',
  },
};

function packageFor(post) {
  if (post?.packageId && PACKAGES[post.packageId]) return post.packageId;
  // Fallback inference from category if no packageId (older articles)
  const c = (post?.category || '').toLowerCase();
  if (/older|elder|senior|aging/.test(c)) return 'aging';
  if (/travel/.test(c)) return 'roaming';
  if (/young adult|university|student/.test(c)) return 'nest';
  if (/teen/.test(c)) return 'street';
  if (/young child|early years|ages 4|ages 8|child safety/.test(c)) return 'growing';
  return 'parents';
}

/* ---------- Split content at the middle </p> so we can insert a thin in-article CTA ---------- */
function splitAtMiddleParagraph(html) {
  if (!html) return [html || '', ''];
  const closes = [];
  const re = /<\/p>/gi;
  let m;
  while ((m = re.exec(html)) !== null) closes.push(m.index + m[0].length);
  // Need at least a few paragraphs to justify a mid-article break
  if (closes.length < 4) return [html, ''];
  // Pick the paragraph closest to the true midpoint of the HTML string
  const mid = Math.floor(html.length / 2);
  let best = closes[0];
  let bestDelta = Math.abs(best - mid);
  for (const pos of closes) {
    const d = Math.abs(pos - mid);
    if (d < bestDelta) { best = pos; bestDelta = d; }
  }
  return [html.slice(0, best), html.slice(best)];
}

/* ---------- Next.js metadata / static params ---------- */
export async function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }) {
  const post = getPostBySlug(params.slug);
  if (!post) return {};

  const ogImage = post.image || 'https://homesafeeducation.com/og-default.jpg';

  return {
    title: post.title + ' | HomeSafeEducation',
    description: post.metaDescription || post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    robots: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
    openGraph: {
      title: post.title,
      description: post.metaDescription || post.excerpt,
      type: 'article',
      url: `https://homesafeeducation.com/blog/${post.slug}`,
      images: [
        {
          url: ogImage,
          width: 1280,
          height: 720,
          alt: post.imageAlt || post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.metaDescription || post.excerpt,
      images: [ogImage],
    },
  };
}

/* ---------- Page ---------- */
export default function BlogPost({ params }) {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();

  const pkgId = packageFor(post);
  const pkg = PACKAGES[pkgId] || PACKAGES.parents;

  // Related posts (same package, excluding current)
  const related = getAllPosts()
    .filter((p) => p.slug !== post.slug && (p.packageId === pkgId))
    .slice(0, 3);

  // JSON-LD Article schema — gives Google, Bing (ChatGPT search), Perplexity,
  // and other AI crawlers a structured description of the article so it can
  // be cited as a source.
  const BASE_URL =
    process.env.NEXT_PUBLIC_SITE_URL || 'https://homesafeeducation.com';
  const pageUrl = `${BASE_URL}/blog/${post.slug}`;
  const isoDate = (() => {
    const d = post.date ? new Date(post.date) : null;
    return d && !isNaN(d.getTime()) ? d.toISOString() : new Date().toISOString();
  })();
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.metaDescription || post.excerpt || '',
    mainEntityOfPage: { '@type': 'WebPage', '@id': pageUrl },
    url: pageUrl,
    datePublished: isoDate,
    dateModified: isoDate,
    inLanguage: 'en',
    articleSection: post.category || 'Safety education',
    author: {
      '@type': 'Organization',
      name: 'HomeSafe Education',
      url: BASE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: 'HomeSafe Education',
      url: BASE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${BASE_URL}/logo.png`,
      },
    },
    about: pkg?.name,
    keywords: [post.category, pkg?.name, 'safety education', 'HomeSafe Education']
      .filter(Boolean)
      .join(', '),
    ...(post.image && {
      image: {
        '@type': 'ImageObject',
        url: post.image,
        width: 1280,
        height: 720,
      },
      thumbnailUrl: post.image,
    }),
  };

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Structured data for search engines + AI crawlers */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      {/* Top hairline bar matching packages page vibe */}
      <div className="border-b border-slate-200 bg-white">
        <div className="max-w-3xl mx-auto px-5 py-3 text-xs text-slate-500">
          <Link href="/" className="hover:text-[#0EA5A0]">Home</Link>
          <span className="mx-2 text-slate-300">/</span>
          <Link href="/blog" className="hover:text-[#0EA5A0]">Blog</Link>
          <span className="mx-2 text-slate-300">/</span>
          <span className="text-slate-700">{post.category}</span>
        </div>
      </div>

      <article className="max-w-3xl mx-auto px-5 md:px-8 py-12 md:py-16">
        {/* Meta row */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-[#0EA5A0] bg-teal-50 ring-1 ring-teal-100 px-3 py-1 rounded-full">
            {post.category}
          </span>
          <span className="text-sm text-slate-400">
            {post.readTime} min read &middot; {post.date}
          </span>
        </div>

        {/* Title */}
        <h1 className="font-serif text-4xl md:text-5xl font-bold text-[#0B1F3A] mb-6 leading-[1.12] tracking-tight">
          {post.title}
        </h1>

        {/* Lede / excerpt */}
        {post.excerpt && (
          <p className="text-lg md:text-xl text-slate-600 leading-relaxed mb-10 border-l-4 border-[#0EA5A0] pl-5 italic">
            {post.excerpt}
          </p>
        )}

        {/* Hero image — Google Discover requires a prominent, relevant image */}
        {post.image && (
          <div className="mb-10 rounded-2xl overflow-hidden border border-slate-200 shadow-sm">
            <img
              src={post.image}
              alt={post.imageAlt || post.title}
              width={1280}
              height={720}
              className="w-full h-auto"
              loading="eager"
            />
          </div>
        )}

        {/* Body split at the middle paragraph, with a thin in-article CTA inserted between */}
        {(() => {
          const [topHtml, bottomHtml] = splitAtMiddleParagraph(post.content || '');
          const proseClass = `blog-content prose prose-lg max-w-none
            prose-headings:font-serif prose-headings:text-[#0B1F3A] prose-headings:font-bold
            prose-h2:text-[1.75rem] prose-h2:mt-12 prose-h2:mb-5 prose-h2:pb-2 prose-h2:border-b prose-h2:border-slate-200
            prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3 prose-h3:text-[#1B3358]
            prose-p:text-slate-700 prose-p:leading-[1.85] prose-p:my-5
            prose-a:text-[#0EA5A0] prose-a:font-semibold prose-a:no-underline hover:prose-a:underline
            prose-strong:text-[#0B1F3A]
            prose-ul:my-5 prose-ol:my-5 prose-li:my-2 prose-li:text-slate-700 prose-li:leading-[1.75]
            prose-blockquote:border-l-[#0EA5A0] prose-blockquote:bg-slate-100 prose-blockquote:not-italic prose-blockquote:rounded-r-lg prose-blockquote:py-2 prose-blockquote:px-5`;
          return (
            <>
              <div className={proseClass} dangerouslySetInnerHTML={{ __html: topHtml }} />

              {/* Thin mid-article CTA — compact, brand-coloured, doesn't break reading flow */}
              {bottomHtml && (
                <Link
                  href={`/packages#${pkgId}`}
                  className="not-prose my-8 flex items-center gap-3 md:gap-4 bg-white hover:bg-slate-50 border-l-4 border-[#0EA5A0] ring-1 ring-slate-200 hover:ring-[#0EA5A0] rounded-r-lg rounded-l-sm pl-4 pr-3 py-3 md:pl-5 md:pr-4 md:py-3.5 shadow-sm hover:shadow transition-all group"
                >
                  <div className="flex-shrink-0 w-9 h-9 rounded-full bg-teal-50 flex items-center justify-center ring-1 ring-teal-100">
                    <svg className="w-4 h-4 text-[#0EA5A0]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 2l8 4v6c0 5-3.5 9-8 10-4.5-1-8-5-8-10V6l8-4z" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[11px] font-semibold uppercase tracking-wider text-[#0EA5A0] leading-tight">
                      From HomeSafe Education
                    </div>
                    <div className="text-[14px] md:text-[15px] text-[#0B1F3A] font-medium leading-snug truncate">
                      Learn more in our <strong>{pkg.name}</strong> course &mdash; {pkg.tag}
                    </div>
                  </div>
                  <div className="flex-shrink-0 inline-flex items-center gap-1 text-[13px] font-semibold text-[#0EA5A0] group-hover:text-[#0B1F3A] whitespace-nowrap">
                    <span className="hidden sm:inline">Learn more</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </Link>
              )}

              {bottomHtml && (
                <div className={proseClass} dangerouslySetInnerHTML={{ __html: bottomHtml }} />
              )}
            </>
          );
        })()}

        {/* Package CTA — dynamic based on article's packageId */}
        <aside className="mt-14 rounded-2xl overflow-hidden shadow-xl ring-1 ring-[#0B1F3A]/10">
          <div className="relative bg-gradient-to-br from-[#0B1F3A] via-[#122a4d] to-[#0B1F3A] px-6 py-10 md:px-10 md:py-12 text-center">
            {/* HomeSafe Education wordmark (matches site nav) */}
            <Link href="/" className="inline-block mb-5">
              <span
                className="text-2xl md:text-[1.65rem] font-bold tracking-tight leading-none"
                style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
              >
                <span className="text-white">HomeSafe</span>
                <span className="text-[#E8703A]">Education</span>
              </span>
            </Link>
            <h3 className="font-serif text-white text-2xl md:text-[1.75rem] leading-tight mb-3">
              Expert Safety Education For Every Generation
            </h3>
            <p className="text-white/80 text-[15px] md:text-base max-w-xl mx-auto leading-relaxed mb-2">
              Our <strong className="text-white font-semibold">{pkg.name}</strong> course &mdash; {pkg.tagline.toLowerCase()}.
            </p>
            <p className="text-white/50 text-sm max-w-lg mx-auto mb-7">
              Take a course yourself &mdash; or give one as a gift to your child, teenager, or elderly parent.
            </p>
            <Link
              href={`/packages#${pkgId}`}
              className="inline-flex items-center gap-2 bg-[#0EA5A0] hover:bg-[#0d8f8a] text-white font-semibold text-[15px] px-7 py-3.5 rounded-xl transition-colors shadow-lg shadow-[#0EA5A0]/20"
            >
              View Our Courses &amp; Packages
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
            <p className="mt-5 text-white/40 text-xs tracking-wide">
              One-time payment &middot; Instant access &middot; Expert-led content
            </p>
          </div>
        </aside>

        {/* Related articles */}
        {related.length > 0 && (
          <section className="mt-16">
            <h3 className="font-serif text-2xl text-[#0B1F3A] mb-6">More on this topic</h3>
            <div className="grid gap-4 md:grid-cols-3">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={`/blog/${r.slug}`}
                  className="group block bg-white rounded-xl ring-1 ring-slate-200 hover:ring-[#0EA5A0] hover:shadow-lg transition-all p-5"
                >
                  <div className="text-[10px] font-semibold uppercase tracking-wider text-[#0EA5A0] mb-2">
                    {r.category}
                  </div>
                  <h4 className="font-serif text-[#0B1F3A] text-base leading-snug mb-2 group-hover:text-[#0EA5A0] line-clamp-3">
                    {r.title}
                  </h4>
                  <div className="text-xs text-slate-400">{r.readTime} min read</div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Back to blog */}
        <div className="mt-14 pt-8 border-t border-slate-200 text-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-[#0EA5A0] font-semibold hover:underline"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Browse all articles
          </Link>
        </div>
      </article>
    </main>
  );
}

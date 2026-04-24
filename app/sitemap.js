// Next.js 14 App Router convention: app/sitemap.js
//
// Auto-generates /sitemap.xml at build time + on demand. Lists every
// crawlable URL so Google, Bing (feeds ChatGPT search), and AI crawlers
// can discover the full content set in one request.

import { getAllPosts } from '@/lib/posts-all';

const BASE = process.env.NEXT_PUBLIC_SITE_URL || 'https://homesafeeducation.com';

// Static routes that should be indexed. Auth-gated routes (dashboard,
// account, etc.) are intentionally excluded.
const STATIC_ROUTES = [
  { path: '',                    priority: 1.0, changeFrequency: 'weekly'  },
  { path: '/about',              priority: 0.8, changeFrequency: 'monthly' },
  { path: '/packages',           priority: 0.9, changeFrequency: 'weekly'  },
  { path: '/contact',            priority: 0.7, changeFrequency: 'monthly' },
  { path: '/faq',                priority: 0.7, changeFrequency: 'monthly' },
  { path: '/family',             priority: 0.7, changeFrequency: 'monthly' },
  { path: '/blog',               priority: 0.9, changeFrequency: 'daily'   },
  { path: '/safeguarding',       priority: 0.5, changeFrequency: 'yearly'  },
  { path: '/coppa',              priority: 0.4, changeFrequency: 'yearly'  },
  { path: '/affiliates',         priority: 0.6, changeFrequency: 'monthly' },
  { path: '/affiliates/terms',   priority: 0.4, changeFrequency: 'yearly'  },
  { path: '/privacy',            priority: 0.3, changeFrequency: 'yearly'  },
  { path: '/terms',              priority: 0.3, changeFrequency: 'yearly'  },
  { path: '/cookies',            priority: 0.3, changeFrequency: 'yearly'  },
  { path: '/refunds',            priority: 0.3, changeFrequency: 'yearly'  },
];

// NOTE: Individual /packages/{slug} routes do not exist — packages are
// displayed on the single /packages page. Do NOT list them in the sitemap
// as they would return 404 and waste crawl budget.

export const revalidate = 86400; // regenerate the sitemap once per day

export default async function sitemap() {
  const urls = [];
  const today = new Date();

  // Static pages
  for (const r of STATIC_ROUTES) {
    urls.push({
      url: `${BASE}${r.path}`,
      lastModified: today,
      changeFrequency: r.changeFrequency,
      priority: r.priority,
    });
  }

  // Blog posts — 2991 SEO-oriented articles.
  const posts = getAllPosts();
  for (const post of posts) {
    if (!post.slug) continue;
    const parsed = post.date ? new Date(post.date) : null;
    const lastModified = parsed && !isNaN(parsed.getTime()) ? parsed : today;
    urls.push({
      url: `${BASE}/blog/${post.slug}`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.6,
    });
  }

  return urls;
}

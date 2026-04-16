import { posts } from './posts';
import { postsExtended } from './posts-extended';
import { seoBatch1 } from './posts-seo-batch-1';
import { seoBatch2 } from './posts-seo-batch-2';
import { seoBatch3 } from './posts-seo-batch-3';
import { seoBatch4 } from './posts-seo-batch-4';
import { seoBatch5 } from './posts-seo-batch-5';
import { seoBatch6 } from './posts-seo-batch-6';
import { seoBatch7 } from './posts-seo-batch-7';
import { seoBatch8 } from './posts-seo-batch-8';
import { seoBatch9 } from './posts-seo-batch-9';
import { seoBatch10 } from './posts-seo-batch-10';
import { seoBatch11 } from './posts-seo-batch-11';

const allPosts = [...posts, ...postsExtended, ...seoBatch1, ...seoBatch2, ...seoBatch3, ...seoBatch4, ...seoBatch5, ...seoBatch6, ...seoBatch7, ...seoBatch8, ...seoBatch9, ...seoBatch10, ...seoBatch11];

export function getAllPosts() {
  return [...allPosts].sort((a, b) => {
    const ad = new Date(a.date).getTime();
    const bd = new Date(b.date).getTime();
    if (!isFinite(ad) && !isFinite(bd)) return 0;
    if (!isFinite(ad)) return 1;
    if (!isFinite(bd)) return -1;
    return bd - ad;
  });
}

export function getPostBySlug(slug) {
  return allPosts.find((p) => p.slug === slug) || null;
}

export function getPostsByCategory(category) {
  return getAllPosts().filter((p) => p.category === category);
}

// Auto-generated — imports all blog article batches

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
import { seoBatch12 } from './posts-seo-batch-12';
import { seoBatch13 } from './posts-seo-batch-13';
import { seoBatch14 } from './posts-seo-batch-14';
import { seoBatch15 } from './posts-seo-batch-15';
import { seoBatch16 } from './posts-seo-batch-16';
import { seoBatch17 } from './posts-seo-batch-17';
import { seoBatch18 } from './posts-seo-batch-18';
import { seoBatch19 } from './posts-seo-batch-19';
import { seoBatch20 } from './posts-seo-batch-20';
import { seoBatch21 } from './posts-seo-batch-21';
import { seoBatch22 } from './posts-seo-batch-22';
import { seoBatch23 } from './posts-seo-batch-23';
import { seoBatch24 } from './posts-seo-batch-24';
import { seoBatch25 } from './posts-seo-batch-25';
import { seoBatch26 } from './posts-seo-batch-26';
import { seoBatch27 } from './posts-seo-batch-27';
import { seoBatch28 } from './posts-seo-batch-28';
import { seoBatch29 } from './posts-seo-batch-29';
import { seoBatch30 } from './posts-seo-batch-30';
import { seoBatch31 } from './posts-seo-batch-31';

// Combine all batches
const allPosts = [...seoBatch1, ...seoBatch2, ...seoBatch3, ...seoBatch4, ...seoBatch5, ...seoBatch6, ...seoBatch7, ...seoBatch8, ...seoBatch9, ...seoBatch10, ...seoBatch11, ...seoBatch12, ...seoBatch13, ...seoBatch14, ...seoBatch15, ...seoBatch16, ...seoBatch17, ...seoBatch18, ...seoBatch19, ...seoBatch20, ...seoBatch21, ...seoBatch22, ...seoBatch23, ...seoBatch24, ...seoBatch25, ...seoBatch26, ...seoBatch27, ...seoBatch28, ...seoBatch29, ...seoBatch30, ...seoBatch31];

export function getAllPosts() {
  return allPosts.sort((a, b) => {
    const da = a.date ? new Date(a.date) : new Date(0);
    const db = b.date ? new Date(b.date) : new Date(0);
    const ta = isNaN(da.getTime()) ? 0 : da.getTime();
    const tb = isNaN(db.getTime()) ? 0 : db.getTime();
    return tb - ta;
  });
}

export function getPostBySlug(slug) {
  return allPosts.find(p => p.slug === slug) || null;
}

export function getPostsByCategory(category) {
  return allPosts.filter(p => p.category === category);
}

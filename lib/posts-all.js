import { posts } from './posts'
import { extendedPosts } from './posts-extended'
import { seoPosts1 } from './posts-seo-1'
import { seoPosts2 } from './posts-seo-2'
import { seoPosts3 } from './posts-seo-3'
import { seoPosts4 } from './posts-seo-4'
import { seoPostsNew1 } from './posts-seo-new-1'
import { seoBatch2File1 } from './posts-seo-batch2-1'
import { seoBatch2File2 } from './posts-seo-batch2-2'
import { seoBatch2File3 } from './posts-seo-batch2-3'
import { seoBatch2File4 } from './posts-seo-batch2-4'
import { seoBatch2File5 } from './posts-seo-batch2-5'
import { seoBatch2File6 } from './posts-seo-batch2-6'
import { seoBatch2File7 } from './posts-seo-batch2-7'

const allPosts = [...posts, ...extendedPosts, ...seoPosts1, ...seoPosts2, ...seoPosts3, ...seoPosts4, ...seoPostsNew1, ...seoBatch2File1, ...seoBatch2File2, ...seoBatch2File3, ...seoBatch2File4, ...seoBatch2File5, ...seoBatch2File6, ...seoBatch2File7]

export function getAllPosts() {
    return allPosts
}

export function getPostBySlug(slug) {
    return allPosts.find(p => p.slug === slug) || null
}

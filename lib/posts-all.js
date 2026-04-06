import { posts } from './posts'
import { extendedPosts } from './posts-extended'
import { robloxPosts } from './posts-roblox'
import { seoPosts1 } from './posts-seo-1'
import { seoPosts2 } from './posts-seo-2'
import { seoPosts3 } from './posts-seo-3'
import { seoPosts4 } from './posts-seo-4'

const allPosts = [...posts, ...extendedPosts, ...robloxPosts, ...seoPosts1, ...seoPosts2, ...seoPosts3, ...seoPosts4]

export function getAllPosts() {
    return allPosts
}

export function getPostBySlug(slug) {
    return allPosts.find(p => p.slug === slug) || null
}

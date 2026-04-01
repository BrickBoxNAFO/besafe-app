import { posts } from './posts'
import { extendedPosts } from './posts-extended'
import { robloxPosts } from './posts-roblox'

const allPosts = [...posts, ...extendedPosts, ...robloxPosts]

export function getAllPosts() {
  return allPosts
}

export function getPostBySlug(slug) {
  return allPosts.find(p => p.slug === slug) || null
}
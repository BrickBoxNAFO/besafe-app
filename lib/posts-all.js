import { posts } from './posts';
import { postsExtended } from './posts-extended';

export function getAllPosts() {
  return [...posts, ...postsExtended].sort((a, b) => new Date(b.date) - new Date(a.date));
}

export function getPostBySlug(slug) {
  const allPosts = getAllPosts();
  return allPosts.find((post) => post.slug === slug);
}

export function getPostsByCategory(category) {
  const allPosts = getAllPosts();
  return allPosts.filter((post) => post.category === category);
}

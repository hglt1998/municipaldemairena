import { fetchFromAPI } from './apiClient';
import { Post } from '../types/post';

// Obtener todas las entradas
export async function getAllPosts(): Promise<Post[]> {
  return fetchFromAPI<Post[]>('posts');
}

// Obtener una entrada por slug
export async function getPostBySlug(slug: string): Promise<Post | null> {
  const posts = await fetchFromAPI<Post[]>(`posts?slug=${slug}`);
  return posts.length > 0 ? posts[0] : null;
}

// Obtener las entradas más recientes
export async function getRecentPosts(limit = 5): Promise<Post[]> {
  return fetchFromAPI<Post[]>(`posts?per_page=${limit}`);
}

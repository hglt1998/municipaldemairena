import { fetchFromAPI } from './apiClient';
import { Page } from '../types/page';

// Obtener todas las páginas
export async function getAllPages(): Promise<Page[]> {
  return fetchFromAPI<Page[]>('pages');
}

// Obtener una página por slug
export async function getPageBySlug(slug: string): Promise<Page | null> {
  const pages = await fetchFromAPI<Page[]>(`pages?slug=${slug}`);
  return pages.length > 0 ? pages[0] : null;
}

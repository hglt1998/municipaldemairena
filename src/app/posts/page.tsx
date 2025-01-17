import { getAllPages } from '../../services/pages';
import Link from 'next/link';

export default async function Pages() {
  const pages = await getAllPages();

  return (
    <main>
      <h1>Páginas</h1>
      <ul>
        {pages.map((page) => (
          <li key={page.id}>
            <Link href={`/pages/${page.slug}`}>{page.title.rendered}</Link>
          </li>
        ))}
      </ul>
    </main>
  );
}

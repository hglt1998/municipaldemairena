import { Metadata } from 'next';
import { getPostBySlug } from '../../../services/posts';
import { notFound } from 'next/navigation';

interface PostPageProps {
  params: { slug: string };
}
export const metadata: Metadata = {
  // title: `${post.title.rendered}`
}

export default async function PostPage({ params }: PostPageProps) {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }


  return (
    <article className='max-w-4xl bg-gray-100 rounded-lg p-7'>
      <h1 className='text-3xl font-black mb-4'>{post.title.rendered}</h1>
      <div dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
    </article>
  );
}

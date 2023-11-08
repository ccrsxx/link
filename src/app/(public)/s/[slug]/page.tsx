import Link from 'next/link';
import { redirect } from 'next/navigation';
import { checkSlugExists } from '@/lib/helper-server';
import { NEXT_PUBLIC_URL } from '@/lib/env';
import { CopyButton } from '@/components/ui/copy-button';
import { Button } from '@/components/ui/button';

export default async function Success({
  params: { slug }
}: {
  params: { slug: string };
}): Promise<JSX.Element> {
  const slugExists = await checkSlugExists(slug);

  if (!slugExists) redirect('/');

  const url = `${NEXT_PUBLIC_URL}/l/${slug}`;

  return (
    <main>
      <section className='mx-auto grid w-full max-w-md gap-4'>
        <h1>Your short link has been created successfully:</h1>
        <div className='main-border relative rounded px-3 py-2'>
          <a
            className='animated-underline'
            href={url}
            target='_blank'
            rel='noopener noreferrer'
          >
            {url}
          </a>
          <CopyButton url={url} />
        </div>
        <Link className='mx-auto' href='/'>
          <Button className='custom-button clickable'>Create another</Button>
        </Link>
      </section>
    </main>
  );
}

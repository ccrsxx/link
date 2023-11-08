'use client';

import { useState } from 'react';
import { useFormState } from 'react-dom';
import { URL_WITHOUT_PROTOCOL } from '@/lib/env';
import { Alert } from '@/components/ui/alert';
import { createLink } from '../actions';
import { validUrl } from '../schema';
import { Submit } from './submit';
import type { ChangeEvent } from 'react';

export default function Home(): JSX.Element {
  const [message, formAction] = useFormState(createLink, null);

  const [slug, setSlug] = useState('');
  const [url, setUrl] = useState('');

  const handleSlugChange = ({
    target: { value }
  }: ChangeEvent<HTMLInputElement>): void => setSlug(value);

  const handleUrlChange = ({
    target: { value }
  }: ChangeEvent<HTMLInputElement>): void => setUrl(value);

  const isValidURL = validUrl.safeParse(url).success;

  return (
    <main>
      <section className='mx-auto w-full max-w-md'>
        <form className='grid gap-4' action={formAction}>
          <div className='flex w-full items-center py-0 pr-0'>
            <p className='custom-input rounded-r-none border-r-0 text-gray-600 dark:text-gray-300'>
              {URL_WITHOUT_PROTOCOL}/
            </p>
            <input
              className='custom-input w-full rounded-l-none'
              name='slug'
              type='text'
              value={slug}
              maxLength={255}
              placeholder='Slug (optional)'
              onChange={handleSlugChange}
            />
          </div>
          <input
            required
            className='custom-input w-full'
            name='url'
            type='text'
            value={url}
            maxLength={255}
            placeholder='URL to shorten'
            onChange={handleUrlChange}
          />
          {message && <Alert variant='error' message={message} />}
          <Submit isValidURL={isValidURL} />
        </form>
      </section>
    </main>
  );
}

'use client';

import { useState } from 'react';
import { useFormState } from 'react-dom';
import { z } from 'zod';
import { NEXT_PUBLIC_URL } from '@/lib/env';
import { Alert } from '@/components/ui/alert';
import { createLink } from '../actions';
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

  const isValidURL = z.string().url().safeParse(url).success;

  return (
    <main>
      <section className='mx-auto w-full max-w-md'>
        <form className='grid gap-4' action={formAction}>
          <div className='flex flex-col items-center gap-4 sm:flex-row'>
            <p>{NEXT_PUBLIC_URL}/</p>
            <input
              className='custom-input w-full'
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

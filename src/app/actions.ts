'use server';

import { redirect } from 'next/navigation';
import { ZodError } from 'zod';
import { prisma } from '@/lib/db';
import {
  checkIfUrlIsValid,
  checkSlugExists,
  generateRandomSlug
} from '@/lib/helper';
import { linkSchema } from './schema';

export async function createLink(
  _prevState: string | null,
  formData: FormData
): Promise<string | null> {
  const formObject = Object.fromEntries(formData.entries());

  let parsedSlug: string;

  try {
    const { url, slug } = linkSchema.parse(formObject);

    const isValidUrl = checkIfUrlIsValid(url);

    if (!isValidUrl) throw new Error("URL can't be from this website");

    // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
    parsedSlug = slug || generateRandomSlug();

    const slugExists = await checkSlugExists(parsedSlug);

    if (slugExists) throw new Error('Slug already exists');

    await prisma.link.create({
      data: {
        url: url,
        slug: parsedSlug
      }
    });
  } catch (err) {
    if (err instanceof ZodError) {
      const parsedError = err.errors.map(({ message }) => message).join(', ');
      return parsedError;
    }

    if (err instanceof Error) return err.message;

    return 'Internal server error';
  }

  redirect(`/s/${parsedSlug}`);
}

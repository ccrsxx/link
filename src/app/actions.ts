'use server';

import { redirect } from 'next/navigation';
import { ZodError } from 'zod';
import { prisma } from '@/lib/db';
import { checkSlugExists, generateRandomSlug } from '@/lib/helper-server';
import { linkSchema } from './schema';

export async function createLink(
  _prevState: unknown,
  formData: FormData
): Promise<string | null> {
  const formObject = Object.fromEntries(formData.entries());

  let parsedSlug: string;

  try {
    const { url, slug } = linkSchema.parse(formObject);

    parsedSlug = slug ?? generateRandomSlug();

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

  redirect(`/success?slug=${parsedSlug}`);
}

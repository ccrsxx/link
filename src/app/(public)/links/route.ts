import { NextResponse } from 'next/server';
import { ZodError } from 'zod';
import { prisma } from '@/lib/db';
import { checkIfUrlIsValid } from '@/lib/helper';
import { checkSlugExists, generateRandomSlug } from '@/lib/helper-server';
import { NEXT_PUBLIC_URL } from '@/lib/env';
import { linkSchema } from '@/app/schema';
import type { APIResponse } from '@/lib/types/api';
import type { LinkMeta } from '@/lib/types/meta';

export async function POST(
  request: Request
): Promise<NextResponse<APIResponse<LinkMeta>>> {
  try {
    const body = (await request.json()) as unknown;

    const { url, slug } = linkSchema.parse(body);

    const isValidUrl = checkIfUrlIsValid(url);

    if (!isValidUrl) throw new Error("URL can't be from this website");

    // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
    const parsedSlug = slug || generateRandomSlug();

    const slugExists = await checkSlugExists(parsedSlug);

    if (slugExists) throw new Error('Slug already exists');

    await prisma.link.create({
      data: {
        url: url,
        slug: parsedSlug
      }
    });

    return NextResponse.json(
      {
        message: 'Link created successfully',
        data: {
          url: `${NEXT_PUBLIC_URL}/l/${parsedSlug}`,
          slug: parsedSlug,
          successUrl: `${NEXT_PUBLIC_URL}/s/${parsedSlug}`
        }
      },
      { status: 201 }
    );
  } catch (err) {
    if (err instanceof ZodError) {
      const parsedError = err.errors.map(({ message }) => message).join(', ');
      return NextResponse.json({ message: parsedError }, { status: 400 });
    }

    if (err instanceof Error)
      return NextResponse.json({ message: err.message }, { status: 500 });

    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

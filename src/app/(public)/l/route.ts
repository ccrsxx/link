import { NextResponse } from 'next/server';
import { ZodError } from 'zod';
import { prisma } from '@/lib/db';
import { checkIfUrlIsValid } from '@/lib/helper';
import { checkSlugExists, generateRandomSlug } from '@/lib/helper-server';
import { NEXT_PUBLIC_URL } from '@/lib/env';
import { linkSchema } from '@/app/schema';
import type { Link } from '@/app/schema';
import type { APIResponse } from '@/lib/types/api';
import type { LinkMeta } from '@/lib/types/meta';

export async function POST(
  request: Request
): Promise<NextResponse<APIResponse<LinkMeta>>> {
  const body = (await request.json().catch(() => null)) as Link | null;

  if (!body)
    return NextResponse.json(
      { message: 'Invalid request body' },
      { status: 400 }
    );

  try {
    const { url, slug } = linkSchema.parse(body);

    const isValidUrl = checkIfUrlIsValid(url);

    if (!isValidUrl)
      return NextResponse.json(
        { message: "URL can't be from this website" },
        { status: 400 }
      );

    // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
    const parsedSlug = slug || generateRandomSlug();

    const slugExists = await checkSlugExists(parsedSlug);

    if (slugExists)
      return NextResponse.json(
        { message: 'Slug already exists' },
        { status: 400 }
      );

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
          url: url,
          slug: parsedSlug,
          successUrl: `${NEXT_PUBLIC_URL}/s/${parsedSlug}`,
          redirectUrl: `${NEXT_PUBLIC_URL}/l/${parsedSlug}`
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

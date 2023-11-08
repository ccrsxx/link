import { NextResponse } from 'next/server';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/db';
import type { APIResponse } from '@/lib/types/api';

export async function GET(
  _request: Request,
  {
    params: { slug }
  }: {
    params: { slug: string };
  }
): Promise<NextResponse<APIResponse>> {
  const link = await prisma.link
    .findUnique({
      where: {
        slug
      }
    })
    .catch(() => null);

  if (!link) return NextResponse.json({ message: 'Slug not found' });

  redirect(link.url);
}

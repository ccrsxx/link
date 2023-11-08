import { randomBytes } from 'crypto';
import { prisma } from './db';

/**
 * Returns true if slug exists in database.
 */
export async function checkSlugExists(slug: string): Promise<boolean> {
  const link = await prisma.link.findUnique({
    where: {
      slug
    }
  });

  return !!link;
}

/**
 * Returns a random string for slug.
 */
export function generateRandomSlug(): string {
  return randomBytes(3).toString('hex');
}

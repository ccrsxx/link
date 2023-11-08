import { randomBytes } from 'crypto';
import { prisma } from './db';
import { URL_WITHOUT_PROTOCOL } from './env';

/**
 * Returns a random string for slug.
 */
export function generateRandomSlug(): string {
  return randomBytes(3).toString('hex');
}

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

export function checkIfUrlIsValid(url: string): boolean {
  return !url.includes(URL_WITHOUT_PROTOCOL);
}

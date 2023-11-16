import { randomBytes } from 'crypto';
import { prisma } from './db';

/**
 * Returns true if slug exists in database.
 */
export async function checkSlugExists(slug: string): Promise<boolean> {
  const link = await prisma.link
    .findUnique({
      where: {
        slug
      }
    })
    .catch(() => null);

  return !!link;
}

/**
 * Returns a random string for slug.
 */
export function generateRandomSlug(): string {
  return randomBytes(3).toString('hex');
}

/**
 * Returns the bearer token from the request headers.
 */
export function getBearerToken(headers: Headers): string | null {
  const authorization = headers.get('authorization');

  if (!authorization) return null;

  const [authType, bearerToken] = authorization.split(' ');

  if (authType.toLowerCase() !== 'bearer' || !bearerToken) return null;

  return bearerToken;
}

/**
 * Returns the origin from the request headers.
 */
export function getOrigin(headers: Headers): string | null {
  const origin = headers.get('origin');

  if (origin) return origin;

  const referer = headers.get('referer');

  if (!referer) return null;

  const originFromReferer = new URL(referer).origin;

  return originFromReferer;
}

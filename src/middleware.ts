import { NextResponse } from 'next/server';
import { rateLimit } from './lib/rate-limit';
import { getOrigin, getBearerToken } from './lib/helper-server';
import { SECRET_PASSWORD } from './lib/env-server';
import { NEXT_PUBLIC_URL } from './lib/env';

const limiter = rateLimit({
  interval: 60 * 1000, // 1 minute
  uniqueTokenPerInterval: 500 // Max 500 users per minute
});

export async function middleware(request: Request): Promise<NextResponse> {
  const headers = new Headers(request.headers);

  try {
    await limiter.check({
      limit: 10,
      token: 'CACHE_TOKEN',
      headers: headers
    });
  } catch {
    return NextResponse.json(
      { message: 'Too many requests' },
      { status: 429, headers: headers }
    );
  }

  const origin = getOrigin(headers);

  if (origin !== NEXT_PUBLIC_URL)
    return NextResponse.json(
      { message: 'Forbidden' },
      { status: 403, headers: headers }
    );

  const bearerToken = getBearerToken(headers);

  if (bearerToken !== SECRET_PASSWORD)
    return NextResponse.json(
      { message: 'Unauthorized' },
      { status: 401, headers: headers }
    );

  return NextResponse.next({ headers });
}

type Config = {
  matcher: string;
};

export const config: Config = {
  matcher: '/links'
};

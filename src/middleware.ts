import { NextResponse } from 'next/server';
import { rateLimit } from './lib/rate-limit';

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

  return NextResponse.next({ headers });
}

type Config = {
  matcher: string;
};

export const config: Config = {
  matcher: '/links'
};

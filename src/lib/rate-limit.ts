import { LRUCache } from 'lru-cache';

type Options = {
  interval?: number;
  uniqueTokenPerInterval?: number;
};

/**
 * Rate limit helper.
 *
 * @param {Options} [options] Options
 * @param {number} [options.interval=60000] Interval in milliseconds
 * @param {number} [options.uniqueTokenPerInterval=500] Max unique tokens per interval
 */
export function rateLimit({
  interval = 60 * 1000,
  uniqueTokenPerInterval = 500
}: Options = {}): {
  check: (options: {
    limit: number;
    token: string;
    headers: Headers;
  }) => Promise<void>;
} {
  const tokenCache = new LRUCache({
    ttl: interval,
    max: uniqueTokenPerInterval
  });

  return {
    check: ({ headers, limit, token }) =>
      new Promise((resolve, reject) => {
        const tokenCount = (tokenCache.get(token) as number[]) || [0];

        if (tokenCount[0] === 0) tokenCache.set(token, tokenCount);

        tokenCount[0] += 1;

        const currentUsage = tokenCount[0];
        const isRateLimited = currentUsage >= limit;
        const limitRemaining = isRateLimited ? 0 : limit - currentUsage;

        headers.set('X-RateLimit-Limit', limit.toString());
        headers.set('X-RateLimit-Remaining', limitRemaining.toString());

        return isRateLimited ? reject() : resolve();
      })
  };
}

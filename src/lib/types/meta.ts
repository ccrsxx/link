import type { Link } from '@/app/schema';

export type LinkMeta = Required<Link> & {
  successUrl: string;
  redirectUrl: string;
};

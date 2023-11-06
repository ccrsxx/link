import { z } from 'zod';

export type Link = z.infer<typeof linkSchema>;

export const linkSchema = z.object({
  url: z.string().url().max(255),
  slug: z.string().max(255).optional()
});

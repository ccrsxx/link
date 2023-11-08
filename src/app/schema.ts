import { z } from 'zod';
import { checkIfUrlIsValid } from '@/lib/helper';

export type Link = z.infer<typeof linkSchema>;

export const validUrl = z.string().max(255).url().refine(checkIfUrlIsValid, {
  message: "URL can't be from this website"
});

export const linkSchema = z.object({
  url: validUrl,
  slug: z.string().max(255).optional()
});

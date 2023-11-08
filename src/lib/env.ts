import { z } from 'zod';

const envSchema = z.object({
  NEXT_PUBLIC_URL: z.string()
});

const parsedSchema = envSchema.parse({
  NEXT_PUBLIC_URL: process.env.NEXT_PUBLIC_URL
});

const { NEXT_PUBLIC_URL } = parsedSchema;

const URL_WITHOUT_PROTOCOL = NEXT_PUBLIC_URL.replace(/(^\w+:|^)\/\//, '');

export { NEXT_PUBLIC_URL, URL_WITHOUT_PROTOCOL };

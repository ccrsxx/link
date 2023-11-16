import { z } from 'zod';

const envSchema = z.object({
  SECRET_PASSWORD: z.string().min(1),
  POSTGRES_PRISMA_URL: z.string().min(1),
  POSTGRES_URL_NON_POOLING: z.string().min(1)
});

export const { SECRET_PASSWORD } = envSchema.parse(process.env);

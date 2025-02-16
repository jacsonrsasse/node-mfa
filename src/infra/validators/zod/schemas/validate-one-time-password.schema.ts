import { z } from 'zod';

export const validateOneTimePasswordSchema = z.object({
  userId: z.coerce.number(),
  code: z.coerce.number(),
});

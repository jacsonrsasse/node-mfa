import { z } from 'zod';

export const oneTimePasswordSchema = z.object({
  userId: z.coerce.number(),
});

import { createUserSchema } from './create-user.schema';

export const loginSchema = createUserSchema.pick({
  email: true,
  password: true,
});

import { configDotenv } from 'dotenv';
import { exit } from 'process';
import { z } from 'zod';

configDotenv();

const environmentSchema = z.object({
  DB_FILE_NAME: z.string(),
  HASHING_SECRET: z.string(),
  ENCRYPT_SECRET: z.string(),
  JWT_SECRET: z.string(),
  ISSUER: z.string(),
});

const { data: env, error } = environmentSchema.safeParse(process.env);
if (error) {
  console.error('Failed to parse environment!', process.env);
  console.error(error.errors);
  exit(1);
}

export { env };

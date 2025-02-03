import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './src/infra/db/drizzle/schema.ts',
  out: './src/infra/db/drizzle/migrations',
  dialect: 'sqlite',
  dbCredentials: {
    url: process.env.DB_FILE_NAME!,
  },
});

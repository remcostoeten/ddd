import type { Config } from 'drizzle-kit';

export default {
  schema: './src/lib/db/schema.ts',
  driver: 'turso',
  out: './migrations',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
    authToken: process.env.DATABASE_AUTH_TOKEN,
  },
  verbose: true,
  strict: true,
} satisfies Config;

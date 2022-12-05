import * as dotenv from 'dotenv';

dotenv.config();

console.log('process.env', process.env)

export = {
  type: 'postgres' as const,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: ['src/app/**/*.entity.ts'],
  migrations: ['src/migration/*.{ts,js}'],
  cli: {
    migrationsDir: 'src/migration',
  },
  extra: {
    ssl:
      process.env.NODE_ENV === 'production'
        ? { rejectUnauthorized: false }
        : false,
  },
};

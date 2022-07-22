import { DataSourceOptions } from 'typeorm';
import { join as joinPath } from 'path';

const ormConfig = {
  type: 'postgres',
  host: process.env.DB_HOST || 'db',
  port: parseInt(process.env.DB_PORT as string) || 5432,
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_NAME || 'musicify',
  entities: [joinPath(__dirname, 'modules', '**', '*.entity.ts')],
  synchronize: false,
  logging: true,
} as DataSourceOptions;

export { ormConfig };
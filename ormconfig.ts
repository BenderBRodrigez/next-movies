import { loadEnvConfig } from '@next/env';
import { DataSource, DataSourceOptions } from 'typeorm';
import { User } from './entities/user.entity';
import { Movie } from './entities/movie.entity';

loadEnvConfig(process.cwd());

const {
  POSTGRES_PORT,
  POSTGRES_HOST,
  POSTGRES_DB,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
} = process.env;

export const dataSourceOptions: DataSourceOptions = {
  port: parseInt(POSTGRES_PORT || '5432'),
  host: POSTGRES_HOST,
  database: POSTGRES_DB,
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  type: 'postgres',
  synchronize: true,
  migrationsRun: false,
  entities: [User, Movie],
  migrations: [],
};
export const dataSource = new DataSource(dataSourceOptions);

export const initializedDataSource = async () => {
  if (!dataSource.isInitialized) {
    await dataSource.initialize();
  }
  return dataSource;
};

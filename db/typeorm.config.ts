import { configEnviroments, enviroments } from '@/utils/enviroments.utils';

import { DataSource } from 'typeorm';

export default new DataSource({
  type: enviroments.DATABASE_TYPE,
  host: enviroments.DATABASE_HOST,
  port: enviroments.DATABASE_PORT,
  username: enviroments.DATABASE_USER,
  password: enviroments.DATABASE_PASSWORD,
  database: enviroments.DATABASE_DATABASE,
  entities: [`${__dirname}/../src/**/*.entity{.ts,.js}`],
  ssl: configEnviroments.isProduction(),
  synchronize: configEnviroments.isProduction(),
  logging: configEnviroments.isProduction(),
  migrations: [`${__dirname}/migrations/*{.ts,.js}`],
  migrationsTableName: 'migrations',
});

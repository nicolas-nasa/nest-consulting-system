import { configEnviroments, enviroments } from '@/utils/enviroments.utils';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';

const typeOrmConfig: TypeOrmModuleOptions = {
  type: enviroments.DATABASE_TYPE,
  host: enviroments.DATABASE_HOST,
  port: enviroments.DATABASE_PORT,
  username: enviroments.DATABASE_USER,
  password: enviroments.DATABASE_PASSWORD,
  database: enviroments.DATABASE_DATABASE,
  entities: [join(__dirname, '../**', '*.entity.{ts,js}')],
  migrationsTableName: 'migration',
  migrations: [join(__dirname, '../../db/migrations', '*.ts')],
  ssl: configEnviroments.isProduction(),
  synchronize: configEnviroments.isProduction(),
};

export { typeOrmConfig };

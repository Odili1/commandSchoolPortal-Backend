import { DataSource, DataSourceOptions } from 'typeorm';
import { envConfig } from 'src/config/envConfig';

// export const dataSourceOptions: DataSourceOptions = {
//     type: 'postgres',
//     host: 'aws-0-eu-central-1.pooler.supabase.com',
//     port: 6543,
//     username: 'postgres.vppxhwkytrqgrqecakup',
//     password: 'Odili0805$$',
//     database: 'postgres',
//     entities: [__dirname + '/../**/*.entity.{js,ts}'],
//     migrations: ['dist/**/migrations/*.{js,ts}'],
//     synchronize: true,
//     logging: true
// }
export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: envConfig.DB_HOST,
  port: envConfig.DB_PORT,
  username: envConfig.DB_USERNAME,
  password: envConfig.DB_PASSWORD,
  database: envConfig.DB_NAME,
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  migrations: ['dist/**/migrations/*.{js,ts}'],
  synchronize: true,
  logging: true,
  ssl: {
    rejectUnauthorized: false,
  },
};

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;

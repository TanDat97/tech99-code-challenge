import { DataSource } from 'typeorm';
import configs from '@configs';
import { UserEntity } from '@components/users/entity';

export const myDataSource = new DataSource({
  type: 'mysql',
  host: configs.database.host,
  port: parseInt(configs.database.port),
  username: configs.database.username,
  password: configs.database.password,
  database: configs.database.database,
  synchronize: configs.database.synchronize == 'true',
  logging: configs.database.logging == 'true',
  entities: [UserEntity],
  driver: require('mysql2'),
  migrations: [__dirname + '/migrations/**/*.js'],
  migrationsTableName: 'migrations',
  migrationsRun: true,
});

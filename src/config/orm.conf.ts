import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { registerAs } from '@nestjs/config';
import { Status } from 'src/entities/status.entity';
import { User } from 'src/entities/user.entity';
import { Todo } from 'src/entities/todo.entity';

export default registerAs(
  'orm.config',
  (): TypeOrmModuleOptions => ({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [Status, User, Todo],
    synchronize: true,
    dropSchema: Boolean(parseInt(process.env.DB_DROP_SCHEMA)),
  }),
);

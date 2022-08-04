import { SequelizeModuleOptions } from '@nestjs/sequelize';
import { User } from '../users/models/user.model';
import * as dotenv from 'dotenv';
dotenv.config();

export default {
  dialect: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  models: [User],
  autoLoadModels: true,
  synchronize: true,
  query: {
    raw: true,
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
} as SequelizeModuleOptions;

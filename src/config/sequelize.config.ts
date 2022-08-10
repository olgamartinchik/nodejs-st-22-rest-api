import { UserGroup } from '@src/group/models/userGroup.model';
import { SequelizeModuleOptions } from '@nestjs/sequelize';

import * as dotenv from 'dotenv';
import { Group } from '@src/group/models/group.model';
import { User } from '@src/users/models/user.model';
dotenv.config();

export default {
  dialect: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  models: [User, Group, UserGroup],
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

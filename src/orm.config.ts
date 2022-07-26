
// import dotenv from 'dotenv';
// import path from 'path';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

// dotenv.config({
//   path: path.join(__dirname, '.env'),
// });

export const config:TypeOrmModuleOptions= {
  type: 'postgres',
  host:'abul.db.elephantsql.com',
  port:5432,
  username:'usloqunj',
  password:'13dFnsAiNs1ovpwnsRqI7zuk6eTKVydd',
  database:'usloqunj',


//   cache: false,
  
//   url: process.env.DATABASE_URL as string,
//   synchronize: false,
//   logging: false,
//   ssl: {
//     rejectUnauthorized: false,
//   },
//   entities: ['src/resources/**/**.entity{.ts,.js}'],
//   migrations: ['./migrations/*.ts'],
}

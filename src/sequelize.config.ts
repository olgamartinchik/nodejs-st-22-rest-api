import { SequelizeModuleOptions } from "@nestjs/sequelize";
import { User } from "./users/user.model";
// import dotenv from 'dotenv';
// import path from 'path';
// import { User } from "./users/users.entity";
require('dotenv').config()

// dotenv.config({
//     path: path.join(__dirname, '.env'),
//   });
export default{
    // dialect: 'postgres',
    // host: 'abul.db.elephantsql.com',
    // port: 5432,
    // username: 'usloqunj',
    // password: '13dFnsAiNs1ovpwnsRqI7zuk6eTKVydd',
    // database: 'usloqunj',
    // models: [User],
    // autoLoadModels:true,

    dialect: 'postgres',
    host: process.env.POSTGRES_HOST ,
    port: Number(process.env.POSTGRES_PORT),
    username: process.env.POSTGRES_USER ,
    password: process.env.POSTGRES_PASSWORD as string ,
    database: process.env.POSTGRES_DB ,
    models: [User],
    // autoLoadModels:true
} as SequelizeModuleOptions
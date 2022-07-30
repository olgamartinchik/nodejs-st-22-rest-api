import { SequelizeModuleOptions } from "@nestjs/sequelize";
import { User } from "./users/user.model";
require('dotenv').config()


export default{
   

    dialect: 'postgres',
    host: process.env.POSTGRES_HOST ,
    port: Number(process.env.POSTGRES_PORT),
    username: process.env.POSTGRES_USER ,
    password: process.env.POSTGRES_PASSWORD as string ,
    database: process.env.POSTGRES_DB ,
    models: [User],
    autoLoadModels:true
} as SequelizeModuleOptions
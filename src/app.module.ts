
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './users/users.entity';
import { UserModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import sequelizeConfig from './sequelize.config';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath:`.${process.env.NODE_ENV}.env`
    }),
 
    SequelizeModule.forRoot({
      ...sequelizeConfig
    }),
    UserModule,
  ],
  controllers: [],
  providers: []

})
export class AppModule {}

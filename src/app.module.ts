import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { GroupModule } from './group/group.module';
import sequelizeConfig from './config/sequelize.config';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),

    SequelizeModule.forRoot({
      ...sequelizeConfig,
    }),
    UserModule,
    GroupModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

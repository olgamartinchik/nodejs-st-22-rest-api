
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './users/users.entity';
import { UserModule } from './users/users.module';

@Module({
  imports: [UserModule,
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'abul.db.elephantsql.com',
      port: 5432,
      username: 'usloqunj',
      password: '13dFnsAiNs1ovpwnsRqI7zuk6eTKVydd',
      database: 'usloqunj',
      models: [User],
      autoLoadModels:true
    }),
  ],
  controllers: [],
  providers: []

})
export class AppModule {}

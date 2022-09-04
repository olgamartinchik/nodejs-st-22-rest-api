import { GroupController } from './group/controlers/group.controller';
import { UserController } from './users/controlers/users.controller';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { GroupModule } from './group/group.module';
import sequelizeConfig from './config/sequelize.config';
import { LoggingInterceptor } from './logger/logging.interceptor';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { HttpExceptionFilter } from './filter/http-exception.filter';
import { LoggerMiddleware } from './logger/logger.middleware';
import { AuthModule } from './auth/auth.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),

    SequelizeModule.forRoot({
      ...sequelizeConfig,
    }),
    AuthModule,
    UserModule,
    GroupModule,
  ],
  exports: [AuthModule],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes(UserController, GroupController);
  }
}

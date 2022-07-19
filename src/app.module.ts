import { UserController } from './users/users.controller';
import { Module } from '@nestjs/common';
<<<<<<< HEAD
import { UserModule } from './users/user.module';


@Module({
  imports: [UserModule],
  controllers: [],
=======


@Module({
  imports: [],
  controllers: [ UserController],
>>>>>>> 121670a (feat: add base routes in the controll)
  providers: [],
})
export class AppModule {}

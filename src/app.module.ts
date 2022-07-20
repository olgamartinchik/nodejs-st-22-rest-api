import { UserController } from './users/users.controller';
import { Module } from '@nestjs/common';
<<<<<<< HEAD
<<<<<<< HEAD
import { UserModule } from './users/user.module';
=======
import { UserModule } from './users/users.module';
>>>>>>> 51ed4d3 (feat: add query rout)


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

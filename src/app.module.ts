import { UserController } from './users/users.controller';
import { Module } from '@nestjs/common';


@Module({
  imports: [],
  controllers: [ UserController],
  providers: [],
})
export class AppModule {}

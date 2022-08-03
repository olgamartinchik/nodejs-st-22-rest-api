import { Module } from '@nestjs/common';
import { UserController } from './controlers/users.controller';
import { UserService } from './services/users.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './models/user.model';

@Module({
  imports: [SequelizeModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService],
  exports: [SequelizeModule],
})
export class UserModule {}

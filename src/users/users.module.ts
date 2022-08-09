import { Module } from '@nestjs/common';
import { UserController } from './controlers/users.controller';
import { UserService } from './services/users.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './models/user.model';
import { UserGroup } from '@src/userGroup/models/userGroup.model';

@Module({
  imports: [SequelizeModule.forFeature([User, UserGroup])],
  controllers: [UserController],
  providers: [UserService],
  exports: [SequelizeModule],
})
export class UserModule {}

import { Module } from '@nestjs/common';
import { UserController } from './controlers/users.controller';
import { UserService } from './services/users.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './models/user.model';
import { UserGroup } from '@src/group/models/userGroup.model';
import { UsersRepository } from './repository/user.repository';

@Module({
  imports: [SequelizeModule.forFeature([User, UserGroup])],
  controllers: [UserController],
  providers: [UserService, UsersRepository],
  exports: [SequelizeModule],
})
export class UserModule {}

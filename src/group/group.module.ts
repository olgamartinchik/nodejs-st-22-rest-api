import { UsersRepository } from './../users/repository/user.repository';
import { Module } from '@nestjs/common';
import { GroupService } from './services/group.service';
import { GroupController } from './controlers/group.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Group } from './models/group.model';
import { UserGroup } from '@src/group/models/userGroup.model';
import { UserModule } from '@src/users/users.module';
import { GroupRepository } from './repository/group.repository';
import { User } from '@src/users/models/user.model';

@Module({
  imports: [SequelizeModule.forFeature([Group, User, UserGroup]), UserModule,],
  controllers: [GroupController],
  providers: [GroupService, GroupRepository, UsersRepository],
  exports: [SequelizeModule],
})
export class GroupModule {}

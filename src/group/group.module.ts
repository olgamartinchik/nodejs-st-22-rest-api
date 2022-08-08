import { Module } from '@nestjs/common';
import { GroupService } from './services/group.service';
import { GroupController } from './controlers/group.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Group } from './models/group.model';
import { User } from '@src/users/models/user.model';
import { UserGroup } from '@src/userGroup/models/userGroup.model';
import { UserGroupService } from '@src/userGroup/services/userGroup.service';

@Module({
  imports:[SequelizeModule.forFeature([Group, User,UserGroup])],
  controllers: [GroupController],
  providers: [GroupService,UserGroupService],
  exports: [SequelizeModule],
})
export class GroupModule {}

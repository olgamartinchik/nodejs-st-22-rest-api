import { Module } from '@nestjs/common';
import { GroupService } from './services/group.service';
import { GroupController } from './controlers/group.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Group } from './models/group.model';
import { UserGroup } from '@src/group/models/userGroup.model';
import { UserModule } from '@src/users/users.module';
import { GroupRepository } from './repository/group.repository';

@Module({
  imports: [SequelizeModule.forFeature([Group, UserGroup]), UserModule],
  controllers: [GroupController],
  providers: [GroupService,  GroupRepository],
  exports: [SequelizeModule],
})
export class GroupModule {}

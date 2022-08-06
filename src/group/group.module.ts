import { Module } from '@nestjs/common';
import { GroupService } from './services/group.service';
import { GroupController } from './controlers/group.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Group } from './models/group.model';

@Module({
  imports: [SequelizeModule.forFeature([Group])],
  controllers: [GroupController],
  providers: [GroupService],
  exports: [SequelizeModule],
})
export class GroupModule {}

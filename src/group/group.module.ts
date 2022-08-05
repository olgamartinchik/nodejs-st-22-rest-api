import { Module } from '@nestjs/common';
import { GroupService } from './services/group.service';
import { GroupController } from './controlers/group.controller';

@Module({
  controllers: [GroupController],
  providers: [GroupService]
})
export class GroupModule {}

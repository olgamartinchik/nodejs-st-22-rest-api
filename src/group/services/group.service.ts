import { Injectable } from '@nestjs/common';
import { UserGroup } from '@src/group/models/userGroup.model';
import { CreateGroupDto } from '../dto/create-group.dto';
import { UpdateGroupDto } from '../dto/update-group.dto';
import { Group } from '../models/group.model';
import { GroupRepository } from '../repository/group.repository';

@Injectable()
export class GroupService {
  constructor(private groupRepository: GroupRepository) {}

  async create(createGroupDto: CreateGroupDto): Promise<Group> {
    return this.groupRepository.create(createGroupDto);
  }

  async findAll(): Promise<Group[]> {
    return this.groupRepository.findAll();
  }

  async findOne(id: string): Promise<Group> {
    return this.groupRepository.findOne(id);
  }

  async update(id: string, updateGroupDto: UpdateGroupDto): Promise<Group> {
    return this.groupRepository.update(id, updateGroupDto);
  }

  async remove(id: string): Promise<void> {
    this.groupRepository.remove(id);
  }

  async addUsersToGroup(id: string, userIds: string[]): Promise<UserGroup[]>{
    return this.groupRepository.addUsersToGroup(id, userIds);
  }
}

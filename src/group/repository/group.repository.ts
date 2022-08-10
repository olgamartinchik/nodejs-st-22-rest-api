import { InjectModel } from '@nestjs/sequelize';
import { UserGroup } from '@src/group/models/userGroup.model';
import { Sequelize } from 'sequelize-typescript';
import { CreateGroupDto } from '../dto/create-group.dto';
import { UpdateGroupDto } from '../dto/update-group.dto';
import { Group } from '../models/group.model';

export class GroupRepository {

  constructor(    private sequelize: Sequelize, @InjectModel(Group) private groupRepository: typeof Group,  @InjectModel(UserGroup) private usersGroupRepository: typeof UserGroup,) {}

  async create(createGroupDto: CreateGroupDto): Promise<Group> {
    return this.groupRepository.create(createGroupDto);
  }

  async findAll(): Promise<Group[]> {
    return this.groupRepository.findAll();
  }
  async findOne(id: string): Promise<Group> {
    return this.groupRepository.findOne({
      where: {
        id,
      },
    });
  }
  async update(id: string, updateGroupDto: UpdateGroupDto): Promise<Group> {
    const group = await this.groupRepository.update(updateGroupDto, {
      where: { id },
      returning: true,
    });
    return group[1][0];
  }
  async remove(id: string): Promise<void> {
    this.groupRepository.destroy({ where: { id } });
  }

  async addUsersToGroup(id: string, userIds: string[]): Promise<UserGroup[]> {
    try {
      return await this.sequelize.transaction(async (t) => {
        const userGroups = userIds.map(async(userId) => {
          return await this.usersGroupRepository.create(
            {
              userId,
              groupId: id,
            },
            { transaction: t },
          );
        });

        const result = await Promise.all(userGroups);
        return result;
      });
    } catch (error) {
      return error;
    }
  }
}

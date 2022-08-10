import { InjectModel } from '@nestjs/sequelize';
import { User } from '@src/users/models/user.model';
import { Sequelize } from 'sequelize-typescript';
import { CreateGroupDto } from '../dto/create-group.dto';
import { UpdateGroupDto } from '../dto/update-group.dto';
import { Group } from '../models/group.model';

export class GroupRepository {
  constructor(
    private sequelize: Sequelize,
    @InjectModel(Group) private groupRepository: typeof Group,
    @InjectModel(User) private usersRepository: typeof User,
  ) {}

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

  async addUsersToGroup(id: string, userIds: string[]): Promise<void> {
    try {
      return await this.sequelize.transaction(async (t) => {
        const group = await this.groupRepository.findOne({
          where: { id },
          transaction: t,
        });

        const currentUserIds = await Promise.all(
          userIds.map(async (id) => {
            const currentUserId = await this.usersRepository.findOne({
              where: {
                id,
                isDeleted: false,
              },
            });
            return currentUserId.id;
          }),
        );
        await Promise.all(
          currentUserIds.map((id) => {
            return group.$add('users', id, { transaction: t });
          }),
        );
      });
    } catch (error) {
      return error;
    }
  }
}

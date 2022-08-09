import { InjectModel } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';
import { UserGroup } from '../models/userGroup.model';

export class UsersGroupRepository {
  constructor(
    private sequelize: Sequelize,
    @InjectModel(UserGroup) private usersGroupRepository: typeof UserGroup,
  ) {}

  async addUsersToGroup(id: string, userIds: string[]): Promise<UserGroup[]> {
    try {
      return await this.sequelize.transaction(async (t) => {
        const userGroups = userIds.map((userId) => {
          return this.usersGroupRepository.create(
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

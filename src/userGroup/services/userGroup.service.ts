import { UserGroup } from '@src/userGroup/models/userGroup.model';

import { UsersGroupRepository } from '../repository/userGroup.repository';

export class UserGroupService {
  constructor(private usersGroupRepository: UsersGroupRepository) {}

  async addUsersToGroup(id: string, userIds: string[]): Promise<UserGroup[]> {
    return this.usersGroupRepository.addUsersToGroup(id, userIds);
  }
}

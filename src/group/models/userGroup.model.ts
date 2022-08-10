import { Group } from '@src/group/models/group.model';
import { User } from '@src/users/models/user.model';
import { Column, ForeignKey, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'UserGroups' })
export class UserGroup extends Model<UserGroup> {
  @ForeignKey(() => User)
  @Column
  userId: string;

  @ForeignKey(() => Group)
  @Column
  groupId: string;
}

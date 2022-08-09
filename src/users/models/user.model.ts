import {BelongsToMany, Column, DataType, Model, Table } from 'sequelize-typescript';
import {  DataTypes } from 'sequelize';
import { Group } from '@src/group/models/group.model';
import { UserGroup } from '@src/userGroup/models/userGroup.model';

interface IUserExpected {
  login: string;
  password: string;
  age: number;
}

@Table({ tableName: 'Users' })
export class User extends Model<User, IUserExpected> {
  @Column({ primaryKey: true, defaultValue: DataTypes.UUIDV4 })
  id: string;

  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  login: string;

  @Column({ type: DataType.STRING, allowNull: false })
  password: string;

  @Column({ type: DataType.INTEGER, allowNull: false })
  age: number;

  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  isDeleted: boolean;

  @BelongsToMany(()=>Group, ()=>UserGroup)
    group:Group[]

 
}

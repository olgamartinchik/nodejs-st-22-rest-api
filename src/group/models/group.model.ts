import { BelongsToMany, Column,  DataType,  Model, Table } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import { User } from '@src/users/models/user.model';
import { TPermissions } from '@src/userGroup/types/Permissions.type';
import { UserGroup } from '@src/userGroup/models/userGroup.model';

interface IGroupExpected{
    name:string
    permissions:Array<TPermissions>
}

@Table({ tableName: 'Groups' })
export class Group extends Model<Group,IGroupExpected>{
    @Column({ primaryKey: true, defaultValue: DataTypes.UUIDV4 })
    id: string;
    
    @Column({ type: DataType.STRING, unique: true,allowNull: false })
    name:string

    @Column({ type: DataType.ARRAY(DataType.STRING), allowNull: false ,defaultValue:[] as TPermissions[]})
    permissions:Array<TPermissions>

    @BelongsToMany(()=>User, ()=>UserGroup)
    user:User[]
}
import { Group } from "@src/group/models/group.model";
import { User } from "@src/users/models/user.model";
import { Column, ForeignKey, Model, Table } from "sequelize-typescript";
import { DataTypes } from "sequelize";

@Table({ tableName: 'user_group' })
export class UserGroup extends Model<UserGroup>{
    @Column({ primaryKey: true, defaultValue: DataTypes.UUIDV4 })
    id: string;
    
    @ForeignKey(()=>Group)
    @Column({ type: DataTypes.UUIDV4 })
    userId:string

    @ForeignKey(()=>User)
    @Column({ type: DataTypes.UUIDV4 })
    groupId:string
}

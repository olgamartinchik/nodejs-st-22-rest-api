import { Group } from "@src/group/models/group.model";
import { User } from "@src/users/models/user.model";
import { Column, ForeignKey,  Model, Table } from "sequelize-typescript";
import { DataTypes } from "sequelize";


@Table({ tableName: 'UserGroups', createdAt:false, updatedAt:false  })
export class UserGroup extends Model<UserGroup>{
  @Column({type: DataTypes.UUID,primaryKey: true, defaultValue: DataTypes.UUIDV4} )
  id:string
    
    @ForeignKey(()=>User)
    @Column
    userId:string

    @ForeignKey(()=>Group)
    @Column
    groupId:string
}


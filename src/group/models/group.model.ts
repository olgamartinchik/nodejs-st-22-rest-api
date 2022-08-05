import { Column,  DataType,  Model, Table } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import { TPermissions } from '../types/Permissions.type';

interface IGroupExpected{
    name:string
    permissions:Array<TPermissions>
}

@Table({ tableName: 'Groups' })
export class Group extends Model<Group,IGroupExpected>{
    @Column({ primaryKey: true, defaultValue: DataTypes.UUIDV4 })
    id: string;
    
    @Column({ type: DataType.STRING, allowNull: false })
    name:string

    @Column({ type: DataType.ARRAY(DataType.STRING), allowNull: false ,defaultValue:[] as TPermissions[]})
    permissions:Array<TPermissions>

}
import { Column,  DataType,  Model } from 'sequelize-typescript';
import { DataTypes } from 'sequelize/types';
import { TPermissions } from '../types/Permissions.type';

interface IGroupExpected{
    name:string
    permissions:Array<TPermissions>
}


export class Group extends Model<Group,IGroupExpected>{
    @Column({ primaryKey: true, defaultValue: DataTypes.UUIDV4 })
    id: string;
    
    @Column({ type: DataType.STRING, allowNull: false })
    name:string

    @Column({ type: DataType.ARRAY, allowNull: false })
    permissions:Array<TPermissions>

}
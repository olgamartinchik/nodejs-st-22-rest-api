import { Column, DataType, Model, Table } from 'sequelize-typescript';
import { IUser } from './user.interface';

@Table({tableName:'users'})
export class User extends Model<User, IUser>{
    @Column({type: DataType.STRING, unique: true, autoIncrement:true, primaryKey:true})
    id:string;

    @Column({type: DataType.STRING, unique: true, allowNull:false})
    login:string;

    @Column({type: DataType.STRING,  allowNull:false})
    password:string;

    @Column({type: DataType.INTEGER,  allowNull:false})
    age:number;

    @Column({type: DataType.BOOLEAN, defaultValue:false})
    isDeleted: boolean;
}
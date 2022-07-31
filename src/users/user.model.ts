import { Column, DataType, Model, Table, } from 'sequelize-typescript';
import { DataTypes,  } from 'sequelize';


interface IUserExpected{
    
    login:string;
    password:string;
    age:number;
}
// autoIncrement:true, primaryKey:true,,defaultValue:uuidv4() 
@Table({tableName:"Users"})
export class User extends Model<User, IUserExpected>{
   
    @Column({ primaryKey: true, defaultValue: DataTypes.UUIDV4 })
    id:string ;

   
    @Column({type: DataType.STRING, unique: true, allowNull:false})
    login:string;

    @Column({type: DataType.STRING,  allowNull:false})
    password:string;

    @Column({type: DataType.INTEGER,  allowNull:false})
    age:number;

    @Column({type: DataType.BOOLEAN, defaultValue:false})
    isDeleted: boolean;
}
import { IUser } from './user.interface';
import { v4 as uuidv4 } from 'uuid';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User implements IUser{

    @PrimaryGeneratedColumn()
    id:string;

    @Column()
    login:string;

    @Column()
    password:string;

    @Column()
    age:number;

    @Column({default:false})
    isDeleted: boolean;

    constructor( 
        login:string,
        password:string,
        age:number,
        isDeleted: boolean=false){

            this.id=uuidv4()
            this.login=login
            this.password=password
            this.age=age
            this.isDeleted=isDeleted

        }
}
import { IUser } from './user.interface';
import { v4 as uuidv4 } from 'uuid';
import { Entity } from 'typeorm';

@Entity('users')
export class User implements IUser{
    
    id:string;
    login:string;
    password:string;
    age:number;
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
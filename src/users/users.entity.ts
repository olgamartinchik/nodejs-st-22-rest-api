import { IUser } from './user.interface';
import { v4 as uuidv4 } from 'uuid';
// import {  PrimaryGeneratedColumn } from 'typeorm';
import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class User extends Model  {
    @Column
    // @PrimaryGeneratedColumn
    id:string;

    @Column
    login:string;

    @Column
    password:string;

    @Column
    age:number;

    @Column({defaultValue:false})
    isDeleted: boolean;

    // constructor( 
    //     login:string,
    //     password:string,
    //     age:number,
    //     isDeleted: boolean=false){

    //         this.id=uuidv4()
    //         this.login=login
    //         this.password=password
    //         this.age=age
    //         this.isDeleted=isDeleted

    //     }
}
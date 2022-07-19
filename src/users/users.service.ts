<<<<<<< HEAD
<<<<<<< HEAD
import { Injectable } from "@nestjs/common";
=======
import {  Injectable} from "@nestjs/common";
import { User } from "./user.entity";
import { IUser } from "./user.interface";
>>>>>>> 56099ce (feat: add service, entity, module)

@Injectable()
export class UserService{
    private users:IUser[]=[{
        id:'string',
        login:'string',
        password:'string',
        age:0,
        isDeleted: false
    },
    {
        id:'string1',
        login:'string',
        password:'string',
        age:0,
        isDeleted: true
    }
]

<<<<<<< HEAD
=======
import {  HttpException, HttpStatus, Injectable} from "@nestjs/common";
import { User } from "./user.entity";
import { IUser, IUserAnswer } from "./user.interface";

@Injectable()
export class UserService{
    private users:IUser[]=[{
        id:'string',
        login:'kir',
        password:'string',
        age:0,
        isDeleted: false
    },
    {
        id:'string1',
        login:'and',
        password:'string',
        age:0,
        isDeleted: true
    }
]

getAll():IUser[]{
    const users = this.users.filter(user=>!user.isDeleted)
    return users
}
getOne( id:string):IUser{
    const user = this.users.find(user=>user.id===id&&!user.isDeleted)
    if (!user) {
        throw new HttpException('User was not founded!', HttpStatus.NOT_FOUND);
      }
    return user
}
create( user:IUser):IUserAnswer{
=======
getAllUsers():IUser[]{
    const users = this.users.filter(user=>!user.isDeleted)
    return users
}
getUserById( params:IUser):IUser{
    const user = this.users.find(user=>user.id===params.id&&!user.isDeleted)
    return user
}
postUserData( user:IUser):{user:IUser, message:string}{
>>>>>>> 56099ce (feat: add service, entity, module)
   const newUser=new User(user.login,user.password,user.age,)
    this.users.push(newUser)
 return {user:newUser, message:"User created"}
}
<<<<<<< HEAD
update(user:IUser,id:string):IUserAnswer{
    const userData = this.users.find(user=>user.id===id&&!user.isDeleted)
    if (!userData) {
        throw new HttpException('User was not founded!', HttpStatus.NOT_FOUND);
      }
      userData.login=user.login
      userData.password=user.password
      userData.age=user.age
      
    return {user:userData, message:"User update"}
}
remove( id:string):IUserAnswer{
    const user= this.users.find(user=>user.id===id?user.isDeleted=true:user.isDeleted=false)
    if (!user) {
        throw new HttpException('User was not founded!', HttpStatus.NOT_FOUND);
      }
    return {user, message:"User deleted"}
}
>>>>>>> 7020ded (fix: fix routing methods)
=======
updateUserData(user:IUser):{user:IUser, message:string}{
    return {user, message:"User update"}
}
deleteUser( params:IUser):{user:IUser, message:string}{
    const user= this.users.find(user=>user.id===params.id?user.isDeleted=true:user.isDeleted=false)
    return {user, message:"User deleted"}
}
>>>>>>> 56099ce (feat: add service, entity, module)
}
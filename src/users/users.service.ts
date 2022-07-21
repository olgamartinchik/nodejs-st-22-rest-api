<<<<<<< HEAD
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
<<<<<<< HEAD
<<<<<<< HEAD
    private users:IUser[]=[{
        id:'string',
=======
    private readonly users:IUser[]=[{
=======
    private readonly users:IUser[]=[
       {
>>>>>>> 40bb2c4 (fix: fix methods)
        id:'string0',
>>>>>>> eb4efbe (feat: add password check, create fined user by id method)
        login:'kir',
        password:'123qwe',
        age:10,
        isDeleted: false
       },
     {
        id:'string1',
        login:'and',
        password:'123qwe',
        age:20,
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

<<<<<<< HEAD
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
<<<<<<< HEAD
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
=======
findUserByLogin(userData:UpdateUserDto|CreateUserDto){
=======
    create( {login,password,age}:CreateUserDto):IUserAnswer{
        const newUser=new User(login,password,age)
        this.findUserByLogin(newUser)
>>>>>>> 40bb2c4 (fix: fix methods)

        this.users.push(newUser)
        
        return {user:newUser, message:"User created"}
    }
    update(user:UpdateUserDto,id:string):IUserAnswer{
        const userData = this.users.find(user=>user.id===id&&!user.isDeleted)
        if (!userData) {
            throw new HttpException('User was not founded!', HttpStatus.NOT_FOUND);
        }
        this.findUserByLogin(user)
    
<<<<<<< HEAD
}
create( {login,password,age}:CreateUserDto):IUserAnswer{
   const newUser=new User(login,password,age)
   this.findUserByLogin(newUser)

>>>>>>> eb4efbe (feat: add password check, create fined user by id method)
    this.users.push(newUser)
 return {user:newUser, message:"User created"}
}
<<<<<<< HEAD
update(user:IUser,id:string):IUserAnswer{
    const userData = this.users.find(user=>user.id===id&&!user.isDeleted)
    if (!userData) {
        throw new HttpException('User was not founded!', HttpStatus.NOT_FOUND);
      }
<<<<<<< HEAD
=======
      this.findUserByLogin(user)
 
>>>>>>> eb4efbe (feat: add password check, create fined user by id method)
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
<<<<<<< HEAD
>>>>>>> 7020ded (fix: fix routing methods)
=======
updateUserData(user:IUser):{user:IUser, message:string}{
    return {user, message:"User update"}
}
deleteUser( params:IUser):{user:IUser, message:string}{
    const user= this.users.find(user=>user.id===params.id?user.isDeleted=true:user.isDeleted=false)
    return {user, message:"User deleted"}
=======
=======
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
>>>>>>> 40bb2c4 (fix: fix methods)

    findUserByLogin(userData:UpdateUserDto|CreateUserDto){

        if(userData.login){
        const  oldUser=this.users.find(user=>user.login===userData.login)
            if(oldUser){
                throw new HttpException('User login already exists!', HttpStatus.CONFLICT);
            }
        }
    
        
    }

    getAutoSuggestUsers(loginSubstring:string, limit:number){

<<<<<<< HEAD
return searchingUsers
>>>>>>> eb4efbe (feat: add password check, create fined user by id method)
}
>>>>>>> 56099ce (feat: add service, entity, module)
=======
import { Injectable } from "@nestjs/common";

@Injectable()
export class UserService{
=======
        const searchingUsers=this.users.filter(user=>user.login.includes(loginSubstring))
        .sort((prevUser,nextUser)=>prevUser.login.toLowerCase().charCodeAt(0)-nextUser.login.toLowerCase().charCodeAt(0))
        .slice(0, limit)
        return searchingUsers
    }
>>>>>>> 40bb2c4 (fix: fix methods)

<<<<<<< HEAD
>>>>>>> 121670a (feat: add base routes in the controll)
=======

>>>>>>> eb4efbe (feat: add password check, create fined user by id method)
}
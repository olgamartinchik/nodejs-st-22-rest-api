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
   const newUser=new User(user.login,user.password,user.age,)
    this.users.push(newUser)
 return {user:newUser, message:"User created"}
}
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
}
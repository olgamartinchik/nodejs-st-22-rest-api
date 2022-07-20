import {  HttpException, HttpStatus, Injectable} from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User } from "./users.entity";
import { IUser, IUserAnswer } from "./user.interface";

@Injectable()
export class UserService{
    private readonly users:IUser[]=[{
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
create( {login,password,age}:CreateUserDto):IUserAnswer{
   const newUser=new User(login,password,age)
   const oldUser=this.users.find(user=>user.login===newUser.login)
   if(oldUser){
    throw new HttpException('User login already exists!', HttpStatus.CONFLICT);
   }
    this.users.push(newUser)
    
 return {user:newUser, message:"User created"}
}
update(user:UpdateUserDto,id:string):IUserAnswer{
    const userData = this.users.find(user=>user.id===id&&!user.isDeleted)
    if (!userData) {
        throw new HttpException('User was not founded!', HttpStatus.NOT_FOUND);
      }
    const oldUser=this.users.find(user=>user.login===userData.login)
    // if(oldUser){ 
    //    throw new HttpException('User login already exists!', HttpStatus.CONFLICT);
    // }
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
getAutoSuggestUsers(loginSubstring:string, limit:number){
const searchingUsers=this.users.filter(user=>user.login.includes(loginSubstring))
.sort((prevUser,nextUser)=>prevUser.login.toLowerCase().charCodeAt(0)-nextUser.login.toLowerCase().charCodeAt(0))
.slice(0, limit)

return searchingUsers
}

}
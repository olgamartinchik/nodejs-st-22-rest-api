import {  Injectable} from "@nestjs/common";
import { User } from "./user.entity";
import { IUser } from "./user.interface";

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

getAllUsers():IUser[]{
    const users = this.users.filter(user=>!user.isDeleted)
    return users
}
getUserById( params:IUser):IUser{
    const user = this.users.find(user=>user.id===params.id&&!user.isDeleted)
    return user
}
postUserData( user:IUser):{user:IUser, message:string}{
   const newUser=new User(user.login,user.password,user.age,)
    this.users.push(newUser)
 return {user:newUser, message:"User created"}
}
updateUserData(user:IUser):{user:IUser, message:string}{
    return {user, message:"User update"}
}
deleteUser( params:IUser):{user:IUser, message:string}{
    const user= this.users.find(user=>user.id===params.id?user.isDeleted=true:user.isDeleted=false)
    return {user, message:"User deleted"}
}
}
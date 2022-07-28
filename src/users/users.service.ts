import {  HttpException, HttpStatus, Injectable} from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
// import { User } from "./users.entity";
import { IUser, IUserAnswer } from "./user.interface";
import { User } from "./user.model";


@Injectable()
export class UserService{
    private readonly users:IUser[]=[
       {
        id:'string0',
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
    constructor(@InjectModel(User) private usersRepository:typeof  User){}
    // constructor(@InjectRepository(User) private usersRepository: Repository<User>) {}
   async getAll():Promise<User[]>{
        // const users = this.users.filter(user=>!user.isDeleted)
        const users = await this.usersRepository.findAll()
        return users
    }
    getOne( id:string):IUser{
        const user = this.users.find(user=>user.id===id&&!user.isDeleted)
        if (!user) {
            throw new HttpException('User was not founded!', HttpStatus.NOT_FOUND);
        }
        return user
    }

  async create( userDto:CreateUserDto):Promise<User>{
        // const newUser=new User(login,password,age)
        // const newUser={login,password,age}
        // const modelUser = await this.usersRepository.create({  login, password, age }).save();
        // this.findUserByLogin(newUser)

        // this.users.push(newUser)
        
        // return {user:newUser, message:"User created"}

        const user = await this.usersRepository.create(userDto)
        return user
    }
    update(user:UpdateUserDto,id:string):IUserAnswer{
        const userData = this.users.find(user=>user.id===id&&!user.isDeleted)
        if (!userData) {
            throw new HttpException('User was not founded!', HttpStatus.NOT_FOUND);
        }
        this.findUserByLogin(user)
    
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

    findUserByLogin(userData:UpdateUserDto|CreateUserDto){

        if(userData.login){
        const  oldUser=this.users.find(user=>user.login===userData.login)
            if(oldUser){
                throw new HttpException('User login already exists!', HttpStatus.CONFLICT);
            }
        }
    
        
    }

    getAutoSuggestUsers(loginSubstring:string, limit:number){

        const searchingUsers=this.users.filter(user=>user.login.includes(loginSubstring))
        .sort((prevUser,nextUser)=>prevUser.login.toLowerCase().charCodeAt(0)-nextUser.login.toLowerCase().charCodeAt(0))
        .slice(0, limit)
        return searchingUsers
    }


}
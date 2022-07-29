import {  HttpException, HttpStatus, Injectable} from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { where } from "sequelize/types";
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
        const users = await this.usersRepository.findAll({
            where: {
              isDeleted: false
            }
          })
        return users
    }
   async getOne( id:number):Promise<User>{
        // const user = this.users.find(user=>user.id===id&&!user.isDeleted)
        // if (!user) {
        //     throw new HttpException('User was not founded!', HttpStatus.NOT_FOUND);
        // }
        // return user
        const user = await this.usersRepository.findOne( {where:{
            id,
            isDeleted: false
        }})
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
        await this.findUserByLogin(userDto)
        const user = await this.usersRepository.create(userDto)
        return user
    }
   async update(user:UpdateUserDto,id:number):Promise<{user:User, message:string}>{
        const users = await this.usersRepository.findAll()
        const userData = users.find(user=>user.id===id&&!user.isDeleted)
        if (!userData) {
            throw new HttpException('User was not founded!', HttpStatus.NOT_FOUND);
        }
       await this.findUserByLogin(user)
    
        userData.login=user.login
        userData.password=user.password
        userData.age=user.age
        const data = await userData.save();
       
        return {user:data, message:"User update"}
    }
   async remove( id:number):Promise<{user:User,message:string}>{
        const users = await this.usersRepository.findAll()
        const user= users.find(user=>user.id===id?user.isDeleted=true:user.isDeleted=false)
        if (!user) {
            throw new HttpException('User was not founded!', HttpStatus.NOT_FOUND);
        }
        const data = await user.save();
        return {user:data, message:"User deleted"}
    }

  async  findUserByLogin(userData:UpdateUserDto|CreateUserDto):Promise<void>{
        const users = await this.usersRepository.findAll()
        if(userData.login){
        const  oldUser=users.find(user=>user.login===userData.login)
            if(oldUser){
                throw new HttpException('User login already exists!', HttpStatus.CONFLICT);
            }
        }
    
        
    }

   async getAutoSuggestUsers(loginSubstring:string, limit:number):Promise<User[]>{
        const users = await this.usersRepository.findAll({
            where: {
              isDeleted: false
            }
          })
        const searchingUsers=users.filter(user=>user.login.includes(loginSubstring))
        .sort((prevUser,nextUser)=>prevUser.login.toLowerCase().charCodeAt(0)-nextUser.login.toLowerCase().charCodeAt(0))
        .slice(0, limit)
        return searchingUsers
    }


}
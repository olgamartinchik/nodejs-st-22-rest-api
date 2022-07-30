import {  HttpException, HttpStatus, Injectable} from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Op } from "sequelize";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User } from "./user.model";
import { searchUsersByQuery } from "./utils/utils";



@Injectable()
export class UserService{
  
    constructor(@InjectModel(User) private usersRepository:typeof  User){}
    
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
     
        await this.findUserByLogin(userDto)
        const user = await this.usersRepository.create(userDto)
        return user.toJSON()
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
     const users= await this.usersRepository.findAll({
            where: {
              
                isDeleted: false,
                
            },
          })
        
        return searchUsersByQuery(users,loginSubstring,limit)
     
    }


}
import {  HttpException, HttpStatus, Injectable} from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Op } from "sequelize";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User } from "./user.model";
import { findUserError } from "./utils/errors";
import { searchUsersByQuery } from "./utils/serchUsersByQyery";



@Injectable()
export class UserService{
  
    constructor(@InjectModel(User) private usersRepository:typeof  User){}
    
   async getAll():Promise<User[]>{
      
        const users = await this.usersRepository.findAll({
            where: {
              isDeleted: false
            }
          })
      
        return users
    }
   async getOne( id:string):Promise<User>{
    
        const user = await this.usersRepository.findOne( {where:{
            id,
            isDeleted: false
        }})
       
        return user
    }

    async create( userDto:CreateUserDto):Promise<User>{
     
        // await this.findUserByLogin(userDto)
        const user = await this.usersRepository.create(userDto)
        return user.toJSON()
    }

    async update(user:UpdateUserDto,id:string):Promise<{user:User, message:string}>{
        const users = await this.usersRepository.findAll()
        const userData = users.find(user=>user.id===id&&!user.isDeleted)
        findUserError(userData)
    //    await this.findUserByLogin(user)
    
        userData.login=user.login
        userData.password=user.password
        userData.age=user.age
        const data = await userData.save();
       
        return {user:data, message:"User update"}
    }

   async remove( id:string):Promise<{user:User,message:string}>{
        const users = await this.usersRepository.findAll()
        const user= users.find(user=>user.id===id?user.isDeleted=true:user.isDeleted=false)
        findUserError(user)
        const data = await user.save();
        return {user:data, message:"User deleted"}
    }

    private async  findUserByLogin(userData:UpdateUserDto|CreateUserDto):Promise<void>{
        const users = await this.usersRepository.findAll()
        if(userData.login){
        const  oldUser=users.find(user=>user.login===userData.login)
        // findUserLoginError(oldUser)
        }
    
        
    }

    async getAutoSuggestUsers(loginSubstring:string, limit:number):Promise<User[]>{
        console.log('1')
        const users= await this.usersRepository.findAll({
            order: [['login', 'ASC']],
            where: {
              login: {
                [Op.iLike]: `%${loginSubstring}%`,
              },
              isDeleted: false,
            },
            limit,
          })
        console.log('wwww',users)
        // return searchUsersByQuery(users,loginSubstring,limit)
        return users
     
    }


}
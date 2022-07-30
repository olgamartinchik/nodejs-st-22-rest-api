import {  HttpException, HttpStatus, Injectable} from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Op } from "sequelize";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User } from "./user.model";
import { findUserError, findUserLoginError } from "./utils/errors";
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
     
        await this.findUserByLogin(userDto)
        const user = await this.usersRepository.create(userDto)
        return user.toJSON()
    }

    async update(user:UpdateUserDto,id:string):Promise<{user:User, message:string}>{
  
       await this.findUserByLogin(user)    
        
        const data = await this.usersRepository.update(user,{
          where:{
            id,
            isDeleted: false
        },
        returning: true
        });
      
        return {user:data[1][0].toJSON(), message:"User update"}
    }

   async remove( id:string):Promise<{user:User,message:string}>{
    
        const user = await this.usersRepository.update({isDeleted: true},{
          where:{
            id
        },
        returning: true
        })
      
        return {user:user[1][0], message:"User deleted"}
    }

    private async  findUserByLogin(userData:UpdateUserDto|CreateUserDto):Promise<void>{
        const users = await this.usersRepository.findAll()
        if(userData.login){
        const  oldUser=users.find(user=>user.login===userData.login)
        findUserLoginError(oldUser)
        }
    
        
    }

    async getAutoSuggestUsers(loginSubstring:string, limit:number):Promise<User[]>{
        // console.log('1')
        const users= await this.usersRepository.findAll({
            order: ['login'],
            where: {
              login: {
                [Op.iLike]: `%${loginSubstring}%`,
              },
              isDeleted: false,
            },
            limit,
          })
        
        // const result=searchUsersByQuery(users,loginSubstring,limit)
     
        // return result
        return users
     
    }


}
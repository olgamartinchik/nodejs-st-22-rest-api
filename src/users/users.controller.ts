import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Query } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";

import { User } from "./user.model";
import { UserService } from "./users.service";
import { findUserError } from "./utils/errors";



@Controller('v1/users')
export class UserController{
constructor(private  userService:UserService){}
    @Get()
    @HttpCode(HttpStatus.OK)
    async  getAll():Promise<User[]>{       
        
        return await this.userService.getAll()
    }
    @Get(':id')
    @HttpCode(HttpStatus.OK)
    async getOne(@Param('id') id:string):Promise<User>{
        const user= await this.userService.getOne(id)
        findUserError(user)
        return user
        
    }

    @Post()   
    @HttpCode(HttpStatus.OK) 
    async  getAutoSuggestUsers(
        @Query("loginSubstring") loginSubstring:string,
        @Query("limit") limit:number
        ){
     
            return await this.userService.getAutoSuggestUsers(loginSubstring!,limit!)
         
       
    }
   
    @Post()
    @HttpCode(HttpStatus.OK)
    async create(@Body() user:CreateUserDto):Promise<User>{
     return await this.userService.create(user)
    }

    @Put(':id')
    @HttpCode(HttpStatus.OK)
    async update(@Body() user:UpdateUserDto, @Param('id') id:string):Promise<{user:User, message:string}>{
        return await this.userService.update(user, id)
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async remove(@Param('id') id:string):Promise<{user:User,message:string}>{        
        return await this.userService.remove(id)
    }
}
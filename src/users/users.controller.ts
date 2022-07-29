import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Query } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { IUser, IUserAnswer } from "./user.interface";
import { User } from "./user.model";
import { UserService } from "./users.service";



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
   async getOne(@Param('id') id:number):Promise<User>{
        return await this.userService.getOne(id)
    }

    @Get()   
    @HttpCode(HttpStatus.OK) 
  async  getAutoSuggestUsers(
        @Query('loginSubstring') loginSubstring:string,
        @Query('limit') limit:number
        ):Promise<User[]>{
        return await this.userService.getAutoSuggestUsers(loginSubstring,limit)
    }
   
    @Post()
    @HttpCode(HttpStatus.OK)
   async create(@Body() user:CreateUserDto):Promise<User>{
     return await this.userService.create(user)
    }

    @Put(':id')
    @HttpCode(HttpStatus.OK)
   async update(@Body() user:UpdateUserDto, @Param('id') id:number):Promise<{user:User, message:string}>{
        return await this.userService.update(user, id)
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
   async remove(@Param('id') id:number):Promise<{user:User,message:string}>{        
        return await this.userService.remove(id)
    }
}
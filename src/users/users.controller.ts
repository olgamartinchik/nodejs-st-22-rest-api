import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Query } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { IUser, IUserAnswer } from "./user.interface";
import { UserService } from "./users.service";



@Controller('v1/users')
export class UserController{
constructor(private  userService:UserService){}
    @Get()
    @HttpCode(HttpStatus.OK)
    getAll():IUser[]{       
        return this.userService.getAll()
    }
    @Get(':id')
    @HttpCode(HttpStatus.OK)
    getOne(@Param('id') id:string):IUser{
        return this.userService.getOne(id)
    }

    @Get()   
    @HttpCode(HttpStatus.OK) 
    getAutoSuggestUsers(
        @Query('loginSubstring') loginSubstring:string,
        @Query('limit') limit:number
        ){
        return this.userService.getAutoSuggestUsers(loginSubstring,limit)
    }
   
    @Post()
    @HttpCode(HttpStatus.OK)
    create(@Body() user:CreateUserDto):IUserAnswer{
     return this.userService.create(user)
    }

    @Put(':id')
    @HttpCode(HttpStatus.OK)
    update(@Body() user:UpdateUserDto, @Param('id') id:string):IUserAnswer{
        return this.userService.update(user, id)
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    remove(@Param('id') id:string):IUserAnswer{        
        return this.userService.remove(id)
    }
}
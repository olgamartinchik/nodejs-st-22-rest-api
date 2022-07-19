import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put } from "@nestjs/common";
import { IUser, IUserAnswer } from "./user.interface";
import { UserService } from "./users.service";



@Controller('v1')
export class UserController{
constructor(private  userService:UserService){}
    @Get('users')
    @HttpCode(HttpStatus.OK)
    getAll():IUser[]{       
        return this.userService.getAll()
    }
    @Get('users/:id')
    @HttpCode(HttpStatus.OK)
    getOne(@Param('id') id:string):IUser{
        return this.userService.getOne(id)
    }

   
    @Post('users')
    @HttpCode(HttpStatus.OK)
    create(@Body('user') user:IUser):IUserAnswer{
     return this.userService.create(user)
    }

    @Put('users/:id')
    @HttpCode(HttpStatus.OK)
    update(@Body('user') user:IUser, @Param('id') id:string):IUserAnswer{
        return this.userService.update(user, id)
    }

    @Delete('users/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    remove(@Param('id') id:string):IUserAnswer{        
        return this.userService.remove(id)
    }
}
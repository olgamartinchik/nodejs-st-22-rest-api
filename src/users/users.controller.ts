import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put } from "@nestjs/common";
import { IUser } from "./user.interface";
import { UserService } from "./users.service";



@Controller('v1')
export class UserController{
constructor(private  userService:UserService){}
    @Get('users')
    @HttpCode(200)
    getAllUsers():IUser[]{       
        return this.userService.getAllUsers()
    }
    @Get('users/:id')
    @HttpCode(200)
    getUserById(@Param() params):IUser{
        return this.userService.getUserById(params)
    }

   
    @Post('users')
    postUserData(@Body('user') user:IUser):{user:IUser, message:string}{
     return this.userService.postUserData(user)
    }

    @Put('users/id')
    updateUserData(@Body('user') user:IUser):{user:IUser, message:string}{
        return this.userService.updateUserData(user)
    }

    @Delete('users/id')
    deleteUser(@Param() params:IUser):{user:IUser, message:string}{        
        return this.userService.deleteUser(params)
    }
}
import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put } from "@nestjs/common";

interface IUser{
    id:string;
    login:string;
    password:string;
    age:number;
    isDeleted: boolean;
}

@Controller('v1')
export class UserController{
    private users:IUser[]=[{
        id:'string',
        login:'string',
        password:'string',
        age:0,
        isDeleted: false
    },
    {
        id:'string1',
        login:'string',
        password:'string',
        age:0,
        isDeleted: true
    }
]
    @Get('users')
    @HttpCode(200)
    getAllUsers():IUser[]{
        const users = this.users.filter(user=>!user.isDeleted)
        return users
    }
    @Get('users/:id')
    @HttpCode(200)
    getUserById(@Param() params):IUser{
        const user = this.users.find(user=>user.id===params.id&&!user.isDeleted)
        return user
    }

   
    @Post('users')
    postUserData(@Body('user') user:IUser):{user:IUser, message:string}{
        this.users.push(user)
     return {user, message:"User created"}
    }
    @Put('users/id')
    updateUserData(){}

    @Delete('users/id')
    deleteUser(@Param() params):{user:IUser, message:string}{
        const user= this.users.find(user=>user.id===params.id?user.isDeleted=true:user.isDeleted=false)
        return {user, message:"User deleted"}
    }
}
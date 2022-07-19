<<<<<<< HEAD
<<<<<<< HEAD
import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put } from "@nestjs/common";
<<<<<<< HEAD
=======
import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put } from "@nestjs/common";
import { IUser, IUserAnswer } from "./user.interface";
import { UserService } from "./users.service";

>>>>>>> 7020ded (fix: fix routing methods)
=======
import { IUser } from "./user.interface";
import { UserService } from "./users.service";

>>>>>>> 56099ce (feat: add service, entity, module)


@Controller('v1')
export class UserController{
constructor(private  userService:UserService){}
    @Get('users')
<<<<<<< HEAD
    @HttpCode(200)
    getAllUsers():IUser[]{       
        return this.userService.getAllUsers()
=======
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
>>>>>>> 121670a (feat: add base routes in the controll)
    }
    @Get('users/:id')
    @HttpCode(200)
    getUserById(@Param() params):IUser{
<<<<<<< HEAD
<<<<<<< HEAD
        const user = this.users.find(user=>user.id===params.id&&!user.isDeleted)
        return user
=======
    @HttpCode(HttpStatus.OK)
    getAll():IUser[]{       
        return this.userService.getAll()
    }
    @Get('users/:id')
    @HttpCode(HttpStatus.OK)
    getOne(@Param('id') id:string):IUser{
        return this.userService.getOne(id)
>>>>>>> 7020ded (fix: fix routing methods)
=======
        return this.userService.getUserById(params)
>>>>>>> 56099ce (feat: add service, entity, module)
=======
        const user = this.users.find(user=>user.id===params.id&&!user.isDeleted)
        return user
>>>>>>> 121670a (feat: add base routes in the controll)
    }

   
    @Post('users')
<<<<<<< HEAD
<<<<<<< HEAD
    postUserData(@Body('user') user:IUser):{user:IUser, message:string}{
     return this.userService.postUserData(user)
    }

    @Put('users/id')
    updateUserData(@Body('user') user:IUser):{user:IUser, message:string}{
        return this.userService.updateUserData(user)
    }

    @Delete('users/id')
<<<<<<< HEAD
    deleteUser(@Param() params):{user:IUser, message:string}{
        const user= this.users.find(user=>user.id===params.id?user.isDeleted=true:user.isDeleted=false)
        return {user, message:"User deleted"}
=======
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
>>>>>>> 7020ded (fix: fix routing methods)
=======
    deleteUser(@Param() params:IUser):{user:IUser, message:string}{        
        return this.userService.deleteUser(params)
>>>>>>> 56099ce (feat: add service, entity, module)
=======
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
>>>>>>> 121670a (feat: add base routes in the controll)
    }
}
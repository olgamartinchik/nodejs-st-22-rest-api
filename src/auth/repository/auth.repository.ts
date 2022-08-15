import { JwtService } from "@nestjs/jwt";
import { CreateUserDto } from "@src/users/dto/create-user.dto"
import { UserService } from "@src/users/services/users.service";

export class AuthRepository{
    constructor(private userService:UserService, private jwtService:JwtService){}

    
   async login( createUserDto:CreateUserDto){
       
    }
    
   
    async  registration( createUserDto:CreateUserDto){
       
    }
}
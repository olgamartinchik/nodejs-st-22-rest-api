import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '@src/users/services/users.service';
import * as bcrypt from 'bcryptjs'
import { User } from '@src/users/models/user.model';
import { AuthDto } from '../dto/auth.dto';
@Injectable()
export class AuthService {
    constructor(private userService:UserService,  private jwtService:JwtService){}

     
   async login( authDto:AuthDto): Promise<{
    token: string;
}>{
    const user =await this.validateUser(authDto)
    if(!user)return 
    return this.generateToken(user)
 }


    async validateUser(authDto:AuthDto): Promise<User>{
        const user= await this.userService.findUserByLogin(authDto.login)
     
        if(!user||!await bcrypt.compare(authDto.password,user.password)) return
        return user
    }

 
    async generateToken(user:User): Promise<{
        token: string;
    }>{
         const payload={login:user.login, id:user.id}
         return {
             token: this.jwtService.sign(payload)
         }
    }
}

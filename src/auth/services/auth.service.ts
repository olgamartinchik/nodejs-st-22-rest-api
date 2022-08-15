import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '@src/users/dto/create-user.dto';
import { AuthRepository } from '../repository/auth.repository';

@Injectable()
export class AuthService {
    constructor(private authRepository:AuthRepository){}

  
    login( createUserDto:CreateUserDto){
        return this.authRepository.login(createUserDto)
    }
    
   
    registration( createUserDto:CreateUserDto){
        return this.authRepository.registration(createUserDto)
    }
}

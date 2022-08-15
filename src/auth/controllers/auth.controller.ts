import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from '@src/users/dto/create-user.dto';
import { AuthService } from '../services/auth.service';

// @ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor (private authService:AuthService){}

    @Post('/login')
    async login(@Body() createUserDto:CreateUserDto){
        return this.authService.login(createUserDto)
    }
    
    @Post('/registration')
    async  registration(@Body() createUserDto:CreateUserDto){
        return this.authService.registration(createUserDto)
    }
}

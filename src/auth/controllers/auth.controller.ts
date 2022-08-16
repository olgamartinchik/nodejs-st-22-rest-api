import { BadRequestException, Body, Controller, Post, UnauthorizedException, UseFilters } from '@nestjs/common';
import { HttpExceptionFilter } from '@src/filter/http-exception.filter';
import { CreateUserDto } from '@src/users/dto/create-user.dto';
import { AuthService } from '../services/auth.service';

// @ApiTags('auth')
@Controller('v1/auth')
export class AuthController {
    constructor (private authService:AuthService){}

    @Post('/login')
    async login(@Body() createUserDto):Promise<{
        token: string;
    }>{
        const user =await  this.authService.login(createUserDto)
        if(!user) throw new UnauthorizedException()
            return user    
        
    }
    
   
}

import { BadRequestException, Body, Controller, ForbiddenException, Post, UnauthorizedException, UseFilters, UseGuards } from '@nestjs/common';
import { HttpExceptionFilter } from '@src/filter/http-exception.filter';
import { CreateUserDto } from '@src/users/dto/create-user.dto';
import { JwtAuthGuard } from '../guard/jwt.auth.guard';
import { AuthService } from '../services/auth.service';


@Controller('v1/auth')
@UseGuards(JwtAuthGuard)
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

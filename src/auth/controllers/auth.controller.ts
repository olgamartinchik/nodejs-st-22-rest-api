import {
  Body,
  Controller,
  Post,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';

import { JwtAuthGuard } from '../guard/jwt.auth.guard';
import { AuthService } from '../services/auth.service';

@Controller('v1/auth')
@UseGuards(JwtAuthGuard)
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  async login(@Body() createUserDto): Promise<{
    token: string;
  }> {
    const user = await this.authService.login(createUserDto);
    if (!user) throw new UnauthorizedException();
    return user;
  }
}

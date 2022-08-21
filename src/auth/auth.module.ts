import { UserModule } from '@src/users/users.module';
import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports:[
    forwardRef(()=>UserModule) ,
  JwtModule.register({
    secret:process.env.PRIVATE_KEY||'SECRET',
    signOptions:{
      expiresIn:'24'

    }
  })
  ],
  providers: [AuthService,],
  exports:[
    AuthService,
    JwtModule
  ],
  controllers: [AuthController]

})
export class AuthModule {}

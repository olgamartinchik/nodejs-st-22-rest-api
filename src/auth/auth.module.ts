import { UserModule } from '@src/users/users.module';
import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';
import { AuthRepository } from './repository/auth.repository';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports:[UserModule,
  JwtModule.register({
    secret:process.env.PRIVATE_KEY||'SECRET',
    signOptions:{
      expiresIn:'24'

    }
  })
  ],
  providers: [AuthService,AuthRepository],
  controllers: [AuthController]

})
export class AuthModule {}

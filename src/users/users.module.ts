
import { Module } from '@nestjs/common';
import { UserController } from './users.controller';
import { UserService } from './users.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './user.model';



@Module({
    imports: [
      SequelizeModule.forFeature([User])

    ],
    controllers: [ UserController],
    providers: [UserService],
    exports:[SequelizeModule]
  })
export class UserModule {}

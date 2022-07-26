
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataBaseModule } from '@src/database/database.module';
import { UserController } from './users.controller';
import { UserService } from './users.service';
import { ormConfig } from '../orm.config';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './users.entity';
@Module({
    imports: [
      SequelizeModule.forFeature([User])

    ],
    controllers: [ UserController],
    providers: [UserService],
    exports:[SequelizeModule]
  })
export class UserModule {}

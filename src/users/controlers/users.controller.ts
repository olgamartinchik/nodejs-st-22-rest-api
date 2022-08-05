import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

import { User } from '../models/user.model';
import { UserService } from '../services/users.service';
import { findUserError } from '../../utils/errors';

@Controller('v1/users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAll(
    @Query('loginSubstring') loginSubstring: string,
    @Query('limit') limit: number,
  ): Promise<User[]> {
    if (loginSubstring && limit) {
      return await this.userService.getAutoSuggestUsers(loginSubstring, limit);
    }
    const users=await this.userService.getAll()
    if(users.length!==0) return users
      
        findUserError(users);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getOne(@Param('id') id: string): Promise<User> {
    const user = await this.userService.getOne(id);
    if(user) return user;
    findUserError(user);
    
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() user: CreateUserDto): Promise<User> {
    return await this.userService.create(user);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async update(
    @Body() user: UpdateUserDto,
    @Param('id') id: string,
  ): Promise<{ user: User; message: string }> {
   const updateUserData= await this.userService.update(user, id);
   if(updateUserData.user) return updateUserData
   findUserError(updateUserData.user)
   
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(
    @Param('id') id: string,
  ): Promise<{ user: User; message: string }> {
    const deletedUser= await this.userService.remove(id);
    if(deletedUser.user)return deletedUser
    findUserError(deletedUser.user)
    
  }
}

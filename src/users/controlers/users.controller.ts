import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  UseFilters,
} from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

import { User } from '../models/user.model';
import { UserService } from '../services/users.service';
import { HttpExceptionFilter } from '@src/filter/http-exception.filter';

@Controller('v1/users')
@UseFilters(new HttpExceptionFilter())
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAll(
    @Query('loginSubstring') loginSubstring: string,
    @Query('limit') limit: number,
  ): Promise<User[]> {
    if (loginSubstring && limit) {
      return this.userService.getAutoSuggestUsers(loginSubstring, limit);
    }
    const users = await this.userService.findAll();
    if (users.length === 0) throw new BadRequestException();
    return users;
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getOne(@Param('id') id: string): Promise<User> {
    try {
      const user = await this.userService.findOne(id);
      return user;
    } catch  {
      throw new BadRequestException();
    }
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() user: CreateUserDto): Promise<User> {
    const existingUser = await this.userService.findUserByLogin(user);
    if (existingUser) throw new ConflictException();

    return this.userService.create(user);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async update(
    @Body() user: UpdateUserDto,
    @Param('id') id: string,
  ): Promise<{ user: User; message: string }> {
    const existingUser = await this.userService.findUserByLogin(user);
    if (existingUser) throw new ConflictException();
    const updateUserData = await this.userService.update(user, id);

    if (!updateUserData.user)
      throw new BadRequestException();
    return updateUserData;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(
    @Param('id') id: string,
  ): Promise<{ user: User; message: string }> {
    try{
      return this.userService.remove(id);

    }catch{
        throw new BadRequestException();
    }
    
  
   
  }
}

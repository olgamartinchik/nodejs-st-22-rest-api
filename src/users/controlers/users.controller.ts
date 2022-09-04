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
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

import { User } from '../models/user.model';
import { UserService } from '../services/users.service';
import { HttpExceptionFilter } from '../../filter/http-exception.filter';
import { JwtAuthGuard } from '../../auth/guard/jwt.auth.guard';

@Controller('v1/users')
@UseFilters(new HttpExceptionFilter())
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
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
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  async getOne(@Param('id') id: string): Promise<User> {
    try {
      return this.userService.findOne(id);
    } catch {
      throw new BadRequestException();
    }
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() user: CreateUserDto): Promise<User> {
    const newUser = await this.userService.create(user);
    if (!newUser) throw new ConflictException();
    return newUser;
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  async update(
    @Body() user: UpdateUserDto,
    @Param('id') id: string,
  ): Promise<User> {
    const updateUserData = await this.userService.update(user, id);

    if (!updateUserData) throw new BadRequestException();
    return updateUserData;
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string): Promise<void> {
    try {
      this.userService.remove(id);
    } catch {
      throw new BadRequestException();
    }
  }
}

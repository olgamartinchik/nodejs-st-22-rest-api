import { Logger } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { User } from '../models/user.model';
import { UsersRepository } from '../repository/user.repository';

@Injectable()
export class UserService {

  constructor(private usersRepository: UsersRepository) {
   
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.findAll();
  }
  async findOne(id: string): Promise<User> {
    return this.usersRepository.findOne(id);
  }

  async create(userDto: CreateUserDto): Promise<User> {
    return this.usersRepository.create(userDto);
  }

  async update(
    user: UpdateUserDto,
    id: string,
  ): Promise<{ user: User; message: string }> {
    return this.usersRepository.update(user, id);
  }

  async remove(id: string): Promise<{ user: User; message: string }> {
    return this.usersRepository.remove(id);
  }

  async findUserByLogin(
    login:string
  ): Promise<User> {
    return this.usersRepository.findUserByLogin(login);
  }

  async getAutoSuggestUsers(loginSubstring: string, limit: number) {
    return this.usersRepository.getAutoSuggestUsers(loginSubstring, limit);
  }
}

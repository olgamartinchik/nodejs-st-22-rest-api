import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { User } from '../models/user.model';

@Injectable()
export class UserService {
  constructor(@InjectModel(User) private usersRepository: typeof User) {}

  async findAll(): Promise<User[]> {
    const users = await this.usersRepository.findAll({
      where: {
        isDeleted: false,
      },
  
    });

    return users;
  }
  async findOne(id: string): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: {
        id,
        isDeleted: false,
      },
    });

    return user;
  }

  async create(userDto: CreateUserDto): Promise<User> {
    const user = await this.usersRepository.create(userDto);
    return user;
  }

  async update(
    user: UpdateUserDto,
    id: string,
  ): Promise<{ user: User; message: string }> {

    const data = await this.usersRepository.update(user, {
      where: {
        id,
        isDeleted: false,
      },
      returning: true,
    });

    return { user: data[1][0], message: 'User update' };
  }

  async remove(id: string): Promise<{ user: User; message: string }> {
    const user = await this.usersRepository.update(
      { isDeleted: true },
      {
        where: {
          id,
        },
        returning: true,
      },
    );

    return { user: user[1][0], message: 'User deleted' };
  }

 async findUserByLogin(
    userData: UpdateUserDto | CreateUserDto,
  ): Promise<User> {
    const user = await this.usersRepository.findOne({
      where:{
        login:userData.login
      }
    });
  
    return user
 
  }

  async getAutoSuggestUsers(loginSubstring: string, limit: number) {
    const users = await this.usersRepository.findAll({
      order: ['login'],
      where: {
        login: {
          [Op.iLike]: `%${loginSubstring}%`,
        },
        isDeleted: false,
      },
      limit,
    });

    return users;
  }
}

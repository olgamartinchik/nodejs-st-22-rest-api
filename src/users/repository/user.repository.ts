import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { User } from '../models/user.model';

export class UsersRepository {
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
    const existingUser = await this.findUserByLogin(userDto.login);
    if (existingUser) return;
    const user = await this.usersRepository.create(userDto);
    return user;
  }
  async update(user: UpdateUserDto, id: string): Promise<User> {
    const existingUser = await this.findUserByLogin(user.login);
    if (existingUser && existingUser.id !== id) {
      return;
    } else {
      const data = await this.usersRepository.update(user, {
        where: {
          id,
          isDeleted: false,
        },
        returning: true,
      });

      return data[1][0];
    }
  }
  async remove(id: string): Promise<void> {
    await this.usersRepository.update(
      { isDeleted: true },
      {
        where: {
          id,
        },
        returning: true,
      },
    );
  }
  async findUserByLogin(login: string): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: {
        login,
      },
    });

    return user;
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

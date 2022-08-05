import { HttpException, HttpStatus } from '@nestjs/common';
import { User } from '../users/models/user.model';

export const findUserError = (user: User|User[]) => {
  if (!(user as User)||(user as User[]).length===0) {
    throw new HttpException('User was not founded!', HttpStatus.NOT_FOUND);
  }
};

export const findUserLoginError = (user: User) => {
  if (user) {
    throw new HttpException('User login already exists!', HttpStatus.CONFLICT);
  }
};

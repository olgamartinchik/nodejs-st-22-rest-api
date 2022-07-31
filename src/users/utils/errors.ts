import { HttpException, HttpStatus } from '@nestjs/common';
import { User } from '../models/user.model';

export const findUserError=(user:User)=>{
    if (!user) {
        throw new HttpException('User was not founded!', HttpStatus.NOT_FOUND);
    }
}

export const findUserLoginError=(user:User)=>{
    if(user){
        throw new HttpException('User login already exists!', HttpStatus.CONFLICT);
    }
}
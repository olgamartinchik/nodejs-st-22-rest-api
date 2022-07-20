import { IsString,  IsNumber,  MinLength, IsAlphanumeric, IsNotEmpty } from 'class-validator';
import { CreateUserDto } from './create-user.dto';
import {PartialType} from '@nestjs/mapped-types'


export class UpdateUserDto extends PartialType(CreateUserDto){
    

}



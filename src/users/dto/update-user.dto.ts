<<<<<<< HEAD
import { IsString,  IsNumber,  MinLength, IsAlphanumeric, IsNotEmpty } from 'class-validator';
import { CreateUserDto } from './create-user.dto';
import {PartialType} from '@nestjs/mapped-types'


export class UpdateUserDto extends PartialType(CreateUserDto){
    

}


=======
import { IsString, IsNotEmpty, IsNumber } from 'class-validator';


export class UpdateUserDto{
    
    @IsString()
    readonly login:string;

    @IsString()
   readonly password:string;

    @IsNumber()
   readonly age:number;
}
>>>>>>> d98d2d8 (feat: add dto for create and update user)

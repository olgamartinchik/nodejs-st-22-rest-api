
import { IsString, IsNotEmpty, IsNumber,  MinLength, IsAlphanumeric } from 'class-validator';

export class CreateUserDto  {

    @IsString()
    @IsNotEmpty({message:'Required field'})
    readonly login:string;

    @IsString()
    @IsNotEmpty({message:'Required field'})
    @MinLength(4, {message:'Password is too short'})
    @IsAlphanumeric()
   readonly password:string;

    @IsNumber()
    @IsNotEmpty({message:'Required field'})
   readonly age:number;
}

import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateUserDto  {

    @IsString()
    @IsNotEmpty({message:'Required field'})
    readonly login:string;

    @IsString()
    @IsNotEmpty({message:'Required field'})
   readonly password:string;

    @IsNumber()
    @IsNotEmpty({message:'Required field'})
   readonly age:number;
}
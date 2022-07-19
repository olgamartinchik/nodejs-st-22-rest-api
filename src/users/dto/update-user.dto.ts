import { IsString, IsNotEmpty, IsNumber } from 'class-validator';


export class UpdateUserDto{
    
    @IsString()
    readonly login:string;

    @IsString()
   readonly password:string;

    @IsNumber()
   readonly age:number;
}
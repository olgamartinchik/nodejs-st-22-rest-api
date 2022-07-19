
<<<<<<< HEAD
<<<<<<< HEAD
import { IsString, IsNotEmpty, IsNumber,  MinLength,  Matches, Min, Max  } from 'class-validator';
=======
import { IsString, IsNotEmpty, IsNumber,  MinLength, IsAlphanumeric } from 'class-validator';
>>>>>>> 51ed4d3 (feat: add query rout)
=======
import { IsString, IsNotEmpty, IsNumber } from 'class-validator';
>>>>>>> d98d2d8 (feat: add dto for create and update user)

export class CreateUserDto  {

    @IsString()
    @IsNotEmpty({message:'Required field'})
    readonly login:string;

    @IsString()
    @IsNotEmpty({message:'Required field'})
<<<<<<< HEAD
    @MinLength(4, {message:'Password is too short'})
<<<<<<< HEAD
    @Matches(/(?=.*[0-9])(?=.*[a-zA-Z])/, {message:'Password must contain letters and numbers'})
    readonly password:string;
=======
    @IsAlphanumeric()
   readonly password:string;
>>>>>>> 51ed4d3 (feat: add query rout)

    @IsNumber()
    @Min(4)
    @Max(130)
    @IsNotEmpty({message:'Required field'})
    readonly age:number;
=======
   readonly password:string;

    @IsNumber()
    @IsNotEmpty({message:'Required field'})
   readonly age:number;
>>>>>>> d98d2d8 (feat: add dto for create and update user)
}
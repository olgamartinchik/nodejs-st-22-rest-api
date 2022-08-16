import { PartialType } from "@nestjs/mapped-types";
import { CreateUserDto } from "@src/users/dto/create-user.dto";
import { IsNotEmpty, IsString } from "class-validator";

export class AuthDto {
    @IsString()
    @IsNotEmpty()
    readonly login: string;
  
    @IsString()
    @IsNotEmpty()
   
    readonly password: string;
}
import {
  IsString,
  IsNotEmpty,
  IsNumber,
  MinLength,
  Matches,
  Min,
  Max,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty({ message: 'Required field' })
  readonly login: string;

  @IsString()
  @IsNotEmpty({ message: 'Required field' })
  @MinLength(4, { message: 'Password is too short' })
  @Matches(/(?=.*[0-9])(?=.*[a-zA-Z])/, {
    message: 'Password must contain letters and numbers',
  })
  readonly password: string;

  @IsNumber()
  @Min(4)
  @Max(130)
  @IsNotEmpty({ message: 'Required field' })
  readonly age: number;
}

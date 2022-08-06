import { IsNotEmpty, IsString, IsArray } from 'class-validator';

import { TPermissions } from '../types/Permissions.type';

export class CreateGroupDto {
  @IsString()
  @IsNotEmpty({ message: 'Required field' })
  readonly name: string;

  @IsArray()
  readonly permissions: Array<TPermissions>;
}

import { IsArray, IsUUID } from 'class-validator';

export class UserGroupDto {
    @IsArray()
  @IsUUID(4, { each: true })
  userId: string[];

  @IsUUID()
  groupId: string;

  
}
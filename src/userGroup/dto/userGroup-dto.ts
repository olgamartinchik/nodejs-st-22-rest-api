import { IsArray, IsUUID } from 'class-validator';

export class UserGroupDto {
   @IsArray()
  @IsUUID(4, { each: true })
  userIds: string[];



  
}
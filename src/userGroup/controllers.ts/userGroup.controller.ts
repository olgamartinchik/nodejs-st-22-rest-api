

// import { Body, Controller, HttpCode, HttpStatus, Post, UseFilters } from "@nestjs/common";
// import { HttpExceptionFilter } from "@src/filters/http-exception.filter";
// import { UserGroupDto } from "../dto/userGroup-dto";
// import { UserGroupService } from "../services/userGroup.service";

// @Controller('v1/userToGroup')
// @UseFilters(new HttpExceptionFilter())
// export class GroupController {
//   constructor(private readonly userGroupService: UserGroupService) {}

//   @Post()
//   @HttpCode(HttpStatus.CREATED)
//   async addUsersToGroup(@Body() userGroupDto:UserGroupDto){
//     // try{
//     //  return usersGroupDto.userId.reduce((acc,userId)=>{
//     //     return acc.push(this.groupService.addUsersToGroup(usersGroupDto.groupId, userId))
  
//     //  },[])
//   console.log('11111',userGroupDto)
// //     const arr = [];
// //     const { groupId, userId } = usersGroupDto;
// //     userId.forEach((userId1) => {
// //       arr.push(this.userGroupService.addUsersToGroup(groupId, userId1));
// //     });
// //     await Promise.all(arr);
//     // }catch(error){
//     //   throw new BadRequestException('Something went wrong');
//     // }
  
//   }
 
// }

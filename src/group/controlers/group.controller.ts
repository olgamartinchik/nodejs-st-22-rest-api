import { Controller, Get, Post, Body,  Param, Delete, UseFilters, BadRequestException, HttpCode, HttpStatus, Put } from '@nestjs/common';
import { GroupService } from '../services/group.service';
import { CreateGroupDto } from '../dto/create-group.dto';
import { UpdateGroupDto } from '../dto/update-group.dto';
import { Group } from '../models/group.model';
import { HttpExceptionFilter } from '@src/filters/http-exception.filter';

@Controller('v1/groups')
@UseFilters(new HttpExceptionFilter())
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
 async create(@Body() createGroupDto: CreateGroupDto): Promise<Group> {
    return this.groupService.create(createGroupDto);
  }

@Post('userToGroup')
@HttpCode(HttpStatus.CREATED)
async addUsersToGroup():Promise<void>{
  try{

  }catch(error){
    throw new BadRequestException('Something went wrong');
  }

}


  @Get()
  @HttpCode(HttpStatus.OK)
 async findAll():Promise<Group[]> {
    const groups= await this.groupService.findAll();
    if(groups.length===0) throw new BadRequestException('Groups is not found');
    return groups
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
 async findOne(@Param('id') id: string):Promise<Group>  {
   try{
     const group=await this.groupService.findOne(id);
      return group
   }catch(error){
      throw new BadRequestException('Group is not found');
   }
  
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async update(@Param('id') id: string, @Body() updateGroupDto: UpdateGroupDto):Promise<Group>{
    try{
      return await this.groupService.update(id, updateGroupDto);
    }catch(error){
      throw new BadRequestException('Group is not found');
    }
   
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
 async remove(@Param('id') id: string):Promise<number> {
    try{
      return await this.groupService.remove(id);
    }catch(error){
      throw new BadRequestException('Group is not found');
    }
    
  }
}

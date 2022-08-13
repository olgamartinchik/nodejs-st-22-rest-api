import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseFilters,
  BadRequestException,
  HttpCode,
  HttpStatus,
  Put,
} from '@nestjs/common';
import { GroupService } from '../services/group.service';
import { CreateGroupDto } from '../dto/create-group.dto';
import { UpdateGroupDto } from '../dto/update-group.dto';
import { Group } from '../models/group.model';
import { HttpExceptionFilter } from '@src/filter/http-exception.filter';
import { UserGroupDto } from '@src/group/dto/userGroup-dto';


@Controller('v1/groups')
@UseFilters(new HttpExceptionFilter())
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @Post(':id')
  @HttpCode(HttpStatus.CREATED)
  async addUsersToGroup(
    @Param('id') id: string,
    @Body() userGroupDto: UserGroupDto,
  ): Promise<void> {
    this.groupService.addUsersToGroup(id, userGroupDto.userIds);
  }
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createGroupDto: CreateGroupDto): Promise<Group> {
    try {
      return this.groupService.create(createGroupDto);
    } catch {
      throw new BadRequestException();
    }
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(): Promise<Group[]> {
    try{
    const groups = await this.groupService.findAll();
        if (groups.length !== 0)  return groups;
          
      
    }catch{
      throw new BadRequestException();
    }
   
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id') id: string): Promise<Group> {
    try {
      const group = await this.groupService.findOne(id);
      return group;
    } catch  {
      throw new BadRequestException();
    }
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id') id: string,
    @Body() updateGroupDto: UpdateGroupDto,
  ): Promise<Group> {
    try {
      return this.groupService.update(id, updateGroupDto);
    } catch  {
      throw new BadRequestException();
    }
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string): Promise<void> {
    try {
      this.groupService.remove(id);
    } catch  {
      throw new BadRequestException();
    }
  }
}

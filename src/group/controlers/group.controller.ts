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
import { HttpExceptionFilter } from '@src/filters/http-exception.filter';
import { UserGroupDto } from '@src/group/dto/userGroup-dto';
import { UserGroup } from '@src/group/models/userGroup.model';

@Controller('v1/groups')
@UseFilters(new HttpExceptionFilter())
export class GroupController {
  constructor(
    private readonly groupService: GroupService,
  ) {}

  @Post(':id')
  @HttpCode(HttpStatus.CREATED)
  async addUsersToGroup(
    @Param('id') id: string,
    @Body() userGroupDto: UserGroupDto,
  ): Promise<UserGroup[]> {
    return this.groupService.addUsersToGroup(id, userGroupDto.userIds);
  }
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createGroupDto: CreateGroupDto): Promise<Group> {
    try {
      return this.groupService.create(createGroupDto);
    } catch {
      throw new BadRequestException('Something went wrong');
    }
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(): Promise<Group[]> {
    const groups = await this.groupService.findAll();
    if (groups.length === 0)
      throw new BadRequestException('Groups is not found');
    return groups;
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id') id: string): Promise<Group> {
    try {
      const group = await this.groupService.findOne(id);
      return group;
    } catch (error) {
      throw new BadRequestException('Group is not found');
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
    } catch (error) {
      throw new BadRequestException('Group is not found');
    }
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string): Promise<void> {
    try {
      this.groupService.remove(id);
    } catch (error) {
      throw new BadRequestException('Group is not found');
    }
  }
}

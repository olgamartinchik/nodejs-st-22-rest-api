
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateGroupDto } from '../dto/create-group.dto';
import { UpdateGroupDto } from '../dto/update-group.dto';
import { Group } from '../models/group.model';

@Injectable()
export class GroupService {
  constructor(@InjectModel(Group) private groupRepository: typeof Group ){}

 async create( createGroupDto: CreateGroupDto ):Promise<Group> {
   return this.groupRepository.create(createGroupDto)
     
  }

  async findAll():Promise<Group[]> {
    return  this.groupRepository.findAll()
  
  }

 async findOne(id: string):Promise<Group> {
    return this.groupRepository.findOne({
      where:{
      id
    }})
  }

  async update(id: string, updateGroupDto: UpdateGroupDto):Promise<Group> {
    const group =await this.groupRepository.update(updateGroupDto, {where:{id},returning: true})
    return group[1][0]
  }

  async remove(id: string):Promise<number> {
  
    return  this.groupRepository.destroy({where:{id}})
  }
}

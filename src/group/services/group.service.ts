
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '@src/users/models/user.model';
import { Sequelize } from 'sequelize-typescript';
import { CreateGroupDto } from '../dto/create-group.dto';
import { UpdateGroupDto } from '../dto/update-group.dto';
import { Group } from '../models/group.model';

@Injectable()
export class GroupService {

  constructor(  private sequelize: Sequelize, @InjectModel(Group) private groupRepository: typeof Group, @InjectModel(User) private usersRepository: typeof User ){}

 async create( createGroupDto: CreateGroupDto ):Promise<Group> {
   return this.groupRepository.create(createGroupDto)
     
  }

  async findAll():Promise<Group[]> {
    return  this.groupRepository.findAll()
  
  }
 async addUsersToGroup(groupId:string, userIds:string):Promise<void>{
//  const t=
//  try{
  await this.sequelize.transaction(async t=>{
    const user=await this.usersRepository.findByPk(userIds)
    const group =await this.groupRepository.findByPk(groupId);
    (await group).$add("Users", [user.id],{ transaction: t } );
    (await group).$add("Groups", [group.id],{ transaction: t } );
  })
//  }catch(error){
//   // await t.rollback();
//  }
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

import { InjectModel } from "@nestjs/sequelize";
import { Group } from "@src/group/models/group.model";
import { User } from "@src/users/models/user.model";
import { Sequelize } from "sequelize-typescript";

export class UserGroupService {
    constructor(  private sequelize: Sequelize, @InjectModel(Group) private groupRepository: typeof Group, @InjectModel(User) private usersRepository: typeof User ){}
    async addUsersToGroup(id:string, userIds:string[]){
  
    // try{
      
       console.log('1',id,userIds)
      return  await this.sequelize.transaction(async( t)=>{
        console.log('2')
        const group =await this.groupRepository.findOne({
          where:{
            id
          },
          include:[
            {
              model:User,
              where:{isDeleted:false},
              through:{attributes:[]}
            }
          ],
          transaction:t
        });
        console.log('3',group)
        if(!group){
          return group
        }
        const arrayUserGroups=userIds.map(async (userId)=>{
         return await this.usersRepository.findOne({
            where:{
              id:userId,
              isDeleted:false
            },
            transaction:t
          })
        })
        const userGroups= await Promise.all(arrayUserGroups)
        console.log('4')
       await group.$add('Users', userGroups,{ transaction:t})
       return await this.groupRepository.findOne({
        where:{
          id,
         
        },
        transaction:t
      })
      })
    
   
    }
}




import { InjectModel } from "@nestjs/sequelize";
import { Group } from "@src/group/models/group.model";
import { User } from "@src/users/models/user.model";
import { Sequelize } from "sequelize-typescript";

export class UserGroupService {
    constructor(  private sequelize: Sequelize, @InjectModel(Group) private groupRepository: typeof Group, @InjectModel(User) private usersRepository: typeof User ){}
    async addUsersToGroup(groupId:string, userId:string):Promise<void>{
  
    // try{
       console.log('1')
      await this.sequelize.transaction(async t=>{
        const user=await this.usersRepository.findByPk(userId,{ transaction: t })
        const group =await this.groupRepository.findByPk(groupId,{ transaction: t });
        console.log('user',user,group)
        if (group && user) {
        await user.$add("User", [group.id],{ transaction: t } );
        await group.$add("Group", [user.id],{ transaction: t } );
        }
      })
    // }catch(error){
    
    //     return error.message
    // }

   
      }
}




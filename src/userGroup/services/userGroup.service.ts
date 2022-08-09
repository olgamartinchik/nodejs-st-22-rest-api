import { InjectModel } from "@nestjs/sequelize";
import { Group } from "@src/group/models/group.model";
import { User } from "@src/users/models/user.model";
import { Transaction } from "sequelize";
import { Sequelize } from "sequelize-typescript";

export class UserGroupService {
    constructor(  private sequelize: Sequelize, @InjectModel(Group) private groupRepository: typeof Group, @InjectModel(User) private usersRepository: typeof User ){}
    async findOneGroup(id: string, t: Transaction):Promise<Group>{
      return  await this.groupRepository.findOne({
        where:{
          id
        },
       
        transaction:t
      });
    }
    async addUsersToGroup(id:string, userIds:string[]):Promise<Group>{
  
    // try{
      
       console.log('1',id,userIds)
      return  await this.sequelize.transaction(async( t)=>{
        console.log('2')
        const group =await this.findOneGroup(id,t)
       
        console.log('3',group)
        if(!group){
          return group
        }
        const arrayUsers=userIds.map(async (userId)=>{
        const user=  await this.usersRepository.findOne({
            where:{
              id:userId,
              isDeleted:false
            },
            transaction:t
          })
        
        await  group.$add('Users', [user.id],{ transaction:t})

          return user
        })
        const userGroups= await Promise.all(arrayUsers)
       
        console.log('4',userGroups)
        console.log('44',group.user)
        // userGroups.forEach(async user=>{
        //   console.log("userId", user.id)
        //   group.$add('Users', [user.id],{ transaction:t})
        // })
      // const groupWithUser= await group.$add('Users', userGroups,{ transaction:t})
      // console.log('5',groupWithUser)
      const updateGroup = await this.findOneGroup(id,t)
       return updateGroup
      })
    
   
    }
}




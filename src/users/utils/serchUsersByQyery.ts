import { User } from "../user.model"

export const searchUsersByQuery=(users:User[],loginSubstring:string, limit:number)=>{
    const searchingUsers=users.filter(user=>user.login.includes(loginSubstring))
    .sort((prevUser,nextUser)=>prevUser.login.toLowerCase().charCodeAt(0)-nextUser.login.toLowerCase().charCodeAt(0))
    .slice(0, limit)
    return searchingUsers
}
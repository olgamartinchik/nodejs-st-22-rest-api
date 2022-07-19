export interface IUser{
    id?:string;
    login:string;
    password:string;
    age:number;
    isDeleted?: boolean;
<<<<<<< HEAD
}
export interface IUserAnswer{
    user:IUser;
    message:string
=======
>>>>>>> 56099ce (feat: add service, entity, module)
}
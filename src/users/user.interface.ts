export interface IUser{
    id?:string;
    login:string;
    password:string;
    age:number;
    isDeleted?: boolean;
}
export interface IUserAnswer{
    user:IUser;
    message:string
}
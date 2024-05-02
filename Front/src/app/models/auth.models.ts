export interface IUser{
id: number;
firstName : string;
lastName: string
email : string;
}
export interface ILogin{
  email : string;
  password : string;
}

export interface IloginResponse{
  message : string;
  token : string;
  user : IUser;
}

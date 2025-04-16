export interface IUser {
  id: string;
  role_id: string;
  username: string;
}

export interface IPostUser {
  role_id: string;
  username: string;
  password: string;
}

export interface IResetPassword {
  new_password: string;
}

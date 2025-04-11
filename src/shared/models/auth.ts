export interface ILoginResp {
  id: string;
  role_id: string;
  username: string;
  access_token: string;
}

export interface ILoginPayload {
  username: string;
  password: string;
}

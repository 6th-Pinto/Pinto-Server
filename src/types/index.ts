import { REFRESH_TOKEN_COOKIE_KEY } from '../constants/auth';

export interface UpdateInfo {
  createdAt: Date;
  updatedAt: Date;
}

export interface UserLoginInfo {
  userId: string;
  password: string;
  birthDate: Date;
  phoneNumber: string;
  email: string;
  major: string;
  school: string;
}



export type UserInfo = UserLoginInfo;

export interface RefreshCookie {
  [REFRESH_TOKEN_COOKIE_KEY]: string;
}

export type LoginRequestBody = UserLoginInfo;
export type CreateUserRequestBody = UserLoginInfo;

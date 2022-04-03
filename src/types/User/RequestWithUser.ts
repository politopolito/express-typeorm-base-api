import {
  Request, 
} from "express";

export interface UserIdentity {
  nickname: string;
  email: string;
  email_verified: string;
  picture: string;
}

export interface RequestWithOIDC extends Request {
  user: UserIdentity;
}

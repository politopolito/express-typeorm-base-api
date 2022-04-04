import { Request } from "express";

export interface UserIdentity {
  nickname: string;
  email: string;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  email_verified: string;
  picture: string;
}

export interface RequestWithOIDC extends Request {
  user: UserIdentity;
}

import { Request } from "express";

export interface RequestWithUser extends Request {
  user: {
    iss: string;
    sub: string;
    aud: string[];
    iat: number;
    exp: number;
    azp: string;
    scope: string;
  }
}

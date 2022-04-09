import {
  Request,
} from "express";
import User from "../../entities/User";

export interface RequestWithAuth extends Request {
  auth: {
    iss: string;
    sub: string;
    aud: string[];
    iat: number;
    exp: number;
    azp: string;
    scope: string;
    isAuthenticated?: boolean;
    user?: User;
  }
}

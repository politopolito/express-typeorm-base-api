import {
  NextFunction,
  Request,
  Response, 
} from "express";

export type IRequestHandler<T = Request> = (req: T, res: Response, next?: NextFunction) => void;

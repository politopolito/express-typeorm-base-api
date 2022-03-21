import { NextFunction, Request, Response } from "express";

export type ExpressErrCallback = (err: Error, req: Request, res: Response, next: NextFunction) => void;

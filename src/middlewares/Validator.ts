import IMiddleware from "../types/IMiddleware";
import { RequestHandler } from "express";
import { validate, ValidationError } from "class-validator";
import { plainToClass } from "class-transformer";
import HttpException from "../exceptions/HttpException";

export default class Validator implements IMiddleware {
  static mount(type: any, skipMissingProperties = false): RequestHandler {
    return (req, res, next) => {
      validate(plainToClass(type, req.body), { skipMissingProperties })
        .then((errors: ValidationError[]) => {
          if (errors.length > 0) {
            const message = errors.map((error: ValidationError) => Object.values(error.constraints)).join(', ');
            next(new HttpException(400, message));
          } else {
            next();
          }
        })
    }
  }
}

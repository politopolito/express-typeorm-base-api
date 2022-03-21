import { validate, ValidationError } from "class-validator";
import { plainToInstance } from "class-transformer";
import HttpException from "../exceptions/HttpException";
import { IRequestHandler } from "../types/IRequestHandler";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const myValidator = (type: any, skipMissingProperties = false): IRequestHandler => (req, res, next) => validate(plainToInstance(type, req.body), { skipMissingProperties })
  .then((errors: ValidationError[]) => {
    if (errors.length > 0) {
      const message = errors.map((error: ValidationError) => Object.values(error.constraints)).join(", ");
      next(new HttpException(400, message));
    } else {
      next();
    }
  });

export default myValidator;

import {
  Application,
  NextFunction,
  Request,
  Response,
} from "express";

abstract class IMiddleware {
  static mount?(_express: Application): void {
  }

  static use? = () => (
    _req: Request, _res: Response, _next: NextFunction,
  ) => {
  };
}

export default IMiddleware;

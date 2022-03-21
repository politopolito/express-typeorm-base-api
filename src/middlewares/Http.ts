import { Application } from "express";
import { IRequestHandler } from "../types/IRequestHandler";

import Log from "../utils/Log";
import IMiddleware from "../types/IMiddleware";

class Http implements IMiddleware {
  private static handler: IRequestHandler = (_req, _res, next) => {
    Log.info(`Time: ${Date.now()}`);
    next();
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public static mount(_express: Application) {
    Log.info("Middlewares :: Mounting 'HTTP'...");
    _express.use(Http.handler);
  }
}

export default Http;

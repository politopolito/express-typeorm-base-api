import { Application } from "express";
import { ExpressCallback } from "../types/ExpressCallback";

import Log from "../utils/Log";
import IMiddleware from "../types/IMiddleware";

class Http implements IMiddleware {
  private static handler: ExpressCallback = (_req, _res, next) => {
    Log.info(`Time: ${Date.now()}`)
    next();
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public static mount(_express: Application) {
    Log.info("Middlewares :: Mounting 'HTTP'...");
    _express.use(Http.handler)
  }
}

export default Http;

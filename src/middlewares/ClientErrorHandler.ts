import {
  Application, NextFunction, Request, Response,
} from "express";
import Log from "../utils/Log";
import IMiddleware from "../types/IMiddleware";
import { ExpressErrCallback } from "../types/ExpressErrCallback";

/**
 * Handle routes errors & exceptions.
 */
class ClientErrorHandler implements IMiddleware {
  private static handler: ExpressErrCallback = (err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err) {
      Log.error(err.stack);
      res.status(500).json({ error: "Something went wrong!" });
    } else {
      next(err);
    }
  }

  public static mount(_express: Application) {
    Log.info("Middlewares :: Mounting 'ClientErrorHandler'");
    _express.use(ClientErrorHandler.handler);
  }
}

export default ClientErrorHandler;

import { Application, Request, Response } from "express";
import Log from "../utils/Log";
import IMiddleware from "../types/IMiddleware";

/**
 * Handle not found routes
 */
class NotFoundHandler implements IMiddleware {
  public static mount(_express: Application) {
    Log.info("Middlewares :: Mounting 'NotFoundHandler'");
    _express.use("*", (req: Request, res: Response) => {
      const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;

      Log.error(`Path ${req.originalUrl} not found [IP: ${ip}]`);

      res.status(404).json({ error: "Page not found" });
    });
  }
}

export default NotFoundHandler;

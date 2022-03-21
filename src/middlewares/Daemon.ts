import { Application, json } from "express";
import Config from "../providers/Config";
import CORS from "./CORS";
import Http from "./Http";
import NotFoundHandler from "./NotFoundHandler";
import ClientErrorHandler from "./ClientErrorHandler";
import Log from "../utils/Log";
import IMiddleware from "../types/IMiddleware";

class Daemon implements IMiddleware {
  public static mount = (_express: Application) => {
    Log.info("Daemon :: Mounting Daemon...");

    if (Config.config().isCORSEnabled) {
      CORS.mount(_express);
    }

    _express.use(json());

    Http.mount(_express);

    // Error handling middleware should be mounted last
    // Daemon.mountErrorHandling(_express);
  };

  private static mountErrorHandling(_express: Application) {
    NotFoundHandler.mount(_express);
    ClientErrorHandler.mount(_express);
  }
}

export default Daemon;

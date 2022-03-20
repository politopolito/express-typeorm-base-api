import { Application } from "express";
import Config from "./Config";
import Log from "../middlewares/Log";
import apiRouter from "../routes";

class Routes {
  public static mountApi(_express: Application): void {
    Log.info("Routes :: Mounting API Routes...");
    const apiPrefix = Config.config().apiPrefix;
    _express.use(`${apiPrefix}`, apiRouter);
  }
}

export default Routes;

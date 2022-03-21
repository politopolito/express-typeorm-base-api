import { Application } from "express";
import Config from "./Config";
import Log from "../utils/Log";
import apiRouter from "../routes";

class Routes {
  public static init(_express: Application): void {
    Log.info("Routes :: Mounting API Routes...");
    const { apiPrefix } = Config.config();
    console.log(`prefix:${  apiPrefix}`);
    _express.use(`${apiPrefix}`, apiRouter);
  }
}

export default Routes;

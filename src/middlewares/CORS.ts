import { Application } from "express";
import cors from "cors";
import Log from "./Log";
import Config from "../providers/Config";

class CORS {
  public static mount(_express: Application): Application {
    Log.info("Mounting 'CORS' middleware...");

    _express.use(cors({
      origin: Config.config().appURL,
    }));

    return _express;
  }
}

export default CORS;

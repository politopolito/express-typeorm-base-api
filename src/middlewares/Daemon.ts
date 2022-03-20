import { Application } from "express";
import Config from "../providers/Config";
import CORS from "./CORS";

class Daemon {
  public static init = (_express: Application) => {
    if (Config.config().isCORSEnabled) {
      _express = CORS.mount(_express);
    }

    return _express;
  };
}

export default Daemon;

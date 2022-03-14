import { Application } from "express";

import Log from "./Log";

class Http {
  public static mount(express: Application): Application {
    Log.info("Mounting the 'HTTP' middleware");
    return express;
  }
}

export default Http;

import * as path from "path";
import * as dotenv from "dotenv";
import { Application } from "express";
import IMiddleware from "../types/IMiddleware";

type AppConfig = {
  appName: string;
  appDescription: string;
  port: number;
  appSecret: string;
  isCORSEnabled: boolean;
  appURL: string;
  apiPrefix: string;
};

class Config implements IMiddleware {
  private static appConfig: AppConfig;

  /**
   * Expose env configs
   */
  public static config(): AppConfig {
    if (!Config.appConfig) {
      Config.appConfig = {
        appName: process.env.APP_NAME || "My App",
        appDescription: process.env.APP_DESCRIPTION || "Welcome to my app",
        port: !Number.isNaN(Number(process.env.PORT)) ? Number(process.env.PORT) : 4000,
        appSecret: process.env.APP_SECRET,
        isCORSEnabled: !!process.env.CORS_ENABLED,
        appURL: process.env.APP_URL || "localhost",
        apiPrefix: process.env.API_PREFIX || "",
      };
    }

    return Config.appConfig;
  }

  /**
   * Initializes dotenv and injects your config into the app's locals
   * @param _express
   */
  public static mount(_express: Application) {
    dotenv.config({ path: path.join(__dirname, "../../.env") });
    _express.locals.app = this.config();
  }
}

export default Config;

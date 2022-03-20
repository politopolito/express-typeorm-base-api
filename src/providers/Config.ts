import * as path from "path";
import * as dotenv from "dotenv";
import { Application } from "express";


type AppConfig = {
  appName: string;
  appDescription: string;
  port: number;
  appSecret: string;
  isCORSEnabled: boolean;
  appURL: string;
  apiPrefix: string;
};

class Config {
  /**
   * Expose env configs
   */
  public static config(): AppConfig {
    dotenv.config({ path: path.join(__dirname, "../../.env") });

    const appName = process.env.APP_NAME || "My App";
    const appDescription = process.env.APP_DESCRIPTION || "Welcome to my app";
    const port = !Number.isNaN(Number(process.env.PORT)) ? Number(process.env.PORT) : 4000;
    const appSecret = process.env.APP_SECRET;
    const isCORSEnabled = !!process.env.CORS_ENABLED;
    const appURL = process.env.APP_URL || "localhost";
    const apiPrefix = process.env.API_PREFIX || "" ;

    return {
      appName,
      appDescription,
      port,
      appSecret,
      isCORSEnabled,
      appURL,
      apiPrefix,
    };
  }

  /**
   * Injects your config into the app's locals
   * @param _express
   */
  public static init(_express: Application): Application {
    // eslint-disable-next-line no-param-reassign
    _express.locals.app = this.config();
    return _express;
  }
}

export default Config;

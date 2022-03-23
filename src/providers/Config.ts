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
  databaseUser: string;
  databasePassword: string;
  databaseHost: string;
  databasePort: number;
  databaseName: string;
  databaseSynchronize: boolean;
  databaseLogging: boolean;
};

/**
 * Handles injecting environment configuration & secrets
 */
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
        isCORSEnabled: Boolean(process.env.CORS_ENABLED),
        appURL: process.env.APP_URL || "localhost",
        apiPrefix: process.env.API_PREFIX || "",
        databaseUser: process.env.DATABASE_USERNAME || "postgres",
        databasePassword: process.env.DATABASE_PASSWORD || "postgres",
        databaseHost: process.env.DATABASE_HOST || "localhost",
        databasePort: !Number.isNaN(Number(process.env.DATABASE_PORT)) ? Number(process.env.DATABASE_PORT) : 5632,
        databaseName: process.env.DATABASE_NAME || "mydb",
        databaseLogging: process.env.DATABASE_LOGGING.toLowerCase() === "true",
        databaseSynchronize: Boolean(process.env.DATABASE_SYNCHRONIZE),
      };
    }

    return Config.appConfig;
  }

  /**
   * Initializes dotenv and injects your config into the app's locals
   * @param _express
   */
  public static init(_express: Application) {
    dotenv.config({ path: path.join(__dirname, "../../.env") });
    _express.locals.app = this.config();
  }
}

export default Config;

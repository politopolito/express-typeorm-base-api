import "reflect-metadata";
import { createConnection, getConnection as getTypeOrmConnection } from "typeorm";
import Log from "../utils/Log";
import Config from "./Config";

class Database {
  public static init(): void {
    Log.info("Database :: Connecting...");
    const {
      databasePassword, databaseUser, databaseSynchronize, databaseLogging, databaseHost, databaseName, databasePort,
    } = Config.config();
    createConnection({
      type: "mysql",
      host: databaseHost,
      port: databasePort,
      username: databaseUser,
      password: databasePassword,
      database: databaseName,
      entities: [
        `${__dirname  }/entities/*.js`,
      ],
      synchronize: databaseSynchronize,
      logging: databaseLogging,
    }).then(() => Log.info("Database :: Connected"));
  }

  public static getConnection() {
    return getTypeOrmConnection();
  }
}

export default Database;

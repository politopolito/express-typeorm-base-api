import {
  createConnection,
  getConnection as getTypeOrmConnection,
} from "typeorm";
import Log from "../utils/Log";
import Config from "./Config";

/**
 * Handles database connection
 */
class Database {
  public static init(): Promise<void> {
    Log.info("Database :: Connecting...");
    const {
      databasePassword,
      databaseUser,
      databaseName,
      databasePort,
      databaseHost,
      shouldDatabaseSync,
      shouldDatabaseLog,
    } = Config.config();

    return createConnection({
      database: databaseName,
      entities: [
        `${__dirname}/../entities/*.js`,
      ],
      extra      : { ssl: { rejectUnauthorized: false } },
      host       : databaseHost,
      logging    : shouldDatabaseLog,
      password   : databasePassword,
      port       : databasePort,
      synchronize: shouldDatabaseSync,
      type       : "postgres",
      username   : databaseUser,
    }).then(() => Log.info("Database :: Connected"));
  }

  public static getConnection() {
    return getTypeOrmConnection();
  }
}

export default Database;

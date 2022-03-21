import express from "express";
import Daemon from "../middlewares/Daemon";
import Log from "../utils/Log";
import Config from "./Config";
import Routes from "./Routes";

/**
 * Concrete Factory
 */
class Express {
  /**
   * Create the express object
   */
  public express: express.Application;

  /**
   * Initializes the express object
   */
  constructor() {
    this.express = express();
    this.mountLocalConfig();
    this.mountRoutes();
    this.mountMiddlewares();
  }

  /**
   * Mount environment config
   * @private
   */
  private mountLocalConfig(): void {
    Config.mount(this.express);
  }

  /**
   * Mount defined middlewares
   * @private
   */
  private mountMiddlewares() {
    Daemon.mount(this.express);
  }

  /**
   * Mount API routes
   * @private
   */
  private mountRoutes(): void {
    Routes.mount(this.express);
  }

  /**
   * Start the express server
   */
  public init(): void {
    const { port } = Config.config();

    this.express.listen(port, () => {
      // eslint-disable-next-line no-console
      Log.info(`⚡️[server]: Server is running at https://localhost:${port}`);
    }).on("error", (_error) => {
      Log.error(_error.message);
    });
  }
}

export default new Express();
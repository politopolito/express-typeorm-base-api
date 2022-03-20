import express from "express";
import Daemon from "../middlewares/Daemon";
import Log from "../middlewares/Log";
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
    this.express = Config.init(this.express);
  }

  /**
   * Mount defined middlewares
   * @private
   */
  private mountMiddlewares() {
    this.express = Daemon.init(this.express);
  }

  /**
   * Mount API routes
   * @private
   */
  private mountRoutes(): void {
    Routes.mountApi(this.express);
  }

  /**
   * Start the express server
   */
  public init(): void {
    console.log(this.express.locals.app);
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

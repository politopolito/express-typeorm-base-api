import express from "express";

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
    this.mountMiddlewares();
  }

  private mountMiddlewares() {

  }

}

import "reflect-metadata";
import "express-async-errors";
import os from "os";
import cluster from "cluster";
import App from "./providers/App";
import Database from "./providers/Database";
import Log from "./utils/Log";

/**
 * Start development application running on single thread.
 */
function initSingleNode(): void {
  App.loadServer();
}

/**
 * Run production-ready application on cluster mode.
 */
function initCluster(): void { // eslint-disable-line
  if (cluster.isPrimary) {
    const cpus = os.cpus();

    cpus.forEach(() => cluster.fork());

    /**
     * Run Worker periodically
     */
    setTimeout(
      () => App.loadWorker(), 1000 * 10,
    );
  } else {
    /**
     * Run the Server on Clusters
     */
    App.loadServer();
  }
}

/**
 * Establish database connection
 * then init server using either development or production-ready config.
 */
Database.init()
  .then(() => initSingleNode())
  .catch(err => Log.error(err.toString()));


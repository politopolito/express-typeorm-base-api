import Log from "../utils/Log";
import Express from "./Express";

class App {
  public static loadServer(): void {
    Log.info("Server :: Booting @ Master...");
    Express.init();
  }

  public static loadWorker(): void {
    Log.info("Worker :: Booting @ Master...");
  }
}

export default App;

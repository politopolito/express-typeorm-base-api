import { Response } from "express";
import Config from "../providers/Config";
import { RequestWithUser } from "../types/User/RequestWithUser";

/**
 * Handle HTTP requests for Home/Route path
 */
class HomeController {
  public static index(_req: RequestWithUser, res: Response) {
    console.log(_req.user);
    return res.json({
      name: Config.config().appName,
      description: Config.config().appDescription,
    });
  }
}

export default HomeController;

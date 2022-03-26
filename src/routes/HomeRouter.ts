import { Router } from "express";
import HomeController from "../controllers/HomeController";
import IRouter from "../types/IRouter";
import JWTCheck from "../middlewares/JWTCheck";

/**
 * Routes for root/home path
 */
class HomeRouter implements IRouter {
  public path = "/";

  public router: Router;

  constructor() {
    this.router = Router();
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.get(this.path, HomeController.index);
    this.router.get(`${this.path}api/external`, JWTCheck.use(), HomeController.index);
  }
}

export default HomeRouter;


import { Router } from "express";
import HomeController from "../controllers/HomeController";
import IRouter from "../types/IRouter";

class HomeRouter extends IRouter {
  public path = "/";
  protected initializeRoutes() {
    this.router.get(this.path, HomeController.index);
  }
}

export default HomeRouter;


import { Router } from "express";
import IRouter from "../types/IRouter";
import AuthController from "../controllers/AuthController";

/**
 * Router for Authentication
 */
class AuthRouter implements IRouter {
  public path = "/auth";

  public router: Router;

  private readonly authController = new AuthController();

  constructor() {
    this.router = Router();
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.post(`${this.path}/login`, this.authController.login);
    this.router.post(`${this.path}/logout`, this.authController.logout);
  }
}

export default AuthRouter;

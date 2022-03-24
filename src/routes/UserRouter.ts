import { Router } from "express";
import UserController from "../controllers/UserController";
import IRouter from "../types/IRouter";
import ParamsValidator from "../middlewares/ParamsValidator";
import BodyValidator from "../middlewares/BodyValidator";
import UserCreateBodyValidator from "../validators/User/UserCreateBodyValidator";
import UserGetParamsValidator from "../validators/User/UserGetParamsValidator";

class UserRouter implements IRouter {
  public path = "/Users";

  public router: Router;

  private UserController = new UserController();

  constructor() {
    this.router = Router();
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.get(`${this.path}/:id(\\d+)`,  ParamsValidator(UserGetParamsValidator), this.UserController.getById);
    this.router.post(this.path,  BodyValidator(UserCreateBodyValidator, false), this.UserController.create);
  }
}

export default UserRouter;
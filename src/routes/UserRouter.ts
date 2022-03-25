import { Router } from "express";
import UserController from "../controllers/UserController";
import IRouter from "../types/IRouter";
import ParamsValidator from "../middlewares/ParamsValidator";
import BodyValidator from "../middlewares/BodyValidator";
import UserCreateBodyValidator from "../validators/User/UserCreateBodyValidator";
import UserGetParamsValidator from "../validators/User/UserGetParamsValidator";
import UserUpdateParamsValidator from "../validators/User/UserUpdateParamsValidator";
import UserUpdateBodyValidator from "../validators/User/UserUpdateBodyValidator";

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
    this.router.patch(`${this.path}/:id(\\d+)`, ParamsValidator(UserUpdateParamsValidator), BodyValidator(UserUpdateBodyValidator, true), this.UserController.updateById);
    this.router.delete(`${this.path}/:id(\\d+)`, ParamsValidator(UserUpdateParamsValidator), this.UserController.deleteById);
  }
}

export default UserRouter;
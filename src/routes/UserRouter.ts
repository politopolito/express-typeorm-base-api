import {
  Router, 
} from "express";
import UserController from "../controllers/UserController";
import IRouter from "../types/IRouter";
import UserCreateBodyValidator from "../validators/User/UserCreateBodyValidator";
import BodyValidator from "../middlewares/BodyValidator";
import UserUpdateBodyValidator from "../validators/User/UserUpdateBodyValidator";
import ParamsValidator from "../middlewares/ParamsValidator";
import UserUpdateParamsValidator from "../validators/User/UserUpdateParamsValidator";
import UserGetParamsValidator from "../validators/User/UserGetParamsValidator";

/**
 * Router for Users
 */
class UserRouter implements IRouter {
  public path = "/users";

  public router: Router;

  private UserController = new UserController();

  constructor() {
    this.router = Router();
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.get(
      `${this.path}/:id(\\d+)`, ParamsValidator(UserGetParamsValidator), this.UserController.getById,
    );
    this.router.patch(
      `${this.path}/:id(\\d+)`, ParamsValidator(UserUpdateParamsValidator), BodyValidator(UserUpdateBodyValidator, true), this.UserController.updateById,
    );
    this.router.delete(
      `${this.path}/:id(\\d+)`, ParamsValidator(UserUpdateParamsValidator), this.UserController.deleteById,
    );
    this.router.post(
      this.path, BodyValidator(UserCreateBodyValidator), this.UserController.create,
    );
  }
}

export default UserRouter;

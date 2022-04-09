import { Router } from "express";
import UserController from "../controllers/UserController";
import IRouter from "../types/IRouter";
import UserCreateBodyValidator from "../validators/User/UserCreateBodyValidator";
import bodyValidator from "../middlewares/BodyValidator";
import UserUpdateBodyValidator from "../validators/User/UserUpdateBodyValidator";
import paramsValidator from "../middlewares/ParamsValidator";
import UserUpdateParamsValidator from "../validators/User/UserUpdateParamsValidator";
import UserGetParamsValidator from "../validators/User/UserGetParamsValidator";
import authentication from "../middlewares/Authentication";
import JWTCheck from "../middlewares/JWTCheck";

/**
 * Router for Users
 */
class UserRouter implements IRouter {
  public path = "/users";

  public router: Router;

  private userController = new UserController();

  constructor() {
    this.router = Router();
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.get(
      `${this.path}/:id(\\d+)`,
      JWTCheck.use(),
      authentication.use(),
      paramsValidator(UserGetParamsValidator),
      this.userController.getById,
    );

    this.router.patch(
      `${this.path}/:id(\\d+)`,
      JWTCheck.use(),
      authentication.use(),
      paramsValidator(UserUpdateParamsValidator),
      bodyValidator(
        UserUpdateBodyValidator, true,
      ),
      this.userController.updateById,
    );

    this.router.delete(
      `${this.path}/:id(\\d+)`,
      JWTCheck.use(),
      authentication.use(),
      paramsValidator(UserUpdateParamsValidator),
      this.userController.deleteById,
    );

    this.router.post(
      this.path,
      JWTCheck.use(),
      authentication.use(),
      bodyValidator(UserCreateBodyValidator),
      this.userController.create,
    );
  }
}

export default UserRouter;

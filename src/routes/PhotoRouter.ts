import { Router } from "express";
import PhotoController from "../controllers/PhotoController";
import IRouter from "../types/IRouter";
import PhotoCreateBodyValidator from "../validators/Photo/PhotoCreateBodyValidator";
import BodyValidator from "../middlewares/BodyValidator";
import PhotoUpdateBodyValidator from "../validators/Photo/PhotoUpdateBodyValidator";
import ParamsValidator from "../middlewares/ParamsValidator";
import PhotoUpdateParamsValidator from "../validators/Photo/PhotoUpdateParamsValidator";
import PhotoGetParamsValidator from "../validators/Photo/PhotoGetParamsValidator";

/**
 * Router for Photos
 */
class PhotoRouter implements IRouter {
  public path = "/photos";

  public router: Router;

  private photoController = new PhotoController();

  constructor() {
    this.router = Router();
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.get(`${this.path}/:id(\\d+)`, ParamsValidator(PhotoGetParamsValidator), this.photoController.getById);
    this.router.patch(`${this.path}/:id(\\d+)`, ParamsValidator(PhotoUpdateParamsValidator, false), BodyValidator(PhotoUpdateBodyValidator), this.photoController.updateById);
    this.router.delete(`${this.path}/:id(\\d+)`, ParamsValidator(PhotoUpdateParamsValidator, false), BodyValidator(PhotoUpdateBodyValidator), this.photoController.deleteById);
    this.router.post(this.path, BodyValidator(PhotoCreateBodyValidator, true), this.photoController.create);
  }
}

export default PhotoRouter;

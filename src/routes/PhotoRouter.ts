import { Router } from "express";
import PhotoController from "../controllers/PhotoController";
import IRouter from "../types/IRouter";
import PhotoCreateBodyValidator from "../validators/Photo/PhotoCreateBodyValidator";
import bodyValidator from "../middlewares/BodyValidator";
import PhotoUpdateBodyValidator from "../validators/Photo/PhotoUpdateBodyValidator";
import paramsValidator from "../middlewares/ParamsValidator";
import PhotoUpdateParamsValidator from "../validators/Photo/PhotoUpdateParamsValidator";
import PhotoGetParamsValidator from "../validators/Photo/PhotoGetParamsValidator";
import queryValidator from "../middlewares/QueryValidator";
import PhotoGetQueryValidator from "../validators/Photo/PhotoGetQueryValidator";

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
    this.router.get(
      `${this.path}/:id(\\d+)`, paramsValidator(PhotoGetParamsValidator), queryValidator(PhotoGetQueryValidator), this.photoController.getById,
    );
    this.router.patch(
      `${this.path}/:id(\\d+)`, paramsValidator(
        PhotoUpdateParamsValidator, false,
      ), bodyValidator(PhotoUpdateBodyValidator), this.photoController.updateById,
    );
    this.router.delete(
      `${this.path}/:id(\\d+)`, paramsValidator(
        PhotoUpdateParamsValidator, false,
      ), this.photoController.deleteById,
    );
    this.router.post(
      this.path, bodyValidator(
        PhotoCreateBodyValidator, false,
      ), this.photoController.create,
    );
  }
}

export default PhotoRouter;

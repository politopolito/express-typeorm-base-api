import { Router } from "express";
import PhotoController from "../controllers/PhotoController";
import IRouter from "../types/IRouter";
// import Validator from "../middlewares/Validator";
import PhotoCreateValidator from "../validators/Photo/PhotoCreateValidator";
import myValidator from "../middlewares/Validator";
import PhotoUpdateValidator from "../validators/Photo/PhotoUpdateValidator";

class PhotoRouter implements IRouter {
  public path = "/photos";

  public router: Router;

  private photoController = new PhotoController();

  constructor() {
    this.router = Router();
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.get(`${this.path}/:id(\\d+)`, this.photoController.getById);
    this.router.post(this.path, myValidator(PhotoCreateValidator, true), this.photoController.create);
    this.router.put(`${this.path}/:id(\\d+)`, myValidator(PhotoUpdateValidator, true), this.photoController.updateById);
    this.router.delete(`${this.path}/:id(\\d+)`, this.photoController.deleteById);
  }
}

export default PhotoRouter;

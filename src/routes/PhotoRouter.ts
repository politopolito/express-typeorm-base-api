import PhotoController from "../controllers/PhotoController";
import IRouter from "../types/IRouter";
import Validator from "../middlewares/Validator";
import PhotoCreateValidator from "../validators/Photo/PhotoCreateValidator";

class PhotoRouter extends IRouter {
  public path = "/photos";
  private photoController = new PhotoController();

  protected initializeRoutes() {
    this.router.get(`${this.path}/:id(\\d+`, this.photoController.getById);
    this.router.post(this.path, Validator.mount(PhotoCreateValidator), this.photoController.create);
  }
}

export default PhotoRouter;

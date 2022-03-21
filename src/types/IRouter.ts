import { Router } from "express";

export default abstract class IRouter {
  public abstract path?: string;

  public router: Router;

  public constructor() {
    this.router = Router();
    this.initializeRoutes();
  }

  protected abstract initializeRoutes(): void;
}

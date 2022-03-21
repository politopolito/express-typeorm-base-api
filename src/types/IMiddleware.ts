import { Application } from "express";

abstract class IMiddleware {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  static mount(_express: Application): void {}
}

export default IMiddleware;

import {
  NextFunction,
  Response,
} from "express";
import Log from "../utils/Log";
import IMiddleware from "../types/IMiddleware";
import { RequestWithAuth } from "../types/Auth/RequestWithAuth";
import UserService from "../services/UserService";
import { UserRole } from "../entities/User";
import NotAuthorizedException from "../exceptions/NotAuthorizedException";

/**
 * Authorization middleware based on req.auth data
 * Assumes Authentication has been validated
 * Validate permissions based on expected user role
 * Default permission: ADMIN
 */
export class AuthorizationMiddleware implements IMiddleware {
  protected static initMessage = "AuthorizationMiddleware :: Setup authorization middleware...";

  /**
   * Handles all business logic related to User entity
   * @private
   */
  private readonly userService: UserService;

  /**
   * Constructor allows for dependency injection of userService
   * @param msg
   * @param userService
   */
  constructor(
    msg?: string, userService = new UserService(),
  ) {
    Log.info(msg ?? AuthorizationMiddleware.initMessage);
    this.userService = userService;
  }

  public use() {
    return async (
      req: RequestWithAuth, _res: Response, next: NextFunction,
    ) => {
      const userRole = req.auth.user?.role;

      if (userRole === UserRole.ADMIN) {
        next();
      } else {
        throw new NotAuthorizedException();
      }
    };
  }
}

export default new AuthorizationMiddleware();

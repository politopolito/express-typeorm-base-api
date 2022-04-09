import {
  NextFunction,
  Response,
} from "express";
import Log from "../utils/Log";
import IMiddleware from "../types/IMiddleware";
import { RequestWithAuth } from "../types/Auth/RequestWithAuth";
import NotAuthenticatedException from "../exceptions/NotAuthenticatedException";
import UserService from "../services/UserService";
import NotFoundException from "../exceptions/NotFoundException";

/**
 * Authentication middleware based on req.auth information
 * Get user information based on req.auth
 * And populate with user entity information
 */
export class AuthenticationMiddleware implements IMiddleware {
  protected static initMessage = "AuthenticationMiddleware :: Setup authentication middleware...";

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
    Log.info(msg ?? AuthenticationMiddleware.initMessage);
    this.userService = userService;
  }

  public use() {
    return async (
      req: RequestWithAuth, _res: Response, next: NextFunction,
    ) => {
      // If req.auth is not populated then not authenticated
      if (!req.auth) throw new NotAuthenticatedException();

      try {
        const user = await this.userService.getByKey(
          "auth0Id", req.auth.sub,
        );

        // Populate req.auth with user data
        req.auth.isAuthenticated = true;
        req.auth.user = user;

        next();
      } catch (e) {
        // If user not found then not authenticated
        if (e instanceof NotFoundException) throw new NotAuthenticatedException();
        // Bubble up any other kind of error
        next(e);
      }
    };
  }
}

export default new AuthenticationMiddleware();

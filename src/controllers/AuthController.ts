import {
  NextFunction,
  Response, 
} from "express";
import {
  RequestWithAuth, 
} from "../types/Auth/RequestWithAuth";
import {
  RequestWithOIDC, 
} from "../types/User/RequestWithUser";
import UserService from "../services/UserService";
import {
  UserMapper, 
} from "../mappers/UserMapper";
import UserController from "./UserController";
import User, {
  UserRole, 
} from "../entities/User";
import NotFoundException from "../exceptions/NotFoundException";

/**
 * Handle Auth related requests
 */
class AuthController extends UserController {
  /**
   * Constructor allows for dependency injection of service
   * @param userService
   * @param userMapper
   */
  constructor(userService: UserService = new UserService(),
    userMapper: UserMapper = new UserMapper()) {
    super(userService, userMapper);
  }

  public onSuccess = async (
    req: RequestWithOIDC & RequestWithAuth, res: Response, next: NextFunction,
  ) => {
    let user: User;

    try {
      user = await this.userService.getByEmail(req.user.email);
    } catch (e) {
      if (e instanceof NotFoundException) {
        const {
          email, picture, 
        } = req.user;
        user = await this.userService.create({
          email,
          avatarImg: picture,
          role     : UserRole.CONTRACTOR, 
        });
      } else {
        next(e);
      }
    }

    res.status(200).json({ data: this.userMapper.toDto(user) });
  };
}

export default AuthController;

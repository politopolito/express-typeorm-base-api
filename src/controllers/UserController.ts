import { IController } from "../types/IController";
import UserService from "../services/UserService";
import { IRequestHandler } from "../types/IRequestHandler";

/**
 * Handle HTTP requests for Users
 */
class UserController implements IController {
  /**
   * Handles all business logic related to User entity
   * @private
   */
  private readonly userService;

  /**
   * Constructor allows for dependency injection of service
   * @param userService
   */
  constructor(userService: UserService = new UserService()) {
    this.userService = userService;
  }

  /**
   * Gets user by id
   * Success: entity json
   * @param req
   * @param res
   */
  public getById: IRequestHandler = async (req, res) => {
    const user = await this.userService.getById(Number(req.params.id));
    res.status(200).json({ data: user });
  };

  /**
   * Creates user
   * Success: 201 & new entity json
   * @param req
   * @param res
   */
  public create: IRequestHandler = async (req, res) => {
    const user = await this.userService.create(req.body);
    res.status(201).json({ data: user });
  };

}

export default UserController;
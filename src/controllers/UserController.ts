import {
  IController, 
} from "../types/IController";
import UserService from "../services/UserService";
import {
  IRequestHandler, 
} from "../types/IRequestHandler";
import User from "../entities/User";
import {
  UserDto,
  UserMapper, 
} from "../mappers/UserMapper";
import {
  IMapper, 
} from "../mappers/IMapper";

/**
 * Handle HTTP requests for Users
 */
class UserController implements IController {
  /**
   * Handles all business logic related to User entity
   * @private
   */
  protected readonly userService;

  /**
   * Handles mapping user to dto
   * @private
   */
  protected readonly userMapper;

  /**
   * Constructor allows for dependency injection of service
   * @param userService
   * @param userMapper
   */
  constructor(userService: UserService = new UserService(), userMapper: IMapper<User, UserDto> = new UserMapper()) {
    this.userService = userService;
    this.userMapper = userMapper;
  }

  /**
   * Gets user by id
   * Success: entity json
   * @param req
   * @param res
   */
  public getById: IRequestHandler = async (req, res) => {
    const user = await this.userService.getById(Number(req.params.id));
    res.status(200).json({ data: this.userMapper.toDto(user) });
  };

  /**
   * Creates user
   * Success: 201 & new entity json
   * @param req
   * @param res
   */
  public create: IRequestHandler = async (req, res) => {
    const user = await this.userService.create(req.body);
    res.status(201).json({ data: this.userMapper.toDto(user) });
  };

  /**
   * Updates user by id
   * Success: 200 & updated entity json.
   * @param req
   * @param res
   */
  public updateById: IRequestHandler = async (req, res) => {
    const userUpdatePayload = req.body;
    const user = await this.userService.updateById(Number(req.params.id), userUpdatePayload);
    res.status(200).json({ data: this.userMapper.toDto(user) });
  };

  /**
   * Deletes user by id
   * Success: 204.
   * @param req
   * @param res
   */
  public deleteById: IRequestHandler = async (req, res) => {
    await this.userService.deleteById(Number(req.params.id));
    res.sendStatus(204);
  };
}

export default UserController;

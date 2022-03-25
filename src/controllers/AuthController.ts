import { IRequestHandler } from "../types/IRequestHandler";
import AuthService from "../services/AuthService";

/**
 * Handle HTTP requests for Users
 */
class AuthController {
  /**
   * Handles all business logic related to User entity
   * @private
   */
  private readonly authService;

  /**
   * Constructor allows for dependency injection of service
   * @param authService
   */
  constructor(authService: AuthService = new AuthService()) {
    this.authService = authService;
  }

  /**
   * Log in user
   * Success: user entity json
   * @param req
   * @param res
   */
  public login: IRequestHandler = async (req, res) => {
    await this.authService.login(req.body);
    res.status(200).json({ data: {} });
  };

  /**
   * Log out user
   * Success: 200
   * @param req
   * @param res
   */
  public logout: IRequestHandler = async (req, res) => {
    await this.authService.logout(req.body);
    res.sendStatus(200);
  };
}

export default AuthController;

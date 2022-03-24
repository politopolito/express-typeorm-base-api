/* eslint-disable class-methods-use-this */
import { IService } from "../types/IService";
import UserRepository from "../repositories/UserRepository";
import User from "../entities/User";
import UserCreateBodyValidator from "../validators/User/UserCreateBodyValidator";
import NotFoundException from "../exceptions/NotFoundException";

/**
 * Handle business logic for User using Data Mapper & Repository pattern.
 */
export default class UserService implements IService<User>{
  /**
   * Get available repository with established connection to a data storage
   * @private
   */
  private static getRepository(): ReturnType<typeof UserRepository> {
    return UserRepository();
  }

  /**
   * Error message for NotFoundException
   * @param id
   */
  private static notFoundErrorMessage = (id: number) => `User id:${id} not found`;

  /**
   * Gets user by id
   * Success: existing user
   * @param id
   */
  public async getById(id: number): Promise<User> {
    const user = await UserService.getRepository().findById(id);
    if (!user) throw new NotFoundException(UserService.notFoundErrorMessage(id));
    return user;
  }

  /**
   * Creates User
   * Success: new user
   * @param userData
   */
  public async create(userData: UserCreateBodyValidator): Promise<User> {
    return UserService.getRepository().save({ ...userData});
  }

}

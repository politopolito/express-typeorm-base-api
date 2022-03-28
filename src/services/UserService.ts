/* eslint-disable class-methods-use-this */
import { IService } from "../types/IService";
import UserRepository from "../repositories/UserRepository";
import User from "../entities/User";
import UserCreateBodyValidator from "../validators/User/UserCreateBodyValidator";
import UserUpdateBodyValidator from "../validators/User/UserUpdateBodyValidator";
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
   * @param key
   * @param val
   */
  private static notFoundErrorMessage = (key: string, val: string | number) => `User ${key}:${val} not found`;

  /**
   * Gets user by id
   * Success: existing user
   * @param id
   */
  public async getById(id: number): Promise<User> {
    const user = await UserService.getRepository().findById(id);
    if (!user) throw new NotFoundException(UserService.notFoundErrorMessage("id", id));
    return user;
  }

  /**
   * Gets user by auth0 id
   * Success: existing user
   * @param email
   */
  public async getByEmail(email: string): Promise<User> {
    const user = await UserService.getRepository().findByEmail(email);
    if (!user) throw new NotFoundException(UserService.notFoundErrorMessage("email", email));
    return user;
  }

  /**
   * Creates User
   * Success: new user
   * @param userData
   */
  public async create(userData: UserCreateBodyValidator): Promise<User> {
    return UserService.getRepository().save({ ...userData });
  }

  /**
   * Updates user by id
   * Success: updated user
   * @param id
   * @param userUpdateDate
   */
  public async updateById(id: number, userUpdateDate: UserUpdateBodyValidator): Promise<User> {
    const repo = UserService.getRepository();
    const user = await this.getById(id);

    if (!user) throw new NotFoundException(UserService.notFoundErrorMessage("id", id));

    repo.merge(user, userUpdateDate);
    return UserService.getRepository().save(user);
  }

  /**
   * Deletes user by id
   * Success: void
   * @param id
   */
  public async deleteById(id: number): Promise<void> {
    const deleteData = await UserService.getRepository().delete({ id });
    if (deleteData.affected === 0) {
      throw new NotFoundException(UserService.notFoundErrorMessage("id", id));
    }
  }
}

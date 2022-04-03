/* eslint-disable class-methods-use-this */
import {
  Repository, 
} from "typeorm";
import {
  IService, 
} from "../types/IService";
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
  public getRepository(): Repository<User> {
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
    const user = await this.getRepository().findOneBy({ id });
    if (!user) throw new NotFoundException(UserService.notFoundErrorMessage("id", id));
    return user;
  }

  /**
   * Gets user by auth0 id
   * Success: existing user
   * @param email
   */
  public async getByEmail(email: string): Promise<User> {
    const user = await this.getRepository().findOneBy({ email });
    if (!user) throw new NotFoundException(UserService.notFoundErrorMessage("email", email));
    return user;
  }

  /**
   * Creates User
   * Success: new user
   * @param userData
   */
  public async create(userData: UserCreateBodyValidator): Promise<User> {
    return this.getRepository().save({ ...userData });
  }

  /**
   * Updates user by id
   * Success: updated user
   * @param id
   * @param userUpdateData
   */
  public async updateById(id: number, userUpdateData: UserUpdateBodyValidator): Promise<User> {
    const user = await this.getById(id);
    const repo = this.getRepository();
    return repo.save({
      ...user,
      ...userUpdateData, 
    });
  }

  /**
   * Deletes user by id
   * Success: void
   * @param id
   */
  public async deleteById(id: number): Promise<void> {
    const deleteData = await this.getRepository().delete({ id });
    if (deleteData.affected === 0) {
      throw new NotFoundException(UserService.notFoundErrorMessage("id", id));
    }
  }
}

/* eslint-disable class-methods-use-this */
import { Repository } from "typeorm";
import { IService } from "../types/IService";
import userRepository from "../repositories/UserRepository";
import User from "../entities/User";
import UserCreateBodyValidator from "../validators/User/UserCreateBodyValidator";
import UserUpdateBodyValidator from "../validators/User/UserUpdateBodyValidator";
import NotFoundException from "../exceptions/NotFoundException";

/**
 * Handle business logic for User using Data Mapper & Repository pattern.
 */
export default class UserService implements IService<User> {
  /**
   * Get available repository with established connection to a data storage
   * @private
   */
  public getRepository(): Repository<User> {
    return userRepository();
  }

  /**
   * Error message for NotFoundException
   * @param key
   * @param val
   */
  private static notFoundErrorMessage = (
    key: string, val: string | number,
  ) => `User ${key}:${val} not found`;

  /**
   * Get user by a given key and val
   * @param key
   * @param val
   */
  public async getByKey(
    key: string,
    val: number | string,
  ): Promise<User> {
    const user = await this.getRepository().findOneBy({ [key]: val });

    if (!user) {
      throw new NotFoundException(UserService.notFoundErrorMessage(
        key, val,
      ));
    }

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
  public async updateById(
    id: number, userUpdateData: UserUpdateBodyValidator,
  ): Promise<User> {
    const user = await this.getByKey(
      "id", id,
    );
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
      throw new NotFoundException(UserService.notFoundErrorMessage(
        "id", id,
      ));
    }
  }
}

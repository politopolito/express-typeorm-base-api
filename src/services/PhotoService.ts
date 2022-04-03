/* eslint-disable class-methods-use-this */
import {
  IService, 
} from "../types/IService";
import PhotoRepository, {
  PhotoGetQueryOptions, 
} from "../repositories/PhotoRepository";
import Photo from "../entities/Photo";
import PhotoCreateBodyValidator from "../validators/Photo/PhotoCreateBodyValidator";
import PhotoUpdateBodyValidator from "../validators/Photo/PhotoUpdateBodyValidator";
import NotFoundException from "../exceptions/NotFoundException";
import IRepository from "../types/IRepository";

/**
 * Handle business logic for Photo using Data Mapper & Repository pattern.
 */
export default class PhotoService implements IService<Photo>{
  /**
   * Get available repository with established connection to a data storage
   * @private
   */
  public getRepository(): IRepository<Photo> {
    return PhotoRepository();
  }

  /**
   * Error message for NotFoundException
   * @param id
   */
  private static notFoundErrorMessage = (id: number) => `Photo id:${id} not found`;

  /**
   * Gets photo by id
   * Success: existing photo
   * @param id
   * @param options
   */
  public async getById(id: number, options?: PhotoGetQueryOptions): Promise<Photo> {
    const photo = await this.getRepository().findById(id, options);
    if (!photo) throw new NotFoundException(PhotoService.notFoundErrorMessage(id));
    return photo;
  }

  /**
   * Creates Photo
   * Success: new photo
   * @param photoData
   */
  public async create(photoData: PhotoCreateBodyValidator): Promise<Photo> {
    const { userId } = photoData;
    return this.getRepository().save({
      ...photoData,
      user: { id: userId }, 
    });
  }

  /**
   * Updates photo by id
   * Success: updated photo
   * @param id
   * @param photoUpdateDate
   */
  public async updateById(id: number, photoUpdateDate: PhotoUpdateBodyValidator): Promise<Photo> {
    const photo = await this.getById(id);
    if (!photo) throw new NotFoundException(PhotoService.notFoundErrorMessage(id));
    return this.getRepository().save({
      ...photo,
      ...photoUpdateDate, 
    });
  }

  /**
   * Deletes photo by id
   * Success: void
   * @param id
   */
  public async deleteById(id: number): Promise<void> {
    const deleteData = await this.getRepository().delete({ id });
    if (deleteData.affected === 0) {
      throw new NotFoundException(PhotoService.notFoundErrorMessage(id));
    }
  }
}

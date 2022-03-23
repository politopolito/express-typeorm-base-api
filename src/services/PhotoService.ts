/* eslint-disable class-methods-use-this */
import { IService } from "../types/IService";
import PhotoRepository from "../repositories/PhotoRepository";
import Photo from "../entities/Photo";
import PhotoCreateBodyValidator from "../validators/Photo/PhotoCreateBodyValidator";
import PhotoUpdateBodyValidator from "../validators/Photo/PhotoUpdateBodyValidator";
import NotFoundException from "../exceptions/NotFoundException";

/**
 * Handle business logic for Photo using Data Mapper & Repository pattern.
 */
export default class PhotoService implements IService<Photo>{
  /**
   * Get available repository with established connection to a data storage
   * @private
   */
  private static getRepository(): ReturnType<typeof PhotoRepository> {
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
   */
  public async getById(id: number): Promise<Photo> {
    const photo = await PhotoService.getRepository().findById(id);
    if (!photo) throw new NotFoundException(PhotoService.notFoundErrorMessage(id));
    return photo;
  }

  /**
   * Creates Photo
   * Success: new photo
   * @param photoData
   */
  public async create(photoData: PhotoCreateBodyValidator): Promise<Photo> {
    return PhotoService.getRepository().save({ ...photoData });
  }

  /**
   * Updates photo by id
   * Success: updated photo
   * @param id
   * @param photoUpdateDate
   */
  public async updateById(id: number, photoUpdateDate: PhotoUpdateBodyValidator): Promise<Photo> {
    const repo = PhotoService.getRepository();
    const photo = await this.getById(id);

    if (!photo) throw new NotFoundException(PhotoService.notFoundErrorMessage(id));

    repo.merge(photo, photoUpdateDate);
    return PhotoService.getRepository().save(photo);
  }

  /**
   * Deletes photo by id
   * Success: void
   * @param id
   */
  public async deleteById(id: number): Promise<void> {
    const deleteData = await PhotoService.getRepository().delete({ id });
    if (deleteData.affected === 0) {
      throw new NotFoundException(PhotoService.notFoundErrorMessage(id));
    }
  }
}

/* eslint-disable class-methods-use-this */
import { IService } from "../types/IService";
import PhotoRepository from "../repositories/PhotoRepository";
import Database from "../providers/Database";
import Photo from "../entities/Photo";
import PhotoCreateValidator from "../validators/Photo/PhotoCreateValidator";

export default class PhotoService implements IService<Photo>{
  private static getRepository(): PhotoRepository {
    return Database.getConnection().getCustomRepository(PhotoRepository);
  }

  public async getById(id: number): Promise<Photo> {
    return PhotoService.getRepository().findById(id);
  }

  public async create(payload: PhotoCreateValidator): Promise<Photo> {
    return PhotoService.getRepository().save({ ...payload });
  }
}

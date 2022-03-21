/* eslint-disable class-methods-use-this */
import { IService } from "../types/IService";
import PhotoRepository from "../repositories/PhotoRepository";
import Photo from "../entities/Photo";
import PhotoCreateValidator from "../validators/Photo/PhotoCreateValidator";

export default class PhotoService implements IService<Photo>{
  private static getRepository(): ReturnType<typeof PhotoRepository> {
    return PhotoRepository();
  }

  public async getById(id: number): Promise<Photo> {
    return PhotoService.getRepository().findById(id);
  }

  public async create(payload: PhotoCreateValidator): Promise<Photo> {
    console.log(payload);
    return PhotoService.getRepository().save({ ...payload });
  }
}

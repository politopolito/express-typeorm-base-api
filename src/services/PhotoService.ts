/* eslint-disable class-methods-use-this */
import { IService } from "../types/IService";
import PhotoRepository from "../repositories/PhotoRepository";
import Photo from "../entities/Photo";
import PhotoCreateValidator from "../validators/Photo/PhotoCreateValidator";
import PhotoUpdateValidator from "../validators/Photo/PhotoUpdateValidator";

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

  public async updateById(id:number, payload: PhotoUpdateValidator): Promise<Photo> {
    const data = await PhotoService.getRepository().findById(id);
    if(!data){
      return null;
    }else {
      return PhotoService.getRepository().save({ ...data, ...payload });
    }
    
  }

  public async deleteById(id:number): Promise<Photo> {
    const data = await PhotoService.getRepository().findById(id);
    if(!data){
      return null;
    }else {
      return PhotoService.getRepository().remove(data);
    }
  }
}

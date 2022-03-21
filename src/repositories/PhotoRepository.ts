import { Repository } from "typeorm";
import Photo from "../entities/Photo";

class PhotoRepository extends Repository<Photo> {
  findById(id: number): Promise<Photo> {
    return this.findOne({ where: { id } });
  }
}

export default PhotoRepository;

import Photo from "../entities/Photo";
import Database from "../providers/Database";

/**
 * Concrete repository for Photos
 */
const PhotoRepository = () => Database.getConnection().getRepository(Photo).extend({
  findById(id: number): Promise<Photo> {
    return this.findOne({ where: { id } });
  },
});

export default PhotoRepository;

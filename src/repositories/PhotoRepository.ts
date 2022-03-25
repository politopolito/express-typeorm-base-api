import Photo from "../entities/Photo";
import Database from "../providers/Database";

export interface PhotoGetQueryOptions {
  withUserId?: boolean;
}

/**
 * Concrete repository for Photos
 */
const PhotoRepository = () => Database.getConnection().getRepository(Photo).extend({
  findById(id: number, options: PhotoGetQueryOptions): Promise<Photo> {
    const relations = [];
    if (options.withUserId) relations.push("user");
    return this.findOne({ where: { id }, relations });
  },
});

export default PhotoRepository;

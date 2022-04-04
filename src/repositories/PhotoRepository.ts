import Photo from "../entities/Photo";
import Database from "../providers/Database";
import IRepository from "../types/IRepository";

export interface PhotoGetQueryOptions {
  withUserId?: boolean;
}

/**
 * Concrete repository for Photos
 */
const photoRepository = (): IRepository<Photo> => Database.getConnection().getRepository(Photo)
  .extend({
    findById(
      id: number, options?: PhotoGetQueryOptions,
    ): Promise<Photo> {
      const relations = [];

      if (options.withUserId) relations.push("user");
      return this.findOne({
        relations,
        where: { id },
      });
    },
  });

export default photoRepository;

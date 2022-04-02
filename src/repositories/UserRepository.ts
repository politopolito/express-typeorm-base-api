import Database from "../providers/Database";
import User from "../entities/User";
import { Repository } from "typeorm";

/**
 * Concrete repository for Users
 */
const UserRepository = (): Repository<User> => Database.getConnection().getRepository(User).extend({
  findById(id: number): Promise<User> {
    return this.findOne({ where: { id } });
  },

  findByEmail(email: string): Promise<User> {
    return this.findOne({ where: { email } });
  },
});

export default UserRepository;

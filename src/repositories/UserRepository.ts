import Database from "../providers/Database";
import User from "../entities/User";

/**
 * Concrete repository for Users
 */
const UserRepository = () => Database.getConnection().getRepository(User).extend({
  findById(id: number): Promise<User> {
    return this.findOne({ where: { id } });
  },
});

export default UserRepository;

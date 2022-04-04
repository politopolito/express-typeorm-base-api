import User, { UserRole } from "../entities/User";
import Photo from "../entities/Photo";

const getUserMock = () => User.build({
  avatarUrl      : "test.png",
  createdAt      : new Date().toDateString(),
  email          : "ignacioromanherrera@gmail.com",
  firstName      : "Nacho",
  id             : 1,
  isEmailVerified: true,
  lastName       : "Herrera",
  password       : null,
  photos         : [ { id: 1 }, { id: 2 } ] as Photo[],
  role           : UserRole.ADMIN,
  updatedAt      : new Date().toDateString(),
});

export default getUserMock;

import User, { UserRole } from "../entities/User";

const getUserMock = () => {
  const user = new User();

  user.id = 1;
  user.email = "test@example.com";
  user.firstName = "Nacho";
  user.lastName = "Herrera";
  user.avatarUrl = "test.png";
  user.createdAt = new Date().toDateString();
  user.updatedAt = new Date().toDateString();
  user.role = UserRole.ADMIN;
  return user;
};

export default getUserMock;

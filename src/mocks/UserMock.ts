import User from "../entities/User";

const getUserMock = () => {
  const user = new User();
  user.id = 1;
  user.email = "test@example.com";
  user.createdAt = new Date().toDateString();
  user.updatedAt = new Date().toDateString();
  return user;
};

export default getUserMock;

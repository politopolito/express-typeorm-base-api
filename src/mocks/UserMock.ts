import User from "../entities/User";

const getUserMock = () => {
  const user = new User();
  user.id = 1;
  user.email = "test@example.com";
  return user;
};

export default getUserMock;

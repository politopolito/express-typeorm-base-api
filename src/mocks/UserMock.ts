import User from "../entities/User";

export const getUserMock = () => {
  const user = new User();
  user.id = 1;
  user.email = "test@example.com";
  return user;
}

import User, { UserRole } from "../entities/User";
import Photo from "../entities/Photo";
import { UserMapper } from "./UserMapper";

describe("UserMapper", () => {
  it("User to UserDto", () => {
    const user = User.build({
      id             : 1,
      firstName      : "Nacho",
      lastName       : "Herrera",
      email          : "ignacioromanherrera@gmail.com",
      role           : UserRole.ADMIN,
      avatarUrl      : "test.png",
      updatedAt      : new Date().toDateString(),
      createdAt      : new Date().toDateString(),
      isEmailVerified: true,
      password       : null,
      photos         : [ { id: 1 }, { id: 2 } ] as Photo[],
    });

    const userDto = new UserMapper().toDto(user);

    expect(userDto).not.toHaveProperty("password");
    expect(userDto).not.toHaveProperty("photos");
    expect(userDto).toEqual({
      id             : user.id,
      firstName      : user.firstName,
      lastName       : user.lastName,
      email          : user.email,
      role           : user.role,
      avatarUrl      : user.avatarUrl,
      updatedAt      : new Date(user.updatedAt),
      createdAt      : new Date(user.createdAt),
      isEmailVerified: user.isEmailVerified,
      photosId       : user.photos.map(p => p.id),
    });
  });
});

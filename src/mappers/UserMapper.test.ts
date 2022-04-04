import { UserMapper } from "./UserMapper";
import getUserMock from "../mocks/UserMock";

describe(
  "UserMapper", () => {
    it(
      "User to UserDto", () => {
        const user = getUserMock();

        const userDto = new UserMapper().toDto(user);

        expect(userDto).not.toHaveProperty("password");
        expect(userDto).not.toHaveProperty("photos");
        expect(userDto).toEqual({
          avatarUrl      : user.avatarUrl,
          createdAt      : new Date(user.createdAt),
          email          : user.email,
          firstName      : user.firstName,
          id             : user.id,
          isEmailVerified: user.isEmailVerified,
          lastName       : user.lastName,
          photosId       : user.photos.map(p => p.id),
          role           : user.role,
          updatedAt      : new Date(user.updatedAt),
        });
      },
    );
  },
);

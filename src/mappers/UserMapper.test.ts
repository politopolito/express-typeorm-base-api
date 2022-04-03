import User, { UserRole } from "../entities/User";
import Photo from "../entities/Photo";
import { UserMapper } from "./UserMapper";

describe(
  "UserMapper", () => {
    it(
      "User to UserDto", () => {
        const user = User.build({
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

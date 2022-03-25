import User, { UserRole } from "../entities/User";
import Photo from "../entities/Photo";

export interface UserDto {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  avatarUrl: string;
  role: UserRole;
  photos?: Photo[];
}

/**
 * User Mapper for serializing.
 */
export class UserMapper implements IMapper<User, UserDto> {
  toDto(u: User): UserDto {
    return {
      id: u.id,
      email: u.email,
      firstName: u.firstName,
      lastName: u.lastName,
      avatarUrl: u.avatarUrl,
      role: u.role,
      photos: u.photos?.length > 0 ? u.photos : null,
    }
  }
}

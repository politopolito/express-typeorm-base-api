import User, { UserRole } from "../entities/User";
import { IMapper } from "./IMapper";

export interface UserDto {
  id: number;
  email: string;
  isEmailVerified: boolean;
  firstName: string;
  lastName: string;
  avatarUrl: string;
  role: UserRole;
  photosId?: number[];
  createdAt: Date,
  updatedAt: Date;
}

/**
 * User Mapper for serializing.
 */
export class UserMapper implements IMapper<User, UserDto> {
  toDto(u: User): UserDto {
    return {
      avatarUrl      : u.avatarUrl,
      createdAt      : new Date(u.createdAt),
      email          : u.email,
      firstName      : u.firstName,
      id             : u.id,
      isEmailVerified: u.isEmailVerified,
      lastName       : u.lastName,
      photosId       : u.photos?.length > 0
        ? u.photos.map(p => p.id)
        : null,
      role     : u.role,
      updatedAt: new Date(u.updatedAt),
    };
  }
}

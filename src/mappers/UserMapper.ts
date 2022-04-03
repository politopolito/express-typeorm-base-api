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
      id             : u.id,
      email          : u.email,
      isEmailVerified: u.isEmailVerified,
      firstName      : u.firstName,
      lastName       : u.lastName,
      avatarUrl      : u.avatarUrl,
      role           : u.role,
      photosId       : u.photos?.length > 0 ? u.photos.map(p => p.id) : null,
      updatedAt      : new Date(u.updatedAt),
      createdAt      : new Date(u.createdAt),
    };
  }
}

import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  Validate,
} from "class-validator";
import UserPasswordValidator from "./UserPasswordValidator";
import { UserRole } from "../../entities/User";
import { UserCreateBody } from "../../types/User/UserCreateRequest";

/**
 * Validate user's create request body
 */
export default class UserCreateBodyValidator implements UserCreateBody {
  [x: string]: string;

  @IsEmail()
  public email: string;

  @IsString()
  @IsOptional()
  public firstName?: string;

  @IsString()
  @IsOptional()
  public lastName?: string;

  @IsString()
  @IsOptional()
  public avatarUrl?: string;

  @Validate(UserPasswordValidator)
  @IsOptional()
  public password?: string;

  @IsEnum(UserRole)
  public role: UserRole;
}

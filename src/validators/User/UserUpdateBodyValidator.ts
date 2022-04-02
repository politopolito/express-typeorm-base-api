import {
  IsEmail, IsEnum, IsOptional, IsString, Validate,
} from "class-validator";
import UserPasswordValidator from "./UserPasswordValidator";
import { UserRole } from "../../entities/User";

/**
 * Validate user's update request body
 */
export default class UserUpdateBodyValidator {
  @IsEmail()
  @IsOptional()
  public email?: string;

  @IsString()
  @IsOptional()
  public firstName?: string;

  @IsString()
  @IsOptional()
  public lastName?: string;

  @IsString()
  @IsOptional()
  public avatarImg?: string;

  @Validate(UserPasswordValidator)
  @IsOptional()
  public password?: string;

  @IsEnum(UserRole)
  @IsOptional()
  public role?: UserRole;
}

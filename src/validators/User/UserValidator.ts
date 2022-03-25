import {
  IsEmail, IsEnum, IsOptional, IsString, Validate, 
} from "class-validator";
import UserPasswordValidator from "./UserPasswordValidator";
import { UserRole } from "../../entities/User";

/**
 * Base validator for User
 */
export default class UserValidator {
  @IsEmail()
  public email: string;

  @IsString()
  public firstName: string;

  @IsString()
  public lastName: string;

  @IsString()
  @IsOptional()
  public avatarImg: string;

  @Validate(UserPasswordValidator)
  @IsOptional()
  public password: string;

  @IsEnum(UserRole)
  public role: UserRole;
}

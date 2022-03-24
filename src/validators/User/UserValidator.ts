import {
  IsEmail, IsEnum, IsOptional, IsString, Validate, 
} from "class-validator";
import UserPasswordValidator from "./UserPasswordValidator";
import { UserRole } from "../../entities/User";

export default class UserValidator {
  @IsEmail()
  public email: string;

  @IsString()
  public firstName: string;

  @IsString()
  public lastName: string;

  @IsString()
  public avatarUrl?: string;

  @Validate(UserPasswordValidator)
  @IsOptional()
  public password: string;

  @IsString()
  @IsOptional()
  public avatarImg: string;

  @IsEnum(UserRole)
  public role: UserRole;
}

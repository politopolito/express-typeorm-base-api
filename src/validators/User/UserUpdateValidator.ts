import { IsString, MaxLength, MinLength } from "class-validator";
import UserValidator from "./UserValidator";

export default class UserUpdateValidator extends UserValidator {
  @IsString()
  @MinLength(10)
  @MaxLength(24)
  public password?: string;
}

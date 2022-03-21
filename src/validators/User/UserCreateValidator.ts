import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { Transform } from "class-transformer";

export default class UserCreateValidator {
  @IsString()
  @IsNotEmpty()
  @Transform(value => String(value)?.trim())
  public name: string;

  @IsEmail()
  public email: string;
}

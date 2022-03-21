import { IsString } from "class-validator";

export default class UserValidator {
  @IsString()
  public email?: string;

  @IsString()
  public name?: string;

  @IsString()
  public avatarImg?: string;
}

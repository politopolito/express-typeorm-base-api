import { IsNotEmpty, IsString } from "class-validator";
import { Transform } from "class-transformer";
import PhotoValidator from "./PhotoValidator";

export default class PhotoCreateValidator extends PhotoValidator {
  @IsString()
  @IsNotEmpty()
  @Transform(value => String(value)?.trim())
  public name: string;

  @IsString()
  @IsNotEmpty()
  @Transform(value => String(value)?.trim())
  public filename: string;

  @IsString()
  @IsNotEmpty()
  @Transform(value => String(value)?.trim())
  public description: string;
}

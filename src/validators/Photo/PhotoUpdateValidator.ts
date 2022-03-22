import { IsString } from "class-validator";
import { Transform } from "class-transformer";
import PhotoValidator from "./PhotoValidator";

export default class PhotoUpdateValidator extends PhotoValidator {
  @IsString()
  @Transform(value => String(value)?.trim())
  declare public name: string;

  @IsString()
  @Transform(value => String(value)?.trim())
  declare public filename: string;

  @IsString()
  @Transform(value => String(value)?.trim())
  declare public description: string;
}

import { IsBoolean, IsString } from "class-validator";
import { Transform } from "class-transformer";
import PhotoValidator from "./PhotoValidator";

/**
 * Validate photo's update request body
 */
export default class PhotoUpdateBodyValidator extends PhotoValidator {
  @IsString()
  @Transform(value => String(value)?.trim())
  declare public name: string;

  @IsString()
  @Transform(value => String(value)?.trim())
  declare public filename: string;

  @IsString()
  @Transform(value => String(value)?.trim())
  declare public description: string;

  @IsBoolean()
  declare public isPublic: boolean;
}

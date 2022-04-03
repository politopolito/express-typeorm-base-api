import {
  IsBoolean,
  IsEmpty,
  IsOptional,
  IsString, 
} from "class-validator";

/**
 * Validate photo's update request body
 */
export default class PhotoUpdateBodyValidator {
  /**
   * We don't want to allow changing a photo's user
   */
  @IsEmpty()
    userId?: number;

  @IsEmpty()
  declare filename?: string;

  @IsString()
  @IsOptional()
    name?: string;

  @IsString()
  @IsOptional()
    description?: string;

  @IsBoolean()
  @IsOptional()
    isPublic?: boolean;
}

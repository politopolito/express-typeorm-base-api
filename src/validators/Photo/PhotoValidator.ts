import {
  IsBoolean, IsNotEmpty, IsOptional, IsString,
} from "class-validator";

/**
 * Base validator for Photo entity
 */
export default class PhotoValidator {
  @IsString()
  @IsNotEmpty()
    name: string;

  @IsString()
  @IsOptional()
    description?: string;

  @IsString()
  @IsNotEmpty()
    filename: string;

  @IsBoolean()
  @IsOptional()
    isPublic: boolean;
}

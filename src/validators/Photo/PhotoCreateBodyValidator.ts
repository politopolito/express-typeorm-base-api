import {
  IsBoolean, IsInt, IsNotEmpty, IsOptional, IsString,
} from "class-validator";
import { Type } from "class-transformer";

/**
 * Validate photo's create request body
 */
export default class PhotoCreateBodyValidator {
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

  @IsInt()
  @IsNotEmpty()
  @Type(() => Number)
    userId: number;
}

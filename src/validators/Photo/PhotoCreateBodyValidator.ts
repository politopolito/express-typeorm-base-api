import { IsInt, IsNotEmpty } from "class-validator";
import { Type } from "class-transformer";
import PhotoValidator from "./PhotoValidator";

/**
 * Validate photo's create request body
 */
export default class PhotoCreateBodyValidator extends PhotoValidator {
  @IsInt()
  @IsNotEmpty()
  @Type(() => Number)
    userId: number;
}

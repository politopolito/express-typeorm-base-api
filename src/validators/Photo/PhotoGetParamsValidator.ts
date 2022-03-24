import { IsInt, IsNotEmpty } from "class-validator";
import { Type } from "class-transformer";
import PhotoValidator from "./PhotoValidator";

/**
 * Validate photo's get request params
 */
export default class PhotoGetParamsValidator extends PhotoValidator {
  @IsInt()
  @IsNotEmpty()
  @Type(() => Number)
  public id: number;
}

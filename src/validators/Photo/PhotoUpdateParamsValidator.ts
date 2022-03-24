import { IsInt, IsNotEmpty } from "class-validator";
import { Type } from "class-transformer";

/**
 * Validate photo's update request params
 */
export default class PhotoUpdateParamsValidator {
  @IsInt()
  @IsNotEmpty()
  @Type(() => Number)
  public id: number;
}

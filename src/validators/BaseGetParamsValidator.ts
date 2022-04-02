import { IsInt, IsNotEmpty } from "class-validator";
import { Type } from "class-transformer";

/**
 * Validate base get params
 */
export default class BaseGetParamsValidator {
  @IsInt()
  @IsNotEmpty()
  @Type(() => Number)
  public id: number;
}

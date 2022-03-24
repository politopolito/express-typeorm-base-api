import { IsInt, IsNotEmpty } from "class-validator";
import { Type } from "class-transformer";
import UserValidator from "./UserValidator";

/**
 * Validate user's get request params
 */
export default class UserGetParamsValidator extends UserValidator {
  @IsInt()
  @IsNotEmpty()
  @Type(() => Number)
  declare public id: number;
}
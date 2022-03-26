import { IsIn, IsOptional } from "class-validator";

/**
 * Base validator for Photo entity
 */
export default class PhotoGetQueryValidator {
  @IsOptional()
  @IsIn([ "true", "false" ])
    withUserId: string;
}

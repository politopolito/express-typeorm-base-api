import { IsEmpty } from "class-validator";
import PhotoValidator from "./PhotoValidator";

/**
 * Validate photo's update request body
 */
export default class PhotoUpdateBodyValidator extends PhotoValidator {
  /**
   * We don't want to allow changing a photo's user
   */
  @IsEmpty()
    userId: number;

  @IsEmpty()
    declare filename: string;
}

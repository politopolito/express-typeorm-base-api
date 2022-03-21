import {
  IsBoolean, IsInt, IsString,
} from "class-validator";

export default class PhotoValidator {
  @IsInt()
    id: number;

  @IsString()
    name?: string;

  @IsString()
    description?: string;

  @IsString()
    filename: string;

  @IsBoolean()
    isPublic?: boolean;
}

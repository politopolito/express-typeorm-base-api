import Photo from "../entities/Photo";
import { IMapper } from "./IMapper";

export interface PhotoDto {
  id: number;
  name: string;
  description: string;
  filename: string;
  isPublic: boolean;
  userId?: number;
  updatedAt: Date;
  createdAt: Date;
}

/**
 * Photo mapper for serializing
 */
export class PhotoMapper implements IMapper<Photo, PhotoDto>{
  toDto(p: Photo): PhotoDto {
    return {
      createdAt  : new Date(p.createdAt),
      description: p.description,
      filename   : p.filename,
      id         : p.id,
      isPublic   : p.isPublic,
      name       : p.name,
      updatedAt  : new Date(p.updatedAt),
      userId     : p.user?.id,
    };
  }
}

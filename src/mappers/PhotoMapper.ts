import Photo from "../entities/Photo";
import {
  IMapper, 
} from "./IMapper";

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
      id         : p.id,
      name       : p.name,
      description: p.description,
      filename   : p.filename,
      isPublic   : p.isPublic,
      userId     : p.user?.id,
      updatedAt  : new Date(p.updatedAt),
      createdAt  : new Date(p.createdAt),
    };
  }
}

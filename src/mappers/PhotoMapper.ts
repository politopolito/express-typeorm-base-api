import Photo from "../entities/Photo";

export interface PhotoDto {
  id: number;
  name: string;
  description: string;
  filename: string;
  isPublic: boolean;
  userId?: number;
}

/**
 * Photo mapper for serializing
 */
export class PhotoMapper implements IMapper<Photo, PhotoDto>{
  toDto(p: Photo): PhotoDto {
    return {
      id: p.id,
      name: p.name,
      description: p.description,
      filename: p.filename,
      isPublic: p.isPublic,
      userId: p.user?.id,
    }
  }
}

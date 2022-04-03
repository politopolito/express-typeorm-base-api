import Photo from "../entities/Photo";
import User from "../entities/User";
import { PhotoMapper } from "./PhotoMapper";

describe(
  "PhotoMapper", () => {
    it(
      "Photo to PhotoDto", () => {
        const photo = Photo.build({
          createdAt  : new Date().toDateString(),
          description: "",
          filename   : "",
          id         : 1,
          isPublic   : true,
          updatedAt  : new Date().toDateString(),
          user       : { id: 1 } as User,
        });

        const photoDto = new PhotoMapper().toDto(photo);

        expect(photoDto).toEqual({
          createdAt  : new Date(photo.createdAt),
          description: photo.description,
          filename   : photo.filename,
          id         : photo.id,
          isPublic   : photo.isPublic,
          updatedAt  : new Date(photo.updatedAt),
          userId     : photo.user.id,
        });
        expect(photoDto).not.toHaveProperty("user");
      },
    );
  },
);

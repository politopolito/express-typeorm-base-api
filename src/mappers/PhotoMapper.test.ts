import { PhotoMapper } from "./PhotoMapper";
import getPhotoMock from "../mocks/PhotoMock";

describe(
  "PhotoMapper", () => {
    it(
      "Photo to PhotoDto", () => {
        const photo = getPhotoMock();

        const photoDto = new PhotoMapper().toDto(photo);

        expect(photoDto).toEqual({
          createdAt  : new Date(photo.createdAt),
          description: photo.description,
          filename   : photo.filename,
          id         : photo.id,
          isPublic   : photo.isPublic,
          name       : photo.name,
          updatedAt  : new Date(photo.updatedAt),
          userId     : photo.user.id,
        });
        expect(photoDto).not.toHaveProperty("user");
      },
    );
  },
);

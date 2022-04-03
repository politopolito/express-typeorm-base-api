import Photo from "../entities/Photo";
import User from "../entities/User";
import {
  PhotoMapper,
} from "./PhotoMapper";

describe("PhotoMapper", () => {
  it("Photo to PhotoDto", () => {
    const photo = Photo.build({
      id         : 1,
      description: "",
      filename   : "",
      isPublic   : true,
      updatedAt  : new Date().toDateString(),
      createdAt  : new Date().toDateString(),
      user: { id: 1 } as User,
    });

    const photoDto = new PhotoMapper().toDto(photo);

    expect(photoDto).toEqual({
      id: photo.id,
      description: photo.description,
      filename: photo.filename,
      isPublic: photo.isPublic,
      updatedAt: new Date(photo.updatedAt),
      createdAt: new Date(photo.createdAt),
      userId: photo.user.id,
    });
    expect(photoDto).not.toHaveProperty("user");
  });
});

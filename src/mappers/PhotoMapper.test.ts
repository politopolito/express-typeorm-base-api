import Photo from "../entities/Photo";
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
    });
    const photoDto = new PhotoMapper().toDto(photo);

  });
});

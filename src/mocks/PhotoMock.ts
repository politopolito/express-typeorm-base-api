import Photo from "../entities/Photo";
import getUserMock from "./UserMock";

const getPhotoMock = (): Photo => Photo.build({
  createdAt  : new Date().toDateString(),
  description: "test description",
  filename   : "test.png",
  id         : 1,
  isPublic   : false,
  name       : "test",
  updatedAt  : new Date().toDateString(),
  user       : getUserMock(),
});

export default getPhotoMock;

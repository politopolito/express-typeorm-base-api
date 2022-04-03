import Photo from "../entities/Photo";

const getPhotoMock = (): Photo => {
  const photo = new Photo();

  photo.id = 1;
  photo.name = "test";
  photo.filename = "test.png";
  return photo;
};

export default getPhotoMock;

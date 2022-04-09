import sinon from "sinon";
import { stubInterface } from "ts-sinon";
import PhotoService from "./PhotoService";
import NotFoundException from "../exceptions/NotFoundException";
import getPhotoMock from "../mocks/PhotoMock";
import IRepository from "../types/IRepository";
import Photo from "../entities/Photo";

describe(
  "PhotoService", () => {
    const sandbox = sinon.createSandbox();

    afterEach(() => sandbox.restore());

    it(
      "getByKey success", async () => {
        // Given
        const photoMock = getPhotoMock();
        const fakeRepo = stubInterface<IRepository<Photo>>();

        // When
        fakeRepo.findOneByKey.resolves(photoMock);
        sandbox.replace(
          PhotoService.prototype, "getRepository", () => fakeRepo,
        );
        const res = await new PhotoService().getByKey(
          "id", photoMock.id,
        );

        // Then
        expect(fakeRepo.findOneByKey.calledOnceWithExactly(
          "id",
          photoMock.id,
          undefined,
        )).toBeTruthy();
        expect(res).toEqual(photoMock);
      },
    );

    it(
      "getByKey not found", async () => {
        // Given
        const fakeRepo = stubInterface<IRepository<Photo>>();

        // When
        fakeRepo.findOneByKey.resolves(null);
        sandbox.replace(
          PhotoService.prototype, "getRepository", () => fakeRepo,
        );
        const userService = new PhotoService();

        // Then
        await expect(userService.getByKey(
          "id", 999,
        )).rejects.toThrow(NotFoundException);
        expect(fakeRepo.findOneByKey.calledOnceWithExactly(
          "id", 999, undefined,
        )).toBeTruthy();
      },
    );

    it(
      "create success", async () => {
        // Given
        const photoMock = getPhotoMock();
        const fakeRepo = stubInterface<IRepository<Photo>>();
        const photoInput = {
          filename: "photo.png",
          isPublic: true,
          name    : "new_photo",
          userId  : 1,
        };

        // When
        fakeRepo.save.resolves(photoMock);
        sandbox.replace(
          PhotoService.prototype, "getRepository", () => fakeRepo,
        );
        const res = await new PhotoService().create(photoInput);

        // Then
        expect(fakeRepo.save.calledOnceWithExactly({
          ...photoInput,
          user: { id: photoInput.userId },
        })).toBeTruthy();
        expect(res).toEqual(photoMock);
      },
    );

    it(
      "create fails due to missing params", async () => {
        // Given
        const fakeRepo = stubInterface<IRepository<Photo>>();

        // When
        fakeRepo.save.throws();
        sandbox.replace(
          PhotoService.prototype, "getRepository", () => fakeRepo,
        );

        // Then
        await expect(new PhotoService().create({
          filename: undefined,
          isPublic: false,
          name    : undefined,
          userId  : undefined,
        }))
          .rejects
          .toThrow();
        expect(fakeRepo.save.calledOnce).toBeTruthy();
      },
    );

    it(
      "updateById success", async () => {
        // Given
        const photoMock = getPhotoMock();
        const expectedPhoto = {
          ...photoMock,
          name: "new_photo",
        };
        const fakeRepo = stubInterface<IRepository<Photo>>();
        const getByKey = sinon.fake.resolves(photoMock);

        // When
        fakeRepo.save.resolvesArg(0);
        sandbox.replace(
          PhotoService.prototype, "getByKey", getByKey,
        );
        sandbox.replace(
          PhotoService.prototype, "getRepository", () => fakeRepo,
        );
        const res = await new PhotoService().updateById(
          photoMock.id, { name: expectedPhoto.name },
        );

        // Then
        expect(getByKey.calledOnceWithExactly(
          "id", photoMock.id,
        )).toBeTruthy();
        expect(fakeRepo.save.calledOnceWithExactly({
          ...photoMock,
          name: expectedPhoto.name,
        })).toBeTruthy();
        expect(res).toEqual(expectedPhoto);
      },
    );

    it(
      "updateById not found", async () => {
        // Given
        const getByKey = sinon.fake.throws(new NotFoundException(""));

        // When
        sandbox.replace(
          PhotoService.prototype, "getByKey", getByKey,
        );
        const userService = new PhotoService();

        // Then
        await expect(userService.updateById(
          999, {},
        )).rejects.toThrow(NotFoundException);
        expect(getByKey.calledOnceWithExactly(
          "id", 999,
        )).toBeTruthy();
      },
    );

    it(
      "deleteById success", async () => {
        // Given
        const fakeRepo = stubInterface<IRepository<Photo>>();

        // When
        fakeRepo.delete.resolves({
          affected: 1,
          raw     : undefined,
        });
        sandbox.replace(
          PhotoService.prototype, "getRepository", () => fakeRepo,
        );
        const res = await new PhotoService().deleteById(1);

        // Then
        expect(fakeRepo.delete.calledOnceWithExactly({ id: 1 })).toBeTruthy();
        expect(res).toBeUndefined();
      },
    );

    it(
      "deleteById should throw when not found", async () => {
        // Given
        const fakeRepo = stubInterface<IRepository<Photo>>();

        // When
        fakeRepo.delete.resolves({
          affected: 0,
          raw     : undefined,
        });
        sandbox.replace(
          PhotoService.prototype, "getRepository", () => fakeRepo,
        );
        const userService = new PhotoService();

        // Then
        await expect(userService.deleteById(1)).rejects.toThrow(NotFoundException);
        expect(fakeRepo.delete.calledOnceWithExactly({ id: 1 } )).toBeTruthy();
      },
    );
  },
);

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
      "getById success", async () => {
        // Given
        const photoMock = getPhotoMock();
        const fakeRepo = stubInterface<IRepository<Photo>>();

        // When
        fakeRepo.findById.resolves(photoMock);
        sandbox.replace(
          PhotoService.prototype, "getRepository", () => fakeRepo,
        );
        const res = await new PhotoService().getById(photoMock.id);

        // Then
        expect(fakeRepo.findById.calledOnceWithExactly(
          photoMock.id, undefined,
        )).toBeTruthy();
        expect(res).toEqual(photoMock);
      },
    );

    it(
      "getById not found", async () => {
        // Given
        const fakeRepo = stubInterface<IRepository<Photo>>();

        // When
        fakeRepo.findById.resolves(null);
        sandbox.replace(
          PhotoService.prototype, "getRepository", () => fakeRepo,
        );
        const userService = new PhotoService();

        // Then
        await expect(userService.getById(999)).rejects.toThrow(NotFoundException);
        expect(fakeRepo.findById.calledOnceWithExactly(
          999, undefined,
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
        const getById = sinon.fake.resolves(photoMock);

        // When
        fakeRepo.save.resolvesArg(0);
        sandbox.replace(
          PhotoService.prototype, "getById", getById,
        );
        sandbox.replace(
          PhotoService.prototype, "getRepository", () => fakeRepo,
        );
        const res = await new PhotoService().updateById(
          photoMock.id, { name: expectedPhoto.name },
        );

        // Then
        expect(getById.calledOnceWithExactly(photoMock.id)).toBeTruthy();
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
        const getById = sinon.fake.throws(new NotFoundException(""));

        // When
        sandbox.replace(
          PhotoService.prototype, "getById", getById,
        );
        const userService = new PhotoService();

        // Then
        await expect(userService.updateById(
          999, {},
        )).rejects.toThrow(NotFoundException);
        expect(getById.calledOnceWithExactly(999)).toBeTruthy();
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

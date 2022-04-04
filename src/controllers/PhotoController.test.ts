/* eslint-disable @typescript-eslint/no-explicit-any */
import sinon from "sinon";
import PhotoController from "./PhotoController";
import getPhotoMock from "../mocks/photoMock";
import PhotoService from "../services/PhotoService";
import getRequestMock from "../mocks/RequestMock";
import getResponseMock from "../mocks/ResponseMock";
import { PhotoMapper } from "../mappers/PhotoMapper";
import NotFoundException from "../exceptions/NotFoundException";
import {
  PhotoCreateBody,
  PhotoCreateRequest,
} from "../types/Photo/PhotoCreateRequest";
import { PhotoUpdateBody } from "../types/Photo/PhotoUpdateRequest";
import Photo from "../entities/Photo";

describe(
  "PhotoController", () => {
    const sandbox = sinon.createSandbox();

    afterEach(() => sandbox.restore());

    it(
      "getById should return 200 and Photo on success and found Photo", async () => {
        // Given
        const photoMock = getPhotoMock();
        const fakeService = sinon.createStubInstance(PhotoService);
        const fakeReq = getRequestMock({
          params: { id: "1" },
          query : { withUserId: "true" },
        });
        const fakeRes = getResponseMock();
        const controller = new PhotoController(fakeService);

        // When
        fakeService.getById.resolves(photoMock);

        await controller.getById(
          fakeReq, fakeRes as any, null,
        );

        // Then
        expect(fakeService.getById.calledOnceWithExactly(
          1, { withUserId: true },
        )).toBeTruthy();
        expect(fakeRes.json.calledOnceWithExactly({ data: new PhotoMapper().toDto(photoMock) }))
          .toBeTruthy();
        expect(fakeRes.status.calledOnceWithExactly(200)).toBeTruthy();
      },
    );

    it(
      "getById should bubble up exception", async () => {
        // Given
        const fakeService = sinon.createStubInstance(PhotoService);
        const fakeReq = getRequestMock({
          params: { id: "1" },
          query : { withUserId: "true" },
        });
        const fakeRes = getResponseMock();
        const controller = new PhotoController(fakeService);

        // When
        fakeService.getById.throws(new NotFoundException());

        // Then
        await expect(controller.getById(
          fakeReq, fakeRes as any, null,
        )).rejects.toThrow(NotFoundException);
        expect(fakeService.getById.calledOnceWithExactly(
          1, { withUserId: true },
        )).toBeTruthy();
      },
    );

    it(
      "create should return 201 status code and Photo on success", async () => {
        // Given
        const photoMock = getPhotoMock();
        const fakeService = sinon.createStubInstance(PhotoService);
        const photoCreateBody: PhotoCreateBody = {
          description: "test description",
          filename   : "test.png",
          isPublic   : false,
          name       : "test image",
          userId     : 1,
        };
        const fakeReq: PhotoCreateRequest = getRequestMock({
          body: photoCreateBody,
        });
        const fakeRes = getResponseMock();
        const controller = new PhotoController(fakeService);

        // When
        fakeService.create.resolves(photoMock);

        await controller.create(
          fakeReq, fakeRes as any, null,
        );

        // Then
        expect(fakeService.create.calledOnceWithExactly(photoCreateBody)).toBeTruthy();
        expect(fakeRes.json.calledOnceWithExactly({ data: new PhotoMapper().toDto(photoMock) }))
          .toBeTruthy();
        expect(fakeRes.status.calledOnceWithExactly(201)).toBeTruthy();
      },
    );

    it(
      "create should should bubble up exception", async () => {
        // Given
        const fakeService = sinon.createStubInstance(PhotoService);
        const fakeReq = getRequestMock({});
        const fakeRes = getResponseMock();
        const controller = new PhotoController(fakeService);

        // When
        fakeService.create.throws();

        // Then
        await expect(controller.create(
          fakeReq, fakeRes as any, null,
        )).rejects.toThrow();
        expect(fakeService.create.calledOnce).toBeTruthy();
      },
    );

    it(
      "updateById should return 200 and Photo on success", async () => {
        // Given
        const photoUpdateBody: PhotoUpdateBody = { description: "new description" };
        const expectedPhoto = {
          ...getPhotoMock(),
          ...photoUpdateBody,
        } as Photo;
        const fakeService = sinon.createStubInstance(PhotoService);
        const fakeReq: PhotoCreateRequest = getRequestMock({
          body  : photoUpdateBody,
          params: { id: "1" },
        });
        const fakeRes = getResponseMock();
        const controller = new PhotoController(fakeService);

        // When
        fakeService.updateById.resolves(expectedPhoto);

        await controller.updateById(
          fakeReq, fakeRes as any, null,
        );

        // Then
        expect(fakeService.updateById.calledOnceWithExactly(
          Number(fakeReq.params.id), photoUpdateBody,
        )).toBeTruthy();
        expect(fakeRes.json.calledOnceWithExactly({ data: new PhotoMapper().toDto(expectedPhoto) }))
          .toBeTruthy();
        expect(fakeRes.status.calledOnceWithExactly(200)).toBeTruthy();
      },
    );

    it(
      "updateById should bubble up exception", async () => {
        // Given
        const photoUpdateBody: PhotoUpdateBody = { description: "new description" };
        const fakeService = sinon.createStubInstance(PhotoService);
        const fakeReq = getRequestMock({
          body  : photoUpdateBody,
          params: { id: "1" },
        });
        const fakeRes = getResponseMock();
        const controller = new PhotoController(fakeService);

        // When
        fakeService.updateById.throws();

        // Then
        await expect(controller.updateById(
          fakeReq, fakeRes as any, null,
        )).rejects.toThrow();
        expect(fakeService.updateById.calledOnceWithExactly(
          Number(fakeReq.params.id), photoUpdateBody,
        )).toBeTruthy();
      },
    );

    it(
      "deleteById should return 204 on success", async () => {
        // Given
        const fakeService = sinon.createStubInstance(PhotoService);
        const fakeReq = getRequestMock({ params: { id: "1" } });
        const fakeRes = getResponseMock();
        const controller = new PhotoController(fakeService);

        // When
        fakeService.deleteById.resolves();

        await controller.deleteById(
          fakeReq, fakeRes as any, null,
        );

        // Then
        expect(fakeService.deleteById.calledOnceWithExactly(Number(fakeReq.params.id)))
          .toBeTruthy();
        expect(fakeRes.sendStatus.calledOnceWithExactly(204)).toBeTruthy();
      },
    );

    it(
      "deleteById should bubble up exception", async () => {
        // Given
        const fakeService = sinon.createStubInstance(PhotoService);
        const fakeReq = getRequestMock({ params: { id: "1" } });
        const fakeRes = getResponseMock();
        const controller = new PhotoController(fakeService);

        // When
        fakeService.deleteById.throws(new NotFoundException());

        // Then
        await expect(controller.deleteById(
          fakeReq, fakeRes as any, null,
        )).rejects.toThrow(NotFoundException);
        expect(fakeService.deleteById.calledOnceWithExactly(Number(fakeReq.params.id)))
          .toBeTruthy();
      },
    );
  },
);

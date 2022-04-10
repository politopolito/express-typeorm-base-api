/* eslint-disable @typescript-eslint/no-explicit-any */
// noinspection JSVoidFunctionReturnValueUsed

import sinon from "sinon";
import UserController from "./UserController";
import getUserMock from "../mocks/UserMock";
import UserService from "../services/UserService";
import getRequestMock from "../mocks/RequestMock";
import getResponseMock from "../mocks/ResponseMock";
import { UserMapper } from "../mappers/UserMapper";
import NotFoundException from "../exceptions/NotFoundException";
import {
  UserCreateBody,
  UserCreateRequest,
} from "../types/User/UserCreateRequest";
import { UserUpdateBody } from "../types/User/UserUpdateRequest";
import User from "../entities/User";

describe(
  "UserController", () => {
    const sandbox = sinon.createSandbox();

    afterEach(() => sandbox.restore());

    it(
      "getByKey should return 200 and user on success and found user", async () => {
        // Given
        const userMock = getUserMock();
        const fakeService = sandbox.createStubInstance(UserService);
        const fakeReq = getRequestMock({ params: { id: "1" } });
        const fakeRes = getResponseMock();
        const controller = new UserController(fakeService);

        // When
        fakeService.getByKey.resolves(userMock);

        await controller.getById(
          fakeReq, fakeRes as any, null,
        );

        // Then
        expect(fakeService.getByKey.calledOnceWithExactly(
          "id", userMock.id,
        )).toBeTruthy();
        expect(fakeRes.json.calledOnceWithExactly({ data: new UserMapper().toDto(userMock) }))
          .toBeTruthy();
        expect(fakeRes.status.calledOnceWithExactly(200)).toBeTruthy();
      },
    );

    it(
      "getByKey should bubble up exception", async () => {
        // Given
        const fakeService = sandbox.createStubInstance(UserService);
        const fakeReq = getRequestMock({ params: { id: "1" } });
        const fakeRes = getResponseMock();
        const controller = new UserController(fakeService);

        // When
        fakeService.getByKey.throws(new NotFoundException());

        // Then
        await expect(controller.getById(
          fakeReq, fakeRes as any, null,
        )).rejects.toThrow(NotFoundException);
        expect(fakeService.getByKey.calledOnceWithExactly(
          "id", 1,
        )).toBeTruthy();
      },
    );

    it(
      "create should return 201 status code and user on success", async () => {
        // Given
        const userMock = getUserMock();
        const fakeService = sandbox.createStubInstance(UserService);
        const userCreateBody: UserCreateBody = {
          avatarUrl: userMock.avatarUrl,
          email    : userMock.email,
          firstName: userMock.firstName,
          lastName : userMock.lastName,
          role     : userMock.role,
        };
        const fakeReq: UserCreateRequest = getRequestMock({
          body: userCreateBody,
        });
        const fakeRes = getResponseMock();
        const controller = new UserController(fakeService);

        // When
        fakeService.create.resolves(userMock);

        await controller.create(
          fakeReq, fakeRes as any, null,
        );

        // Then
        expect(fakeService.create.calledOnceWithExactly(userCreateBody)).toBeTruthy();
        expect(fakeRes.json.calledOnceWithExactly({ data: new UserMapper().toDto(userMock) }))
          .toBeTruthy();
        expect(fakeRes.status.calledOnceWithExactly(201)).toBeTruthy();
      },
    );

    it(
      "create should should bubble up exception", async () => {
        // Given
        const fakeService = sandbox.createStubInstance(UserService);
        const fakeReq = getRequestMock({});
        const fakeRes = getResponseMock();
        const controller = new UserController(fakeService);

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
      "updateById should return 200 and user on success", async () => {
        // Given
        const userUpdateBody: UserUpdateBody = { email: "new@example.com" };
        const expectedUser = {
          ...getUserMock(),
          ...userUpdateBody,
        } as User;
        const fakeService = sandbox.createStubInstance(UserService);
        const fakeReq: UserCreateRequest = getRequestMock({
          body  : userUpdateBody,
          params: { id: "1" },
        });
        const fakeRes = getResponseMock();
        const controller = new UserController(fakeService);

        // When
        fakeService.updateById.resolves(expectedUser);

        await controller.updateById(
          fakeReq, fakeRes as any, null,
        );

        // Then
        expect(fakeService.updateById.calledOnceWithExactly(
          Number(fakeReq.params.id), userUpdateBody,
        )).toBeTruthy();
        expect(fakeRes.json.calledOnceWithExactly({ data: new UserMapper().toDto(expectedUser) }))
          .toBeTruthy();
        expect(fakeRes.status.calledOnceWithExactly(200)).toBeTruthy();
      },
    );

    it(
      "updateById should bubble up exception", async () => {
        // Given
        const userUpdateBody: UserUpdateBody = { email: "new@example.com" };
        const fakeService = sandbox.createStubInstance(UserService);
        const fakeReq = getRequestMock({
          body  : userUpdateBody,
          params: { id: "1" },
        });
        const fakeRes = getResponseMock();
        const controller = new UserController(fakeService);

        // When
        fakeService.updateById.throws();

        // Then
        await expect(controller.updateById(
          fakeReq, fakeRes as any, null,
        )).rejects.toThrow();
        expect(fakeService.updateById.calledOnceWithExactly(
          Number(fakeReq.params.id), userUpdateBody,
        )).toBeTruthy();
      },
    );

    it(
      "deleteById should return 204 on success", async () => {
        // Given
        const fakeService = sandbox.createStubInstance(UserService);
        const fakeReq = getRequestMock({ params: { id: "1" } });
        const fakeRes = getResponseMock();
        const controller = new UserController(fakeService);

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
        const fakeService = sandbox.createStubInstance(UserService);
        const fakeReq = getRequestMock({ params: { id: "1" } });
        const fakeRes = getResponseMock();
        const controller = new UserController(fakeService);

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

/* eslint-disable @typescript-eslint/no-explicit-any */
import sinon from "sinon";
import UserController from "./UserController";
import getUserMock from "../mocks/UserMock";
import UserService from "../services/UserService";
import getRequestMock from "../mocks/RequestMock";
import getResponseMock from "../mocks/ResponseMock";
import { UserMapper } from "../mappers/UserMapper";

describe("UserController", () => {
  const sandbox = sinon.createSandbox();

  afterEach(() => sandbox.restore());

  it("getById should return 200 and user on success and found user", async () => {
    // Given
    const userMock = getUserMock();
    const fakeService = sinon.createStubInstance(UserService);
    const fakeReq = getRequestMock({ params: { id: "1" } });
    const fakeRes = getResponseMock();
    const controller = new UserController(fakeService);

    // When
    fakeService.getById.resolves(userMock);

    await controller.getById(
      fakeReq, fakeRes as any, null,
    );

    // Then
    expect(fakeService.getById.calledOnceWithExactly(userMock.id)).toBeTruthy();
    expect(fakeRes.json.calledOnceWithExactly({ data: new UserMapper().toDto(userMock) })).toBeTruthy();
    expect(fakeRes.status.calledOnceWithExactly(200)).toBeTruthy();
  });

  // it("getById should bubble up exception", async () => {
  //   // Given
  //   const fakeRepo = sinon.createStubInstance(Repository);
  //
  //   // When
  //   fakeRepo.findOneBy.resolves(null);
  //   sandbox.replace(
  //     UserService.prototype, "getRepository", () => fakeRepo,
  //   );
  //   const userService = new UserService();
  //
  //   // Then
  //   await expect(userService.getById(999)).rejects.toThrow(NotFoundException);
  //   expect(fakeRepo.findOneBy.calledOnceWithExactly({ id: 999 })).toBeTruthy();
  // });
  //
  // it("create should return 201 status code and user on success", async () => {
  //   // Given
  //   const userMock = getUserMock();
  //   const fakeRepo = sinon.createStubInstance(Repository);
  //   const userInput = {
  //     email: "test@example.com",
  //     role : UserRole.CONTRACTOR,
  //   };
  //
  //   // When
  //   fakeRepo.save.resolves(userMock);
  //   sandbox.replace(
  //     UserService.prototype, "getRepository", () => fakeRepo,
  //   );
  //   const res = await new UserService().create(userInput);
  //
  //   // Then
  //   expect(fakeRepo.save.calledOnceWithExactly(userInput)).toBeTruthy();
  //   expect(res).toEqual(userMock);
  // });
  //
  // it("create should should bubble up exception", async () => {
  //   // Given
  //   const fakeRepo = sinon.createStubInstance(Repository);
  //
  //   // When
  //   fakeRepo.save.throws();
  //   sandbox.replace(
  //     UserService.prototype, "getRepository", () => fakeRepo,
  //   );
  //
  //   // Then
  //   await expect(new UserService().create({
  //     email: undefined,
  //     role : undefined,
  //   }))
  //     .rejects
  //     .toThrow();
  //   expect(fakeRepo.save.calledOnce).toBeTruthy();
  // });
  //
  // it("updateById should return 200 and user on success", async () => {
  //   // Given
  //   const userMock = getUserMock();
  //   const expectedUser = {
  //     ...userMock,
  //     email: "new@example.com",
  //   };
  //   const fakeRepo = sinon.createStubInstance(Repository);
  //   const getById = sinon.fake.resolves(userMock);
  //
  //   // When
  //   fakeRepo.save.resolvesArg(0);
  //   sandbox.replace(
  //     UserService.prototype, "getById", getById,
  //   );
  //   sandbox.replace(
  //     UserService.prototype, "getRepository", () => fakeRepo,
  //   );
  //   const res = await new UserService().updateById(userMock.id, { email: expectedUser.email });
  //
  //   // Then
  //   expect(getById.calledOnceWithExactly(userMock.id)).toBeTruthy();
  //   expect(fakeRepo.save.calledOnceWithExactly({
  //     ...userMock,
  //     email: expectedUser.email,
  //   })).toBeTruthy();
  //   expect(res).toEqual(expectedUser);
  // });
  //
  // it("updateById should bubble up exception", async () => {
  //   // Given
  //   const getById = sinon.fake.throws(new NotFoundException(""));
  //
  //   // When
  //   sandbox.replace(
  //     UserService.prototype, "getById", getById,
  //   );
  //   const userService = new UserService();
  //
  //   // Then
  //   await expect(userService.updateById(999, {})).rejects.toThrow(NotFoundException);
  //   expect(getById.calledOnceWithExactly(999)).toBeTruthy();
  // });
});

import sinon from "sinon";
import { Repository } from "typeorm";
import UserService from "./UserService";
import getUserMock from "../mocks/UserMock";
import NotFoundException from "../exceptions/NotFoundException";
import { UserRole } from "../entities/User";

describe("UserService", () => {
  const sandbox = sinon.createSandbox();

  afterEach(() => sandbox.restore());

  it("getById success", async () => {
    // Given
    const userMock = getUserMock();
    const fakeRepo = sinon.createStubInstance(Repository);

    // When
    fakeRepo.findOneBy.resolves(userMock);
    sandbox.replace(UserService.prototype, "getRepository", () => fakeRepo);
    const res = await new UserService().getById(userMock.id);

    // Then
    expect(fakeRepo.findOneBy.calledOnceWithExactly({ id: userMock.id })).toBeTruthy();
    expect(res).toEqual(userMock);
  });

  it("getById not found", async () => {
    // Given
    const fakeRepo = sinon.createStubInstance(Repository);

    // When
    fakeRepo.findOneBy.resolves(null);
    sandbox.replace(UserService.prototype, "getRepository", () => fakeRepo);
    const userService = new UserService();

    // Then
    await expect(userService.getById(999)).rejects.toThrow(NotFoundException);
    expect(fakeRepo.findOneBy.calledOnceWithExactly({ id: 999 })).toBeTruthy();
  });

  it("getByEmail success", async () => {
    // Given
    const userMock = getUserMock();
    const fakeRepo = sinon.createStubInstance(Repository);


    // When
    fakeRepo.findOneBy.resolves(userMock);
    sandbox.replace(UserService.prototype, "getRepository", () => fakeRepo);
    const res = await new UserService().getByEmail(userMock.email);

    // Then
    expect(fakeRepo.findOneBy.calledOnceWithExactly({ email: userMock.email })).toBeTruthy();
    expect(res).toEqual(userMock);
  });

  it("getByEmail not found", async () => {
    // Given
    const fakeRepo = sinon.createStubInstance(Repository);

    // When
    fakeRepo.findOneBy.resolves(null);
    sandbox.replace(UserService.prototype, "getRepository", () => fakeRepo);

    // Then
    await expect(new UserService().getByEmail("test@example.com"))
      .rejects
      .toThrow(NotFoundException);
    expect(fakeRepo.findOneBy.calledOnceWithExactly({ email: "test@example.com" })).toBeTruthy();
  });

  it("create success", async () => {
    // Given
    const userMock = getUserMock();
    const fakeRepo = sinon.createStubInstance(Repository);
    const userInput = { email: "test@example.com", role: UserRole.CONTRACTOR };

    // When
    fakeRepo.save.resolves(userMock);
    sandbox.replace(UserService.prototype, "getRepository", () => fakeRepo);
    const res = await new UserService().create(userInput);

    // Then
    expect(fakeRepo.save.calledOnceWithExactly(userInput)).toBeTruthy();
    expect(res).toEqual(userMock);
  });

  it("create fails due to missing params", async () => {
    // Given
    const fakeRepo = sinon.createStubInstance(Repository);

    // When
    fakeRepo.save.throws();
    sandbox.replace(UserService.prototype, "getRepository", () => fakeRepo);

    // Then
    await expect(new UserService().create({ email: undefined, role: undefined }))
      .rejects
      .toThrow();
    expect(fakeRepo.save.calledOnce).toBeTruthy();
  });

  it("updateById success", async () => {
    // Given
    const userMock = getUserMock();
    const expectedUser = { ...userMock, email: "new@example.com" };
    const fakeRepo = sinon.createStubInstance(Repository);
    const getById = sinon.fake.resolves(userMock);

    // When
    fakeRepo.save.resolvesArg(0);
    sandbox.replace(UserService.prototype, "getById", getById);
    sandbox.replace(UserService.prototype, "getRepository", () => fakeRepo);
    const res = await new UserService().updateById(userMock.id, { email: expectedUser.email });

    // Then
    expect(getById.calledOnceWithExactly(userMock.id)).toBeTruthy();
    expect(fakeRepo.save.calledOnceWithExactly({ ...userMock, email: expectedUser.email })).toBeTruthy();
    expect(res).toEqual(expectedUser);
  });

  it("updateById not found", async () => {
    // Given
    const getById = sinon.fake.throws(new NotFoundException(""));

    // When
    sandbox.replace(UserService.prototype, "getById", getById);
    const userService = new UserService();

    // Then
    await expect(userService.updateById(999, {})).rejects.toThrow(NotFoundException);
    expect(getById.calledOnceWithExactly(999)).toBeTruthy();
  });
});

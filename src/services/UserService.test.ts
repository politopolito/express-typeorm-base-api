import sinon from "sinon";
import UserService from "./UserService";
import { getUserMock } from "../mocks/UserMock";
import { Repository } from "typeorm";
import User from "../entities/User";

describe("UserService", () => {
  const sandbox = sinon.createSandbox();

  afterEach(() => sandbox.restore());

  it("Get user by id success", async () => {
    const userMock = getUserMock();
    const fakeRepo = sinon.createStubInstance(Repository);
    fakeRepo.findOneBy.resolves(userMock);
    sandbox.replace(UserService.prototype, "getRepository", () => fakeRepo);
    const userService = new UserService();

    const res = await userService.getById(1);
    expect(res).toEqual(userMock);
    expect(fakeRepo.findOneBy.calledOnceWithExactly({ id: 1 }));
  });
})

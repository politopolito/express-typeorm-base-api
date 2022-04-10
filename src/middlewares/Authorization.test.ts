import sinon from "sinon";
import { AuthorizationMiddleware } from "./Authorization";
import getRequestMock from "../mocks/RequestMock";
import {
  AuthData,
  RequestWithAuth,
} from "../types/Auth/RequestWithAuth";
import User, { UserRole } from "../entities/User";

describe(
  "AuthorizationMiddleware", () => {
    const sandbox = sinon.createSandbox();

    afterEach(() => sandbox.restore());

    it(
      // Given
      "Should succeed for admin role", async () => {
        // Given
        const middleware = new AuthorizationMiddleware().use();
        const req = getRequestMock<RequestWithAuth>({
          auth: {
            user: {
              role: UserRole.ADMIN,
            } as User,
          } as AuthData,
        });
        const next = sandbox.stub();

        // Then
        await middleware(
          req, null, next,
        );
        expect(next.calledOnce).toBeTruthy();
      },
    );
  },
);

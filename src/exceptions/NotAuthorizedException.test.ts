import NotAuthorizedException from "./NotAuthorizedException";

describe(
  "NotAuthorizedException", () => {
    it(
      "Should have 403 status code", () => {
        const e = new NotAuthorizedException();

        expect(e.status).toBe(403);
      },
    );

    it(
      "Should support custom message", () => {
        const e = new NotAuthorizedException("My message");

        expect(e.message).toBe("My message");
      },
    );
  },
);

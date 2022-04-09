import HttpException from "./HttpException";

/**
 * Not Found Http Exception
 */
export default class NotAuthenticatedException extends HttpException {
  constructor(message?: string) {
    super(
      401, message ?? "Authentication failed",
    );
  }
}

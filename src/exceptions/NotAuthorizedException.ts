import HttpException from "./HttpException";

export default class NotAuthorizedException extends HttpException {
  constructor(message?: string) {
    super(
      403, message ?? "Access denied: Not enough permissions",
    );
  }
}

import jwt from "express-jwt";
import jwksRsa from "jwks-rsa";
import Log from "../utils/Log";
import IMiddleware from "../types/IMiddleware";
import Config from "../providers/Config";

/**
 * General Authentication for API
 * It will populate req.user
 */
class JWTCheck implements IMiddleware {
  private static handler: jwt.RequestHandler;

  public static use(){
    Log.info("JWTCheck :: Checking JWT...");

    if (this.handler) return this.handler;

    const {
      auth0Identifier,
      auth0jwksUri,
      auth0Issuer,
    } = Config.config();

    this.handler = jwt({
      secret: jwksRsa.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: auth0jwksUri,
      }),
      audience: auth0Identifier,
      issuer: auth0Issuer,
      algorithms: [ "RS256" ],
    });
    return this.handler;
  }
}

export default JWTCheck;

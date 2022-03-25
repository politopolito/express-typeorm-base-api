import { auth } from "express-oauth2-jwt-bearer";
import Config from "../providers/Config";
import Log from "../utils/Log";
import IMiddleware from "../types/IMiddleware";

/**
 * General Authentication for API
 * Enable for production!
 */
class APIAuth implements IMiddleware {
  public static use(){
    Log.info("Auth :: Mounting Auth Middleware...");
    const {
      auth0Identifier,
      auth0Secret,
      auth0jwksUri,
      auth0Issuer,
    } = Config.config();
    return auth({
      issuerBaseURL: auth0Issuer,
      jwksUri: auth0jwksUri,
      secret: auth0Secret,
      audience: auth0Identifier,
      issuer: auth0Issuer,
    });
  }
}

export default APIAuth;

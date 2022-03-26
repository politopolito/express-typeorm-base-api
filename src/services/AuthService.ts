/* eslint-disable @typescript-eslint/no-explicit-any */
import Log from "../utils/Log";

export default class AuthService {
  login(data: any): void {
    Log.info(data);
  }

  logout(data: any): void {
    Log.info(data);
  }
}

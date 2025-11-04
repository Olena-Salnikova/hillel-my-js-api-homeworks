import BaseController from "./BaseController.js";

export default class AuthController extends BaseController {
  async signUp(userData) {
    return this.client.post("/api/auth/signup", userData);
  }

  async signIn(credentials) {
    return this.client.post("/api/auth/signin", credentials);
  }

  async logout() {
    return this.client.post("/api/auth/logout");
  }
}
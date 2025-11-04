import BaseController from "./BaseController.js";

export default class UserController extends BaseController {
  getCurrentUser() {
    return this.client.get("/api/users/profile");
  }

  deleteCurrentUser() {
    return this.client.delete("/api/users");
  }

  updateUser(data) {
    return this.client.put("/api/users/profile", data);
  }
}
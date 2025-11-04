import { faker } from "@faker-js/faker";
import AuthController from "../controllers/AuthController.js";
import CarsController from "../controllers/CarsController.js";
import UserController from "../controllers/UserController.js";
import { createApiClient } from "./apiClient.js";

export function createControllers() {
  const { client, jar } = createApiClient();
  return {
    auth: new AuthController(client),
    cars: new CarsController(client),
    userController: new UserController(client),
    jar
  };
}

export function generateUserData() {
  const password = `Qwerty${faker.number.int(999)}`;
  return {
    name: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email(),
    password,
    repeatPassword: password
  };
}

export async function registerAndLogin(auth, userData) {
  const signup = await auth.signUp(userData);
  if (signup.status !== 201) throw new Error("Signup failed");
  const signin = await auth.signIn({
    email: userData.email,
    password: userData.password
  });
  if (signin.status !== 200) throw new Error("Signin failed");
}
import { test, describe, beforeEach, afterEach, expect } from "@jest/globals";
import { createControllers, generateUserData, registerAndLogin} from "../../src/utils/testHelpers.js";

// Test suite for getting car models
describe("Getting car models", () => {
  const { auth, cars, userController } = createControllers();
  const user = generateUserData();

  beforeEach(async () => {
    await registerAndLogin(auth, user);
  });

// Test to get cars models
  test("Should get car models list successfully", async () => {

// Fetch the list of car models
    const models = await cars.getModels();
    expect(models.status).toBe(200);
    expect(models.data).toHaveProperty("status", "ok");
    expect(Array.isArray(models.data.data)).toBe(true);
    expect(models.data.data.length).toBeGreaterThan(0);

// Validate each model's structure
    models.data.data.forEach((model) => {
        expect(model).toHaveProperty("id");
        expect(model).toHaveProperty("title");
        expect(model).toHaveProperty("carBrandId");
        expect(typeof model.id).toBe("number");
        expect(typeof model.title).toBe("string");
        expect(typeof model.carBrandId).toBe("number");
    });
  });

// Cleanup after each test
  afterEach(async () => {
    const del = await userController.deleteCurrentUser();
    expect([200, 204]).toContain(del.status);
  });
});
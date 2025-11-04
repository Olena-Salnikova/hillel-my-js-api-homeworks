import { test, describe, beforeEach, afterEach, expect } from "@jest/globals";
import { createControllers, generateUserData, registerAndLogin} from "../../src/utils/testHelpers.js";

// Test suite for getting car models by ID
describe("Getting car models by ID", () => {
  const { auth, cars, userController } = createControllers();
  const user = generateUserData();

  beforeEach(async () => {
    await registerAndLogin(auth, user);
  });

// Test to get cars models by ID
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
// Pick a random model to test
    const randomModel = models.data.data[Math.floor(Math.random() * models.data.data.length)];
    const modelById = await cars.getModelsById(randomModel.id); 
    expect(modelById.status).toBe(200);
    expect(modelById.data).toHaveProperty("status", "ok");
    expect(modelById.data).toHaveProperty("data");
    expect(modelById.data.data).toHaveProperty("id", randomModel.id);
    expect(modelById.data.data).toHaveProperty("title", randomModel.title);
    expect(modelById.data.data).toHaveProperty("carBrandId", randomModel.carBrandId);
    expect(typeof modelById.data.data.id).toBe("number");
    expect(typeof modelById.data.data.title).toBe("string");
    expect(typeof modelById.data.data.carBrandId).toBe("number");
  });

// Cleanup after each test
  afterEach(async () => {
    const del = await userController.deleteCurrentUser();
    expect([200, 204]).toContain(del.status);
  });
});
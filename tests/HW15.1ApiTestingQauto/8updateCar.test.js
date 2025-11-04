import { test, describe, beforeEach, afterEach, expect } from "@jest/globals";
import { faker } from "@faker-js/faker";
import { createControllers, generateUserData, registerAndLogin } from "../../src/utils/testHelpers.js";

// Test suite for updating a car
describe("Update car", () => {
  const { auth, cars, userController } = createControllers();
  const user = generateUserData();
  let createdCar;

  beforeEach(async () => {
    await registerAndLogin(auth, user);
    const brands = await cars.getBrands();
    const randomBrand = brands.data.data[Math.floor(Math.random() * brands.data.data.length)];

    const models = await cars.getModels();
    const brandModels = models.data.data.filter((m) => m.carBrandId === randomBrand.id);
    const randomModel = brandModels[Math.floor(Math.random() * brandModels.length)];

    const newCar = {
      carBrandId: randomBrand.id,
      carModelId: randomModel.id,
      mileage: 1000
    };
    const create = await cars.createCar(newCar);
    createdCar = create.data.data;
  });

// Test to update car valid mileage
  test("Should update mileage", async () => {
    const newMileage = faker.number.int({ min: 1000, max: 999999 });
    const res = await cars.updateCar(createdCar.id, { mileage: newMileage });
    expect(res.status).toBe(200);
    expect(res.data.data.mileage).toBe(newMileage);
  });

  // Test to update car with invalid mileage
  test("Should not update with invalid mileage", async () => {
    const newMileage = faker.number.int({ min: 0, max: 999 });
    const res = await cars.updateCar(createdCar.id, { mileage: newMileage });
    expect ([400, 401, 404]).toContain(res.status);
    expect(res.data.data).toBeUndefined();
    expect(res.data.status).toBe("error");
    expect(res.data.message).toBe("New mileage is less then previous entry");
  });

  afterEach(async () => {
    await userController.deleteCurrentUser();
  });
});
import { test, describe, beforeEach, afterEach, expect } from "@jest/globals";
import { faker } from "@faker-js/faker";
import { createControllers, generateUserData, registerAndLogin } from "../../src/utils/testHelpers.js";

// Test suite for deleting a car
describe("Delete car", () => {
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

    const create = await cars.createCar({
      carBrandId: randomBrand.id,
      carModelId: randomModel.id,
      mileage: faker.number.int({ min: 0, max: 999999 })
    });
    createdCar = create.data.data;
  });

// Test to delete car
  test("Should delete car", async () => {
    const res = await cars.deleteCar(createdCar.id);
    expect(res.status).toBe(200);
    expect(res.data.status).toBe("ok");
    expect(res.data.data.carId).toBe(createdCar.id);

// Verify car is deleted
    const check = await cars.getCarById(createdCar.id);
    expect(check.status).toBe(404);
  });

// Test to delete non-existing car
  test("Should not delete non-existing car", async () => {
    const res = await cars.deleteCar(999999); // Assuming this ID does not exist
    expect(res.status).toBe(404);
  });

  afterEach(async () => {
    await userController.deleteCurrentUser();
  });
});
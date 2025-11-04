import { test, describe, beforeEach, afterEach, expect } from "@jest/globals";
import { faker } from "@faker-js/faker";
import { createControllers, generateUserData, registerAndLogin } from "../../src/utils/testHelpers.js";

// Test suite for getting car by ID
describe("Get car by ID", () => {
  const { auth, cars, userController } = createControllers();
  const user = generateUserData();

  beforeEach(async () => {
    await registerAndLogin(auth, user);
  });

// Test to get car by ID
  test("Should return list of user's cars", async () => {
    const brands = await cars.getBrands();
    const randomBrand = brands.data.data[Math.floor(Math.random() * brands.data.data.length)];
    const models = await cars.getModels();
    const brandModels = models.data.data.filter((m) => m.carBrandId === randomBrand.id);
    const randomModel = brandModels[Math.floor(Math.random() * brandModels.length)];

// Prepare car data
    const body = {
      carBrandId: randomBrand.id,
      carModelId: randomModel.id,
      mileage: faker.number.int({ min: 0, max: 999999 })
    };

// Create multiple cars
    const createdCars = [];
    for (let i = 0; i < 3; i++) {
      const createCarResponse = await cars.createCar(body);
      expect(createCarResponse.status).toBe(201);
      createdCars.push(createCarResponse.data.data);
    };

// Fetch user's cars and check each by ID
    for (let createdCar of createdCars) {
      createdCar.carCreatedAt = expect.any(String);
      createdCar.updatedMileageAt = expect.any(String);
      const getCarByIdResponse = await cars.getCarById(createdCar.id);
      expect(getCarByIdResponse.status).toBe(200);
      expect(getCarByIdResponse.data.data).toEqual(createdCar);
    }
  });    
  
// Clean up after tests
  afterEach(async () => {
    await userController.deleteCurrentUser();
  });
});
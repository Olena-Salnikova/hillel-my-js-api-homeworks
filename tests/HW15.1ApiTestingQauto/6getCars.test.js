import { test, describe, beforeEach, afterEach, expect } from "@jest/globals";
import { faker } from "@faker-js/faker";
import { createControllers, generateUserData, registerAndLogin } from "../../src/utils/testHelpers.js";

// Test suite for getting cars
describe("Get cars", () => {
  const { auth, cars, userController } = createControllers();
  const user = generateUserData();

  beforeEach(async () => {
    await registerAndLogin(auth, user);
  });

// Test to get cars when none exist
  test("Should return empty car list", async () => {
    const res = await cars.getUserCars();
    expect(res.status).toBe(200);
    expect(res.data.data).toEqual([]);
  });

// Test to get cars when some exist
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

// Fetch user's cars 
    const getCarsResponse = await cars.getUserCars();
    expect(getCarsResponse.status).toBe(200);
    expect(getCarsResponse.data.data.length).toBe(3);
    
    for (const createdCar of createdCars) {
// Verify each created car is in the fetched list
// Required because order is not guaranteed, and carCreatedAt differs slightly
      const found = getCarsResponse.data.data.find(c => c.id === createdCar.id);
      expect(found).toBeDefined();
      expect(found.carBrandId).toBe(createdCar.carBrandId);
      expect(found.carModelId).toBe(createdCar.carModelId);
      expect(found.mileage).toBe(createdCar.mileage);
    };

  });    
  
// Clean up after tests
  afterEach(async () => {
    await userController.deleteCurrentUser();
  });
});
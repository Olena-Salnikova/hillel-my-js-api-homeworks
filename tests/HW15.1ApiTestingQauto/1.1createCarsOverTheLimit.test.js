import { test, describe, beforeEach, afterEach, expect } from "@jest/globals";
import { faker } from "@faker-js/faker";
import { createControllers, generateUserData, registerAndLogin} from "../../src/utils/testHelpers.js";

// Test suite for creating a car
describe("Create car", () => {
  const { auth, cars, userController } = createControllers();
  const user = generateUserData();
  let carData;

  beforeEach(async () => {
    await registerAndLogin(auth, user);
  });

// Test to create a car over the limit
  test("Should not allow to create more than 25 cars", async () => {
    const brands = await cars.getBrands();
    const randomBrand = brands.data.data[Math.floor(Math.random() * brands.data.data.length)];
    const models = await cars.getModels();
    const brandModels = models.data.data.filter((m) => m.carBrandId === randomBrand.id);
    const randomModel = brandModels[Math.floor(Math.random() * brandModels.length)];

// Prepare car data
    const body = {
      carBrandId: randomBrand.id,
      carModelId: randomModel.id,
    };

    let createdCars = [];

// Create 25 cars first
    for (let i = 0; i < 25; i++) {
      const carBody = { ...body, mileage: faker.number.int({ min: 0, max: 999999 }) };
      const res = await cars.createCar(carBody);
      expect(res.status).toBe(201);
      expect(res.data.status).toBe("ok");
      
// Store created car data for later verification
      createdCars.push({
      "id": expect.any(Number),
      "carBrandId": carBody.carBrandId,
      "carModelId": carBody.carModelId,
      "initialMileage": carBody.mileage,
      "carCreatedAt":  expect.any(String) , //"2021-05-17T15:26:36.000Z",
      "updatedMileageAt":  expect.any(String) , //"2021-05-17T15:26:36.000Z",
      "mileage": carBody.mileage,
      "brand": randomBrand.title,
      "model": randomModel.title,
      "logo": randomBrand.logoFilename
        });
    };

// Now try to create the 26th car
    const extraCarBody = { ...body, mileage: faker.number.int({ min: 0, max: 999999 }) };
    const extraRes = await cars.createCar(extraCarBody);
    expect([400, 409]).toContain(extraRes.status);

// Verify only 25 cars exist
    const carsList = await cars.getUserCars();
    expect(carsList.data.data.length).toBe(25);

// Verify the created cars are in the list
    expect(carsList.data.data).toEqual(expect.arrayContaining(createdCars));
  });

// Cleanup after each test
  afterEach(async () => {
    const del = await userController.deleteCurrentUser();
    expect([200, 204]).toContain(del.status);
  });
});
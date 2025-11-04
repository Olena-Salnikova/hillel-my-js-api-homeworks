import { test, describe, beforeEach, afterEach, expect } from "@jest/globals";
import moment from "moment";
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

// Test to create a car
  test("Should create a car successfully", async () => {
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

// Record time before creation
    const before = new Date();

// Create the car
    const createCarResponse = await cars.createCar(body);
    expect(createCarResponse.status).toBe(201);
    expect(createCarResponse.data.status).toBe("ok");

    carData = createCarResponse.data.data;
// Validate the created car data
    const expectedData = {
      "id": expect.any(Number),
      "carBrandId": body.carBrandId,
      "carModelId": body.carModelId,
      "initialMileage": body.mileage,
      "carCreatedAt":  expect.any(String) , //"2021-05-17T15:26:36.000Z",
      "updatedMileageAt":  expect.any(String) , //"2021-05-17T15:26:36.000Z",
      "mileage": body.mileage,
      "brand": randomBrand.title,
      "model": randomModel.title,
      "logo": randomBrand.logoFilename
    };
    expect(carData).toEqual(expectedData);

// Verify timestamps are recent
    expect(moment(before).diff(moment(carData.carCreatedAt), "minute")).toBeLessThanOrEqual(1);
    expect(moment(before).diff(moment(carData.updatedMileageAt), "minute")).toBeLessThanOrEqual(1);

// Verify the car appears in the user's car list
    const getCarsResponse = await cars.getUserCars();
    expect(getCarsResponse.status).toBe(200);
    expect(getCarsResponse.data.data[0].id).toBe(carData.id);
  });

// Cleanup after each test
  afterEach(async () => {
    const del = await userController.deleteCurrentUser();
    expect([200, 204]).toContain(del.status);
  });
});
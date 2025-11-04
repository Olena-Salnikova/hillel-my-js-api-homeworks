import { test, describe, beforeEach, afterEach, expect } from "@jest/globals";
import { createControllers, generateUserData, registerAndLogin} from "../../src/utils/testHelpers.js";

// Test suite for getting car brand by ID
describe("Getting car brand by ID", () => {
  const { auth, cars, userController } = createControllers();
  const user = generateUserData();

  beforeEach(async () => {
    await registerAndLogin(auth, user);
  });

// Test to get car brand by ID
  test("Should get correct information for brand ID", async () => {

// First, get the list of brands to obtain a valid ID
    const brands = await cars.getBrands();
    expect(brands.status).toBe(200);
    expect(Array.isArray(brands.data.data)).toBe(true);
    expect(brands.data.data.length).toBeGreaterThan(0);

    brands.data.data.forEach((brand) => {
      expect(brand).toHaveProperty("id");
      expect(brand).toHaveProperty("title");
      expect(brand).toHaveProperty("logoFilename");

      expect(typeof brand.id).toBe("number");
      expect(typeof brand.title).toBe("string");
      expect(typeof brand.logoFilename).toBe("string");
    });

// Pick a random brand to test
    const randomBrand = brands.data.data[Math.floor(Math.random() * brands.data.data.length)];
    const brandById = await cars.getBrandById(randomBrand.id);

    expect(brandById.status).toBe(200);
    expect(brandById.data).toHaveProperty("status", "ok");
    expect(brandById.data).toHaveProperty("data");
    expect(brandById.data.data).toHaveProperty("id", randomBrand.id);
    expect(brandById.data.data).toHaveProperty("title", randomBrand.title);
    expect(brandById.data.data).toHaveProperty("logoFilename", randomBrand.logoFilename);

    expect(typeof brandById.data.data.id).toBe("number");
    expect(typeof brandById.data.data.title).toBe("string");
    expect(typeof brandById.data.data.logoFilename).toBe("string");
  });

// Cleanup after each test
  afterEach(async () => {
    const del = await userController.deleteCurrentUser();
    expect([200, 204]).toContain(del.status);
  });
});
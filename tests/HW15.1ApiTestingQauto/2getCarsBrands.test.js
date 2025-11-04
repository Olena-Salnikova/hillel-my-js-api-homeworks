import { test, describe, beforeEach, afterEach, expect } from "@jest/globals";
import { createControllers, generateUserData, registerAndLogin} from "../../src/utils/testHelpers.js";

// Test suite for getting car brands
describe("Getting car brands", () => {
  const { auth, cars, userController } = createControllers();
  const user = generateUserData();

  beforeEach(async () => {
    await registerAndLogin(auth, user);
  });

// Test to get cars brands
  test("Should get cars list successfully", async () => {
    const brands = await cars.getBrands();
    expect(brands.status).toBe(200);
    expect(brands.data).toHaveProperty("status", "ok");
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
  });

// Cleanup after each test
  afterEach(async () => {
    const del = await userController.deleteCurrentUser();
    expect([200, 204]).toContain(del.status);
  });
});
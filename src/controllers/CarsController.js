import BaseController from "./BaseController.js";

export default class CarsController extends BaseController {
  getBrands() {
    return this.client.get("/api/cars/brands");
  }

  getBrandById(id) {
    return this.client.get(`/api/cars/brands/${id}`);
  }

  getModels() {
    return this.client.get("/api/cars/models");
  }

  getModelsById(id) {
    return this.client.get(`/api/cars/models/${id}`);
  }

  createCar(carData) {
    return this.client.post("/api/cars", carData);
  }

  getCarById(id) {
    return this.client.get(`/api/cars/${id}`);
  }

  updateCar(id, data) {
    return this.client.put(`/api/cars/${id}`, data);
  }

  deleteCar(id) {
    return this.client.delete(`/api/cars/${id}`);
  }

  getUserCars() {
    return this.client.get("/api/cars");
  }
}
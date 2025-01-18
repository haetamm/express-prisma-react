import { ResponseSuccess } from "../entities/response-success.js";
import { userService } from "../service/user-service.js";

class UserController {
  async register(req, res, next) {
    try {
      const result = await userService.register(req);
      const response = new ResponseSuccess(201, result);
      res.status(201).json(response);
    } catch (e) {
      next(e);
    }
  }

  async getAll(req, res, next) {
    try {
      const result = await userService.getAll();
      const response = new ResponseSuccess(200, result);
      res.status(200).json(response);
    } catch (e) {
      next(e);
    }
  }

  async getById(req, res, next) {
    try {
      const result = await userService.getById(req);
      const response = new ResponseSuccess(200, result);
      res.status(200).json(response);
    } catch (e) {
      next(e);
    }
  }

  async update(req, res, next) {
    try {
      const result = await userService.update(req);
      const response = new ResponseSuccess(200, result);
      res.status(200).json(response);
    } catch (e) {
      next(e);
    }
  }

  async delete(req, res, next) {
    try {
      const result = await userService.delete(req);
      const response = new ResponseSuccess(204, result);
      res.status(204).json(response);
    } catch (e) {
      next(e);
    }
  }

  async getCurrentUser(req, res, next) {
    try {
      console.log("User authenticated qontol:", req.user);
      const result = await userService.getCurrentUser(req);
      const response = new ResponseSuccess(200, result);
      res.status(200).json(response);
    } catch (e) {
      next(e);
    }
  }
}

export default new UserController();

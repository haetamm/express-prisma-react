import { ResponseJson } from "../entities/response-json.js";
import { ResponseSuccess } from "../entities/response-success.js";
import { customerService } from "../service/customer-service.js";

class CustomerController {

    async register(req, res, next) {
        try {
            const result = await customerService.register(req);
            const response = new ResponseSuccess(201, result);
            res.status(201).json(response);
        } catch (e) {
            next(e);
        }
    }
    
    async getAll(req, res, next) {
        try {
            const result = await customerService.getAll();
            const response = new ResponseSuccess(200, result);
            res.status(200).json(response);
        } catch (e) {
            next(e);
        }
    }

    async getById(req, res, next) {
        try {
            const result = await customerService.getById(req);
            const response = new ResponseSuccess(200, result);
            res.status(200).json(response);
        } catch (e) {
            next(e);
        }
    }
    
    async update(req, res, next) {
        try {
            const result = await customerService.update(req);
            const response = new ResponseJson(200, result);
            res.status(200).json(response);
        } catch (e) {
            next(e);
        }
    }
    
    async delete(req, res, next) {
        try {
            const result = await customerService.delete(req);
            const response = new ResponseSuccess(204, result);
            res.status(204).json(response);
        } catch (e) {
            next(e);
        }
    }
}

export default new CustomerController();
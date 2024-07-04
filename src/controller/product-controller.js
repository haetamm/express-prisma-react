import { ResponseSuccess } from "../entities/response-success.js";
import { productService } from "../service/product-service.js"

class ProductController {

    async register(req, res, next) {
        try {
            const result = await productService.register(req);
            const response = new ResponseSuccess(201, result);
            res.status(201).json(response);
        } catch (e) {
            next(e);
        }
    }
    
    async getAll(req, res, next) {
        try {
            const result = await productService.getAll();
            const response = new ResponseSuccess(200, result);
            res.status(200).json(response);
        } catch (e) {
            next(e);
        }
    }

    async getById(req, res, next) {
        try {
            const result = await productService.getById(req);
            const response = new ResponseSuccess(200, result);
            res.status(200).json(response);
        } catch (e) {
            next(e);
        }
    }
    
    async update(req, res, next) {
        try {
            const result = await productService.update(req);
            const response = new ResponseSuccess(200, result);
            res.status(200).json(response);
        } catch (e) {
            next(e);
        }
    }
    
    async delete(req, res, next) {
        try {
            const result = await productService.delete(req);
            const response = new ResponseSuccess(204, result);
            res.status(204).json(response);
        } catch (e) {
            next(e);
        }
    }
}

export default new ProductController();